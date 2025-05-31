
import { callOpenAI } from './openaiClient';
import { ISPAnalysisRequest, ISPAnalysisResult } from './types';

export const analyzeISP = async (request: ISPAnalysisRequest): Promise<ISPAnalysisResult> => {
  console.log('Starting ISP analysis for:', request.ispName);
  
  try {
    const prompt = `
    قم بتحليل مزود خدمة الإنترنت "${request.ispName}" في "${request.location || 'العراق'}" وأعطني معلومات دقيقة عن:
    1. السرعة المتوقعة (التحميل والرفع)
    2. زمن الاستجابة المتوقع
    3. التغطية الجغرافية
    4. مستوى الاستقرار
    5. رضا العملاء
    6. الأسعار التقريبية
    7. نقاط القوة والضعف
    
    أريد الإجابة بصيغة JSON صحيحة فقط:
    {
      "downloadSpeed": 50,
      "uploadSpeed": 25,
      "latency": 25,
      "coverage": 80,
      "reliability": 85,
      "customerSatisfaction": 75,
      "pricing": "وصف الأسعار",
      "strengths": ["نقطة قوة 1", "نقطة قوة 2"],
      "weaknesses": ["نقطة ضعف 1", "نقطة ضعف 2"],
      "recommendation": "توصية عامة"
    }
    `;

    const messages = [
      {
        role: 'system',
        content: 'أنت خبير في تحليل شبكات الإنترنت. اجب بصيغة JSON صحيحة فقط.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    const content = await callOpenAI(messages);
    console.log('AI Response:', content);

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          downloadSpeed: Number(parsed.downloadSpeed) || 50,
          uploadSpeed: Number(parsed.uploadSpeed) || 25,
          latency: Number(parsed.latency) || 25,
          coverage: Number(parsed.coverage) || 80,
          reliability: Number(parsed.reliability) || 85,
          customerSatisfaction: Number(parsed.customerSatisfaction) || 75,
          pricing: parsed.pricing || 'غير محدد',
          strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ['خدمة جيدة'],
          weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : ['تحسينات مطلوبة'],
          recommendation: parsed.recommendation || 'خدمة مقبولة'
        };
      }
    } catch (parseError) {
      console.error('JSON Parse error:', parseError);
    }

    return getFallbackISPData(request.ispName);
  } catch (error) {
    console.error('Error analyzing ISP:', error);
    return getFallbackISPData(request.ispName);
  }
};

const getFallbackISPData = (ispName: string): ISPAnalysisResult => {
  const speedBase = Math.floor(Math.random() * 60) + 20;
  return {
    downloadSpeed: speedBase,
    uploadSpeed: Math.floor(speedBase * 0.4),
    latency: Math.floor(Math.random() * 40) + 15,
    coverage: Math.floor(Math.random() * 30) + 70,
    reliability: Math.floor(Math.random() * 25) + 75,
    customerSatisfaction: Math.floor(Math.random() * 20) + 70,
    pricing: 'بيانات غير متوفرة - يرجى التحقق محلياً',
    strengths: ['خدمة محلية', 'دعم فني متوفر'],
    weaknesses: ['بيانات محدودة', 'يحتاج تقييم شخصي'],
    recommendation: `${ispName} - نوصي بالتحقق من الخدمة محلياً قبل الاشتراك`
  };
};
