
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
import SecurityTools from '@/components/tools/security/SecurityTools';
import FiberTools from '@/components/tools/fiber/FiberTools';
import AIAssistant from '@/components/tools/ai/AIAssistant';
import SimulationTools from '@/components/tools/simulation/SimulationTools';
import Terminal from '@/components/tools/terminal/Terminal';
import ISPTools from '@/components/tools/isp/ISPTools';
import VPNTools from '@/components/tools/vpn/VPNTools';
import SandboxTools from '@/components/tools/sandbox/SandboxTools';
import AdvancedAnalyzer from '@/components/tools/analyzer/AdvancedAnalyzer';
import AdminPanel from '@/components/admin/AdminPanel';
import Documentation from '@/components/documentation/Documentation';
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
        return <SecurityTools />;
      case 'monitoring':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">مراقبة النظام</h2>
            <p className="text-gray-400">قريباً...</p>
          </div>
        );
      case 'analysis':
        return <AdvancedAnalyzer />;
      case 'fiber':
        return <FiberTools />;
      case 'isp-tools':
        return <ISPTools />;
      case 'vpn-tools':
        return <VPNTools />;
      case 'sandbox':
        return <SandboxTools />;
      case 'scanner':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-4">فاحص الشبكة</h2>
            <p className="text-gray-400">قريباً...</p>
          </div>
        );
      case 'assistant':
        return <AIAssistant />;
      case 'simulation':
        return <SimulationTools />;
      case 'terminal':
        return <Terminal />;
      case 'admin':
        return <AdminPanel />;
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
        return <Documentation />;
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
