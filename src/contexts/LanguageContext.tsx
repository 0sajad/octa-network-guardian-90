
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
    
    // Menu Items
    'menu.dashboard': 'لوحة التحكم',
    'menu.tools': 'أدوات الشبكة',
    'menu.security': 'الأمان',
    'menu.monitoring': 'المراقبة',
    'menu.analysis': 'التحليل',
    'menu.fiber': 'الألياف البصرية',
    'menu.scanner': 'فاحص الشبكة',
    'menu.assistant': 'المساعد الذكي',
    'menu.simulation': 'المحاكاة',
    'menu.terminal': 'سطر الأوامر',
    'menu.users': 'إدارة المستخدمين',
    'menu.settings': 'الإعدادات',
    'menu.help': 'المساعدة',
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
    
    // Menu Items
    'menu.dashboard': 'Dashboard',
    'menu.tools': 'Network Tools',
    'menu.security': 'Security',
    'menu.monitoring': 'Monitoring',
    'menu.analysis': 'Analysis',
    'menu.fiber': 'Fiber Optics',
    'menu.scanner': 'Network Scanner',
    'menu.assistant': 'AI Assistant',
    'menu.simulation': 'Simulation',
    'menu.terminal': 'Terminal',
    'menu.users': 'User Management',
    'menu.settings': 'Settings',
    'menu.help': 'Help',
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
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
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
