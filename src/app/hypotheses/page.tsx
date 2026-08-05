'use client';

import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  CheckCircle, 
  XCircle, 
  BrainCircuit, 
  FileText, 
  Share2, 
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { argusStore } from '@/lib/store';
import { Hypothesis } from '@/types';

export default function HypothesesPage() {
  const [hypotheses, setHypotheses] = useState<Hypothesis[]>(argusStore.hypotheses);

  useEffect(() => {
    return argusStore.subscribe(() => {
      setHypotheses(argusStore.hypotheses);
    });
  }, []);

  const handleValidate = (id: string) => {
    argusStore.updateHypothesisStatus(id, 'VALIDATED');
  };

  const handleReject = (id: string) => {
    argusStore.updateHypothesisStatus(id, 'REJECTED');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel-glow p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-pink-400 font-mono text-xs font-semibold">
            <Lightbulb className="w-4 h-4 text-pink-400 animate-pulse" />
            <span>KERALA POLICE AUTONOMOUS REASONING ENGINE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono mt-0.5">
            AI Hypothesis Engine & Confidence Matrix
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Probabilistic Evidence Synthesis • Automated Hypothesis Generation
          </p>
        </div>
      </div>

      {/* Hypothesis Cards */}
      <div className="space-y-6">
        {hypotheses.map((hyp) => (
          <div
            key={hyp.id}
            className={`glass-panel p-6 rounded-2xl border space-y-4 transition-all ${
              hyp.status === 'VALIDATED' 
                ? 'border-emerald-500/50 bg-emerald-950/10' 
                : hyp.status === 'REJECTED'
                ? 'border-red-500/30 bg-red-950/10 opacity-75'
                : 'border-cyan-500/30 hover:border-cyan-500/60'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-3">
                <span className="font-extrabold text-cyan-400 font-mono text-lg bg-cyan-950/50 px-3 py-1 rounded-lg border border-cyan-500/30">
                  {hyp.code}
                </span>
                <span className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${
                  hyp.status === 'VALIDATED' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                    : hyp.status === 'REJECTED'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  STATUS: {hyp.status}
                </span>
              </div>

              {/* Confidence Gauge */}
              <div className="flex items-center space-x-3 font-mono">
                <span className="text-xs text-slate-400">CONFIDENCE:</span>
                <span className={`text-2xl font-extrabold font-mono ${
                  hyp.confidence >= 90 ? 'text-pink-500 text-pink-glow' : 'text-cyan-400'
                }`}>
                  {hyp.confidence}%
                </span>
              </div>
            </div>

            {/* Statement */}
            <p className="text-white font-mono text-base font-semibold leading-snug">
              "{hyp.statement}"
            </p>

            {/* Reasoning Trace */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                AUTONOMOUS REASONING CHAIN
              </div>
              <ul className="space-y-1.5 font-sans text-xs text-slate-300 pl-4 list-disc">
                {hyp.reasoning.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>

            {/* Supporting Evidence Chips & Actions */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 font-mono text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-slate-500 text-[10px]">EVIDENCE REFS:</span>
                <div className="flex flex-wrap gap-1.5">
                  {hyp.supportingEvidence.map((ev) => (
                    <span key={ev} className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800 text-[10px]">
                      {ev}
                    </span>
                  ))}
                </div>
              </div>

              {/* Investigator Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleValidate(hyp.id)}
                  className="flex items-center space-x-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>VALIDATE</span>
                </button>

                <button
                  onClick={() => handleReject(hyp.id)}
                  className="flex items-center space-x-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>REJECT</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
