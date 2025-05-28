
// Performance monitoring and optimization utilities
export const performanceMonitor = {
  // Monitor Core Web Vitals
  measureWebVitals: () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Measure First Contentful Paint
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      
      // Measure Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          console.log('LCP:', lcp.startTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      }
      
      return {
        fcp: fcp ? fcp.startTime : null,
        navigationStart: performance.timing.navigationStart,
        loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart
      };
    }
    return null;
  },

  // Optimize image loading
  preloadCriticalImages: (imageUrls: string[]) => {
    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  },

  // Service Worker registration for offline capability
  registerServiceWorker: async () => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('SW registered: ', registration);
        return registration;
      } catch (error) {
        console.log('SW registration failed: ', error);
        return null;
      }
    }
    return null;
  },

  // Memory usage monitoring
  monitorMemoryUsage: () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
        usage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit * 100).toFixed(2)
      };
    }
    return null;
  },

  // Network quality detection
  detectNetworkQuality: () => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    }
    return null;
  }
};

// Auto-optimization based on device capabilities
export const autoOptimize = {
  // Reduce animations on low-end devices
  adjustAnimations: () => {
    const memory = performanceMonitor.monitorMemoryUsage();
    if (memory && parseFloat(memory.usage) > 70) {
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
      return true;
    }
    return false;
  },

  // Adjust quality based on network
  adjustQuality: () => {
    const network = performanceMonitor.detectNetworkQuality();
    if (network) {
      if (network.effectiveType === '2g' || network.effectiveType === 'slow-2g') {
        // Enable low quality mode
        document.documentElement.classList.add('low-quality');
        return 'low';
      } else if (network.effectiveType === '3g') {
        document.documentElement.classList.add('medium-quality');
        return 'medium';
      }
    }
    return 'high';
  },

  // Preload based on user behavior
  intelligentPreload: () => {
    const hoverElements = document.querySelectorAll('[data-preload]');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        const preloadUrl = element.getAttribute('data-preload');
        if (preloadUrl) {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = preloadUrl;
          document.head.appendChild(link);
        }
      });
    });
  }
};
