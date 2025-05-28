import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { performanceMonitor, autoOptimize } from './utils/performanceMonitor'
import { ErrorRecovery } from './utils/errorBoundary'
import { PerformanceInit } from './utils/performanceInit'

// Initialize comprehensive performance optimizations
PerformanceInit.initialize().then(() => {
  // Start continuous optimization
  PerformanceInit.startContinuousOptimization();
});

// Legacy performance monitoring (keeping for compatibility)
performanceMonitor.measureWebVitals();
performanceMonitor.registerServiceWorker();

// Setup error recovery
ErrorRecovery.setupGlobalErrorHandling();

// Auto-optimize based on device capabilities
autoOptimize.adjustAnimations();
autoOptimize.adjustQuality();
autoOptimize.intelligentPreload();

// Enhanced performance monitoring every 30 seconds
setInterval(() => {
  const memory = performanceMonitor.monitorMemoryUsage();
  const network = performanceMonitor.detectNetworkQuality();
  
  if (memory) {
    console.log('Memory usage:', memory.usage + '%');
    
    // Emergency optimization if memory usage is too high
    if (parseFloat(memory.usage) > 85) {
      PerformanceInit.emergencyOptimization();
    }
  }
  
  if (network) {
    console.log('Network quality:', network.effectiveType);
  }
}, 30000);

createRoot(document.getElementById("root")!).render(<App />);
