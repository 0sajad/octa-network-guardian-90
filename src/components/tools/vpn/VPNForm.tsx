
import React from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface VPNTestData {
  provider: string;
  server: string;
  protocol: string;
  testing: boolean;
  error: string | null;
}

interface VPNFormProps {
  vpnTest: VPNTestData;
  onTestChange: (data: Partial<VPNTestData>) => void;
  onTest: () => void;
}

const VPNForm: React.FC<VPNFormProps> = ({ vpnTest, onTestChange, onTest }) => {
  return (
    <Card className="glass-dark border-white/20 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">إعدادات VPN للاختبار</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="مزود VPN (مثال: NordVPN)"
          value={vpnTest.provider}
          onChange={(e) => onTestChange({ provider: e.target.value, error: null })}
          className="bg-white/10 border-white/20 text-white"
          dir="rtl"
        />
        <Input
          placeholder="موقع الخادم (اختياري)"
          value={vpnTest.server}
          onChange={(e) => onTestChange({ server: e.target.value })}
          className="bg-white/10 border-white/20 text-white"
          dir="rtl"
        />
        <select
          value={vpnTest.protocol}
          onChange={(e) => onTestChange({ protocol: e.target.value })}
          className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white"
        >
          <option value="OpenVPN">OpenVPN</option>
          <option value="IKEv2">IKEv2</option>
          <option value="WireGuard">WireGuard</option>
          <option value="L2TP">L2TP</option>
          <option value="PPTP">PPTP</option>
        </select>
        <Button 
          onClick={onTest}
          disabled={vpnTest.testing}
          className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
        >
          {vpnTest.testing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              جاري التحليل...
            </>
          ) : (
            'تحليل بالذكاء الاصطناعي'
          )}
        </Button>
      </div>
      
      {vpnTest.error && (
        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
          <span className="text-red-400">{vpnTest.error}</span>
        </div>
      )}
      
      {vpnTest.testing && (
        <div className="mt-4 space-y-2">
          <Progress value={60} className="h-2" />
          <p className="text-sm text-gray-400">جاري التحليل باستخدام الذكاء الاصطناعي...</p>
        </div>
      )}
    </Card>
  );
};

export default VPNForm;
