'use client';

import React from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  ShieldAlert, 
  Clock, 
  Network, 
  SearchCode, 
  Lightbulb, 
  AlertTriangle, 
  FileText,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { argusStore } from '@/lib/store';

export default function ReportsPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar (Hidden when printing) */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold">
            <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
            <span>OFFICIAL CLASSIFIED BRIEF GENERATOR</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono mt-0.5 text-white-glow">
            Automated Intelligence Case Brief
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Case ID: {argusStore.caseId} • Formatted for Official Command & Court Filings
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <button
            onClick={handlePrint}
            className="btn-cyan-gradient flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold"
          >
            <Printer className="w-4 h-4 text-black" />
            <span>PRINT / SAVE AS PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Official Law Enforcement Intelligence Sheet */}
      <div className="glass-panel p-8 md:p-12 rounded-2xl space-y-8 border border-slate-700 bg-slate-950/90 text-slate-100 printable-report font-serif leading-relaxed">
        
        {/* Report Official Header */}
        <div className="border-b-2 border-slate-400 pb-6 flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="space-y-1.5">
            <div className="text-xs tracking-widest uppercase font-bold text-slate-400 print:text-black">
              CYBER CRIME INVESTIGATION DIVISION // CONFIDENTIAL INTELLIGENCE BRIEF
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-white print:text-black tracking-tight">
              TACTICAL INTEL BRIEF: OPERATION SHIELDWATCH
            </h1>
            <div className="text-xs font-mono text-cyan-300 print:text-black">
              CASE REFERENCE: {argusStore.caseId} &nbsp;|&nbsp; CLASSIFICATION: TOP SECRET // AIR-GAPPED
            </div>
          </div>

          <div className="text-left md:text-right font-mono text-xs space-y-1 border-l-2 md:border-l-0 border-pink-500/40 pl-3 md:pl-0">
            <div className="text-pink-400 print:text-black font-bold text-sm">
              COMPOSITE THREAT SCORE: 89.4%
            </div>
            <div className="text-slate-400 print:text-black">
              DATE: {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })} IST
            </div>
            <div className="text-emerald-400 print:text-black font-semibold">
              STATUS: EVIDENCE VALIDATED
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-white print:text-black border-b border-slate-700 pb-1.5 flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400 print:hidden" />
            <span>1. EXECUTIVE SUMMARY</span>
          </h2>
          <p className="text-sm text-slate-200 print:text-black leading-normal">
            The ARGUS autonomous investigative intelligence system detected a high-priority grooming network targeting a minor subject in the central sector. Multi-modal correlation across Instagram handle <strong className="text-white print:text-black">@shadow_net_99</strong> and Telegram dark channel <strong className="text-white print:text-black">ShieldVault_Internal</strong> identified primary suspect Anil M. operating from Ernakulam district. Immediate law enforcement dispatch and tactical interception are recommended.
          </p>
        </section>

        {/* Section 2: Chronological Event Sequence */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-white print:text-black border-b border-slate-700 pb-1.5 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-cyan-400 print:hidden" />
            <span>2. CHRONOLOGICAL TIMELINE SUMMARY</span>
          </h2>
          <div className="space-y-2 text-xs font-serif">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-300 print:text-black font-bold text-xs">
                  <th className="py-2 px-2 w-24">TIME</th>
                  <th className="py-2 px-2">EVENT DESCRIPTION</th>
                  <th className="py-2 px-2 w-24 text-right">IMPACT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-slate-300">
                {argusStore.timeline.map((evt) => (
                  <tr key={evt.id} className="text-slate-200 print:text-black">
                    <td className="py-2 px-2 font-mono font-bold">{evt.time}</td>
                    <td className="py-2 px-2">
                      <strong className="text-white print:text-black">{evt.title}:</strong> {evt.description}
                    </td>
                    <td className="py-2 px-2 text-right font-mono font-bold text-pink-400 print:text-black">
                      +{evt.riskScoreImpact}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Relational Graph Topology */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-white print:text-black border-b border-slate-700 pb-1.5 flex items-center space-x-2">
            <Network className="w-4 h-4 text-cyan-400 print:hidden" />
            <span>3. CONNECTED ENTITY TOPOLOGY</span>
          </h2>
          <p className="text-sm text-slate-200 print:text-black">
            The relational graph engine mapped 9 distinct nodes across Persons, Devices, Accounts, and Stego Media files connected via 11 high-confidence relationships. Primary node <strong className="text-white print:text-black">Anil M. (@shadow_net_99)</strong> exhibits direct central degree connectivity to 4 secondary target aliases.
          </p>
        </section>

        {/* Section 4: Forensic Evidence Inventory */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-white print:text-black border-b border-slate-700 pb-1.5 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-cyan-400 print:hidden" />
            <span>4. FORENSIC EVIDENCE INVENTORY</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {argusStore.evidence.map((ev) => (
              <div key={ev.id} className="p-3 rounded border border-slate-800 print:border-slate-400 space-y-1">
                <div className="font-bold text-white print:text-black text-sm">{ev.title}</div>
                <div className="font-mono text-[10px] text-slate-400 print:text-black">SHA-256 Hash: {ev.hash}</div>
                <div className="text-xs text-slate-300 print:text-black">Source Telemetry: {ev.source}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Extracted Clues Matrix */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-white print:text-black border-b border-slate-700 pb-1.5 flex items-center space-x-2">
            <SearchCode className="w-4 h-4 text-cyan-400 print:hidden" />
            <span>5. EXTRACTED CLUES MATRIX</span>
          </h2>
          <ul className="space-y-1.5 text-xs text-slate-200 print:text-black list-disc pl-5">
            {argusStore.clues.map((c) => (
              <li key={c.id}>
                <strong>[{c.category}] {c.title}:</strong> {c.description} (Attributed Confidence: {c.confidenceScore}%)
              </li>
            ))}
          </ul>
        </section>

        {/* Section 6: Validated Hypotheses */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-white print:text-black border-b border-slate-700 pb-1.5 flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-cyan-400 print:hidden" />
            <span>6. VALIDATED HYPOTHESES & RISK REASONING</span>
          </h2>
          <div className="space-y-2 text-xs">
            {argusStore.hypotheses.map((h) => (
              <div key={h.id} className="p-3 rounded border border-slate-800 print:border-slate-400 flex justify-between items-center">
                <div>
                  <strong className="text-white print:text-black">{h.code}:</strong> {h.statement}
                </div>
                <span className="font-bold text-pink-400 print:text-black font-mono ml-4">{h.confidence}% CONFIDENCE</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 7: Tactical Recommendations */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-serif text-white print:text-black border-b border-slate-700 pb-1.5 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-pink-400 print:hidden" />
            <span>7. TACTICAL INTERCEPTION DIRECTIVES</span>
          </h2>
          <div className="p-4 rounded border border-slate-700 print:border-black text-xs space-y-2">
            <div className="font-bold text-white print:text-black">ACTION MANDATE FOR FIELD UNITS:</div>
            <ol className="list-decimal pl-5 space-y-1 text-slate-200 print:text-black">
              <li>Issue emergency cell tower warrant for BSSID 404-45 in the identified sector.</li>
              <li>Dispatch Cyber Cell rapid intervention unit to intercept vehicle serial ending in CY-8891.</li>
              <li>Notify National Child Safeguarding Committee for emergency victim protection protocols.</li>
            </ol>
          </div>
        </section>

        {/* Section 8: Formal Sign-off Block for Print */}
        <section className="pt-8 border-t-2 border-slate-400 flex justify-between items-end text-xs font-serif pt-6">
          <div className="space-y-8">
            <div>
              <div className="w-48 border-b border-slate-400 mb-1" />
              <div className="font-bold text-white print:text-black">Lead Forensic Investigator Signature</div>
              <div className="text-slate-400 print:text-black text-[10px]">Cyber Crime Unit, Officer Badge #7741</div>
            </div>
          </div>

          <div className="space-y-8 text-right">
            <div>
              <div className="w-48 border-b border-slate-400 mb-1 ml-auto" />
              <div className="font-bold text-white print:text-black">Senior Supervisor Approval</div>
              <div className="text-slate-400 print:text-black text-[10px]">Superintendent of Police // Cyber Command</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
