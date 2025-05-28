
// Advanced image optimization and lazy loading utilities
export class ImageOptimizer {
  private static observer: IntersectionObserver | null = null;
  private static imageCache = new Map<string, string>();

  // Initialize lazy loading observer
  static initLazyLoading() {
    if ('IntersectionObserver' in window && !this.observer) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            this.loadImage(img);
            this.observer?.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
    }
  }

  // Convert image to WebP format if supported
  static async convertToWebP(file: File): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          resolve(blob || file);
        }, 'image/webp', 0.8);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  // Compress image with quality control
  static compressImage(file: File, quality: number = 0.8): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate optimal dimensions
        const maxWidth = 1920;
        const maxHeight = 1080;
        let { width, height } = img;
        
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          resolve(blob || file);
        }, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }

  // Progressive image loading
  static loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    if (!src) return;

    // Check cache first
    if (this.imageCache.has(src)) {
      img.src = this.imageCache.get(src)!;
      img.classList.add('loaded');
      return;
    }

    // Load with blur-up technique
    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      this.imageCache.set(src, src);
    };
    
    tempImg.onerror = () => {
      img.src = '/placeholder.svg';
      img.classList.add('error');
    };
    
    tempImg.src = src;
  }

  // Setup lazy loading for elements
  static setupLazyLoading() {
    this.initLazyLoading();
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      if (this.observer) {
        this.observer.observe(img);
      } else {
        // Fallback for browsers without IntersectionObserver
        this.loadImage(img as HTMLImageElement);
      }
    });
  }

  // Preload critical images
  static preloadCriticalImages(urls: string[]) {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      
      // Use WebP if supported, fallback to original
      if (this.supportsWebP()) {
        link.href = url.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      }
      
      document.head.appendChild(link);
    });
  }

  // Check WebP support
  static supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
}
