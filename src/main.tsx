
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { performanceMonitor, autoOptimize } from './utils/performanceMonitor'
import { ErrorRecovery } from './utils/errorBoundary'

// Initialize performance monitoring
performanceMonitor.measureWebVitals();
performanceMonitor.registerServiceWorker();

// Setup error recovery
ErrorRecovery.setupGlobalErrorHandling();

// Auto-optimize based on device capabilities
autoOptimize.adjustAnimations();
autoOptimize.adjustQuality();
autoOptimize.intelligentPreload();

// Monitor performance every 30 seconds
setInterval(() => {
  const memory = performanceMonitor.monitorMemoryUsage();
  const network = performanceMonitor.detectNetworkQuality();
  
  if (memory) {
    console.log('Memory usage:', memory.usage + '%');
  }
  
  if (network) {
    console.log('Network quality:', network.effectiveType);
  }
}, 30000);

createRoot(document.getElementById("root")!).render(<App />);
