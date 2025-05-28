
// Enhanced Service Worker for comprehensive performance optimization
const CACHE_NAME = 'octa-network-v1.2.0';
const STATIC_CACHE = 'octa-static-v1.2.0';
const DYNAMIC_CACHE = 'octa-dynamic-v1.2.0';
const IMAGE_CACHE = 'octa-images-v1.2.0';

// Resources to cache immediately
const PRECACHE_RESOURCES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/placeholder.svg'
];

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  static: {
    strategy: 'CacheFirst',
    maxAge: 31536000, // 1 year
    maxEntries: 100
  },
  dynamic: {
    strategy: 'NetworkFirst',
    maxAge: 86400, // 1 day
    maxEntries: 50
  },
  images: {
    strategy: 'CacheFirst',
    maxAge: 2592000, // 30 days
    maxEntries: 200
  }
};

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(PRECACHE_RESOURCES)),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!Object.values({STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE}).includes(cacheName) && 
                cacheName.startsWith('octa-')) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (unless fonts)
  if (!url.origin.includes(self.location.origin) && !url.hostname.includes('fonts.g')) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// Enhanced request handling with different strategies
async function handleRequest(request) {
  const url = new URL(request.url);
  const resourceType = getResourceType(url);
  
  switch (resourceType) {
    case 'static':
      return cacheFirstStrategy(request, STATIC_CACHE);
    case 'image':
      return cacheFirstStrategy(request, IMAGE_CACHE);
    case 'dynamic':
      return networkFirstStrategy(request, DYNAMIC_CACHE);
    case 'font':
      return cacheFirstStrategy(request, STATIC_CACHE);
    default:
      return networkFirstStrategy(request, DYNAMIC_CACHE);
  }
}

// Cache-first strategy (for static assets)
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Update cache in background if older than strategy maxAge
      updateCacheInBackground(request, cache);
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache-first strategy failed:', error);
    return new Response('Network error', { status: 503 });
  }
}

// Network-first strategy (for dynamic content)
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache...');
    
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Offline content not available', { status: 503 });
  }
}

// Update cache in background
async function updateCacheInBackground(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response);
    }
  } catch (error) {
    // Silent fail for background updates
  }
}

// Determine resource type
function getResourceType(url) {
  const pathname = url.pathname.toLowerCase();
  
  if (pathname.match(/\.(js|css|woff|woff2|ttf|eot)$/)) {
    return 'static';
  }
  
  if (pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|avif)$/)) {
    return 'image';
  }
  
  if (url.hostname.includes('fonts.')) {
    return 'font';
  }
  
  if (pathname === '/' || pathname.endsWith('.html')) {
    return 'dynamic';
  }
  
  return 'dynamic';
}

// Handle cache cleanup messages
self.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_UPDATE') {
    console.log('Cache update requested');
    // Force cache refresh
    caches.keys().then(names => {
      names.forEach(name => {
        if (name.includes('dynamic')) {
          caches.delete(name);
        }
      });
    });
  }
});

// Background sync for failed requests (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
      event.waitUntil(doBackgroundSync());
    }
  });
}

async function doBackgroundSync() {
  // Implement background sync logic here
  console.log('Background sync triggered');
}

// Push notifications support (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'octa-network-notification'
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});
