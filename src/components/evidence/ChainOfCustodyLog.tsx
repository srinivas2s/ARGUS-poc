'use client';

import React from 'react';
import { Clock, ShieldCheck, UserCheck, Activity } from 'lucide-react';
import { CustodyLogEntry } from '@/storage/localStorageProvider';

interface ChainOfCustodyLogProps {
  logs: CustodyLogEntry[];
}

export const ChainOfCustodyLog: React.FC<ChainOfCustodyLogProps> = ({ logs }) => {
  return (
    <div className="glass-panel p-5 rounded-3xl border border-sky-500/30 bg-black/80 font-mono text-xs space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2 text-sky-400 font-bold">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>CHAIN-OF-CUSTODY AUDIT LOG</span>
        </div>
        <span className="text-[10px] text-white/40">VERIFIED TIMELINE</span>
      </div>

      <div className="space-y-3 pl-2 relative border-l border-sky-500/30 ml-2">
        {logs.map((log) => (
          <div key={log.id} className="relative pl-4 space-y-0.5">
            {/* Timeline Pin Dot */}
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-sky-400 border-2 border-black" />

            <div className="flex items-center justify-between text-[10px]">
              <span className="text-sky-400 font-extrabold">{log.timestamp}</span>
              <span className="text-white/40">{log.actor}</span>
            </div>

            <p className="text-white/80 text-xs font-semibold">{log.action}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
