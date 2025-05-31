
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AuthProvider } from '@/hooks/useAuth';
import { LanguageProvider } from '@/contexts/LanguageContext';
import LoginForm from '@/components/auth/LoginForm';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/components/dashboard/Dashboard';
import NetworkTools from '@/components/tools/NetworkTools';
import { Button } from '@/components/ui/button';

const MainApp = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'tools':
        return <NetworkTools />;
      case 'security':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">أدوات الأمان</h2>
            <p className="text-gray-400">قريباً...</p>
          </div>
        );
      case 'monitoring':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">مراقبة النظام</h2>
            <p className="text-gray-400">قريباً...</p>
          </div>
        );
      case 'analysis':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">أدوات التحليل</h2>
            <p className="text-gray-400">قريباً...</p>
          </div>
        );
      case 'fiber':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">أدوات الألياف البصرية</h2>
            <p className="text-gray-400">قريباً...</p>
          </div>
        );
      case 'scanner':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">فاحص الشبكة</h2>
            <p className="text-gray-400">قريباً...</p>
          </div>
        );
      case 'assistant':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">المساعد الذكي</h2>
            <p className="text-gray-400">قريباً...</p>
          </div>
        );
      case 'simulation':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">نظام المحاكاة</h2>
            <p className="text-gray-400">قريباً...</p>
          </div>
        );
      case 'terminal':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">سطر الأوامر</h2>
            <p className="text-gray-400">قريباً...</p>
          </div>
        );
      case 'users':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">إدارة المستخدمين</h2>
            <p className="text-gray-400">متاح للمطورين فقط</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">الإعدادات</h2>
            <p className="text-gray-400">قريباً...</p>
          </div>
        );
      case 'help':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">المساعدة والدعم</h2>
            <p className="text-gray-400">للدعم التقني: support@octa-network.com</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 w-full">
      <Header />
      
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <Sidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isCollapsed={sidebarCollapsed}
        />
        
        <main className="flex-1 overflow-y-auto">
          {/* Mobile menu button */}
          <div className="lg:hidden p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-white"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </AuthProvider>
  );
};

export default Index;
