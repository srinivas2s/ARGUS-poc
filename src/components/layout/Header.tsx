'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Cpu, 
  Clock, 
  Layers, 
  Zap, 
  Download, 
  Radio, 
  Sliders
} from 'lucide-react';
import { argusStore } from '@/lib/store';
import Link from 'next/link';

export const Header: React.FC = () => {
  const [timeIST, setTimeIST] = useState<string>('');
  const [timeUTC, setTimeUTC] = useState<string>('');
  const [riskScore, setRiskScore] = useState<number>(argusStore.overallRiskScore);
  const [activeModel, setActiveModel] = useState<string>(argusStore.settings.modelName);
  const [caseId, setCaseId] = useState<string>(argusStore.caseId);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimeIST(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }));
      setTimeUTC(now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false }) + ' UTC');
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    const unsubscribe = argusStore.subscribe(() => {
      setRiskScore(argusStore.overallRiskScore);
      setActiveModel(argusStore.settings.modelName);
      setCaseId(argusStore.caseId);
    });

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  return (
    <header className="h-16 border-b border-slate-800/80 bg-black/90 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-4 select-none">
      {/* Left Branding & Case Selector */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg border border-cyan-500/50 bg-cyan-950/30 flex items-center justify-center shadow-cyber-cyan group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                ARGUS
              </span>
              <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono">
                Hac'KP 2026
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 tracking-tight hidden sm:block">
              Agentic Relational Graph for Unified Safeguarding
            </p>
          </div>
        </Link>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-slate-800 hidden md:block" />

        {/* Active Case Badge */}
        <div className="hidden lg:flex items-center space-x-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-md text-xs font-mono">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">ACTIVE:</span>
          <span className="text-cyan-300 font-semibold">{caseId}</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 truncate max-w-[200px]">Operation ShieldWatch</span>
        </div>
      </div>

      {/* Center Status Indicators */}
      <div className="hidden md:flex items-center space-x-6">
        {/* Threat Score Gauge */}
        <div className="flex items-center space-x-2 bg-pink-950/20 border border-pink-500/40 px-3 py-1.5 rounded-md shadow-cyber-pink">
          <Activity className="w-4 h-4 text-pink-500 animate-pulse" />
          <span className="text-xs font-mono text-slate-400">THREAT LEVEL:</span>
          <span className="text-sm font-mono font-bold text-pink-500 text-pink-glow">
            {riskScore}% HIGH
          </span>
        </div>

        {/* AI Provider Indicator */}
        <Link href="/settings" className="flex items-center space-x-2 bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 px-3 py-1.5 rounded-md text-xs font-mono transition-colors">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-slate-400">MODEL:</span>
          <span className="text-purple-300 truncate max-w-[140px]">{activeModel}</span>
        </Link>
      </div>

      {/* Right Time & Actions */}
      <div className="flex items-center space-x-4 font-mono text-xs">
        {/* Live Clock */}
        <div className="hidden xl:flex flex-col items-end text-slate-400 border-r border-slate-800 pr-4">
          <div className="flex items-center space-x-1.5 text-cyan-400 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>{timeIST} IST</span>
          </div>
          <span className="text-[10px] text-slate-500">{timeUTC}</span>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => {
              argusStore.addWatchtowerEvent({
                id: `wt-${Date.now()}`,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' IST',
                type: 'THREAT_SPIKE',
                source: 'Kerala Police AI Agent',
                message: 'Manual scan triggered: 2 new cross-platform accounts correlated in Kozhikode.',
                riskScore: 91.2,
                entityId: 'node-suspect-a'
              });
            }}
            className="flex items-center space-x-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-2.5 py-1.5 rounded-md text-xs font-mono transition-all hover:shadow-cyber-cyan"
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span className="hidden sm:inline">AUTONOMOUS SCAN</span>
          </button>

          <Link
            href="/reports"
            className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 px-2.5 py-1.5 rounded-md text-xs font-mono transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden lg:inline">INTEL BRIEF</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
