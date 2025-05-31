
import React, { useState } from 'react';
import { Search, Globe, Calendar, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const WhoisLookup = () => {
  const [domain, setDomain] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const performWhoisLookup = async () => {
    if (!domain) return;
    
    setIsLoading(true);
    
    // Simulate WHOIS lookup
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock WHOIS data
    setResults({
      domain: domain,
      registrar: 'GoDaddy LLC',
      registrationDate: '2020-01-15',
      expirationDate: '2025-01-15',
      nameServers: [
        'ns1.example.com',
        'ns2.example.com'
      ],
      registrant: {
        organization: 'Example Corp',
        country: 'US',
        state: 'California',
        city: 'San Francisco'
      },
      status: ['clientTransferProhibited', 'clientUpdateProhibited'],
      dnssec: Math.random() > 0.5 ? 'Enabled' : 'Disabled',
      lastUpdated: '2023-05-10'
    });
    
    setIsLoading(false);
  };

  return (
    <div className="glass-dark rounded-xl p-6 border border-white/20">
      <div className="flex items-center space-x-reverse space-x-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
          <Search className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">بحث معلومات النطاق (WHOIS)</h3>
          <p className="text-gray-400 text-sm">الحصول على معلومات تسجيل النطاق</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex space-x-reverse space-x-2">
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="flex-1 bg-white/10 border-white/20 text-white"
            onKeyPress={(e) => e.key === 'Enter' && performWhoisLookup()}
          />
          <Button 
            onClick={performWhoisLookup}
            disabled={isLoading || !domain}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isLoading ? 'جاري البحث...' : 'بحث'}
          </Button>
        </div>

        {results && (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3 flex items-center space-x-reverse space-x-2">
                <Globe className="w-5 h-5 text-blue-400" />
                <span>معلومات النطاق</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">النطاق:</span>
                    <span className="text-white font-mono">{results.domain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">المسجل:</span>
                    <span className="text-white">{results.registrar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">تاريخ التسجيل:</span>
                    <span className="text-white">{results.registrationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">تاريخ الانتهاء:</span>
                    <span className="text-white">{results.expirationDate}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">DNSSEC:</span>
                    <span className={`${results.dnssec === 'Enabled' ? 'text-green-400' : 'text-red-400'}`}>
                      {results.dnssec}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">آخر تحديث:</span>
                    <span className="text-white">{results.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">خوادم الأسماء</h4>
              <div className="space-y-1">
                {results.nameServers.map((ns: string, index: number) => (
                  <div key={index} className="text-white font-mono text-sm">
                    {ns}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-3">معلومات المسجل</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-300">المؤسسة:</span>
                  <span className="text-white">{results.registrant.organization}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">البلد:</span>
                  <span className="text-white">{results.registrant.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">الولاية:</span>
                  <span className="text-white">{results.registrant.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">المدينة:</span>
                  <span className="text-white">{results.registrant.city}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhoisLookup;
