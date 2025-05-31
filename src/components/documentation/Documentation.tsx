
import React, { useState } from 'react';
import { Book, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import HelpCenter from './HelpCenter';
import ComprehensiveGuide from './ComprehensiveGuide';

const Documentation = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('help');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {t('help.title')}
          </h1>
          <p className="text-gray-400">
            {t('help.subtitle')}
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="glass-dark border border-white/20">
          <TabsTrigger value="help" className="text-white flex items-center space-x-reverse space-x-2">
            <Book className="w-4 h-4" />
            <span>{language === 'ar' ? 'مساعدة الأدوات' : 'Tools Help'}</span>
          </TabsTrigger>
          <TabsTrigger value="guide" className="text-white flex items-center space-x-reverse space-x-2">
            <FileText className="w-4 h-4" />
            <span>{language === 'ar' ? 'الدليل الشامل' : 'Complete Guide'}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="help">
          <HelpCenter />
        </TabsContent>

        <TabsContent value="guide">
          <ComprehensiveGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;
