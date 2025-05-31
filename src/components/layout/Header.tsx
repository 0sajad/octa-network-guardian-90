
import React from 'react';
import { Bell, Search, Settings, User, LogOut, Shield, Globe } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="glass-dark border-b border-white/20 h-16 px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-reverse space-x-4">
        <div className="flex items-center space-x-reverse space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">OCTA NETWORK</h1>
            <p className="text-xs text-gray-400">منصة مراقبة الشبكات الذكية</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={language === 'ar' ? "البحث في النظام..." : "Search system..."}
            className="w-full pl-4 pr-10 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-reverse space-x-4">
        {/* Language Switcher */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-400 hover:text-white flex items-center space-x-reverse space-x-1"
          onClick={toggleLanguage}
        >
          <Globe className="w-4 h-4" />
          <span className="text-xs">{language === 'ar' ? 'EN' : 'ع'}</span>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full text-xs flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Settings className="w-4 h-4" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-reverse space-x-2 p-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.avatar} alt={user?.username} />
                <AvatarFallback className="bg-primary-600 text-white">
                  {user?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user?.username}</p>
                <p className="text-xs text-gray-400">
                  {user?.role === 'developer' ? 'مطور' : 'عميل'}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-dark border-white/20">
            <DropdownMenuItem className="text-white hover:bg-white/10">
              <User className="ml-2 h-4 w-4" />
              الملف الشخصي
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10">
              <Settings className="ml-2 h-4 w-4" />
              {t('common.settings')}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/20" />
            <DropdownMenuItem 
              onClick={logout}
              className="text-danger hover:bg-danger/10"
            >
              <LogOut className="ml-2 h-4 w-4" />
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
