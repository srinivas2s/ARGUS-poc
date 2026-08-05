'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { 
  BrainCircuit, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  FileText, 
  Cpu, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { argusStore } from '@/lib/store';
import { XAIReasoningStep } from '@/types';

export default function ExplainableAIPage() {
  const [steps, setSteps] = useState<XAIReasoningStep[]>(argusStore.xaiSteps);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [commentInput, setCommentInput] = useState<string>('');

  useEffect(() => {
    return argusStore.subscribe(() => {
      setSteps(argusStore.xaiSteps);
    });
  }, []);

  const activeStep = steps[activeStepIndex] || steps[0];

  const handleApprove = () => {
    argusStore.approveXAIStep(activeStep.stepIndex, commentInput || 'DySP Approval Verified.');
    setCommentInput('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel-glow p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold">
            <BrainCircuit className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>KERALA POLICE HUMAN-IN-THE-LOOP GOVERNANCE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono mt-0.5">
            Explainable AI (XAI) & Auditability Matrix
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Multi-Step Reasoning Chains • Evidence Source Attribution • Investigator Sign-Off
          </p>
        </div>
      </div>

      {/* Main Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step Index List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 font-mono text-xs">
          <div className="text-slate-400 font-bold uppercase text-[10px] border-b border-slate-800 pb-2">
            REASONING TRACE STEPS ({steps.length})
          </div>

          {steps.map((st, idx) => (
            <div
              key={st.stepIndex}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activeStepIndex === idx
                  ? 'glass-panel-glow border-cyan-400 text-white shadow-cyber-cyan'
                  : 'glass-panel border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center">
                    {st.stepIndex}
                  </span>
                  <span className="font-bold text-sm truncate max-w-[200px]">{st.title}</span>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  st.approvalStatus === 'APPROVED' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                }`}>
                  {st.approvalStatus}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Step Details & Inspector Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-2xl space-y-5 border border-cyan-500/30 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-cyan-400 text-[10px] uppercase font-bold">STEP {activeStep.stepIndex} DETAILS</span>
                <h2 className="text-lg font-bold text-white mt-0.5">{activeStep.title}</h2>
              </div>
              <div className="text-right">
                <div className="text-slate-400 text-[10px]">CONFIDENCE SCORE</div>
                <div className="text-xl font-extrabold text-cyan-300">{activeStep.confidence}%</div>
              </div>
            </div>

            {/* Agent Info */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-slate-400 text-[10px]">EXECUTED BY SUB-AGENT</div>
              <div className="text-purple-300 font-bold text-sm">{activeStep.agent}</div>
            </div>

            {/* Inputs & Outputs */}
            <div className="space-y-3">
              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold mb-1">INPUT PARAMETERS</div>
                <div className="p-3 rounded-xl bg-black border border-slate-800 text-slate-300 font-sans text-xs">
                  {activeStep.inputs.join(' • ')}
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold mb-1">OUTPUT REASONING SYNTHESIS</div>
                <div className="p-3 rounded-xl bg-black border border-cyan-500/30 text-white font-sans text-xs leading-relaxed">
                  {activeStep.outputs}
                </div>
              </div>

              <div>
                <div className="text-slate-400 text-[10px] uppercase font-bold mb-1">ATTRIBUTED EVIDENCE SOURCES</div>
                <div className="flex flex-wrap gap-2">
                  {activeStep.evidenceSources.map((src) => (
                    <span key={src} className="px-2.5 py-1 rounded bg-slate-900 text-cyan-400 border border-slate-800 text-[11px]">
                      {src}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Investigator Approval Form */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="text-slate-400 text-[10px] uppercase font-bold">INVESTIGATOR COMMENT & APPROVAL STATUS</div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                {activeStep.investigatorComment || 'No investigator comment logged yet.'}
              </div>

              {activeStep.approvalStatus !== 'APPROVED' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Add official officer approval note..."
                    value={commentInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCommentInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-2 text-white text-xs"
                  />
                  <button
                    onClick={handleApprove}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition-all shadow-cyber-cyan flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>APPROVE REASONING STEP</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
