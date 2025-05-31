
import React from 'react';
import { Network, User, Bell, Settings, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useLanguage } from '@/contexts/LanguageContext';
import { versionInfo } from '@/utils/versionInfo';

const Header = () => {
  const { t, isRTL, language } = useLanguage();

  return (
    <header className="h-16 bg-slate-800/95 backdrop-blur-sm border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-reverse space-x-4">
        <div className="flex items-center space-x-reverse space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Network className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">
              {language === 'ar' ? 'منصة أدوات الشبكة المتقدمة' : 'Advanced Network Tools'}
            </h1>
            <p className="text-gray-400 text-xs hidden sm:block">
              v{versionInfo.version} • {language === 'ar' ? 'متعدد اللغات' : 'Multi-language'}
            </p>
          </div>
        </div>
      </div>
      
      <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <LanguageSelector />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/10"
            >
              <Info className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-slate-800 border-white/20 text-white w-80">
            <div className="space-y-3">
              <h3 className="font-semibold">
                {language === 'ar' ? 'معلومات النظام' : 'System Information'}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'الإصدار:' : 'Version:'}</span>
                  <Badge variant="outline">{versionInfo.version}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'الأدوات:' : 'Tools:'}</span>
                  <span>{versionInfo.features.networkTools + versionInfo.features.securityTools + versionInfo.features.analysisTools}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'اللغات:' : 'Languages:'}</span>
                  <span>{versionInfo.features.languages}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'الحالة:' : 'Status:'}</span>
                  <Badge variant="default" className="bg-green-600">
                    {language === 'ar' ? 'يعمل' : 'Online'}
                  </Badge>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/10 relative"
        >
          <Bell className="w-4 h-4" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
          >
            3
          </Badge>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/10"
        >
          <Settings className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-white/10"
        >
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
