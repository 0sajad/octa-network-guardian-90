
import React, { useState } from 'react';
import { Bot, Send, MessageSquare, Zap, Brain, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحباً! أنا المساعد الذكي لشبكة OCTA. كيف يمكنني مساعدتك اليوم؟',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { text: 'تشخيص مشكلة في الشبكة', icon: Zap },
    { text: 'تحليل أداء النظام', icon: Brain },
    { text: 'نصائح لتحسين الأمان', icon: MessageSquare },
    { text: 'حل مشاكل الاتصال', icon: HelpCircle }
  ];

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 2000));

    const aiResponses = [
      'بناءً على تحليلي، يبدو أن هناك تحسن في أداء الشبكة يمكن تحقيقه عبر تحسين إعدادات DNS.',
      'أنصح بفحص جدار الحماية والتأكد من تحديث قواعد الأمان للحصول على حماية أفضل.',
      'يمكنني مساعدتك في تشخيص المشكلة. هل يمكنك إجراء اختبار ping للتأكد من الاتصال؟',
      'تم تحليل البيانات. أوصي بمراقبة استخدام النطاق الترددي خلال ساعات الذروة.'
    ];

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleQuickAction = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-xl p-6 border border-white/20">
        <div className="flex items-center space-x-reverse space-x-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">المساعد الذكي</h3>
            <p className="text-gray-400 text-sm">مساعد AI متخصص في الشبكات</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h4 className="text-white font-medium">إجراءات سريعة:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.text)}
                  className="flex items-center space-x-reverse space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-left"
                >
                  <Icon className="w-5 h-5 text-blue-400" />
                  <span className="text-white text-sm">{action.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 h-96 overflow-y-auto mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString('ar')}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-reverse space-x-3">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 bg-white/10 border-white/20 text-white"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            dir="rtl"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
