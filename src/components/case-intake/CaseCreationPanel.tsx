'use client';

import React, { useState } from 'react';
import { Layers, ShieldAlert, BookOpenCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { CaseModel } from '@/storage/localStorageProvider';
import { EvidenceService } from '@/services/evidenceService';

interface CaseCreationPanelProps {
  onCaseCreated: (c: CaseModel) => void;
}

export const CaseCreationPanel: React.FC<CaseCreationPanelProps> = ({ onCaseCreated }) => {
  const [caseId, setCaseId] = useState(`CASE-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [caseName, setCaseName] = useState('');
  const [priority, setPriority] = useState<CaseModel['priority']>('CRITICAL');
  const [description, setDescription] = useState('');
  const [assignedOfficer, setAssignedOfficer] = useState('Inv. Officer S. Nair');
  const [status, setStatus] = useState<CaseModel['status']>('UNDER_INVESTIGATION');
  const [tagInput, setTagInput] = useState('#csam, #telegram, #kochi');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseName.trim()) return;

    const parsedTags = tagInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0)
      .map(t => t.startsWith('#') ? t : `#${t}`);

    const newCase = await EvidenceService.createCase({
      id: caseId,
      name: caseName,
      priority,
      description: description || 'New investigative case file initiated under ARGUS Forensic Core.',
      assignedOfficer,
      status,
      tags: parsedTags
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
    onCaseCreated(newCase);
  };

  return (
    <div className="glass-panel p-5 rounded-3xl border border-sky-500/30 bg-black/80 font-mono text-xs space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2 text-sky-400 font-bold">
          <Layers className="w-4 h-4 text-sky-400 animate-pulse" />
          <span>CASE CREATION PANEL</span>
        </div>
        <span className="text-[10px] text-white/40 uppercase">LEVEL 4 CLEARANCE</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-white/50 font-bold block mb-1">CASE ID</label>
            <input
              type="text"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white font-bold focus:border-sky-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-[10px] text-white/50 font-bold block mb-1">PRIORITY LEVEL</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as CaseModel['priority'])}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white font-bold focus:border-sky-500 focus:outline-none cursor-pointer"
            >
              <option value="CRITICAL" className="bg-slate-950 text-rose-400">CRITICAL (TIER 1)</option>
              <option value="HIGH" className="bg-slate-950 text-amber-400">HIGH</option>
              <option value="MEDIUM" className="bg-slate-950 text-sky-400">MEDIUM</option>
              <option value="LOW" className="bg-slate-950 text-emerald-400">LOW</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] text-white/50 font-bold block mb-1">CASE NAME</label>
          <input
            type="text"
            placeholder="e.g. Operation Shieldwatch CSAM Probe"
            value={caseName}
            onChange={(e) => setCaseName(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-600 focus:border-sky-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="text-[10px] text-white/50 font-bold block mb-1">DESCRIPTION</label>
          <textarea
            rows={2}
            placeholder="Detailed case background, target handles, and seizure context..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white/80 placeholder-slate-600 focus:border-sky-500 focus:outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] text-white/50 font-bold block mb-1">ASSIGNED OFFICER</label>
            <input
              type="text"
              value={assignedOfficer}
              onChange={(e) => setAssignedOfficer(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-sky-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] text-white/50 font-bold block mb-1">CASE STATUS</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CaseModel['status'])}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-sky-500 focus:outline-none cursor-pointer"
            >
              <option value="UNDER_INVESTIGATION" className="bg-slate-950 text-sky-400">UNDER INVESTIGATION</option>
              <option value="OPEN" className="bg-slate-950 text-emerald-400">OPEN</option>
              <option value="PENDING_REVIEW" className="bg-slate-950 text-amber-400">PENDING REVIEW</option>
              <option value="CLOSED" className="bg-slate-950 text-slate-400">CLOSED</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] text-white/50 font-bold block mb-1">TAGS (COMMA SEPARATED)</label>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-sky-400 focus:border-sky-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-400 text-black font-extrabold py-2.5 rounded-xl transition-all shadow-cyber-cyan flex items-center justify-center space-x-2 cursor-pointer mt-2"
        >
          {isSaved ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>CASE RECORDED IN VAULT</span>
            </>
          ) : (
            <>
              <Layers className="w-4 h-4 text-black" />
              <span>CREATE CASE RECORD</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
