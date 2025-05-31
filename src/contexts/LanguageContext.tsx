
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations = {
  ar: {
    // Dashboard
    'dashboard.title': 'لوحة التحكم الرئيسية',
    'dashboard.subtitle': 'مراقبة شاملة لأداء الشبكة والنظام في الوقت الفعلي',
    'dashboard.systemStatus': 'النظام يعمل بشكل طبيعي',
    
    // Network Tools
    'tools.title': 'أدوات الشبكة',
    'tools.subtitle': 'مجموعة شاملة من أدوات تشخيص ومراقبة الشبكة',
    'tools.speedTest': 'اختبار سرعة الإنترنت',
    'tools.ping': 'فحص الاتصال (Ping)',
    'tools.dns': 'تحليل DNS',
    'tools.portScan': 'فحص المنافذ',
    'tools.bandwidth': 'مراقبة النطاق الترددي',
    'tools.traceroute': 'تتبع المسار',
    
    // ISP Tools
    'isp.title': 'أدوات فحص مزودي الخدمة',
    'isp.subtitle': 'اختبار وتحليل شركات الاتصالات والإنترنت',
    'isp.providerName': 'اسم مزود الخدمة',
    'isp.location': 'الموقع',
    'isp.analyze': 'تحليل بالذكاء الاصطناعي',
    'isp.analyzing': 'جاري التحليل...',
    
    // VPN Tools
    'vpn.title': 'أدوات فحص VPN',
    'vpn.subtitle': 'اختبار وتحليل شبكات VPN الخاصة الافتراضية',
    'vpn.provider': 'مزود VPN',
    'vpn.server': 'موقع الخادم',
    'vpn.protocol': 'البروتوكول',
    
    // Help & Documentation
    'help.title': 'المساعدة والتوثيق',
    'help.subtitle': 'مركز المساعدة والتوثيق الشامل',
    'help.search': 'البحث في التوثيق...',
    'help.gettingStarted': 'البدء السريع',
    'help.networkTools': 'أدوات الشبكة',
    'help.monitoring': 'المراقبة والتحليل',
    'help.advanced': 'الميزات المتقدمة',
    
    // Common
    'common.run': 'تشغيل',
    'common.running': 'جاري التشغيل...',
    'common.live': 'مباشر',
    'common.lastUpdate': 'آخر تحديث',
    'common.average': 'المتوسط',
    'common.test': 'اختبار',
    'common.settings': 'الإعدادات',
    'common.help': 'المساعدة',
    'common.close': 'إغلاق',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.loading': 'جاري التحميل...',
    
    // Menu Items
    'menu.dashboard': 'لوحة التحكم',
    'menu.tools': 'أدوات الشبكة',
    'menu.security': 'الأمان',
    'menu.monitoring': 'المراقبة',
    'menu.analysis': 'التحليل',
    'menu.fiber': 'الألياف البصرية',
    'menu.ispTools': 'أدوات مزودي الخدمة',
    'menu.vpnTools': 'أدوات VPN',
    'menu.sandbox': 'البيئة التجريبية',
    'menu.scanner': 'فاحص الشبكة',
    'menu.assistant': 'المساعد الذكي',
    'menu.simulation': 'المحاكاة',
    'menu.terminal': 'سطر الأوامر',
    'menu.admin': 'الإدارة',
    'menu.users': 'إدارة المستخدمين',
    'menu.settings': 'الإعدادات',
    'menu.help': 'المساعدة',
    
    // Errors
    'error.network': 'خطأ في الشبكة',
    'error.api': 'خطأ في الخدمة',
    'error.notFound': 'غير موجود',
    'error.unauthorized': 'غير مصرح',
    'error.general': 'حدث خطأ غير متوقع',
  },
  en: {
    // Dashboard
    'dashboard.title': 'Main Dashboard',
    'dashboard.subtitle': 'Comprehensive monitoring of network and system performance in real-time',
    'dashboard.systemStatus': 'System is running normally',
    
    // Network Tools
    'tools.title': 'Network Tools',
    'tools.subtitle': 'Comprehensive suite of network diagnostic and monitoring tools',
    'tools.speedTest': 'Internet Speed Test',
    'tools.ping': 'Ping Test',
    'tools.dns': 'DNS Analysis',
    'tools.portScan': 'Port Scanner',
    'tools.bandwidth': 'Bandwidth Monitor',
    'tools.traceroute': 'Traceroute',
    
    // ISP Tools
    'isp.title': 'ISP Testing Tools',
    'isp.subtitle': 'Test and analyze internet service providers',
    'isp.providerName': 'Provider Name',
    'isp.location': 'Location',
    'isp.analyze': 'AI Analysis',
    'isp.analyzing': 'Analyzing...',
    
    // VPN Tools
    'vpn.title': 'VPN Testing Tools',
    'vpn.subtitle': 'Test and analyze virtual private networks',
    'vpn.provider': 'VPN Provider',
    'vpn.server': 'Server Location',
    'vpn.protocol': 'Protocol',
    
    // Help & Documentation
    'help.title': 'Help & Documentation',
    'help.subtitle': 'Comprehensive help and documentation center',
    'help.search': 'Search documentation...',
    'help.gettingStarted': 'Getting Started',
    'help.networkTools': 'Network Tools',
    'help.monitoring': 'Monitoring & Analysis',
    'help.advanced': 'Advanced Features',
    
    // Common
    'common.run': 'Run',
    'common.running': 'Running...',
    'common.live': 'Live',
    'common.lastUpdate': 'Last Update',
    'common.average': 'Average',
    'common.test': 'Test',
    'common.settings': 'Settings',
    'common.help': 'Help',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.loading': 'Loading...',
    
    // Menu Items
    'menu.dashboard': 'Dashboard',
    'menu.tools': 'Network Tools',
    'menu.security': 'Security',
    'menu.monitoring': 'Monitoring',
    'menu.analysis': 'Analysis',
    'menu.fiber': 'Fiber Optics',
    'menu.ispTools': 'ISP Tools',
    'menu.vpnTools': 'VPN Tools',
    'menu.sandbox': 'Sandbox',
    'menu.scanner': 'Network Scanner',
    'menu.assistant': 'AI Assistant',
    'menu.simulation': 'Simulation',
    'menu.terminal': 'Terminal',
    'menu.admin': 'Administration',
    'menu.users': 'User Management',
    'menu.settings': 'Settings',
    'menu.help': 'Help',
    
    // Errors
    'error.network': 'Network Error',
    'error.api': 'API Error',
    'error.notFound': 'Not Found',
    'error.unauthorized': 'Unauthorized',
    'error.general': 'An unexpected error occurred',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
    
    // Set initial direction
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  };

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    return translation || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
