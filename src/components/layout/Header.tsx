'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  Clock, 
  Layers, 
  Download, 
  Radio,
  ChevronDown,
  Check,
  User,
  LogOut,
  LogIn
} from 'lucide-react';
import { argusStore, AVAILABLE_CASES, AuthUser } from '@/lib/store';
import Link from 'next/link';

export const Header: React.FC = () => {
  const [timeIST, setTimeIST] = useState<string>('');
  const [timeUTC, setTimeUTC] = useState<string>('');
  const [activeModel, setActiveModel] = useState<string>(argusStore.settings.modelName);
  const [caseId, setCaseId] = useState<string>(argusStore.caseId);
  const [caseName, setCaseName] = useState<string>(argusStore.caseName);
  const [user, setUser] = useState<AuthUser | null>(argusStore.user);
  
  const [isCaseDropdownOpen, setIsCaseDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimeIST(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }));
      setTimeUTC(now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false }) + ' UTC');
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    const unsubscribe = argusStore.subscribe(() => {
      setActiveModel(argusStore.settings.modelName);
      setCaseId(argusStore.caseId);
      setCaseName(argusStore.caseName);
      setUser(argusStore.user);
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCaseDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearInterval(interval);
      unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 border-b border-white/10 bg-black/80 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6 select-none print:hidden gap-4 overflow-visible">
      {/* Left Branding & Interactive Case Selector */}
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

        {/* Active Case Selector Dropdown */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setIsCaseDropdownOpen(!isCaseDropdownOpen)}
            className="hidden lg:inline-flex items-center space-x-2 bg-white/5 border border-white/10 hover:border-white/25 px-3.5 py-1 rounded-full text-xs font-mono text-white/80 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>CASE:</span>
            <span className="text-white font-semibold whitespace-nowrap">{caseId}</span>
            <span className="text-white/30">|</span>
            <span className="text-white/60 whitespace-nowrap max-w-[150px] truncate">{caseName}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-white/50 transition-transform ${isCaseDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isCaseDropdownOpen && (
            <div className="absolute left-0 mt-2 w-80 bg-slate-950 border border-white/15 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl space-y-1 font-mono text-xs">
              <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-slate-400 font-semibold border-b border-white/10">
                ACTIVE CASE FILE REGISTRY
              </div>
              {AVAILABLE_CASES.map((c) => {
                const isSelected = c.id === caseId;
                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      argusStore.setCase(c.id);
                      setIsCaseDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                      isSelected 
                        ? 'bg-sky-500/15 border border-sky-500/30 text-white' 
                        : 'hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold flex items-center space-x-1.5">
                        <span className={isSelected ? 'text-sky-400' : 'text-white'}>{c.id}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans">{c.name}</div>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                        {c.threatScore}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
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

      {/* Right Time & Actions & Auth User */}
      <div className="flex items-center space-x-3 font-mono text-xs shrink-0 whitespace-nowrap">
        {/* User Auth Status Pill */}
        {user ? (
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-mono text-emerald-300 whitespace-nowrap shrink-0">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">{user.name}</span>
            <button 
              onClick={() => argusStore.logout()} 
              title="Sign Out"
              className="text-emerald-400/60 hover:text-emerald-200 transition-colors ml-1"
            >
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="inline-flex items-center space-x-1.5 border border-white/20 hover:bg-white/10 text-white px-3 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap shrink-0"
          >
            <LogIn className="w-3.5 h-3.5 text-sky-400" />
            <span>LOG IN</span>
          </Link>
        )}

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
