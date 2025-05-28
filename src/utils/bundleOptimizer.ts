
// Bundle optimization and code splitting utilities
export class BundleOptimizer {
  private static loadedChunks = new Set<string>();
  private static preloadQueue: string[] = [];

  // Dynamic import with retry mechanism
  static async loadChunk(chunkName: string, retries: number = 3): Promise<any> {
    if (this.loadedChunks.has(chunkName)) {
      return Promise.resolve();
    }

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        let module;
        
        switch (chunkName) {
          case 'charts':
            module = await import('recharts');
            break;
          case 'icons':
            module = await import('lucide-react');
            break;
          case 'ui':
            module = await import('@radix-ui/react-dialog');
            break;
          default:
            throw new Error(`Unknown chunk: ${chunkName}`);
        }
        
        this.loadedChunks.add(chunkName);
        return module;
      } catch (error) {
        console.warn(`Failed to load chunk ${chunkName}, attempt ${attempt + 1}:`, error);
        
        if (attempt === retries - 1) {
          throw error;
        }
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  // Preload chunks based on user interaction
  static preloadOnHover(element: HTMLElement, chunkName: string) {
    const handleMouseEnter = () => {
      if (!this.preloadQueue.includes(chunkName)) {
        this.preloadQueue.push(chunkName);
        this.loadChunk(chunkName).catch(console.error);
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter, { once: true });
    element.addEventListener('focus', handleMouseEnter, { once: true });
  }

  // Remove unused CSS
  static removeUnusedCSS() {
    if (process.env.NODE_ENV === 'production') {
      // This would typically be handled by PurgeCSS in the build process
      const unusedSelectors = this.findUnusedCSS();
      this.removeCSSRules(unusedSelectors);
    }
  }

  private static findUnusedCSS(): string[] {
    const usedSelectors = new Set<string>();
    const allElements = document.querySelectorAll('*');
    
    allElements.forEach(element => {
      element.classList.forEach(className => {
        usedSelectors.add(`.${className}`);
      });
    });

    const unusedSelectors: string[] = [];
    Array.from(document.styleSheets).forEach(styleSheet => {
      try {
        Array.from(styleSheet.cssRules).forEach(rule => {
          if (rule instanceof CSSStyleRule) {
            if (!usedSelectors.has(rule.selectorText)) {
              unusedSelectors.push(rule.selectorText);
            }
          }
        });
      } catch (e) {
        // Cross-origin or other access issues
      }
    });

    return unusedSelectors;
  }

  private static removeCSSRules(selectors: string[]) {
    Array.from(document.styleSheets).forEach(styleSheet => {
      try {
        for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
          const rule = styleSheet.cssRules[i];
          if (rule instanceof CSSStyleRule && selectors.includes(rule.selectorText)) {
            styleSheet.deleteRule(i);
          }
        }
      } catch (e) {
        // Cross-origin or other access issues
      }
    });
  }

  // Tree shaking for unused imports
  static analyzeBundle() {
    if (process.env.NODE_ENV === 'development') {
      const stats = {
        totalChunks: this.loadedChunks.size,
        loadedChunks: Array.from(this.loadedChunks),
        preloadQueue: this.preloadQueue,
        bundleSize: this.estimateBundleSize()
      };
      
      console.log('Bundle Analysis:', stats);
      return stats;
    }
  }

  private static estimateBundleSize(): number {
    // Rough estimation based on loaded scripts
    let totalSize = 0;
    Array.from(document.scripts).forEach(script => {
      if (script.src) {
        totalSize += script.src.length * 8; // Rough byte estimation
      }
    });
    return totalSize;
  }
}
