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
  Sparkles,
  Cpu,
  CheckCircle2
} from 'lucide-react';
import { argusStore } from '@/lib/store';

export default function ReportsPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* WEB VIEW ONLY: Sleek Dark AI Case Intelligence Briefing Tab   */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-6 print:hidden">
        {/* Top Action Header Bar */}
        <div className="glass-card p-6 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2 text-sky-400 font-mono text-xs font-semibold">
              <FileSpreadsheet className="w-4 h-4 text-sky-400" />
              <span>AI CASE REPORT & SYNTHESIS DASHBOARD</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight font-serif mt-1">
              Autonomous AI Intelligence Summary
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Active Case: <span className="text-sky-300 font-bold">{argusStore.caseId}</span> ({argusStore.caseName})
            </p>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs">
            <button
              onClick={handlePrint}
              className="btn-white-pill flex items-center space-x-2 px-5 py-3 rounded-full font-bold shadow-lg"
            >
              <Printer className="w-4 h-4 text-black" />
              <span>EXPORT FORMAL COURT REPORT / PDF</span>
            </button>
          </div>
        </div>

        {/* AI Key Insights Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-sans">
          <div className="glass-card p-5 rounded-2xl space-y-1 border-sky-500/30">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>Overall Threat</span>
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-3xl font-extrabold text-rose-400 font-mono">89.4%</div>
            <div className="text-[10px] text-rose-300 font-mono">HIGH RISK ALARM</div>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-1 border-indigo-500/30">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>Correlated Nodes</span>
              <Network className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-mono">9 Nodes</div>
            <div className="text-[10px] text-sky-400 font-mono">11 DIRECT LINKS</div>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-1 border-purple-500/30">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>Forensic Clues</span>
              <SearchCode className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-purple-300 font-mono">8 Extracted</div>
            <div className="text-[10px] text-purple-400 font-mono">LSB STEGO + EXIF</div>
          </div>

          <div className="glass-card p-5 rounded-2xl space-y-1 border-emerald-500/30">
            <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
              <span>Top Hypothesis</span>
              <Lightbulb className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">91% Conf</div>
            <div className="text-[10px] text-emerald-300 font-mono">SUSPECT CORRELATION</div>
          </div>
        </div>

        {/* AI Generated Findings Feed */}
        <div className="glass-card p-6 md:p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-5 h-5 text-sky-400 animate-spin" />
              <h2 className="text-xl font-bold text-white font-serif">
                AI Autonomous Findings & Case Synthesis
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Engine: {argusStore.settings.modelName}</span>
            </div>
          </div>

          {/* Core Findings Cards */}
          <div className="space-y-4 font-sans text-sm">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-sky-400">
                <span className="font-bold flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>PRIMARY TARGET & TELEMETRY IDENTIFIED</span>
                </span>
                <span>CONFIDENCE: 94%</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sub-agent stylometry engine correlated Instagram account <strong className="text-white">@shadow_net_99</strong> with darknet Telegram channel <strong className="text-white">ShieldVault_Internal</strong>. EXIF metadata extracted from seized media <code className="text-sky-300">EVID-9921.png</code> placed target device in Kaloor sector.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-purple-400">
                <span className="font-bold flex items-center space-x-1.5">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>DIGITAL FOOTPRINT RECONSTRUCTION</span>
                </span>
                <span>5 TIMELINE STAGES</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Sequence established target account creation at 10:25 PM, flagged grooming discourse at 10:42 PM, and cell tower triangulation at 11:08 PM. Risk score escalated to critical 89.4% at 11:35 PM.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-rose-400">
                <span className="font-bold flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>TACTICAL ACTION DIRECTIVE</span>
                </span>
                <span>IMMEDIATE INTERCEPTION</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed">
                Recommend rapid dispatch of field units to intercept vehicle serial CY-8891 and issue cell tower warrant for BSSID 404-45.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PRINT VIEW ONLY: Formal Law Enforcement Intelligence Sheet     */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden print:block printable-report font-serif space-y-8 p-10 bg-white text-black">
        {/* Official Header */}
        <div className="border-b-2 border-black pb-4 flex justify-between items-start">
          <div>
            <div className="text-xs uppercase font-bold tracking-widest text-black">
              CYBER CRIME INVESTIGATION DIVISION // CONFIDENTIAL INTELLIGENCE BRIEF
            </div>
            <h1 className="text-2xl font-bold font-serif text-black mt-1">
              TACTICAL INTEL BRIEF: OPERATION SHIELDWATCH
            </h1>
            <div className="text-xs font-mono text-black mt-1">
              CASE FILE: {argusStore.caseId} &nbsp;|&nbsp; CLASSIFICATION: TOP SECRET // AIR-GAPPED
            </div>
          </div>

          <div className="text-right font-mono text-xs space-y-1">
            <div className="font-bold text-black text-sm">THREAT SCORE: 89.4%</div>
            <div>DATE: {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })} IST</div>
            <div>STATUS: EVIDENCE VALIDATED</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <section className="space-y-2">
          <h2 className="text-base font-bold font-serif border-b border-black pb-1 uppercase">
            1. Executive Summary
          </h2>
          <p className="text-xs text-black leading-relaxed">
            The ARGUS autonomous investigative intelligence system detected a high-priority grooming network targeting a minor subject in the central sector. Multi-modal correlation across Instagram handle <strong>@shadow_net_99</strong> and Telegram dark channel <strong>ShieldVault_Internal</strong> identified primary suspect Anil M. operating from Ernakulam district. Immediate law enforcement dispatch and tactical interception are recommended.
          </p>
        </section>

        {/* Section 2: Timeline Table */}
        <section className="space-y-2">
          <h2 className="text-base font-bold font-serif border-b border-black pb-1 uppercase">
            2. Chronological Timeline Summary
          </h2>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-black font-bold">
                <th className="py-1 px-1 w-20">Time</th>
                <th className="py-1 px-1">Event Description</th>
                <th className="py-1 px-1 w-16 text-right">Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/30">
              {argusStore.timeline.map((evt) => (
                <tr key={evt.id}>
                  <td className="py-1 px-1 font-mono font-bold">{evt.time}</td>
                  <td className="py-1 px-1">
                    <strong>{evt.title}:</strong> {evt.description}
                  </td>
                  <td className="py-1 px-1 text-right font-mono font-bold">+{evt.riskScoreImpact}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Section 3: Forensic Evidence Inventory */}
        <section className="space-y-2">
          <h2 className="text-base font-bold font-serif border-b border-black pb-1 uppercase">
            3. Forensic Evidence Inventory
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {argusStore.evidence.map((ev) => (
              <div key={ev.id} className="p-2 border border-black space-y-0.5 min-w-0 overflow-hidden">
                <div className="font-bold truncate">{ev.title}</div>
                <div className="font-mono text-[10px] break-all leading-snug">SHA-256: {ev.hash}</div>
                <div className="text-[10px] truncate">Source: {ev.source}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Clues & Hypotheses */}
        <section className="space-y-2">
          <h2 className="text-base font-bold font-serif border-b border-black pb-1 uppercase">
            4. Extracted Clues & Validated Hypotheses
          </h2>
          <ul className="list-disc pl-5 text-xs space-y-1">
            {argusStore.hypotheses.map((h) => (
              <li key={h.id}>
                <strong>[{h.code}] {h.statement}</strong> (Attributed Confidence: {h.confidence}%)
              </li>
            ))}
          </ul>
        </section>

        {/* Section 5: Action Directives */}
        <section className="space-y-2">
          <h2 className="text-base font-bold font-serif border-b border-black pb-1 uppercase">
            5. Tactical Interception Directives
          </h2>
          <ol className="list-decimal pl-5 text-xs space-y-1">
            <li>Issue emergency cell tower warrant for BSSID 404-45 in the identified sector.</li>
            <li>Dispatch Cyber Cell rapid intervention unit to intercept vehicle serial ending in CY-8891.</li>
            <li>Notify National Child Safeguarding Committee for emergency victim protection protocols.</li>
          </ol>
        </section>

        {/* Formal Sign-off */}
        <section className="pt-10 border-t border-black flex justify-between items-end text-xs font-serif">
          <div>
            <div className="w-48 border-b border-black mb-1" />
            <div className="font-bold">Lead Forensic Investigator Signature</div>
            <div className="text-[10px]">Cyber Crime Unit, Badge #7741</div>
          </div>

          <div className="text-right">
            <div className="w-48 border-b border-black mb-1 ml-auto" />
            <div className="font-bold">Senior Supervisor Approval</div>
            <div className="text-[10px]">Superintendent of Police // Cyber Command</div>
          </div>
        </section>

      </div>
    </div>
  );
}
