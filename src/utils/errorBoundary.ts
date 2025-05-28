
// Global error handling and recovery
export class ErrorRecovery {
  static setupGlobalErrorHandling() {
    // Handle unhandled promises
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
      
      // Try to recover from the error
      this.attemptRecovery(event.reason);
    });

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.attemptRecovery(event.error);
    });
  }

  static attemptRecovery(error: any) {
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

    // Clear localStorage if needed
    try {
      const corruptKeys = Object.keys(localStorage).filter(key => 
        key.includes('corrupt') || key.includes('error')
      );
      corruptKeys.forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.warn('Could not access localStorage:', e);
    }

    // Reload the page as last resort (with delay to prevent infinite loops)
    if (this.shouldReload(error)) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  static shouldReload(error: any): boolean {
    const criticalErrors = [
      'ChunkLoadError',
      'Loading chunk',
      'Script error',
      'Network error'
    ];
    
    const errorMessage = error?.message || error?.toString() || '';
    return criticalErrors.some(critical => 
      errorMessage.toLowerCase().includes(critical.toLowerCase())
    );
  }

  static createFallbackUI() {
    const fallback = document.createElement('div');
    fallback.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: 'Tajawal', sans-serif;
        z-index: 9999;
        direction: rtl;
      ">
        <div style="text-align: center;">
          <h1 style="font-size: 2rem; margin-bottom: 1rem;">OCTA NETWORK</h1>
          <p style="margin-bottom: 2rem;">جاري إعادة تحميل النظام...</p>
          <div style="
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          "></div>
        </div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    return fallback;
  }
}
