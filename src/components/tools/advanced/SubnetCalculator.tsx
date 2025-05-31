
import React, { useState } from 'react';
import { Network, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SubnetCalculator = () => {
  const [ipAddress, setIpAddress] = useState('192.168.1.0');
  const [subnetMask, setSubnetMask] = useState('24');
  const [results, setResults] = useState<any>(null);

  const calculateSubnet = () => {
    const ip = ipAddress.split('.').map(Number);
    const maskBits = parseInt(subnetMask);
    
    // Calculate subnet information
    const networkAddress = calculateNetworkAddress(ip, maskBits);
    const broadcastAddress = calculateBroadcastAddress(ip, maskBits);
    const hostRange = calculateHostRange(networkAddress, broadcastAddress);
    const totalHosts = Math.pow(2, 32 - maskBits) - 2;
    
    setResults({
      networkAddress: networkAddress.join('.'),
      broadcastAddress: broadcastAddress.join('.'),
      firstHost: hostRange.first.join('.'),
      lastHost: hostRange.last.join('.'),
      totalHosts,
      subnetMaskDecimal: calculateSubnetMaskDecimal(maskBits),
      wildcardMask: calculateWildcardMask(maskBits)
    });
  };

  const calculateNetworkAddress = (ip: number[], maskBits: number) => {
    const mask = (0xFFFFFFFF << (32 - maskBits)) >>> 0;
    const ipInt = (ip[0] << 24) | (ip[1] << 16) | (ip[2] << 8) | ip[3];
    const networkInt = (ipInt & mask) >>> 0;
    
    return [
      (networkInt >>> 24) & 0xFF,
      (networkInt >>> 16) & 0xFF,
      (networkInt >>> 8) & 0xFF,
      networkInt & 0xFF
    ];
  };

  const calculateBroadcastAddress = (ip: number[], maskBits: number) => {
    const mask = (0xFFFFFFFF << (32 - maskBits)) >>> 0;
    const ipInt = (ip[0] << 24) | (ip[1] << 16) | (ip[2] << 8) | ip[3];
    const broadcastInt = (ipInt | (~mask >>> 0)) >>> 0;
    
    return [
      (broadcastInt >>> 24) & 0xFF,
      (broadcastInt >>> 16) & 0xFF,
      (broadcastInt >>> 8) & 0xFF,
      broadcastInt & 0xFF
    ];
  };

  const calculateHostRange = (network: number[], broadcast: number[]) => {
    const first = [...network];
    first[3] += 1;
    
    const last = [...broadcast];
    last[3] -= 1;
    
    return { first, last };
  };

  const calculateSubnetMaskDecimal = (maskBits: number) => {
    const mask = (0xFFFFFFFF << (32 - maskBits)) >>> 0;
    return [
      (mask >>> 24) & 0xFF,
      (mask >>> 16) & 0xFF,
      (mask >>> 8) & 0xFF,
      mask & 0xFF
    ].join('.');
  };

  const calculateWildcardMask = (maskBits: number) => {
    const mask = (0xFFFFFFFF << (32 - maskBits)) >>> 0;
    const wildcard = (~mask >>> 0);
    return [
      (wildcard >>> 24) & 0xFF,
      (wildcard >>> 16) & 0xFF,
      (wildcard >>> 8) & 0xFF,
      wildcard & 0xFF
    ].join('.');
  };

  return (
    <div className="glass-dark rounded-xl p-6 border border-white/20">
      <div className="flex items-center space-x-reverse space-x-3 mb-6">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">حاسبة الشبكات الفرعية</h3>
          <p className="text-gray-400 text-sm">حساب معلومات الشبكة الفرعية والمضيفين</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">عنوان IP</label>
            <Input
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
              placeholder="192.168.1.0"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">قناع الشبكة الفرعية (CIDR)</label>
            <Input
              value={subnetMask}
              onChange={(e) => setSubnetMask(e.target.value)}
              placeholder="24"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>

        <Button 
          onClick={calculateSubnet}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          حساب الشبكة الفرعية
        </Button>

        {results && (
          <div className="bg-white/5 rounded-lg p-4 space-y-3">
            <h4 className="text-white font-medium">نتائج الحساب</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">عنوان الشبكة:</span>
                  <span className="text-white font-mono">{results.networkAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">عنوان البث:</span>
                  <span className="text-white font-mono">{results.broadcastAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">أول مضيف:</span>
                  <span className="text-white font-mono">{results.firstHost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">آخر مضيف:</span>
                  <span className="text-white font-mono">{results.lastHost}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">قناع الشبكة:</span>
                  <span className="text-white font-mono">{results.subnetMaskDecimal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">القناع البديل:</span>
                  <span className="text-white font-mono">{results.wildcardMask}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">عدد المضيفين:</span>
                  <span className="text-white font-mono">{results.totalHosts.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubnetCalculator;
