
import React from 'react';
import { Book, Globe, Shield, Zap, Network, Terminal, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const ComprehensiveGuide = () => {
  const { t, language } = useLanguage();

  const platformFeatures = [
    {
      category: 'network',
      title: language === 'ar' ? 'أدوات الشبكة الأساسية' : 'Basic Network Tools',
      tools: [
        {
          name: language === 'ar' ? 'اختبار سرعة الإنترنت' : 'Internet Speed Test',
          description: language === 'ar' 
            ? 'قياس سرعة التحميل والرفع وزمن الاستجابة للاتصال بالإنترنت'
            : 'Measure download, upload speeds and latency of your internet connection',
          benefits: language === 'ar'
            ? ['معرفة السرعة الفعلية', 'تشخيص مشاكل البطء', 'مقارنة الأداء']
            : ['Know actual speed', 'Diagnose slow connections', 'Compare performance'],
          usage: language === 'ar'
            ? ['انتقل لقسم أدوات الشبكة', 'اضغط على اختبار السرعة', 'انتظر النتائج', 'احفظ التقرير']
            : ['Go to Network Tools', 'Click Speed Test', 'Wait for results', 'Save report']
        },
        {
          name: language === 'ar' ? 'فحص الاتصال (Ping)' : 'Ping Test',
          description: language === 'ar' 
            ? 'فحص زمن الاستجابة والاتصال مع الخوادم المختلفة'
            : 'Test response time and connectivity to different servers',
          benefits: language === 'ar'
            ? ['قياس زمن الاستجابة', 'فحص استقرار الاتصال', 'تشخيص انقطاع الشبكة']
            : ['Measure response time', 'Check connection stability', 'Diagnose network outages'],
          usage: language === 'ar'
            ? ['اختر الخادم المطلوب', 'اضغط على فحص الاتصال', 'راقب النتائج المباشرة', 'حلل الإحصائيات']
            : ['Select target server', 'Click Ping Test', 'Monitor live results', 'Analyze statistics']
        },
        {
          name: language === 'ar' ? 'تحليل DNS' : 'DNS Analysis',
          description: language === 'ar' 
            ? 'فحص وتحليل خوادم DNS وأوقات الاستجابة'
            : 'Test and analyze DNS servers and response times',
          benefits: language === 'ar'
            ? ['تحسين سرعة التصفح', 'اختيار أفضل DNS', 'حل مشاكل الوصول']
            : ['Improve browsing speed', 'Choose best DNS', 'Resolve access issues'],
          usage: language === 'ar'
            ? ['أدخل عنوان الموقع', 'اختر خادم DNS', 'ابدأ التحليل', 'قارن النتائج']
            : ['Enter website address', 'Select DNS server', 'Start analysis', 'Compare results']
        }
      ]
    },
    {
      category: 'security',
      title: language === 'ar' ? 'أدوات الأمان والحماية' : 'Security & Protection Tools',
      tools: [
        {
          name: language === 'ar' ? 'فاحص المنافذ' : 'Port Scanner',
          description: language === 'ar' 
            ? 'فحص المنافذ المفتوحة والمغلقة لتحديد نقاط الضعف'
            : 'Scan open and closed ports to identify vulnerabilities',
          benefits: language === 'ar'
            ? ['تحديد نقاط الضعف', 'تحسين الأمان', 'مراقبة التهديدات']
            : ['Identify vulnerabilities', 'Improve security', 'Monitor threats'],
          usage: language === 'ar'
            ? ['أدخل عنوان IP', 'حدد نطاق المنافذ', 'ابدأ الفحص', 'راجع التقرير']
            : ['Enter IP address', 'Select port range', 'Start scan', 'Review report']
        },
        {
          name: language === 'ar' ? 'أدوات فحص VPN' : 'VPN Testing Tools',
          description: language === 'ar' 
            ? 'فحص وتحليل خدمات VPN من ناحية الأمان والسرعة'
            : 'Test and analyze VPN services for security and speed',
          benefits: language === 'ar'
            ? ['تقييم مستوى الأمان', 'فحص تسريب البيانات', 'مقارنة الخدمات']
            : ['Evaluate security level', 'Check data leaks', 'Compare services'],
          usage: language === 'ar'
            ? ['أدخل اسم مزود VPN', 'اختر موقع الخادم', 'حدد البروتوكول', 'ابدأ التحليل']
            : ['Enter VPN provider', 'Select server location', 'Choose protocol', 'Start analysis']
        }
      ]
    },
    {
      category: 'analysis',
      title: language === 'ar' ? 'أدوات التحليل المتقدمة' : 'Advanced Analysis Tools',
      tools: [
        {
          name: language === 'ar' ? 'تحليل مزودي الخدمة' : 'ISP Analysis',
          description: language === 'ar' 
            ? 'تحليل شامل لمزودي خدمة الإنترنت باستخدام الذكاء الاصطناعي'
            : 'Comprehensive ISP analysis using artificial intelligence',
          benefits: language === 'ar'
            ? ['تقييم دقيق للخدمة', 'مقارنة الأسعار', 'معرفة نقاط القوة والضعف']
            : ['Accurate service evaluation', 'Price comparison', 'Know strengths and weaknesses'],
          usage: language === 'ar'
            ? ['أدخل اسم مزود الخدمة', 'حدد الموقع', 'ابدأ التحليل بالذكاء الاصطناعي', 'راجع التقرير']
            : ['Enter ISP name', 'Select location', 'Start AI analysis', 'Review report']
        },
        {
          name: language === 'ar' ? 'مراقب النطاق الترددي' : 'Bandwidth Monitor',
          description: language === 'ar' 
            ? 'مراقبة استخدام النطاق الترددي في الوقت الفعلي'
            : 'Monitor bandwidth usage in real-time',
          benefits: language === 'ar'
            ? ['تتبع استهلاك البيانات', 'تحديد التطبيقات المستهلكة', 'تحسين الأداء']
            : ['Track data consumption', 'Identify consuming apps', 'Optimize performance'],
          usage: language === 'ar'
            ? ['ابدأ المراقبة', 'اختر واجهة الشبكة', 'راقب الإحصائيات', 'احفظ البيانات']
            : ['Start monitoring', 'Select network interface', 'Monitor statistics', 'Save data']
        }
      ]
    }
  ];

  const deploymentGuide = {
    title: language === 'ar' ? 'دليل النشر والاستضافة' : 'Deployment & Hosting Guide',
    platforms: [
      {
        name: 'GitHub Pages',
        description: language === 'ar' 
          ? 'استضافة مجانية مباشرة من مستودع GitHub'
          : 'Free hosting directly from GitHub repository',
        steps: language === 'ar'
          ? ['ارفع الكود إلى GitHub', 'فعل GitHub Pages', 'اختر المجلد الصحيح', 'احصل على الرابط']
          : ['Upload code to GitHub', 'Enable GitHub Pages', 'Select correct folder', 'Get the link']
      },
      {
        name: 'Netlify',
        description: language === 'ar' 
          ? 'منصة استضافة حديثة مع CI/CD تلقائي'
          : 'Modern hosting platform with automatic CI/CD',
        steps: language === 'ar'
          ? ['اربط مستودع GitHub', 'اختر إعدادات البناء', 'انشر تلقائياً', 'اربط دومين مخصص']
          : ['Connect GitHub repo', 'Choose build settings', 'Deploy automatically', 'Connect custom domain']
      },
      {
        name: 'Vercel',
        description: language === 'ar' 
          ? 'منصة مُحسنة لتطبيقات React والجيل القادم'
          : 'Platform optimized for React and Next.js applications',
        steps: language === 'ar'
          ? ['استورد من GitHub', 'اختر إطار العمل', 'انشر فوراً', 'راقب الأداء']
          : ['Import from GitHub', 'Select framework', 'Deploy instantly', 'Monitor performance']
      },
      {
        name: 'Docker',
        description: language === 'ar' 
          ? 'نشر باستخدام الحاويات للمرونة الكاملة'
          : 'Deploy using containers for complete flexibility',
        steps: language === 'ar'
          ? ['أنشئ ملف Dockerfile', 'بناء الصورة', 'تشغيل الحاوية', 'ربط الشبكة']
          : ['Create Dockerfile', 'Build image', 'Run container', 'Configure networking']
      }
    ]
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          {language === 'ar' ? 'الدليل الشامل للمنصة' : 'Comprehensive Platform Guide'}
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          {language === 'ar' 
            ? 'دليل مفصل وشامل لجميع ميزات ووظائف منصة أدوات الشبكة المتقدمة'
            : 'Detailed and comprehensive guide to all features and functions of the Advanced Network Tools Platform'}
        </p>
      </div>

      {/* Platform Overview */}
      <Card className="glass-dark border-white/20 p-8">
        <div className="flex items-center space-x-reverse space-x-4 mb-6">
          <Globe className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">
            {language === 'ar' ? 'نظرة عامة على المنصة' : 'Platform Overview'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-6">
            <Network className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-white font-semibold mb-2">
              {language === 'ar' ? '15+ أداة شبكة' : '15+ Network Tools'}
            </h3>
            <p className="text-gray-300 text-sm">
              {language === 'ar' 
                ? 'مجموعة شاملة من أدوات تشخيص ومراقبة الشبكة'
                : 'Comprehensive suite of network diagnostic and monitoring tools'}
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-6">
            <Shield className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-white font-semibold mb-2">
              {language === 'ar' ? 'أمان متقدم' : 'Advanced Security'}
            </h3>
            <p className="text-gray-300 text-sm">
              {language === 'ar' 
                ? 'أدوات فحص الأمان وتحليل نقاط الضعف'
                : 'Security scanning tools and vulnerability analysis'}
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-6">
            <Zap className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-white font-semibold mb-2">
              {language === 'ar' ? 'ذكاء اصطناعي' : 'AI-Powered'}
            </h3>
            <p className="text-gray-300 text-sm">
              {language === 'ar' 
                ? 'تحليل ذكي باستخدام تقنيات الذكاء الاصطناعي'
                : 'Smart analysis using artificial intelligence technologies'}
            </p>
          </div>
        </div>
      </Card>

      {/* Tools Categories */}
      {platformFeatures.map((category, categoryIndex) => (
        <Card key={categoryIndex} className="glass-dark border-white/20 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">{category.title}</h2>
          <div className="space-y-6">
            {category.tools.map((tool, toolIndex) => (
              <div key={toolIndex} className="bg-white/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{tool.name}</h3>
                <p className="text-gray-300 mb-4">{tool.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-green-400 font-medium mb-2">
                      {language === 'ar' ? 'الفوائد:' : 'Benefits:'}
                    </h4>
                    <ul className="space-y-1">
                      {tool.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="text-gray-300 text-sm flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2">
                      {language === 'ar' ? 'خطوات الاستخدام:' : 'Usage Steps:'}
                    </h4>
                    <ol className="space-y-1">
                      {tool.usage.map((step, stepIndex) => (
                        <li key={stepIndex} className="text-gray-300 text-sm flex items-start">
                          <Badge variant="outline" className="mr-2 text-xs">
                            {stepIndex + 1}
                          </Badge>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Deployment Guide */}
      <Card className="glass-dark border-white/20 p-8">
        <div className="flex items-center space-x-reverse space-x-4 mb-6">
          <BarChart3 className="w-8 h-8 text-orange-400" />
          <h2 className="text-2xl font-bold text-white">{deploymentGuide.title}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deploymentGuide.platforms.map((platform, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">{platform.name}</h3>
              <p className="text-gray-300 mb-4">{platform.description}</p>
              
              <h4 className="text-blue-400 font-medium mb-2">
                {language === 'ar' ? 'خطوات النشر:' : 'Deployment Steps:'}
              </h4>
              <ol className="space-y-2">
                {platform.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="text-gray-300 text-sm flex items-start">
                    <Badge variant="outline" className="mr-2 text-xs">
                      {stepIndex + 1}
                    </Badge>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Card>

      {/* Technical Specifications */}
      <Card className="glass-dark border-white/20 p-8">
        <div className="flex items-center space-x-reverse space-x-4 mb-6">
          <Terminal className="w-8 h-8 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">
            {language === 'ar' ? 'المواصفات التقنية' : 'Technical Specifications'}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">
              {language === 'ar' ? 'التقنيات المستخدمة' : 'Technologies Used'}
            </h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• React 18.3.1</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Vite</li>
              <li>• React Query</li>
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">
              {language === 'ar' ? 'الميزات الرئيسية' : 'Key Features'}
            </h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• {language === 'ar' ? 'دعم 4 لغات' : 'Multi-language (4 languages)'}</li>
              <li>• {language === 'ar' ? 'تصميم متجاوب' : 'Responsive Design'}</li>
              <li>• {language === 'ar' ? 'واجهة داكنة' : 'Dark Theme'}</li>
              <li>• {language === 'ar' ? 'أدوات AI' : 'AI-Powered Tools'}</li>
              <li>• {language === 'ar' ? 'أمان متقدم' : 'Advanced Security'}</li>
            </ul>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">
              {language === 'ar' ? 'متطلبات النظام' : 'System Requirements'}
            </h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• {language === 'ar' ? 'متصفح حديث' : 'Modern Browser'}</li>
              <li>• JavaScript {language === 'ar' ? 'مفعل' : 'Enabled'}</li>
              <li>• {language === 'ar' ? 'اتصال إنترنت' : 'Internet Connection'}</li>
              <li>• {language === 'ar' ? 'ذاكرة 2GB+' : '2GB+ RAM'}</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComprehensiveGuide;
