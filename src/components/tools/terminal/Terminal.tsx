
import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TerminalLine {
  id: string;
  command: string;
  output: string;
  timestamp: Date;
}

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      command: '',
      output: 'OCTA Network Terminal v2.0.0\nمرحباً بك في سطر أوامر OCTA Network\nاكتب "help" للحصول على قائمة الأوامر المتاحة',
      timestamp: new Date()
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: 'الأوامر المتاحة:\nping <host> - اختبار الاتصال\nnslookup <domain> - البحث عن DNS\nnetstat - عرض اتصالات الشبكة\ntracert <host> - تتبع المسار\narp - عرض جدول ARP\nipconfig - عرض إعدادات IP\nclear - مسح الشاشة',
    ping: (host: string) => `PING ${host || 'google.com'} (142.250.185.78): 56 data bytes\n64 bytes from 142.250.185.78: icmp_seq=1 ttl=115 time=12.4 ms\n64 bytes from 142.250.185.78: icmp_seq=2 ttl=115 time=11.8 ms\n64 bytes from 142.250.185.78: icmp_seq=3 ttl=115 time=13.2 ms`,
    nslookup: (domain: string) => `Server: 8.8.8.8\nAddress: 8.8.8.8#53\n\nName: ${domain || 'google.com'}\nAddress: 142.250.185.78`,
    netstat: 'Active Internet connections:\nProto Local Address           Foreign Address         State\ntcp   192.168.1.100:80       203.0.113.1:12345      ESTABLISHED\ntcp   192.168.1.100:443      198.51.100.1:54321     ESTABLISHED',
    tracert: (host: string) => `Tracing route to ${host || 'google.com'} [142.250.185.78]\n1    192.168.1.1      2 ms     1 ms     2 ms\n2    10.0.0.1         15 ms    12 ms    18 ms\n3    142.250.185.78   25 ms    23 ms    28 ms`,
    arp: 'Internet Address      Physical Address      Type\n192.168.1.1           00-1B-63-84-45-E6     dynamic\n192.168.1.105         08-00-27-12-34-56     dynamic',
    ipconfig: 'Ethernet adapter Local Area Connection:\n   Connection-specific DNS Suffix  . :\n   IPv4 Address. . . . . . . . . . . : 192.168.1.100\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.1.1'
  };

  const executeCommand = () => {
    if (!currentCommand.trim()) return;

    const [cmd, ...args] = currentCommand.trim().split(' ');
    let output = '';

    if (cmd === 'clear') {
      setLines([{
        id: Date.now().toString(),
        command: '',
        output: 'OCTA Network Terminal v2.0.0\nتم مسح الشاشة',
        timestamp: new Date()
      }]);
      setCurrentCommand('');
      return;
    }

    if (commands[cmd as keyof typeof commands]) {
      const commandFunc = commands[cmd as keyof typeof commands];
      if (typeof commandFunc === 'function') {
        output = commandFunc(args.join(' '));
      } else {
        output = commandFunc;
      }
    } else {
      output = `Command not found: ${cmd}\nاكتب "help" للحصول على قائمة الأوامر المتاحة`;
    }

    const newLine: TerminalLine = {
      id: Date.now().toString(),
      command: currentCommand,
      output,
      timestamp: new Date()
    };

    setLines(prev => [...prev, newLine]);
    setCurrentCommand('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-xl p-6 border border-white/20">
        <div className="flex items-center space-x-reverse space-x-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
            <TerminalIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">سطر الأوامر</h3>
            <p className="text-gray-400 text-sm">واجهة طرفية تفاعلية</p>
          </div>
        </div>

        <div 
          ref={terminalRef}
          className="bg-black rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm"
        >
          {lines.map((line) => (
            <div key={line.id} className="mb-2">
              {line.command && (
                <div className="flex items-center text-green-400">
                  <span className="text-blue-400">user@octa:~$</span>
                  <span className="ml-2">{line.command}</span>
                </div>
              )}
              <pre className="text-gray-300 whitespace-pre-wrap">{line.output}</pre>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-reverse space-x-3 mt-4">
          <span className="text-blue-400 font-mono">user@octa:~$</span>
          <Input
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            placeholder="أدخل الأمر هنا..."
            className="flex-1 bg-black border-gray-600 text-white font-mono"
            onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
          />
          <Button
            onClick={executeCommand}
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
