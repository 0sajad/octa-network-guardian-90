
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en' | 'ku' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  supportedLanguages: Array<{ code: Language; name: string; nativeName: string }>;
}

const translations = {
  ar: {
    // Dashboard
    'dashboard.title': 'لوحة التحكم الرئيسية',
    'dashboard.subtitle': 'مراقبة شاملة لأداء الشبكة والنظام في الوقت الفعلي',
    'dashboard.systemStatus': 'النظام يعمل بشكل طبيعي',
    'dashboard.welcome': 'مرحباً بك في منصة أدوات الشبكة المتقدمة',
    
    // Network Tools
    'tools.title': 'أدوات الشبكة',
    'tools.subtitle': 'مجموعة شاملة من أدوات تشخيص ومراقبة الشبكة',
    'tools.speedTest': 'اختبار سرعة الإنترنت',
    'tools.ping': 'فحص الاتصال (Ping)',
    'tools.dns': 'تحليل DNS',
    'tools.portScan': 'فحص المنافذ',
    'tools.bandwidth': 'مراقبة النطاق الترددي',
    'tools.traceroute': 'تتبع المسار',
    'tools.basicTools': 'الأدوات الأساسية',
    'tools.advancedTools': 'الأدوات المتقدمة',
    
    // ISP Tools
    'isp.title': 'أدوات فحص مزودي الخدمة',
    'isp.subtitle': 'اختبار وتحليل شركات الاتصالات والإنترنت',
    'isp.providerName': 'اسم مزود الخدمة',
    'isp.location': 'الموقع',
    'isp.analyze': 'تحليل بالذكاء الاصطناعي',
    'isp.analyzing': 'جاري التحليل...',
    'isp.popularProviders': 'شركات الاتصالات الشائعة في العراق',
    
    // VPN Tools
    'vpn.title': 'أدوات فحص VPN',
    'vpn.subtitle': 'اختبار وتحليل شبكات VPN الخاصة الافتراضية',
    'vpn.provider': 'مزود VPN',
    'vpn.server': 'موقع الخادم',
    'vpn.protocol': 'البروتوكول',
    'vpn.recommendations': 'خدمات VPN الموصى بها',
    
    // Help & Documentation
    'help.title': 'المساعدة والتوثيق',
    'help.subtitle': 'مركز المساعدة والتوثيق الشامل',
    'help.search': 'البحث في التوثيق...',
    'help.allTools': 'جميع الأدوات',
    'help.network': 'الشبكة',
    'help.security': 'الأمان',
    'help.analysis': 'التحليل',
    'help.benefits': 'الفوائد:',
    'help.howToUse': 'خطوات الاستخدام:',
    
    // Navigation
    'nav.language': 'اللغة',
    'nav.settings': 'الإعدادات',
    'nav.profile': 'الملف الشخصي',
    'nav.logout': 'تسجيل الخروج',
    
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
    'common.search': 'بحث',
    'common.backToMain': 'العودة للقائمة الرئيسية',
    
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
    'error.required': 'هذا الحقل مطلوب',
    'error.invalidInput': 'المدخل غير صحيح',
  },
  en: {
    // Dashboard
    'dashboard.title': 'Main Dashboard',
    'dashboard.subtitle': 'Comprehensive monitoring of network and system performance in real-time',
    'dashboard.systemStatus': 'System is running normally',
    'dashboard.welcome': 'Welcome to Advanced Network Tools Platform',
    
    // Network Tools
    'tools.title': 'Network Tools',
    'tools.subtitle': 'Comprehensive suite of network diagnostic and monitoring tools',
    'tools.speedTest': 'Internet Speed Test',
    'tools.ping': 'Ping Test',
    'tools.dns': 'DNS Analysis',
    'tools.portScan': 'Port Scanner',
    'tools.bandwidth': 'Bandwidth Monitor',
    'tools.traceroute': 'Traceroute',
    'tools.basicTools': 'Basic Tools',
    'tools.advancedTools': 'Advanced Tools',
    
    // ISP Tools
    'isp.title': 'ISP Testing Tools',
    'isp.subtitle': 'Test and analyze internet service providers',
    'isp.providerName': 'Provider Name',
    'isp.location': 'Location',
    'isp.analyze': 'AI Analysis',
    'isp.analyzing': 'Analyzing...',
    'isp.popularProviders': 'Popular ISPs in Iraq',
    
    // VPN Tools
    'vpn.title': 'VPN Testing Tools',
    'vpn.subtitle': 'Test and analyze virtual private networks',
    'vpn.provider': 'VPN Provider',
    'vpn.server': 'Server Location',
    'vpn.protocol': 'Protocol',
    'vpn.recommendations': 'Recommended VPN Services',
    
    // Help & Documentation
    'help.title': 'Help & Documentation',
    'help.subtitle': 'Comprehensive help and documentation center',
    'help.search': 'Search documentation...',
    'help.allTools': 'All Tools',
    'help.network': 'Network',
    'help.security': 'Security',
    'help.analysis': 'Analysis',
    'help.benefits': 'Benefits:',
    'help.howToUse': 'How to use:',
    
    // Navigation
    'nav.language': 'Language',
    'nav.settings': 'Settings',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    
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
    'common.search': 'Search',
    'common.backToMain': 'Back to Main Menu',
    
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
    'error.required': 'This field is required',
    'error.invalidInput': 'Invalid input',
  },
  ku: {
    // Dashboard
    'dashboard.title': 'دەسگەی بەڕێوەبردنی سەرەکی',
    'dashboard.subtitle': 'چاودێریکردنی گشتگیر بۆ کارکردنی تۆڕ و سیستەم لە کاتی ڕاستەوخۆدا',
    'dashboard.systemStatus': 'سیستەم بە شێوەیەکی ئاسایی کاردەکات',
    'dashboard.welcome': 'بەخێربێیت بۆ پلاتفۆرمی ئامرازە پێشکەوتووەکانی تۆڕ',
    
    // Network Tools
    'tools.title': 'ئامرازەکانی تۆڕ',
    'tools.subtitle': 'کۆمەڵێکی گشتگیر لە ئامرازەکانی دەستنیشانکردن و چاودێریکردنی تۆڕ',
    'tools.speedTest': 'تاقیکردنەوەی خێرایی ئینتەرنێت',
    'tools.ping': 'تاقیکردنەوەی پەیوەندی (Ping)',
    'tools.dns': 'شیکردنەوەی DNS',
    'tools.portScan': 'پشکنینی دەرگاکان',
    'tools.bandwidth': 'چاودێرکەری پانتایی باند',
    'tools.traceroute': 'شوێنکەوتنی ڕێگا',
    'tools.basicTools': 'ئامرازە بنەڕەتییەکان',
    'tools.advancedTools': 'ئامرازە پێشکەوتووەکان',
    
    // ISP Tools
    'isp.title': 'ئامرازەکانی تاقیکردنەوەی پێشکەشکارانی خزمەتگوزاری',
    'isp.subtitle': 'تاقیکردنەوە و شیکردنەوەی کۆمپانیاکانی پەیوەندی و ئینتەرنێت',
    'isp.providerName': 'ناوی پێشکەشکار',
    'isp.location': 'شوێن',
    'isp.analyze': 'شیکردنەوە بە زیرەکی دەستکرد',
    'isp.analyzing': 'لە شیکردنەوەدایە...',
    'isp.popularProviders': 'پێشکەشکارە بەناوبانگەکان لە عێراق',
    
    // VPN Tools
    'vpn.title': 'ئامرازەکانی تاقیکردنەوەی VPN',
    'vpn.subtitle': 'تاقیکردنەوە و شیکردنەوەی تۆڕە تایبەتە خەیاڵییەکان',
    'vpn.provider': 'پێشکەشکاری VPN',
    'vpn.server': 'شوێنی سێرڤەر',
    'vpn.protocol': 'پڕۆتۆکۆڵ',
    'vpn.recommendations': 'خزمەتگوزارییە پێشنیارکراوەکانی VPN',
    
    // Help & Documentation
    'help.title': 'یارمەتی و بەڵگەنامە',
    'help.subtitle': 'ناوەندی یارمەتی و بەڵگەنامەی گشتگیر',
    'help.search': 'گەڕان لە بەڵگەنامەکان...',
    'help.allTools': 'هەموو ئامرازەکان',
    'help.network': 'تۆڕ',
    'help.security': 'ئاسایش',
    'help.analysis': 'شیکردنەوە',
    'help.benefits': 'سوودەکان:',
    'help.howToUse': 'چۆنیەتی بەکارهێنان:',
    
    // Navigation
    'nav.language': 'زمان',
    'nav.settings': 'ڕێکخستنەکان',
    'nav.profile': 'پرۆفایل',
    'nav.logout': 'دەرچوون',
    
    // Common
    'common.run': 'جێبەجێکردن',
    'common.running': 'لە جێبەجێکردندایە...',
    'common.live': 'زیندوو',
    'common.lastUpdate': 'دوایین نوێکردنەوە',
    'common.average': 'ناوەند',
    'common.test': 'تاقیکردنەوە',
    'common.settings': 'ڕێکخستنەکان',
    'common.help': 'یارمەتی',
    'common.close': 'داخستن',
    'common.save': 'پاشەکەوتکردن',
    'common.cancel': 'هەڵوەشاندنەوە',
    'common.error': 'هەڵە',
    'common.success': 'سەرکەوتوو',
    'common.loading': 'لە بارکردندایە...',
    'common.search': 'گەڕان',
    'common.backToMain': 'گەڕانەوە بۆ مێنووی سەرەکی',
    
    // Menu Items
    'menu.dashboard': 'دەسگەی بەڕێوەبردن',
    'menu.tools': 'ئامرازەکانی تۆڕ',
    'menu.security': 'ئاسایش',
    'menu.monitoring': 'چاودێری',
    'menu.analysis': 'شیکردنەوە',
    'menu.fiber': 'ئۆپتیکی فایبەر',
    'menu.ispTools': 'ئامرازەکانی ISP',
    'menu.vpnTools': 'ئامرازەکانی VPN',
    'menu.sandbox': 'ژینگەی تاقیکردنەوە',
    'menu.scanner': 'پشکنەری تۆڕ',
    'menu.assistant': 'یاریدەدەری زیرەک',
    'menu.simulation': 'دروستکردنی نموونە',
    'menu.terminal': 'تێرمیناڵ',
    'menu.admin': 'بەڕێوەبردن',
    'menu.users': 'بەڕێوەبردنی بەکارهێنەران',
    'menu.settings': 'ڕێکخستنەکان',
    'menu.help': 'یارمەتی',
    
    // Errors
    'error.network': 'هەڵەی تۆڕ',
    'error.api': 'هەڵەی API',
    'error.notFound': 'نەدۆزرایەوە',
    'error.unauthorized': 'ڕێگەپێنەدراو',
    'error.general': 'هەڵەیەکی چاوەڕوان نەکراو ڕوویدا',
    'error.required': 'ئەم خانەیە پێویستە',
    'error.invalidInput': 'داخڵکردنی نادروست',
  },
  tr: {
    // Dashboard
    'dashboard.title': 'Ana Kontrol Paneli',
    'dashboard.subtitle': 'Gerçek zamanlı ağ ve sistem performansının kapsamlı izlenmesi',
    'dashboard.systemStatus': 'Sistem normal olarak çalışıyor',
    'dashboard.welcome': 'Gelişmiş Ağ Araçları Platformuna Hoş Geldiniz',
    
    // Network Tools
    'tools.title': 'Ağ Araçları',
    'tools.subtitle': 'Ağ tanılama ve izleme araçlarının kapsamlı paketi',
    'tools.speedTest': 'İnternet Hız Testi',
    'tools.ping': 'Ping Testi',
    'tools.dns': 'DNS Analizi',
    'tools.portScan': 'Port Tarayıcı',
    'tools.bandwidth': 'Bant Genişliği İzleyici',
    'tools.traceroute': 'Yol İzleme',
    'tools.basicTools': 'Temel Araçlar',
    'tools.advancedTools': 'Gelişmiş Araçlar',
    
    // ISP Tools
    'isp.title': 'ISP Test Araçları',
    'isp.subtitle': 'İnternet servis sağlayıcılarını test et ve analiz et',
    'isp.providerName': 'Sağlayıcı Adı',
    'isp.location': 'Konum',
    'isp.analyze': 'AI Analizi',
    'isp.analyzing': 'Analiz ediliyor...',
    'isp.popularProviders': 'Irak\'ta Popüler ISP\'ler',
    
    // VPN Tools
    'vpn.title': 'VPN Test Araçları',
    'vpn.subtitle': 'Sanal özel ağları test et ve analiz et',
    'vpn.provider': 'VPN Sağlayıcı',
    'vpn.server': 'Sunucu Konumu',
    'vpn.protocol': 'Protokol',
    'vpn.recommendations': 'Önerilen VPN Hizmetleri',
    
    // Help & Documentation
    'help.title': 'Yardım ve Dokümantasyon',
    'help.subtitle': 'Kapsamlı yardım ve dokümantasyon merkezi',
    'help.search': 'Dokümantasyonda ara...',
    'help.allTools': 'Tüm Araçlar',
    'help.network': 'Ağ',
    'help.security': 'Güvenlik',
    'help.analysis': 'Analiz',
    'help.benefits': 'Faydalar:',
    'help.howToUse': 'Nasıl kullanılır:',
    
    // Navigation
    'nav.language': 'Dil',
    'nav.settings': 'Ayarlar',
    'nav.profile': 'Profil',
    'nav.logout': 'Çıkış',
    
    // Common
    'common.run': 'Çalıştır',
    'common.running': 'Çalışıyor...',
    'common.live': 'Canlı',
    'common.lastUpdate': 'Son Güncelleme',
    'common.average': 'Ortalama',
    'common.test': 'Test',
    'common.settings': 'Ayarlar',
    'common.help': 'Yardım',
    'common.close': 'Kapat',
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.error': 'Hata',
    'common.success': 'Başarılı',
    'common.loading': 'Yükleniyor...',
    'common.search': 'Ara',
    'common.backToMain': 'Ana Menüye Dön',
    
    // Menu Items
    'menu.dashboard': 'Panel',
    'menu.tools': 'Ağ Araçları',
    'menu.security': 'Güvenlik',
    'menu.monitoring': 'İzleme',
    'menu.analysis': 'Analiz',
    'menu.fiber': 'Fiber Optik',
    'menu.ispTools': 'ISP Araçları',
    'menu.vpnTools': 'VPN Araçları',
    'menu.sandbox': 'Test Ortamı',
    'menu.scanner': 'Ağ Tarayıcı',
    'menu.assistant': 'AI Asistan',
    'menu.simulation': 'Simülasyon',
    'menu.terminal': 'Terminal',
    'menu.admin': 'Yönetim',
    'menu.users': 'Kullanıcı Yönetimi',
    'menu.settings': 'Ayarlar',
    'menu.help': 'Yardım',
    
    // Errors
    'error.network': 'Ağ Hatası',
    'error.api': 'API Hatası',
    'error.notFound': 'Bulunamadı',
    'error.unauthorized': 'Yetkisiz',
    'error.general': 'Beklenmeyen bir hata oluştu',
    'error.required': 'Bu alan gereklidir',
    'error.invalidInput': 'Geçersiz giriş',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const supportedLanguages = [
    { code: 'ar' as Language, name: 'Arabic', nativeName: 'العربية' },
    { code: 'en' as Language, name: 'English', nativeName: 'English' },
    { code: 'ku' as Language, name: 'Kurdish', nativeName: 'کوردی' },
    { code: 'tr' as Language, name: 'Turkish', nativeName: 'Türkçe' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && supportedLanguages.some(lang => lang.code === savedLanguage)) {
      setLanguage(savedLanguage);
    }
    
    // Set initial direction and meta tags
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', ['ar', 'ku'].includes(language) ? 'rtl' : 'ltr');
    
    // Set page title based on language
    const titles = {
      ar: 'منصة أدوات الشبكة المتقدمة',
      en: 'Advanced Network Tools Platform',
      ku: 'پلاتفۆرمی ئامرازە پێشکەوتووەکانی تۆڕ',
      tr: 'Gelişmiş Ağ Araçları Platformu'
    };
    document.title = titles[language] || titles.ar;
    
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', ['ar', 'ku'].includes(lang) ? 'rtl' : 'ltr');
    
    // Update page title
    const titles = {
      ar: 'منصة أدوات الشبكة المتقدمة',
      en: 'Advanced Network Tools Platform',
      ku: 'پلاتفۆرمی ئامرازە پێشکەوتووەکانی تۆڕ',
      tr: 'Gelişmiş Ağ Araçları Platformu'
    };
    document.title = titles[lang] || titles.ar;
  };

  const t = (key: string): string => {
    const translation = translations[language]?.[key as keyof typeof translations[typeof language]];
    if (translation) return translation;
    
    // Fallback to English if current language doesn't have the key
    const englishTranslation = translations.en?.[key as keyof typeof translations.en];
    if (englishTranslation) return englishTranslation;
    
    // Fallback to Arabic if English doesn't have the key
    const arabicTranslation = translations.ar?.[key as keyof typeof translations.ar];
    if (arabicTranslation) return arabicTranslation;
    
    // Return the key itself as last resort
    return key;
  };

  const dir = ['ar', 'ku'].includes(language) ? 'rtl' : 'ltr';
  const isRTL = dir === 'rtl';

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t, 
      dir, 
      isRTL,
      supportedLanguages 
    }}>
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
