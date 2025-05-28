
// Initialize all performance optimizations
import { ImageOptimizer } from './imageOptimizer';
import { BundleOptimizer } from './bundleOptimizer';
import { CacheManager } from './cacheManager';
import { PerformanceAnalyzer } from './performanceAnalyzer';
import { CompressionManager } from './compressionManager';

export class PerformanceInit {
  static async initialize() {
    console.log('🚀 OCTA NETWORK - Initializing Performance Optimizations...');

    try {
      // 1. Initialize image optimization and lazy loading
      ImageOptimizer.initLazyLoading();
      ImageOptimizer.setupLazyLoading();
      ImageOptimizer.preloadCriticalImages(['/placeholder.svg']);

      // 2. Setup caching and CDN
      await CacheManager.initializeCache();
      CacheManager.setBrowserCache();
      CacheManager.setupCDN();
      await CacheManager.cleanupOldCaches();

      // 3. Bundle and compression optimization
      BundleOptimizer.removeUnusedCSS();
      CompressionManager.setupCompressionHeaders();
      CompressionManager.generateResourceHints();
      CompressionManager.optimizeCSSDelivery();
      CompressionManager.optimizeJSLoading();

      // 4. Start performance monitoring
      PerformanceAnalyzer.initializeMonitoring();

      // 5. Log initial reports
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          const performanceReport = PerformanceAnalyzer.generateReport();
          const cacheStats = CacheManager.getCacheStats();
          const compressionReport = CompressionManager.generateCompressionReport();
          const bundleStats = BundleOptimizer.analyzeBundle();

          console.log('📊 Performance Initialization Complete:', {
            performance: performanceReport,
            cache: cacheStats,
            compression: compressionReport,
            bundle: bundleStats
          });
        }, 2000);
      }

      console.log('✅ All performance optimizations initialized successfully');
      
    } catch (error) {
      console.error('❌ Performance initialization error:', error);
    }
  }

  // Continuous optimization
  static startContinuousOptimization() {
    // Re-run optimizations every 5 minutes
    setInterval(() => {
      ImageOptimizer.setupLazyLoading();
      BundleOptimizer.removeUnusedCSS();
      CacheManager.cleanupOldCaches();
    }, 5 * 60 * 1000);

    // Performance monitoring every minute
    setInterval(() => {
      const metrics = PerformanceAnalyzer.getMetrics();
      
      // Auto-adjust based on performance
      if (metrics.memoryUsage > 80) {
        console.warn('High memory usage detected, optimizing...');
        BundleOptimizer.removeUnusedCSS();
      }
      
      if (metrics.lcp > 4000) {
        console.warn('Poor LCP detected, optimizing images...');
        ImageOptimizer.setupLazyLoading();
      }
    }, 60 * 1000);
  }

  // Emergency performance recovery
  static emergencyOptimization() {
    console.log('🚨 Emergency performance optimization triggered');
    
    // Aggressive cleanup
    BundleOptimizer.removeUnusedCSS();
    
    // Clear non-critical caches
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          if (name.includes('dynamic')) {
            caches.delete(name);
          }
        });
      });
    }
    
    // Disable non-critical animations
    document.documentElement.style.setProperty('--animation-duration', '0s');
    
    // Force garbage collection if available
    if ('gc' in window && typeof (window as any).gc === 'function') {
      (window as any).gc();
    }
  }
}
