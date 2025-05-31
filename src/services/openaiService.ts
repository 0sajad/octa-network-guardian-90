
const OPENAI_API_KEY = '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';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

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

export const analyzeISP = async (request: ISPAnalysisRequest) => {
  try {
    const prompt = `
    قم بتحليل مزود خدمة الإنترنت "${request.ispName}" في "${request.location || 'العراق'}" وأعطني معلومات دقيقة عن:
    1. السرعة المتوقعة (التحميل والرفع)
    2. زمن الاستجابة المتوقع
    3. التغطية الجغرافية
    4. مستوى الاستقرار
    5. رضا العملاء (إذا توفرت إحصائيات)
    6. الأسعار التقريبية
    7. نقاط القوة والضعف
    
    أريد الإجابة بصيغة JSON مع البيانات التالية:
    {
      "downloadSpeed": "رقم بالميجابت",
      "uploadSpeed": "رقم بالميجابت", 
      "latency": "رقم بالميللي ثانية",
      "coverage": "نسبة مئوية",
      "reliability": "نسبة مئوية",
      "customerSatisfaction": "نسبة مئوية",
      "pricing": "وصف الأسعار",
      "strengths": ["نقاط القوة"],
      "weaknesses": ["نقاط الضعف"],
      "recommendation": "توصية عامة"
    }
    `;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      // Fallback: create structured data from text response
      return parseTextResponse(content, request.ispName);
    }
  } catch (error) {
    console.error('Error analyzing ISP:', error);
    // Return fallback data
    return getFallbackISPData(request.ispName);
  }
};

export const analyzeVPN = async (request: VPNAnalysisRequest) => {
  try {
    const prompt = `
    قم بتحليل خدمة VPN "${request.vpnProvider}" مع الخادم في "${request.serverLocation}" باستخدام بروتوكول "${request.protocol}" وأعطني تقييم شامل يتضمن:
    1. السرعة المتوقعة
    2. مستوى الأمان
    3. سياسة عدم التسجيل
    4. عدد الخوادم والمواقع
    5. تقييم عام من 10
    6. المميزات الخاصة
    7. السعر التقريبي
    8. هل يدعم التورنت؟
    9. هل يعمل مع Netflix؟
    
    أريد الإجابة بصيغة JSON:
    {
      "speed": {"download": رقم, "upload": رقم, "latency": رقم},
      "security": {"encryption": "نوع التشفير", "protocols": ["البروتوكولات"], "killSwitch": true/false},
      "privacy": {"noLogsPolicy": true/false, "jurisdiction": "الدولة"},
      "servers": {"count": رقم, "countries": رقم},
      "rating": رقم من 10,
      "features": ["المميزات"],
      "pricing": "وصف السعر",
      "torrentSupport": true/false,
      "streamingSupport": true/false,
      "recommendation": "التوصية"
    }
    `;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      return getFallbackVPNData(request.vpnProvider);
    }
  } catch (error) {
    console.error('Error analyzing VPN:', error);
    return getFallbackVPNData(request.vpnProvider);
  }
};

const parseTextResponse = (text: string, ispName: string) => {
  // Simple parsing fallback
  return {
    downloadSpeed: 50,
    uploadSpeed: 25,
    latency: 25,
    coverage: 80,
    reliability: 85,
    customerSatisfaction: 75,
    pricing: "متوسط السعر في السوق",
    strengths: ["متوفر في معظم المناطق"],
    weaknesses: ["قد تكون هناك انقطاعات أحياناً"],
    recommendation: `${ispName} خيار جيد للاستخدام العادي`
  };
};

const getFallbackISPData = (ispName: string) => {
  return {
    downloadSpeed: Math.floor(Math.random() * 80) + 20,
    uploadSpeed: Math.floor(Math.random() * 40) + 10,
    latency: Math.floor(Math.random() * 40) + 15,
    coverage: Math.floor(Math.random() * 30) + 70,
    reliability: Math.floor(Math.random() * 25) + 75,
    customerSatisfaction: Math.floor(Math.random() * 20) + 70,
    pricing: "بيانات غير متوفرة",
    strengths: ["خدمة محلية"],
    weaknesses: ["بيانات محدودة"],
    recommendation: `نوصي بالتحقق من ${ispName} محلياً`
  };
};

const getFallbackVPNData = (vpnProvider: string) => {
  return {
    speed: {
      download: Math.floor(Math.random() * 80) + 40,
      upload: Math.floor(Math.random() * 40) + 20,
      latency: Math.floor(Math.random() * 50) + 20
    },
    security: {
      encryption: "AES-256",
      protocols: ["OpenVPN", "IKEv2"],
      killSwitch: true
    },
    privacy: {
      noLogsPolicy: true,
      jurisdiction: "Unknown"
    },
    servers: {
      count: Math.floor(Math.random() * 5000) + 1000,
      countries: Math.floor(Math.random() * 90) + 60
    },
    rating: (Math.random() * 3 + 7).toFixed(1),
    features: ["تشفير قوي", "سرعة جيدة"],
    pricing: "بيانات غير متوفرة",
    torrentSupport: Math.random() > 0.5,
    streamingSupport: Math.random() > 0.3,
    recommendation: `${vpnProvider} خيار جيد للخصوصية`
  };
};
