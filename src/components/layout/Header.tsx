'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Cpu, 
  Clock, 
  Layers, 
  Download, 
  Radio
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
    <header className="h-16 border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6 select-none print:hidden gap-4 overflow-x-auto no-scrollbar">
      {/* Left Branding & Case Selector */}
      <div className="flex items-center space-x-3 shrink-0 whitespace-nowrap">
        <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <ShieldAlert className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <span className="font-bold text-base tracking-tight text-white group-hover:text-white/80 transition-colors whitespace-nowrap">
              ARGUS.
            </span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/80 font-mono whitespace-nowrap shrink-0">
              CYBER COMMAND
            </span>
          </div>
        </Link>

        {/* Vertical Divider */}
        <div className="h-5 w-px bg-white/10 hidden md:block shrink-0" />

        {/* Active Case Badge */}
        <div className="hidden lg:inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-mono text-white/70 whitespace-nowrap shrink-0">
          <Layers className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>CASE:</span>
          <span className="text-white font-semibold whitespace-nowrap">{caseId}</span>
          <span className="text-white/30">|</span>
          <span className="text-white/60 whitespace-nowrap">Operation ShieldWatch</span>
        </div>
      </div>

      {/* Center Telemetry Status Indicators */}
      <div className="hidden md:flex items-center space-x-3 shrink-0 whitespace-nowrap">
        {/* AI Provider Indicator */}
        <Link href="/settings" className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 hover:border-white/25 px-3.5 py-1 rounded-full text-xs font-mono transition-colors whitespace-nowrap shrink-0">
          <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="text-white/60">ENGINE:</span>
          <span className="text-white font-medium whitespace-nowrap max-w-[160px] truncate">{activeModel}</span>
        </Link>
      </div>

      {/* Right Time & Actions */}
      <div className="flex items-center space-x-3 font-mono text-xs shrink-0 whitespace-nowrap">
        {/* Live Clock */}
        <div className="hidden xl:flex flex-col items-end text-white/50 border-r border-white/10 pr-3 shrink-0 whitespace-nowrap">
          <div className="flex items-center space-x-1.5 text-white font-semibold whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>{timeIST} IST</span>
          </div>
          <span className="text-[10px] text-white/40 whitespace-nowrap">{timeUTC}</span>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0 whitespace-nowrap">
          <button 
            onClick={() => {
              argusStore.addWatchtowerEvent({
                id: `wt-${Date.now()}`,
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' IST',
                type: 'THREAT_SPIKE',
                source: 'Autonomous AI Agent',
                message: 'Manual scan triggered: 2 new cross-platform accounts correlated.',
                riskScore: 91.2,
                entityId: 'node-suspect-a'
              });
            }}
            className="inline-flex items-center space-x-1.5 border border-white/20 hover:bg-white/10 text-white px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap shrink-0"
          >
            <Radio className="w-3.5 h-3.5 text-sky-400 animate-spin shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">AUTONOMOUS SCAN</span>
          </button>

          <Link
            href="/reports"
            className="inline-flex items-center space-x-1.5 bg-white text-black hover:bg-white/90 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-transform hover:scale-105 whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-black shrink-0" />
            <span className="hidden lg:inline whitespace-nowrap">INTEL BRIEF</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
