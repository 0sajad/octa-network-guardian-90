
import React, { useState } from 'react';
import { Eye, EyeOff, Shield, User, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'client' as 'client' | 'developer'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال اسم المستخدم وكلمة المرور",
        variant: "destructive"
      });
      return;
    }

    const success = await login(formData);
    
    if (success) {
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً بك في OCTA NETWORK`,
        variant: "default"
      });
    } else {
      toast({
        title: "فشل تسجيل الدخول",
        description: "يرجى التحقق من البيانات المدخلة",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary-500 to-accent rounded-2xl flex items-center justify-center mb-4 animate-glow">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-2">OCTA NETWORK</h1>
          <p className="text-gray-400">منصة مراقبة الشبكات الذكية العالمية</p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Login Form */}
        <div className="glass-dark rounded-2xl p-8 border border-white/20 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-white text-right block">نوع المستخدم</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value: 'client' | 'developer') => 
                  setFormData(prev => ({ ...prev, role: value }))
                }
                className="flex space-x-reverse space-x-4"
              >
                <div className="flex items-center space-x-reverse space-x-2 flex-1">
                  <RadioGroupItem value="client" id="client" className="border-white/30" />
                  <Label 
                    htmlFor="client" 
                    className="text-white cursor-pointer flex-1 text-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    عميل
                  </Label>
                </div>
                <div className="flex items-center space-x-reverse space-x-2 flex-1">
                  <RadioGroupItem value="developer" id="developer" className="border-white/30" />
                  <Label 
                    htmlFor="developer" 
                    className="text-white cursor-pointer flex-1 text-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    مطور
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white text-right block">
                اسم المستخدم
              </Label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="pl-4 pr-12 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-primary-500"
                  placeholder="أدخل اسم المستخدم"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-right block">
                كلمة المرور
              </Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:ring-primary-500"
                  placeholder="أدخل كلمة المرور"
                  dir="rtl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-accent hover:from-primary-700 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-reverse space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>جاري تسجيل الدخول...</span>
                </div>
              ) : (
                'تسجيل الدخول'
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>للدعم التقني: support@octa-network.com</p>
            <p className="mt-2">تطوير: ساجد كاظم</p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 glass-dark rounded-lg p-4 border border-white/20">
          <h3 className="text-white text-sm font-semibold mb-2 text-center">بيانات تجريبية:</h3>
          <div className="text-xs text-gray-400 space-y-1">
            <p>المستخدم: admin | كلمة المرور: 123456</p>
            <p>المستخدم: client | كلمة المرور: 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
