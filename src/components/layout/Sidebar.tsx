
import React from 'react';
import { 
  LayoutDashboard, 
  Network, 
  Shield, 
  Settings, 
  Monitor, 
  Activity,
  FileText,
  Zap,
  Terminal,
  Bot,
  Users,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { id: 'tools', label: 'أدوات الشبكة', icon: Network },
  { id: 'security', label: 'الأمان', icon: Shield },
  { id: 'monitoring', label: 'المراقبة', icon: Monitor },
  { id: 'analysis', label: 'التحليل', icon: Activity },
  { id: 'fiber', label: 'الألياف البصرية', icon: Zap },
  { id: 'scanner', label: 'فاحص الشبكة', icon: Network },
  { id: 'assistant', label: 'المساعد الذكي', icon: Bot },
  { id: 'simulation', label: 'المحاكاة', icon: FileText },
  { id: 'terminal', label: 'سطر الأوامر', icon: Terminal },
  { id: 'users', label: 'إدارة المستخدمين', icon: Users },
  { id: 'settings', label: 'الإعدادات', icon: Settings },
  { id: 'help', label: 'المساعدة', icon: HelpCircle },
];

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, isCollapsed }) => {
  return (
    <aside className={cn(
      "glass-dark border-l border-white/20 transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/20">
        {!isCollapsed && (
          <div className="text-center">
            <h2 className="text-lg font-bold text-gradient">قائمة الأدوات</h2>
            <p className="text-xs text-gray-400 mt-1">جميع أدوات المراقبة</p>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-reverse space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25" 
                  : "text-gray-300 hover:bg-white/10 hover:text-white",
                isCollapsed ? "justify-center" : "justify-start"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={cn(
                "w-5 h-5 transition-transform duration-200",
                isActive ? "text-white" : "text-gray-400 group-hover:text-white",
                "group-hover:scale-110"
              )} />
              {!isCollapsed && (
                <span className="text-sm font-medium truncate">
                  {item.label}
                </span>
              )}
              {isActive && !isCollapsed && (
                <div className="w-2 h-2 bg-white rounded-full mr-auto animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/20">
          <div className="text-center text-xs text-gray-500">
            <p>تطوير: ساجد كاظم</p>
            <p className="mt-1">الإصدار 1.0.0</p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
