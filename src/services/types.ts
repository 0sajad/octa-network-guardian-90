
export interface ISPAnalysisRequest {
  ispName: string;
  location?: string;
  testType: 'speed' | 'coverage' | 'reliability' | 'full';
}

export interface VPNAnalysisRequest {
  vpnProvider: string;
  serverLocation: string;
  protocol: string;
}

export interface ISPAnalysisResult {
  downloadSpeed: number;
  uploadSpeed: number;
  latency: number;
  coverage: number;
  reliability: number;
  customerSatisfaction: number;
  pricing: string;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

export interface VPNAnalysisResult {
  speed: {
    download: number;
    upload: number;
    latency: number;
  };
  security: {
    encryption: string;
    protocols: string[];
    killSwitch: boolean;
  };
  privacy: {
    noLogsPolicy: boolean;
    jurisdiction: string;
  };
  servers: {
    count: number;
    countries: number;
  };
  rating: string;
  features: string[];
  pricing: string;
  torrentSupport: boolean;
  streamingSupport: boolean;
  recommendation: string;
}
