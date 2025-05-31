
import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ISPFormData {
  name: string;
  location: string;
  testing: boolean;
  error: string | null;
}

interface ISPFormProps {
  ispData: ISPFormData;
  onDataChange: (data: Partial<ISPFormData>) => void;
  onTest: () => void;
}

const ISPForm: React.FC<ISPFormProps> = ({ ispData, onDataChange, onTest }) => {
  return (
    <Card className="glass-dark border-white/20 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">معلومات مزود الخدمة</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="اسم الشركة (مثال: زين العراق)"
          value={ispData.name}
          onChange={(e) => onDataChange({ name: e.target.value, error: null })}
          className="bg-white/10 border-white/20 text-white"
          dir="rtl"
        />
        <Input
          placeholder="الموقع (اختياري)"
          value={ispData.location}
          onChange={(e) => onDataChange({ location: e.target.value })}
          className="bg-white/10 border-white/20 text-white"
          dir="rtl"
        />
        <Button 
          onClick={onTest}
          disabled={ispData.testing}
          className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
        >
          {ispData.testing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              جاري التحليل...
            </>
          ) : (
            'تحليل بالذكاء الاصطناعي'
          )}
        </Button>
      </div>
      
      {ispData.error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
          <span className="text-red-400">{ispData.error}</span>
        </div>
      )}
      
      {ispData.testing && (
        <div className="mt-4 space-y-2">
          <Progress value={75} className="h-2" />
          <p className="text-sm text-gray-400">جاري التحليل باستخدام الذكاء الاصطناعي...</p>
        </div>
      )}
    </Card>
  );
};

export default ISPForm;
