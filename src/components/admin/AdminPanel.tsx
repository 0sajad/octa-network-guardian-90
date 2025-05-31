
import React, { useState } from 'react';
import { Users, Settings, Plus, Edit, Trash2, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';

const AdminPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', role: 'developer', email: 'admin@octa.com', lastLogin: '2024-01-20', status: 'active' },
    { id: 2, username: 'client1', role: 'client', email: 'client1@company.com', lastLogin: '2024-01-19', status: 'active' },
    { id: 3, username: 'client2', role: 'client', email: 'client2@company.com', lastLogin: '2024-01-18', status: 'inactive' }
  ]);

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: 'client',
    password: ''
  });

  const [systemSettings, setSystemSettings] = useState({
    siteName: 'OCTA NETWORK',
    siteLogo: '🛡️',
    sessionTimeout: '60',
    maxUsers: '100',
    enableRegistration: false,
    enableLogging: true
  });

  const addUser = () => {
    if (newUser.username && newUser.email) {
      const user = {
        id: users.length + 1,
        ...newUser,
        lastLogin: 'لم يسجل دخول بعد',
        status: 'active'
      };
      setUsers([...users, user]);
      setNewUser({ username: '', email: '', role: 'client', password: '' });
    }
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const toggleUserStatus = (id: number) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  if (user?.role !== 'developer') {
    return (
      <div className="text-center py-12">
        <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">غير مصرح</h2>
        <p className="text-gray-400">هذه الصفحة متاحة للمطورين فقط</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">لوحة تحكم المطور</h1>
          <p className="text-gray-400">إدارة المستخدمين وإعدادات النظام</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="glass-dark border border-white/20">
          <TabsTrigger value="users" className="text-white">إدارة المستخدمين</TabsTrigger>
          <TabsTrigger value="settings" className="text-white">إعدادات النظام</TabsTrigger>
          <TabsTrigger value="tools" className="text-white">إدارة الأدوات</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="space-y-6">
            {/* Add New User */}
            <Card className="glass-dark border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">إضافة مستخدم جديد</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Input
                  placeholder="اسم المستخدم"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                  dir="rtl"
                />
                <Input
                  placeholder="البريد الإلكتروني"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
                >
                  <option value="client">عميل</option>
                  <option value="developer">مطور</option>
                </select>
                <Input
                  type="password"
                  placeholder="كلمة المرور"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className="bg-white/10 border-white/20 text-white"
                />
                <Button onClick={addUser} className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة
                </Button>
              </div>
            </Card>

            {/* Users List */}
            <Card className="glass-dark border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">قائمة المستخدمين</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-right py-3 text-gray-300">المستخدم</th>
                      <th className="text-right py-3 text-gray-300">البريد</th>
                      <th className="text-right py-3 text-gray-300">الدور</th>
                      <th className="text-right py-3 text-gray-300">آخر دخول</th>
                      <th className="text-right py-3 text-gray-300">الحالة</th>
                      <th className="text-right py-3 text-gray-300">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-white/10">
                        <td className="py-3 text-white">{user.username}</td>
                        <td className="py-3 text-gray-300">{user.email}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.role === 'developer' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {user.role === 'developer' ? 'مطور' : 'عميل'}
                          </span>
                        </td>
                        <td className="py-3 text-gray-300">{user.lastLogin}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {user.status === 'active' ? 'نشط' : 'معطل'}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex space-x-reverse space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              {user.status === 'active' ? 'تعطيل' : 'تفعيل'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteUser(user.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="glass-dark border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">إعدادات النظام</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm block mb-2">اسم الموقع</label>
                  <Input
                    value={systemSettings.siteName}
                    onChange={(e) => setSystemSettings({...systemSettings, siteName: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label className="text-gray-300 text-sm block mb-2">رمز الموقع (Emoji)</label>
                  <Input
                    value={systemSettings.siteLogo}
                    onChange={(e) => setSystemSettings({...systemSettings, siteLogo: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div>
                  <label className="text-gray-300 text-sm block mb-2">مهلة انتهاء الجلسة (دقيقة)</label>
                  <Input
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm block mb-2">الحد الأقصى للمستخدمين</label>
                  <Input
                    type="number"
                    value={systemSettings.maxUsers}
                    onChange={(e) => setSystemSettings({...systemSettings, maxUsers: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-reverse space-x-2">
                    <input
                      type="checkbox"
                      checked={systemSettings.enableRegistration}
                      onChange={(e) => setSystemSettings({...systemSettings, enableRegistration: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-gray-300 text-sm">السماح بالتسجيل الجديد</span>
                  </label>
                  
                  <label className="flex items-center space-x-reverse space-x-2">
                    <input
                      type="checkbox"
                      checked={systemSettings.enableLogging}
                      onChange={(e) => setSystemSettings({...systemSettings, enableLogging: e.target.checked})}
                      className="rounded"
                    />
                    <span className="text-gray-300 text-sm">تفعيل سجل النشاطات</span>
                  </label>
                </div>
                
                <Button className="bg-green-600 hover:bg-green-700 w-full">
                  حفظ الإعدادات
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <Card className="glass-dark border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">إدارة الأدوات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'أدوات الشبكة', count: 15, enabled: true },
                { name: 'أدوات الأمان', count: 12, enabled: true },
                { name: 'أدوات المراقبة', count: 8, enabled: true },
                { name: 'أدوات التحليل', count: 10, enabled: false },
                { name: 'أدوات الألياف البصرية', count: 6, enabled: true },
                { name: 'المساعد الذكي', count: 1, enabled: true }
              ].map((category, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-medium">{category.name}</h4>
                    <div className={`w-3 h-3 rounded-full ${category.enabled ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </div>
                  <p className="text-gray-400 text-sm">{category.count} أداة</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 w-full mt-3"
                  >
                    {category.enabled ? 'تعطيل' : 'تفعيل'}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
