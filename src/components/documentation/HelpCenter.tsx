
import React, { useState } from 'react';
import { Search, Book, Zap, Shield, Globe, Terminal, Settings, Users, BarChart3, Network, Wifi, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

const HelpCenter = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const toolsGuide = [
    {
      id: 'speed-test',
      icon: Zap,
      name: language === 'ar' ? 'اختبار سرعة الإنترنت' : 'Speed Test',
      category: 'network',
      description: language === 'ar' 
        ? 'قياس سرعة التحميل والرفع وزمن الاستجابة لاتصالك بالإنترنت'
        : 'Measure download, upload speeds and latency of your internet connection',
      benefits: language === 'ar'
        ? ['معرفة السرعة الفعلية لاتصالك', 'مقارنة الأداء مع الخطة المشترك بها', 'تشخيص مشاكل البطء']
        : ['Know your actual connection speed', 'Compare performance with subscribed plan', 'Diagnose slow connection issues'],
      steps: language === 'ar'
        ? [
          'انتقل إلى قسم أدوات الشبكة',
          'اضغط على "اختبار سرعة الإنترنت"',
          'انتظر حتى اكتمال الاختبار',
          'راجع النتائج واحفظها إذا لزم الأمر'
        ]
        : [
          'Go to Network Tools section',
          'Click on "Speed Test"',
          'Wait for test completion',
          'Review results and save if needed'
        ]
    },
    {
      id: 'ping-test',
      icon: Network,
      name: language === 'ar' ? 'فحص الاتصال (Ping)' : 'Ping Test',
      category: 'network',
      description: language === 'ar' 
        ? 'فحص زمن الاستجابة والاتصال مع خوادم مختلفة حول العالم'
        : 'Test response time and connectivity to different servers worldwide',
      benefits: language === 'ar'
        ? ['قياس زمن الاستجابة', 'فحص استقرار الاتصال', 'تشخيص مشاكل الشبكة']
        : ['Measure response time', 'Check connection stability', 'Diagnose network issues'],
      steps: language === 'ar'
        ? [
          'اختر الخادم المراد فحصه',
          'اضغط على "فحص الاتصال"',
          'راقب النتائج المباشرة',
          'حلل أوقات الاستجابة'
        ]
        : [
          'Select server to test',
          'Click "Ping Test"',
          'Monitor live results',
          'Analyze response times'
        ]
    },
    {
      id: 'dns-analysis',
      icon: Globe,
      name: language === 'ar' ? 'تحليل DNS' : 'DNS Analysis',
      category: 'network',
      description: language === 'ar' 
        ? 'فحص وتحليل خوادم DNS وأوقات الاستجابة'
        : 'Test and analyze DNS servers and response times',
      benefits: language === 'ar'
        ? ['تحسين سرعة التصفح', 'اختيار أفضل DNS', 'حل مشاكل الوصول للمواقع']
        : ['Improve browsing speed', 'Choose best DNS', 'Resolve website access issues'],
      steps: language === 'ar'
        ? [
          'أدخل عنوان الموقع المراد فحصه',
          'اختر خادم DNS',
          'اضغط على "تحليل"',
          'قارن النتائج مع خوادم مختلفة'
        ]
        : [
          'Enter website address to test',
          'Select DNS server',
          'Click "Analyze"',
          'Compare results with different servers'
        ]
    },
    {
      id: 'isp-tools',
      icon: Wifi,
      name: language === 'ar' ? 'أدوات فحص مزودي الخدمة' : 'ISP Testing Tools',
      category: 'analysis',
      description: language === 'ar' 
        ? 'تحليل شامل لمزودي خدمة الإنترنت باستخدام الذكاء الاصطناعي'
        : 'Comprehensive analysis of internet service providers using AI',
      benefits: language === 'ar'
        ? ['تقييم دقيق لمزود الخدمة', 'مقارنة الأسعار والخدمات', 'معرفة نقاط القوة والضعف']
        : ['Accurate ISP evaluation', 'Compare prices and services', 'Know strengths and weaknesses'],
      steps: language === 'ar'
        ? [
          'أدخل اسم مزود الخدمة',
          'حدد الموقع الجغرافي',
          'اضغط على "تحليل بالذكاء الاصطناعي"',
          'راجع التقرير الشامل'
        ]
        : [
          'Enter ISP name',
          'Select geographical location',
          'Click "AI Analysis"',
          'Review comprehensive report'
        ]
    },
    {
      id: 'vpn-tools',
      icon: Lock,
      name: language === 'ar' ? 'أدوات فحص VPN' : 'VPN Testing Tools',
      category: 'security',
      description: language === 'ar' 
        ? 'فحص وتحليل خدمات VPN من ناحية الأمان والسرعة والخصوصية'
        : 'Test and analyze VPN services for security, speed, and privacy',
      benefits: language === 'ar'
        ? ['تقييم مستوى الأمان', 'فحص تسريب البيانات', 'مقارنة الخدمات']
        : ['Evaluate security level', 'Check data leaks', 'Compare services'],
      steps: language === 'ar'
        ? [
          'أدخل اسم مزود VPN',
          'اختر موقع الخادم',
          'حدد البروتوكول',
          'اضغط على "تحليل" واراجع النتائج'
        ]
        : [
          'Enter VPN provider name',
          'Select server location',
          'Choose protocol',
          'Click "Analyze" and review results'
        ]
    },
    {
      id: 'port-scanner',
      icon: Shield,
      name: language === 'ar' ? 'فاحص المنافذ' : 'Port Scanner',
      category: 'security',
      description: language === 'ar' 
        ? 'فحص المنافذ المفتوحة والمغلقة لتحديد نقاط الضعف الأمنية'
        : 'Scan open and closed ports to identify security vulnerabilities',
      benefits: language === 'ar'
        ? ['تحديد نقاط الضعف', 'تحسين الأمان', 'مراقبة الشبكة']
        : ['Identify vulnerabilities', 'Improve security', 'Monitor network'],
      steps: language === 'ar'
        ? [
          'أدخل عنوان IP المراد فحصه',
          'حدد نطاق المنافذ',
          'اضغط على "فحص"',
          'راجع المنافذ المفتوحة'
        ]
        : [
          'Enter IP address to scan',
          'Select port range',
          'Click "Scan"',
          'Review open ports'
        ]
    },
    {
      id: 'bandwidth-monitor',
      icon: BarChart3,
      name: language === 'ar' ? 'مراقب النطاق الترددي' : 'Bandwidth Monitor',
      category: 'monitoring',
      description: language === 'ar' 
        ? 'مراقبة استخدام النطاق الترددي في الوقت الفعلي'
        : 'Monitor bandwidth usage in real-time',
      benefits: language === 'ar'
        ? ['تتبع استهلاك البيانات', 'تحديد التطبيقات المستهلكة', 'تحسين الأداء']
        : ['Track data consumption', 'Identify consuming apps', 'Optimize performance'],
      steps: language === 'ar'
        ? [
          'انتقل إلى مراقب النطاق الترددي',
          'اختر واجهة الشبكة',
          'ابدأ المراقبة',
          'راجع الإحصائيات المباشرة'
        ]
        : [
          'Go to Bandwidth Monitor',
          'Select network interface',
          'Start monitoring',
          'Review live statistics'
        ]
    },
    {
      id: 'terminal',
      icon: Terminal,
      name: language === 'ar' ? 'سطر الأوامر' : 'Terminal',
      category: 'advanced',
      description: language === 'ar' 
        ? 'واجهة سطر أوامر متقدمة لتنفيذ أوامر الشبكة'
        : 'Advanced command-line interface for network commands',
      benefits: language === 'ar'
        ? ['تحكم كامل في الشبكة', 'تنفيذ أوامر متقدمة', 'أتمتة المهام']
        : ['Full network control', 'Execute advanced commands', 'Automate tasks'],
      steps: language === 'ar'
        ? [
          'افتح واجهة سطر الأوامر',
          'اكتب الأمر المطلوب',
          'اضغط Enter للتنفيذ',
          'راجع النتائج'
        ]
        : [
          'Open terminal interface',
          'Type required command',
          'Press Enter to execute',
          'Review results'
        ]
    }
  ];

  const filteredTools = toolsGuide.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedTools = {
    network: filteredTools.filter(tool => tool.category === 'network'),
    security: filteredTools.filter(tool => tool.category === 'security'),
    monitoring: filteredTools.filter(tool => tool.category === 'monitoring'),
    analysis: filteredTools.filter(tool => tool.category === 'analysis'),
    advanced: filteredTools.filter(tool => tool.category === 'advanced')
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'network': return Network;
      case 'security': return Shield;
      case 'monitoring': return BarChart3;
      case 'analysis': return Globe;
      case 'advanced': return Terminal;
      default: return Book;
    }
  };

  const getCategoryTitle = (category: string) => {
    if (language === 'ar') {
      switch (category) {
        case 'network': return 'أدوات الشبكة';
        case 'security': return 'أدوات الأمان';
        case 'monitoring': return 'أدوات المراقبة';
        case 'analysis': return 'أدوات التحليل';
        case 'advanced': return 'أدوات متقدمة';
        default: return 'عام';
      }
    } else {
      switch (category) {
        case 'network': return 'Network Tools';
        case 'security': return 'Security Tools';
        case 'monitoring': return 'Monitoring Tools';
        case 'analysis': return 'Analysis Tools';
        case 'advanced': return 'Advanced Tools';
        default: return 'General';
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{t('help.title')}</h1>
          <p className="text-gray-400">{t('help.subtitle')}</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="glass-dark border-white/20 p-6">
        <div className="flex items-center space-x-reverse space-x-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('help.search')}
              className="pl-4 pr-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            />
          </div>
          <Button className="bg-primary-600 hover:bg-primary-700">
            {language === 'ar' ? 'بحث' : 'Search'}
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="glass-dark border border-white/20">
          <TabsTrigger value="all" className="text-white">
            {language === 'ar' ? 'جميع الأدوات' : 'All Tools'}
          </TabsTrigger>
          <TabsTrigger value="network" className="text-white">
            {language === 'ar' ? 'الشبكة' : 'Network'}
          </TabsTrigger>
          <TabsTrigger value="security" className="text-white">
            {language === 'ar' ? 'الأمان' : 'Security'}
          </TabsTrigger>
          <TabsTrigger value="analysis" className="text-white">
            {language === 'ar' ? 'التحليل' : 'Analysis'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-8">
            {Object.entries(groupedTools).map(([category, tools]) => {
              if (tools.length === 0) return null;
              const CategoryIcon = getCategoryIcon(category);
              
              return (
                <div key={category} className="space-y-4">
                  <div className="flex items-center space-x-reverse space-x-3">
                    <CategoryIcon className="w-6 h-6 text-primary-400" />
                    <h2 className="text-xl font-semibold text-white">{getCategoryTitle(category)}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tools.map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <Card key={tool.id} className="glass-dark border-white/20 p-6 hover-lift">
                          <div className="flex items-start space-x-reverse space-x-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
                              <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
                              
                              <div className="space-y-3">
                                <div>
                                  <h4 className="text-white font-medium mb-2">
                                    {language === 'ar' ? 'الفوائد:' : 'Benefits:'}
                                  </h4>
                                  <ul className="space-y-1">
                                    {tool.benefits.map((benefit, index) => (
                                      <li key={index} className="text-gray-300 text-sm flex items-start">
                                        <span className="text-green-400 mr-2">•</span>
                                        {benefit}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div>
                                  <h4 className="text-white font-medium mb-2">
                                    {language === 'ar' ? 'خطوات الاستخدام:' : 'How to use:'}
                                  </h4>
                                  <ol className="space-y-1">
                                    {tool.steps.map((step, index) => (
                                      <li key={index} className="text-gray-300 text-sm flex items-start">
                                        <span className="text-blue-400 mr-2 font-mono text-xs">{index + 1}.</span>
                                        {step}
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {Object.entries(groupedTools).map(([category, tools]) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Card key={tool.id} className="glass-dark border-white/20 p-6 hover-lift">
                    <div className="flex items-start space-x-reverse space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
                        <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-white font-medium mb-2">
                              {language === 'ar' ? 'الفوائد:' : 'Benefits:'}
                            </h4>
                            <ul className="space-y-1">
                              {tool.benefits.map((benefit, index) => (
                                <li key={index} className="text-gray-300 text-sm flex items-start">
                                  <span className="text-green-400 mr-2">•</span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-white font-medium mb-2">
                              {language === 'ar' ? 'خطوات الاستخدام:' : 'How to use:'}
                            </h4>
                            <ol className="space-y-1">
                              {tool.steps.map((step, index) => (
                                <li key={index} className="text-gray-300 text-sm flex items-start">
                                  <span className="text-blue-400 mr-2 font-mono text-xs">{index + 1}.</span>
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default HelpCenter;
