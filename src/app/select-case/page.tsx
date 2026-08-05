'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldAlert, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  FolderLock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { argusStore, AVAILABLE_CASES } from '@/lib/store';

export default function SelectCasePage() {
  const router = useRouter();
  const activeCaseId = argusStore.caseId;

  const handleSelectCase = (caseId: string) => {
    argusStore.setCase(caseId);
    router.push('/dashboard');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 cyber-grid-bg">
      {/* Radial spotlight effect */}
      <div className="absolute inset-0 bg-grid pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      <div className="relative z-10 max-w-3xl w-full space-y-8 my-auto">
        {/* Header Title */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-3"
        >
          <div className="w-14 h-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mx-auto shadow-xl">
            <FolderLock className="w-7 h-7 text-white" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
              INVESTIGATION DISPATCH CENTER
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-serif">
              Select Active Intelligence Case
            </h1>
          </div>
          <p className="text-xs text-slate-400 font-mono max-w-md mx-auto">
            Choose an active child protection case file to load relational graph topologies, clue ledgers, and live telemetry feeds.
          </p>
        </motion.div>

        {/* Case Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {AVAILABLE_CASES.map((c) => {
            const isSelected = c.id === activeCaseId;
            return (
              <div
                key={c.id}
                onClick={() => handleSelectCase(c.id)}
                className={`glass-card p-6 rounded-3xl cursor-pointer flex flex-col justify-between space-y-4 group transition-all duration-300 ${
                  isSelected 
                    ? 'border-sky-500/50 bg-sky-500/10 shadow-lg shadow-sky-500/10' 
                    : 'hover:border-white/30 hover:bg-white/[0.06]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-semibold text-sky-400 flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{c.id}</span>
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      c.status === 'ACTIVE' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors font-serif">
                      {c.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Child Protection Taskforce sector monitoring • Real-time NLP & graph correlation active.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400">Threat Level:</span>
                    <span className="font-bold text-rose-400">{c.threatScore}%</span>
                  </div>

                  <div className="flex items-center space-x-1 text-white font-semibold text-xs group-hover:translate-x-1 transition-transform">
                    <span>ENTER CASE</span>
                    <ArrowRight className="w-4 h-4 text-sky-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
