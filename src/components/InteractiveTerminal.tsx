import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, RotateCcw } from 'lucide-react';
import { TERMINAL_COMMANDS } from '../data/portfolioData';

interface HistoryItem {
  command: string;
  output: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'whoami',
      output: 'balaji@cloud-engineer :: AWS Cloud • DevOps • Backend Engineer (Coimbatore, IN)',
    },
    {
      command: 'focus',
      output: 'AWS Cloud Infrastructure • Kubernetes Orchestration • CI/CD Automation • Linux Systems • REST Backends',
    },
    {
      command: 'status',
      output: '🟢 BUILDING & AVAILABLE — Seeking Cloud / DevOps Opportunities',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const quickCommands = ['whoami', 'focus', 'status', 'skills', 'uptime', 'certifications', 'contact'];

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear' || trimmed === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (trimmed === 'help') {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: `Available commands: ${quickCommands.join(', ')}, clear, help`,
        },
      ]);
      setInputVal('');
      return;
    }

    const matched = TERMINAL_COMMANDS.find((c) => c.cmd.toLowerCase() === trimmed);
    if (matched) {
      setHistory((prev) => [...prev, { command: cmd, output: matched.output }]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: `command not found: "${cmd}". Type "help" or click one of the quick command pills below.`,
        },
      ]);
    }
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <section id="terminal-section" className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto">
        {/* Terminal Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TerminalIcon className="w-4 h-4 text-[#FF2E93]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-[#FF2E93] uppercase">
                ENGINEERING REPL // CLI INTERACTIVE
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-[#0E0E10]">
              Cloud Operations Shell
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-gray-500">SESSION:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[11px] font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              CONNECTED
            </span>
          </div>
        </div>

        {/* The Terminal Window */}
        <div className="rounded-2xl overflow-hidden bg-[#0B0B0D] border border-white/10 shadow-2xl">
          {/* Top Bar */}
          <div className="px-4 py-3 bg-[#141418] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              <span className="ml-3 text-xs font-mono text-gray-400 select-none">
                balaji@aws-infrastructure-node:~
              </span>
            </div>

            <button
              onClick={() => setHistory([])}
              title="Clear terminal"
              className="text-xs font-mono text-gray-500 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>CLEAR</span>
            </button>
          </div>

          {/* Terminal Body */}
          <div className="p-4 md:p-6 font-mono text-xs md:text-sm text-gray-300 min-h-[260px] max-h-[420px] overflow-y-auto space-y-3">
            <div className="text-gray-500 text-xs select-none">
              Welcome to Balaji's Cloud Workstation. Type any command or click presets below.
            </div>

            {history.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2 text-white font-medium">
                  <span className="text-[#FF2E93] select-none">$</span>
                  <span>{item.command}</span>
                </div>
                <div className="text-gray-300 pl-4 border-l-2 border-white/10 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Input Line */}
            <div className="flex items-center gap-2 text-white pt-1">
              <span className="text-[#FF2E93] select-none font-bold">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (try 'whoami', 'skills', 'status')..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs md:text-sm placeholder:text-gray-600 focus:ring-0"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                onClick={() => executeCommand(inputVal)}
                aria-label="Send command"
                className="text-gray-500 hover:text-[#FF2E93] transition-colors p-1"
              >
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </div>
            <div ref={terminalEndRef} />
          </div>

          {/* Quick Command Pills */}
          <div className="px-4 py-3 bg-[#111114] border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-gray-400 mr-1 select-none flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FF2E93]" />
              QUICK COMMANDS:
            </span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                data-cursor="chip"
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-[#FF2E93]/20 hover:text-[#FF2E93] border border-white/10 text-[11px] font-mono text-gray-300 transition-all active:scale-95"
              >
                ${cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
