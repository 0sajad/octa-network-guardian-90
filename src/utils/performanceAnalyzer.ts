
// Comprehensive performance monitoring and Google Lighthouse integration
export class PerformanceAnalyzer {
  private static metrics: Record<string, number> = {};
  private static observers: PerformanceObserver[] = [];

  // Initialize performance monitoring
  static initializeMonitoring() {
    this.measureCoreWebVitals();
    this.setupResourceMonitoring();
    this.monitorUserInteractions();
    this.startContinuousMonitoring();
  }

  // Core Web Vitals measurement
  static measureCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1];
        this.metrics.lcp = lcp.startTime;
        this.reportMetric('LCP', lcp.startTime);
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          this.reportMetric('FID', this.metrics.fid);
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            this.metrics.cls = clsValue;
            this.reportMetric('CLS', clsValue);
          }
        });
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    }

    // First Contentful Paint (FCP)
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcp) {
      this.metrics.fcp = fcp.startTime;
      this.reportMetric('FCP', fcp.startTime);
    }
  }

  // Resource loading performance
  static setupResourceMonitoring() {
    if ('PerformanceObserver' in window) {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          const resourceType = this.getResourceType(entry.name);
          const loadTime = entry.responseEnd - entry.startTime;
          
          if (!this.metrics[`${resourceType}LoadTime`]) {
            this.metrics[`${resourceType}LoadTime`] = 0;
          }
          
          this.metrics[`${resourceType}LoadTime`] += loadTime;
          
          // Flag slow resources
          if (loadTime > 3000) {
            console.warn(`Slow ${resourceType} resource:`, entry.name, `${loadTime.toFixed(2)}ms`);
          }
        });
      });
      
      resourceObserver.observe({ entryTypes: ['resource'] });
      this.observers.push(resourceObserver);
    }
  }

  // User interaction monitoring
  static monitorUserInteractions() {
    const interactionTypes = ['click', 'keydown', 'scroll'];
    
    interactionTypes.forEach(type => {
      document.addEventListener(type, (event) => {
        const startTime = performance.now();
        
        requestAnimationFrame(() => {
          const endTime = performance.now();
          const interactionTime = endTime - startTime;
          
          if (!this.metrics.interactions) {
            this.metrics.interactions = [];
          }
          
          (this.metrics.interactions as any[]).push({
            type,
            duration: interactionTime,
            timestamp: startTime
          });
          
          // Flag slow interactions
          if (interactionTime > 100) {
            console.warn(`Slow ${type} interaction:`, `${interactionTime.toFixed(2)}ms`);
          }
        });
      }, { passive: true });
    });
  }

  // Continuous performance monitoring
  static startContinuousMonitoring() {
    setInterval(() => {
      this.analyzeCurrentPerformance();
      this.generateReport();
    }, 30000); // Every 30 seconds
  }

  // Current performance analysis
  static analyzeCurrentPerformance() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      this.metrics.loadComplete = navigation.loadEventEnd - navigation.loadEventStart;
      this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
    }

    // Memory usage
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
    }

    // Network quality
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      this.metrics.networkSpeed = connection.downlink;
      this.metrics.networkType = connection.effectiveType;
    }
  }

  // Generate performance report
  static generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      coreWebVitals: {
        lcp: this.metrics.lcp,
        fid: this.metrics.fid,
        cls: this.metrics.cls,
        fcp: this.metrics.fcp
      },
      loadingMetrics: {
        domContentLoaded: this.metrics.domContentLoaded,
        loadComplete: this.metrics.loadComplete,
        ttfb: this.metrics.ttfb
      },
      resourceMetrics: {
        jsLoadTime: this.metrics.jsLoadTime || 0,
        cssLoadTime: this.metrics.cssLoadTime || 0,
        imageLoadTime: this.metrics.imageLoadTime || 0
      },
      systemMetrics: {
        memoryUsage: this.metrics.memoryUsage,
        networkSpeed: this.metrics.networkSpeed,
        networkType: this.metrics.networkType
      },
      score: this.calculatePerformanceScore()
    };

    // Log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Report:', report);
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToAnalytics(report);
    }

    return report;
  }

  // Calculate performance score (like Lighthouse)
  static calculatePerformanceScore() {
    let score = 100;

    // LCP scoring
    if (this.metrics.lcp > 4000) score -= 20;
    else if (this.metrics.lcp > 2500) score -= 10;

    // FID scoring
    if (this.metrics.fid > 300) score -= 20;
    else if (this.metrics.fid > 100) score -= 10;

    // CLS scoring
    if (this.metrics.cls > 0.25) score -= 20;
    else if (this.metrics.cls > 0.1) score -= 10;

    // FCP scoring
    if (this.metrics.fcp > 3000) score -= 15;
    else if (this.metrics.fcp > 1800) score -= 8;

    // Memory usage scoring
    if (this.metrics.memoryUsage > 80) score -= 15;
    else if (this.metrics.memoryUsage > 60) score -= 8;

    return Math.max(0, Math.min(100, score));
  }

  // Helper methods
  private static getResourceType(url: string): string {
    if (url.includes('.js')) return 'js';
    if (url.includes('.css')) return 'css';
    if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|eot)$/)) return 'font';
    return 'other';
  }

  private static reportMetric(name: string, value: number) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name}:`, `${value.toFixed(2)}ms`);
    }
  }

  private static sendToAnalytics(report: any) {
    // Integration with Google Analytics, GTM, or custom analytics
    if ('gtag' in window) {
      (window as any).gtag('event', 'performance_report', {
        custom_parameter: JSON.stringify(report)
      });
    }
  }

  // Cleanup observers
  static cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }

  // Get current metrics
  static getMetrics() {
    return { ...this.metrics };
  }
}
