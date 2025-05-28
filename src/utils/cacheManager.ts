
// Advanced caching and CDN integration
export class CacheManager {
  private static readonly CACHE_VERSION = 'v1.2.0';
  private static readonly CACHE_NAMES = {
    static: `octa-static-${this.CACHE_VERSION}`,
    dynamic: `octa-dynamic-${this.CACHE_VERSION}`,
    images: `octa-images-${this.CACHE_VERSION}`
  };

  // Initialize service worker and caching
  static async initializeCache() {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
        
        // Update cache when new version is available
        registration.addEventListener('updatefound', () => {
          this.handleCacheUpdate();
        });
        
        return registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  // Browser cache management
  static setBrowserCache() {
    // Set cache headers for static assets
    const cacheableExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2'];
    
    cacheableExtensions.forEach(ext => {
      const elements = document.querySelectorAll(`[src*="${ext}"], [href*="${ext}"]`);
      elements.forEach(element => {
        const url = (element as any).src || (element as any).href;
        if (url) {
          this.cacheResource(url, 'static');
        }
      });
    });
  }

  // Cache API management
  static async cacheResource(url: string, cacheType: keyof typeof this.CACHE_NAMES) {
    if ('caches' in window) {
      try {
        const cache = await caches.open(this.CACHE_NAMES[cacheType]);
        const response = await fetch(url);
        
        if (response.ok) {
          await cache.put(url, response.clone());
        }
        
        return response;
      } catch (error) {
        console.warn('Caching failed for:', url, error);
        return fetch(url);
      }
    }
    
    return fetch(url);
  }

  // CDN integration
  static setupCDN() {
    const cdnConfig = {
      images: 'https://cdn.jsdelivr.net/gh/yourusername/octa-network@main/public',
      fonts: 'https://fonts.googleapis.com',
      libraries: 'https://unpkg.com'
    };

    // Replace local assets with CDN URLs in production
    if (process.env.NODE_ENV === 'production') {
      this.replaceWithCDN(cdnConfig);
    }
  }

  private static replaceWithCDN(config: Record<string, string>) {
    // Replace image sources
    document.querySelectorAll('img[src^="/"]').forEach(img => {
      const src = (img as HTMLImageElement).src;
      if (src.includes('/images/')) {
        (img as HTMLImageElement).src = src.replace('/images/', `${config.images}/images/`);
      }
    });

    // Preconnect to CDN origins
    Object.values(config).forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = new URL(origin).origin;
      document.head.appendChild(link);
    });
  }

  // Cache cleanup
  static async cleanupOldCaches() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      const currentCaches = Object.values(this.CACHE_NAMES);
      
      const deletionPromises = cacheNames
        .filter(name => !currentCaches.includes(name) && name.includes('octa-'))
        .map(name => caches.delete(name));
      
      await Promise.all(deletionPromises);
    }
  }

  // Handle cache updates
  private static handleCacheUpdate() {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_UPDATE',
        version: this.CACHE_VERSION
      });
    }
  }

  // Cache performance metrics
  static async getCacheStats() {
    if ('caches' in window) {
      const stats: Record<string, number> = {};
      
      for (const [type, name] of Object.entries(this.CACHE_NAMES)) {
        try {
          const cache = await caches.open(name);
          const keys = await cache.keys();
          stats[type] = keys.length;
        } catch (error) {
          stats[type] = 0;
        }
      }
      
      return stats;
    }
    
    return {};
  }
}
