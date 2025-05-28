// File compression and optimization utilities
export class CompressionManager {
  // Setup compression headers
  static setupCompressionHeaders() {
    // This would be configured on the server side, but we can detect support
    const supportsCompression = this.detectCompressionSupport();
    
    if (supportsCompression.gzip) {
      console.log('Gzip compression supported');
    }
    
    if (supportsCompression.brotli) {
      console.log('Brotli compression supported');
    }

    return supportsCompression;
  }

  // Detect browser compression support
  private static detectCompressionSupport() {
    const userAgent = navigator.userAgent;
    
    return {
      gzip: true, // Almost universally supported
      brotli: this.supportsBrotli(),
      deflate: true // Widely supported
    };
  }

  private static supportsBrotli(): boolean {
    // Check if browser supports Brotli
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    try {
      // Modern browsers that support Brotli usually support advanced Canvas features
      return !!(ctx && 'createPattern' in ctx && 'globalCompositeOperation' in ctx);
    } catch {
      return false;
    }
  }

  // Text compression for storage
  static compressText(text: string): string {
    if (!text) return text;
    
    try {
      // Simple compression using URL encoding and base64
      const compressed = btoa(encodeURIComponent(text));
      return compressed.length < text.length ? compressed : text;
    } catch {
      return text;
    }
  }

  static decompressText(compressed: string): string {
    if (!compressed) return compressed;
    
    try {
      return decodeURIComponent(atob(compressed));
    } catch {
      return compressed;
    }
  }

  // Generate optimal resource hints
  static generateResourceHints() {
    const hints = {
      preconnect: [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ],
      prefetch: [
        '/placeholder.svg'
      ],
      preload: []
    };

    // Add preconnect links
    hints.preconnect.forEach(url => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });

    // Add prefetch links for non-critical resources
    hints.prefetch.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });

    return hints;
  }

  // Optimize CSS delivery
  static optimizeCSSDelivery() {
    // Move non-critical CSS to load asynchronously
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    
    stylesheets.forEach((link, index) => {
      const href = (link as HTMLLinkElement).href;
      
      // Keep critical CSS inline, defer others
      if (index > 0 && !href.includes('critical')) {
        (link as HTMLLinkElement).media = 'print';
        (link as HTMLLinkElement).onload = function() {
          (this as HTMLLinkElement).media = 'all';
          (this as HTMLLinkElement).onload = null;
        };
      }
    });
  }

  // Optimize JavaScript loading
  static optimizeJSLoading() {
    const scripts = document.querySelectorAll('script[src]');
    
    scripts.forEach(script => {
      const src = (script as HTMLScriptElement).src;
      
      // Add defer to non-critical scripts
      if (!src.includes('critical') && !script.hasAttribute('async')) {
        (script as HTMLScriptElement).defer = true;
      }
    });
  }

  // Generate compression report
  static generateCompressionReport() {
    const report = {
      timestamp: new Date().toISOString(),
      browserSupport: this.detectCompressionSupport(),
      resourceCount: {
        css: document.querySelectorAll('link[rel="stylesheet"]').length,
        js: document.querySelectorAll('script[src]').length,
        images: document.querySelectorAll('img').length
      },
      optimizations: {
        resourceHints: !!document.querySelector('link[rel="preconnect"]'),
        cssOptimized: !!document.querySelector('link[media="print"]'),
        jsDeferred: !!document.querySelector('script[defer]')
      }
    };

    console.log('Compression Report:', report);
    return report;
  }
}
