
import React, { useState } from 'react';
import { Book, Search, FileText, Video, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const documentationSections = [
    {
      id: 'getting-started',
      title: 'البدء السريع',
      description: 'تعلم كيفية استخدام النظام',
      icon: Book,
      color: 'from-blue-500 to-cyan-500',
      articles: [
        { title: 'مقدمة إلى OCTA NETWORK', type: 'article', duration: '5 دقائق' },
        { title: 'إعداد النظام الأولي', type: 'guide', duration: '10 دقائق' },
        { title: 'جولة سريعة في الواجهة', type: 'video', duration: '8 دقائق' }
      ]
    },
    {
      id: 'network-tools',
      title: 'أدوات الشبكة',
      description: 'دليل شامل لجميع أدوات الشبكة',
      icon: FileText,
      color: 'from-green-500 to-emerald-500',
      articles: [
        { title: 'اختبار سرعة الإنترنت', type: 'guide', duration: '3 دقائق' },
        { title: 'فحص الاتصال (Ping)', type: 'guide', duration: '4 دقائق' },
        { title: 'تحليل DNS', type: 'guide', duration: '6 دقائق' },
        { title: 'فحص المنافذ', type: 'guide', duration: '8 دقائق' },
        { title: 'محلل الشبكة المتقدم', type: 'guide', duration: '12 دقائق' },
        { title: 'حاسبة الشبكات الفرعية', type: 'guide', duration: '10 دقائق' }
      ]
    },
    {
      id: 'monitoring',
      title: 'المراقبة والتحليل',
      description: 'مراقبة الأداء وتحليل البيانات',
      icon: Video,
      color: 'from-purple-500 to-pink-500',
      articles: [
        { title: 'لوحة التحكم الرئيسية', type: 'guide', duration: '7 دقائق' },
        { title: 'فهم المخططات والرسوم البيانية', type: 'article', duration: '5 دقائق' },
        { title: 'إعداد التنبيهات', type: 'guide', duration: '6 دقائق' }
      ]
    },
    {
      id: 'advanced',
      title: 'الميزات المتقدمة',
      description: 'ميزات متقدمة للمستخدمين المحترفين',
      icon: Download,
      color: 'from-orange-500 to-red-500',
      articles: [
        { title: 'API والتكامل', type: 'technical', duration: '15 دقائق' },
        { title: 'الأمان والصلاحيات', type: 'guide', duration: '12 دقائق' },
        { title: 'تخصيص الواجهة', type: 'guide', duration: '8 دقائق' }
      ]
    }
  ];

  const filteredSections = documentationSections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.articles.length > 0 || searchTerm === '');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'guide': return Book;
      case 'technical': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-400';
      case 'guide': return 'text-blue-400';
      case 'technical': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">التوثيق والدعم</h1>
          <p className="text-gray-400">مركز المساعدة والتوثيق الشامل</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-dark rounded-xl p-6 border border-white/20">
        <div className="flex items-center space-x-reverse space-x-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="البحث في التوثيق..."
              className="pl-4 pr-12 bg-white/10 border-white/20 text-white"
              dir="rtl"
            />
          </div>
          <Button className="bg-primary-600 hover:bg-primary-700">
            بحث
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sections" className="space-y-6">
        <TabsList className="glass-dark border border-white/20">
          <TabsTrigger value="sections" className="text-white">الأقسام</TabsTrigger>
          <TabsTrigger value="faq" className="text-white">الأسئلة الشائعة</TabsTrigger>
          <TabsTrigger value="contact" className="text-white">اتصل بنا</TabsTrigger>
        </TabsList>

        <TabsContent value="sections">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.id}
                  className="glass-dark rounded-xl p-6 border border-white/20 hover-lift"
                >
                  <div className="flex items-center space-x-reverse space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                      <p className="text-gray-400 text-sm">{section.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {section.articles.map((article, index) => {
                      const TypeIcon = getTypeIcon(article.type);
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center space-x-reverse space-x-3">
                            <TypeIcon className={`w-4 h-4 ${getTypeColor(article.type)}`} />
                            <span className="text-white text-sm">{article.title}</span>
                          </div>
                          <div className="flex items-center space-x-reverse space-x-2">
                            <span className="text-xs text-gray-400">{article.duration}</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <div className="glass-dark rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">الأسئلة الشائعة</h3>
            <div className="space-y-4">
              {[
                {
                  question: 'كيف يمكنني بدء استخدام النظام؟',
                  answer: 'يمكنك البدء باستخدام النظام من خلال تسجيل الدخول والانتقال إلى لوحة التحكم الرئيسية.'
                },
                {
                  question: 'ما هي الأدوات المتاحة في النظام؟',
                  answer: 'يتضمن النظام أدوات متنوعة لمراقبة الشبكة مثل اختبار السرعة، فحص الاتصال، تحليل DNS، وأدوات متقدمة أخرى.'
                },
                {
                  question: 'هل يمكنني تخصيص واجهة النظام؟',
                  answer: 'نعم، يمكنك تخصيص العديد من جوانب الواجهة من خلال إعدادات النظام.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">{faq.question}</h4>
                  <p className="text-gray-300 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <div className="glass-dark rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-white mb-4">اتصل بفريق الدعم</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium">الدعم التقني</h4>
                  <p className="text-gray-300 text-sm">support@octa-network.com</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium">المبيعات</h4>
                  <p className="text-gray-300 text-sm">sales@octa-network.com</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium">ساعات العمل</h4>
                  <p className="text-gray-300 text-sm">الأحد - الخميس: 9:00 - 17:00</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium">رقم الهاتف</h4>
                  <p className="text-gray-300 text-sm">+964 XXX XXX XXXX</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;
