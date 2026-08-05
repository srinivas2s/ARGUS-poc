'use client';

import React from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  Download, 
  ShieldAlert, 
  Clock, 
  Network, 
  SearchCode, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { argusStore } from '@/lib/store';

export default function ReportsPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold">
            <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
            <span>KERALA POLICE OFFICIAL CLASSIFIED REPORT</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono mt-0.5">
            Automated Intelligence Case Brief
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Case ID: {argusStore.caseId} • Generated for DySP Ernakulam Supervisor Review
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2.5 rounded-xl font-bold transition-all shadow-cyber-cyan"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / SAVE PDF REPORT</span>
          </button>
        </div>
      </div>

      {/* Printable Report Sheet */}
      <div className="glass-panel p-8 rounded-2xl space-y-8 border border-slate-700 bg-slate-950/90 text-slate-100 print:bg-white print:text-black print:p-0 print:shadow-none font-sans">
        {/* Report Header */}
        <div className="border-b-2 border-cyan-500/50 pb-6 flex justify-between items-start font-mono">
          <div className="space-y-1">
            <div className="text-cyan-400 font-bold text-sm tracking-widest">STATE CRIME RECORDS BUREAU // KERALA POLICE</div>
            <h2 className="text-3xl font-extrabold text-white print:text-black">TACTICAL INTEL BRIEF: OPERATION SHIELDWATCH</h2>
            <div className="text-xs text-slate-400">CASE FILE: {argusStore.caseId} | CLASSIFICATION: TOP SECRET / AIR-GAPPED</div>
          </div>
          <div className="text-right space-y-1 text-xs">
            <div className="text-pink-500 font-bold text-base">COMPOSITE THREAT: 89.4%</div>
            <div className="text-slate-400">DATE: 06-AUG-2026 IST</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <section className="space-y-2">
          <h3 className="text-lg font-bold font-mono text-cyan-400 border-b border-slate-800 pb-1 flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <span>1. EXECUTIVE SUMMARY</span>
          </h3>
          <p className="text-sm leading-relaxed text-slate-300 print:text-black">
            The ARGUS autonomous investigative intelligence system detected a high-priority grooming network targeting a minor subject in Thiruvananthapuram. Multi-modal correlation across Instagram handle <code className="text-cyan-300">@shadow_net_99</code> and Telegram vault <code className="text-cyan-300">ShieldVault_Internal</code> identified primary suspect Anil M. operating from Ernakulam district. Immediate dispatch recommended.
          </p>
        </section>

        {/* Section 2: Timeline Summary */}
        <section className="space-y-2">
          <h3 className="text-lg font-bold font-mono text-cyan-400 border-b border-slate-800 pb-1 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>2. CHRONOLOGICAL TIMELINE SUMMARY</span>
          </h3>
          <div className="space-y-2 font-mono text-xs">
            {argusStore.timeline.map((evt) => (
              <div key={evt.id} className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex justify-between">
                <div>
                  <strong className="text-cyan-300">{evt.time}</strong> - {evt.title}
                  <p className="text-slate-400 font-sans text-xs">{evt.description}</p>
                </div>
                <span className="text-pink-400 font-bold">+{evt.riskScoreImpact}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Relational Connections */}
        <section className="space-y-2">
          <h3 className="text-lg font-bold font-mono text-cyan-400 border-b border-slate-800 pb-1 flex items-center space-x-2">
            <Network className="w-5 h-5 text-cyan-400" />
            <span>3. CONNECTED ENTITY TOPOLOGY</span>
          </h3>
          <p className="text-sm text-slate-300 font-sans">
            Graph engine mapped 9 nodes across Persons, Devices, Accounts, and Stego Media files connected via 11 high-confidence relationships.
          </p>
        </section>

        {/* Section 4: Evidence Inventory */}
        <section className="space-y-2">
          <h3 className="text-lg font-bold font-mono text-cyan-400 border-b border-slate-800 pb-1 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>4. FORENSIC EVIDENCE INVENTORY</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {argusStore.evidence.map((ev) => (
              <div key={ev.id} className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white">{ev.title}</div>
                <div className="text-slate-400 text-[10px]">Hash: {ev.hash}</div>
                <div className="text-cyan-300 text-[10px]">Source: {ev.source}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Categorized Clues */}
        <section className="space-y-2">
          <h3 className="text-lg font-bold font-mono text-cyan-400 border-b border-slate-800 pb-1 flex items-center space-x-2">
            <SearchCode className="w-5 h-5 text-cyan-400" />
            <span>5. EXTRACTED CLUES MATRIX</span>
          </h3>
          <ul className="space-y-1 font-mono text-xs text-slate-300 list-disc pl-5">
            {argusStore.clues.map((c) => (
              <li key={c.id}>
                <strong className="text-white">[{c.category}] {c.title}:</strong> {c.description} (Confidence: {c.confidenceScore}%)
              </li>
            ))}
          </ul>
        </section>

        {/* Section 6 & 7: Hypotheses & Risk Assessment */}
        <section className="space-y-2">
          <h3 className="text-lg font-bold font-mono text-cyan-400 border-b border-slate-800 pb-1 flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-cyan-400" />
            <span>6. VALIDATED HYPOTHESES & RISK ASSESSMENT</span>
          </h3>
          <div className="space-y-2 font-mono text-xs">
            {argusStore.hypotheses.map((h) => (
              <div key={h.id} className="p-3 rounded bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-cyan-300">{h.code}: {h.statement}</span>
                  <span className="text-pink-400 font-bold">{h.confidence}% CONFIDENCE</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Recommendations */}
        <section className="space-y-2">
          <h3 className="text-lg font-bold font-mono text-pink-500 border-b border-slate-800 pb-1 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-pink-500" />
            <span>7. TACTICAL RECOMMENDATIONS FOR KERALA POLICE</span>
          </h3>
          <div className="p-4 rounded-xl bg-pink-950/20 border border-pink-500/40 space-y-2 font-mono text-xs text-slate-200">
            <div className="font-bold text-pink-400 text-sm">IMMEDIATE ACTION DIRECTIVE:</div>
            <ol className="list-decimal pl-5 space-y-1 font-sans text-xs">
              <li>Issue emergency cell tower warrant for Kaloor BSSID 404-45 (Ernakulam District).</li>
              <li>Dispatch Cyber Cell rapid intervention unit to intercept vehicle KL-07-CY-8891.</li>
              <li>Notify Kerala State Child Welfare Committee for emergency victim protection protocols.</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
