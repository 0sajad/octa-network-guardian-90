
class PerformanceAnalyzer {
  private observer: PerformanceObserver | null = null;
  private metrics: Map<string, number> = new Map();

  constructor() {
    this.setupObserver();
  }

  private setupObserver(): void {
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.processEntry(entry);
        }
      });

      try {
        this.observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] });
      } catch (error) {
        console.warn('Performance observer setup failed:', error);
      }
    }
  }

  private processEntry(entry: PerformanceEntry): void {
    switch (entry.entryType) {
      case 'navigation':
        this.processNavigationEntry(entry as PerformanceNavigationTiming);
        break;
      case 'resource':
        this.processResourceEntry(entry as PerformanceResourceTiming);
        break;
      case 'measure':
        this.metrics.set(entry.name, entry.duration);
        break;
    }
  }

  private processNavigationEntry(entry: PerformanceNavigationTiming): void {
    this.metrics.set('domContentLoaded', entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart);
    this.metrics.set('loadComplete', entry.loadEventEnd - entry.loadEventStart);
    this.metrics.set('ttfb', entry.responseStart - entry.requestStart);
  }

  private processResourceEntry(entry: PerformanceResourceTiming): void {
    const url = new URL(entry.name);
    const extension = url.pathname.split('.').pop()?.toLowerCase();
    
    if (extension) {
      const currentTime = this.metrics.get(`${extension}LoadTime`) || 0;
      this.metrics.set(`${extension}LoadTime`, currentTime + entry.duration);
    }
  }

  getWebVitals(): Record<string, number | undefined> {
    return {
      lcp: this.metrics.get('largest-contentful-paint'),
      fid: this.metrics.get('first-input-delay'),
      cls: this.metrics.get('cumulative-layout-shift'),
      fcp: this.metrics.get('first-contentful-paint')
    };
  }

  getLoadingMetrics(): Record<string, number | undefined> {
    return {
      domContentLoaded: this.metrics.get('domContentLoaded'),
      loadComplete: this.metrics.get('loadComplete'),
      ttfb: this.metrics.get('ttfb')
    };
  }

  getResourceMetrics(): Record<string, number> {
    return {
      jsLoadTime: this.metrics.get('jsLoadTime') || 0,
      cssLoadTime: this.metrics.get('cssLoadTime') || 0,
      imageLoadTime: this.metrics.get('jpgLoadTime') || this.metrics.get('pngLoadTime') || this.metrics.get('webpLoadTime') || 0
    };
  }

  getSystemMetrics(): Record<string, number | string | undefined> {
    const memory = (performance as any).memory;
    const connection = (navigator as any).connection;
    
    return {
      memoryUsage: memory ? (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100 : undefined,
      networkSpeed: connection?.downlink,
      networkType: connection?.effectiveType
    };
  }

  generateReport(): any {
    const score = this.calculatePerformanceScore();
    
    return {
      timestamp: new Date().toISOString(),
      coreWebVitals: this.getWebVitals(),
      loadingMetrics: this.getLoadingMetrics(),
      resourceMetrics: this.getResourceMetrics(),
      systemMetrics: this.getSystemMetrics(),
      score
    };
  }

  private calculatePerformanceScore(): number {
    const metrics = this.getWebVitals();
    let score = 100;
    
    // Deduct points based on Core Web Vitals
    if (metrics.lcp && metrics.lcp > 2500) score -= 20;
    if (metrics.fid && metrics.fid > 100) score -= 15;
    if (metrics.cls && metrics.cls > 0.1) score -= 15;
    if (metrics.fcp && metrics.fcp > 1800) score -= 10;
    
    return Math.max(0, score);
  }

  startMonitoring(): void {
    // Monitor performance every minute
    setInterval(() => {
      const report = this.generateReport();
      console.log('Performance Report:', report);
    }, 60000);
  }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

export const performanceAnalyzer = new PerformanceAnalyzer();
