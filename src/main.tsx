
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Define proper types for Performance Observer entries
interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

// Performance monitoring utilities
const performanceMonitor = {
  // Register Service Worker for optimal caching
  registerServiceWorker: async () => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none'
        });
        
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available, notify user
                console.log('New content available, please refresh.');
              }
            });
          }
        });
        
        console.log('Service Worker registered successfully');
        return registration;
      } catch (error) {
        console.warn('Service Worker registration failed:', error);
      }
    }
  },

  // Monitor Core Web Vitals
  measureWebVitals: () => {
    if (typeof window !== 'undefined') {
      // Measure First Contentful Paint
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            console.log('FCP:', entry.startTime);
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });

      // Measure Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          console.log('LCP:', lcp.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      }

      // Measure Cumulative Layout Shift with proper typing
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as LayoutShiftEntry;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  },

  // Preload critical resources
  preloadCriticalResources: () => {
    const criticalFonts = [
      'https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap'
    ];

    criticalFonts.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  },

  // Monitor memory usage
  monitorMemoryUsage: () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit * 100).toFixed(2);
      
      if (parseFloat(usage) > 80) {
        console.warn('High memory usage detected:', usage + '%');
        // Trigger garbage collection if available
        if ('gc' in window) {
          (window as any).gc();
        }
      }
      
      return { usage, details: memory };
    }
    return null;
  }
};

// Error handling and recovery
const errorRecovery = {
  setupGlobalErrorHandling: () => {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
      
      // Try to recover from critical errors
      if (errorRecovery.isCriticalError(event.reason)) {
        errorRecovery.attemptRecovery();
      }
    });

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      
      if (errorRecovery.isCriticalError(event.error)) {
        errorRecovery.attemptRecovery();
      }
    });
  },

  isCriticalError: (error: any): boolean => {
    const criticalErrors = [
      'ChunkLoadError',
      'Loading chunk',
      'Script error',
      'Network error',
      'Cannot read properties of null'
    ];
    
    const errorMessage = error?.message || error?.toString() || '';
    return criticalErrors.some(critical => 
      errorMessage.toLowerCase().includes(critical.toLowerCase())
    );
  },

  attemptRecovery: () => {
    // Clear potentially corrupted cache
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('corrupt') || name.includes('error')) {
            caches.delete(name);
          }
        });
      });
    }

    // Reload after a delay to prevent infinite loops
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
};

// Initialize performance monitoring and error handling
performanceMonitor.registerServiceWorker();
performanceMonitor.measureWebVitals();
performanceMonitor.preloadCriticalResources();
errorRecovery.setupGlobalErrorHandling();

// Monitor performance periodically
setInterval(() => {
  performanceMonitor.monitorMemoryUsage();
}, 30000);

// Render the application
createRoot(document.getElementById("root")!).render(<App />);
