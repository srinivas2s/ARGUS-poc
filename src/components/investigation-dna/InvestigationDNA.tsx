'use client';

import React from 'react';
import { 
  AtSign, 
  Smartphone, 
  MapPin, 
  UserCheck, 
  Activity, 
  Network, 
  ShieldAlert,
  Dna
} from 'lucide-react';
import { argusStore } from '@/lib/store';

export const InvestigationDNA: React.FC = () => {
  const nodes = argusStore.nodes;
  const edges = argusStore.edges;

  const accountsCount = nodes.filter(n => n.type === 'Account').length;
  const devicesCount = nodes.filter(n => n.type === 'Device').length;
  const locationsCount = nodes.filter(n => n.type === 'Location').length;
  const aliasesCount = 6; // Extracted alias handles
  const patternsCount = 9; // Discovered behavioural patterns
  const relationshipsCount = edges.length;

  const highestRisk = Math.max(...nodes.map(n => n.riskScore), 94);

  const DNA_METRICS = [
    { label: 'ACCOUNTS', count: accountsCount, total: 15, icon: AtSign, color: 'text-blue-400', barBg: 'bg-blue-500' },
    { label: 'DEVICES', count: devicesCount, total: 10, icon: Smartphone, color: 'text-purple-300', barBg: 'bg-purple-500' },
    { label: 'LOCATIONS', count: locationsCount, total: 12, icon: MapPin, color: 'text-emerald-400', barBg: 'bg-emerald-500' },
    { label: 'ALIASES', count: aliasesCount, total: 10, icon: UserCheck, color: 'text-cyan-400', barBg: 'bg-cyan-500' },
    { label: 'PATTERNS', count: patternsCount, total: 12, icon: Activity, color: 'text-amber-400', barBg: 'bg-amber-500' },
    { label: 'RELATIONSHIPS', count: relationshipsCount, total: 20, icon: Network, color: 'text-indigo-400', barBg: 'bg-indigo-500' },
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 bg-black/80 space-y-4 font-mono select-none">
      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs tracking-wider">
          <Dna className="w-4 h-4 text-sky-400 animate-pulse" />
          <span>INVESTIGATION DNA PROFILE</span>
        </div>
        <div className="flex items-center space-x-2 text-[10px]">
          <span className="text-white/40">GENOME TYPE:</span>
          <span className="text-emerald-400 font-bold uppercase">CSAM-AI-SOLVER</span>
        </div>
      </div>

      {/* Overall Risk Score Ring */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 via-black to-slate-950 border border-rose-500/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-rose-400 animate-pulse" />
          </div>
          <div>
            <div className="text-xs text-white font-bold">OVERALL THREAT RISK SCORE</div>
            <div className="text-[10px] text-white/50">Calculated across 11 nodes & 9 hypotheses</div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-extrabold text-rose-400 tracking-tight">{highestRisk}%</span>
          <span className="block text-[9px] text-rose-500 font-bold uppercase tracking-widest">CRITICAL LEVEL</span>
        </div>
      </div>

      {/* Grid of 6 DNA Metrics with Animated Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
        {DNA_METRICS.map((item) => {
          const Icon = item.icon;
          const percentage = Math.min(100, Math.round((item.count / item.total) * 100));

          return (
            <div 
              key={item.label}
              className="p-3 rounded-2xl border border-white/10 bg-white/5 space-y-2 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span className="text-white/70 font-semibold">{item.label}</span>
                </div>
                <span className="text-white font-bold">{item.count}</span>
              </div>

              {/* Animated Progress Indicator */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ease-out ${item.barBg}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              
              <div className="flex justify-between text-[9px] text-white/40">
                <span>COVERAGE</span>
                <span>{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
