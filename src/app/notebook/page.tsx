'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { 
  BookOpenCheck, 
  Plus, 
  Cpu, 
  ShieldCheck, 
  Download, 
  Filter, 
  Clock, 
  Search,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { argusStore } from '@/lib/store';
import { NotebookEntry } from '@/types';

export default function NotebookPage() {
  const [notebook, setNotebook] = useState<NotebookEntry[]>(argusStore.notebook);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [filterAgent, setFilterAgent] = useState('ALL');

  useEffect(() => {
    return argusStore.subscribe(() => {
      setNotebook(argusStore.notebook);
    });
  }, []);

  const handleAddEntry = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    argusStore.addNotebookEntry({
      id: `nb-${Date.now()}`,
      time: timeStr,
      timestampISO: now.toISOString(),
      title: newTitle,
      description: newDesc || 'Manual officer observations recorded into ARGUS ledger.',
      agentName: 'OfficerManualNote',
      operationType: 'OFFICER_REVIEW',
      status: 'COMPLETE',
      riskScoreAfter: argusStore.overallRiskScore
    });

    setNewTitle('');
    setNewDesc('');
  };

  const filteredEntries = filterAgent === 'ALL'
    ? notebook
    : notebook.filter(n => n.agentName === filterAgent || n.operationType === filterAgent);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel-glow p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 font-mono text-xs font-semibold">
            <BookOpenCheck className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>KERALA POLICE AGENTIC AUDIT LEDGER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono mt-0.5">
            Living Investigation Notebook
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Continuous Real-Time Operational Audit Trail & Sub-Agent Execution Logs
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono text-xs">
          <button 
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notebook, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", "ARGUS_Notebook_Audit.json");
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 px-4 py-2.5 rounded-xl transition-colors"
          >
            <Download className="w-4 h-4 text-purple-400" />
            <span>EXPORT AUDIT LEDGER</span>
          </button>
        </div>
      </div>

      {/* Manual Officer Note Input Drawer */}
      <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 space-y-4">
        <h2 className="text-xs font-bold font-mono text-white flex items-center space-x-2">
          <Plus className="w-4 h-4 text-purple-400" />
          <span>INJECT OFFICER OBSERVATION NOTE</span>
        </h2>

        <form onSubmit={handleAddEntry} className="grid grid-cols-1 md:grid-cols-12 gap-3 font-mono text-xs">
          <input
            type="text"
            placeholder="Operation Title (e.g. Seized device decrypted in lab)"
            value={newTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
            className="md:col-span-5 bg-slate-900 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Detailed observation description..."
            value={newDesc}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewDesc(e.target.value)}
            className="md:col-span-5 bg-slate-900 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-cyber-purple flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>RECORD NOTE</span>
          </button>
        </form>
      </div>

      {/* Audit Log Stream */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs border-b border-slate-800 pb-2">
          <span className="text-slate-400 font-bold uppercase">AUTONOMOUS AUDIT ENTRIES ({filteredEntries.length})</span>
          <div className="flex items-center space-x-2">
            <Filter className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={filterAgent}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterAgent(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 text-[11px]"
            >
              <option value="ALL">ALL SUB-AGENTS</option>
              <option value="IngestionAgent-Alpha">IngestionAgent-Alpha</option>
              <option value="MetadataAgent-v4">MetadataAgent-v4</option>
              <option value="VisionMatch-Agent">VisionMatch-Agent</option>
              <option value="RelationalGraphAgent">RelationalGraphAgent</option>
              <option value="ThreatScoreEngine">ThreatScoreEngine</option>
              <option value="SupervisorAgent">SupervisorAgent</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className={`glass-panel p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-3 transition-all ${
                entry.status === 'PENDING_APPROVAL' 
                  ? 'border-pink-500/50 bg-pink-950/20' 
                  : 'border-slate-800 hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-extrabold text-sm whitespace-nowrap">
                  {entry.time}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{entry.title}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {entry.agentName}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs font-sans leading-relaxed">
                    {entry.description}
                  </p>
                  {entry.evidenceRef && (
                    <div className="text-[10px] text-cyan-400 font-mono">
                      REF: {entry.evidenceRef}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end space-y-1 self-end md:self-center">
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  entry.status === 'COMPLETE' 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-pink-500/20 text-pink-400 border border-pink-500/30 animate-pulse'
                }`}>
                  {entry.status}
                </span>
                {entry.riskScoreAfter && (
                  <span className="text-[10px] text-slate-400">
                    Risk After: <strong className="text-pink-400">{entry.riskScoreAfter}%</strong>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
