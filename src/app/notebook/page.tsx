'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { 
  BookOpenCheck, 
  Plus, 
  Download, 
  Filter, 
  Search,
  ChevronRight,
  FileText
} from 'lucide-react';
import { argusStore } from '@/lib/store';
import { NotebookEntry } from '@/types';

export default function NotebookPage() {
  const [notebook, setNotebook] = useState<NotebookEntry[]>(argusStore.notebook);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAgent, setFilterAgent] = useState('ALL');
  
  // Bookmarks & Expanded state
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    return argusStore.subscribe(() => {
      setNotebook(argusStore.notebook);
    });
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

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

  const filteredEntries = notebook.filter(entry => {
    const matchesAgent = filterAgent === 'ALL' || entry.agentName === filterAgent || entry.operationType === filterAgent;
    const matchesSearch = !searchQuery || 
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.agentName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAgent && matchesSearch;
  });

  const exportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notebook, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "ARGUS_Living_Notebook.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportPDF = () => {
    const printWin = window.open('', '_blank');
    if (!printWin) return;

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ARGUS_Living_Investigation_Notebook</title>
          <style>
            body { font-family: monospace; background: #000; color: #fff; padding: 24px; }
            h1 { color: #c084fc; border-bottom: 2px solid #c084fc; padding-bottom: 8px; }
            .entry { border: 1px solid #334155; padding: 12px; border-radius: 8px; margin-bottom: 12px; background: #090d16; }
            .title { color: #38bdf8; font-weight: bold; }
            .meta { color: #94a3b8; font-size: 11px; margin-top: 4px; }
          </style>
        </head>
        <body>
          <h1>ARGUS LIVING INVESTIGATION NOTEBOOK</h1>
          ${filteredEntries.map(e => `
            <div class="entry">
              <div class="title">${e.title} [${e.time}]</div>
              <p>${e.description}</p>
              <div class="meta">Agent: ${e.agentName} | Status: ${e.status} | ID: ${e.id}</div>
            </div>
          `).join('')}
          <script>setTimeout(() => window.print(), 500);</script>
        </body>
      </html>
    `);
    printWin.document.close();
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Top Banner */}
      <div className="glass-panel-glow p-5 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-black/80">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold">
            <BookOpenCheck className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>ARGUS PERSISTENT NOTEBOOK SYSTEM</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-0.5 text-white-glow">
            Living Investigation Notebook
          </h1>
          <p className="text-xs text-white/50">
            Real-time audit trail, sub-agent execution logs, reasoning steps & investigator annotations.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button 
            onClick={exportJSON}
            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-white/10 text-white px-3.5 py-2 rounded-xl transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-purple-400" />
            <span>EXPORT JSON</span>
          </button>
          <button 
            onClick={exportPDF}
            className="flex items-center space-x-2 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-300 px-3.5 py-2 rounded-xl transition-all cursor-pointer font-bold"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>PRINT PDF</span>
          </button>
        </div>
      </div>

      {/* Manual Officer Note Input Drawer */}
      <div className="glass-panel p-5 rounded-3xl border border-purple-500/30 bg-black/60 space-y-3">
        <h2 className="text-xs font-bold text-white flex items-center space-x-2">
          <Plus className="w-4 h-4 text-purple-400" />
          <span>INJECT INVESTIGATOR NOTE & REASONING</span>
        </h2>

        <form onSubmit={handleAddEntry} className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
          <input
            type="text"
            placeholder="Title (e.g. Encrypted vault key correlation confirmed)"
            value={newTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)}
            className="md:col-span-5 bg-slate-950 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none"
          />

          <input
            type="text"
            placeholder="Detailed reasoning & investigator note..."
            value={newDesc}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewDesc(e.target.value)}
            className="md:col-span-5 bg-slate-950 border border-white/10 focus:border-purple-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-cyber-purple flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ADD ENTRY</span>
          </button>
        </form>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 glass-card p-3 rounded-2xl border-white/10 text-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search notebook entries by title, description or agent..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl pl-9 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-3.5 h-3.5 text-purple-400" />
          <select
            value={filterAgent}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterAgent(e.target.value)}
            className="bg-black border border-white/10 rounded-xl px-3 py-2 text-slate-200 text-xs font-mono cursor-pointer"
          >
            <option value="ALL" className="bg-slate-950 text-white">ALL SUB-AGENTS</option>
            <option value="IngestionAgent-Alpha" className="bg-slate-950 text-white">IngestionAgent-Alpha</option>
            <option value="MetadataAgent-v4" className="bg-slate-950 text-white">MetadataAgent-v4</option>
            <option value="VisionMatch-Agent" className="bg-slate-950 text-white">VisionMatch-Agent</option>
            <option value="RelationalGraphAgent" className="bg-slate-950 text-white">RelationalGraphAgent</option>
            <option value="ThreatScoreEngine" className="bg-slate-950 text-white">ThreatScoreEngine</option>
            <option value="SupervisorAgent" className="bg-slate-950 text-white">SupervisorAgent</option>
          </select>
        </div>
      </div>

      {/* Audit Log Entries List with Expand / Collapse & Bookmarking */}
      <div className="space-y-3">
        {filteredEntries.map((entry) => {
          const isBookmarked = !!bookmarkedIds[entry.id];
          const isExpanded = !!expandedIds[entry.id];

          return (
            <div
              key={entry.id}
              className={`glass-panel p-4 rounded-2xl border transition-all space-y-3 ${
                isBookmarked ? 'border-purple-500 bg-purple-950/20' : 'border-white/10 bg-black/60 hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => toggleBookmark(entry.id)}
                    title={isBookmarked ? "Bookmarked" : "Bookmark Entry"}
                    className="p-1 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                  >
                    <FileText className={`w-4 h-4 ${isBookmarked ? 'text-purple-400 fill-purple-400' : 'text-slate-500'}`} />
                  </button>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{entry.title}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {entry.agentName}
                      </span>
                    </div>
                    <div className="text-[10px] text-white/40 space-x-3 mt-0.5">
                      <span>TIMESTAMP: {entry.time} ({entry.timestampISO})</span>
                      <span>ID: {entry.id}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                    entry.status === 'COMPLETE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                  }`}>
                    {entry.status}
                  </span>
                  
                  <button 
                    onClick={() => toggleExpand(entry.id)}
                    className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
                  </button>
                </div>
              </div>

              {/* Primary Description */}
              <p className="text-white/80 text-xs leading-relaxed pl-7">
                {entry.description}
              </p>

              {/* Expanded Collapsible Details */}
              {isExpanded && (
                <div className="pl-7 pt-2 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-white/70">
                  <div className="bg-slate-950 p-3 rounded-xl border border-white/10 space-y-1">
                    <div className="text-sky-400 font-bold">REASONING & LOGIC:</div>
                    <p className="text-white/60 leading-normal">
                      Evaluated relational distance across sub-agent multi-hop graph. Confidence threshold validated at 94%.
                    </p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-white/10 space-y-1">
                    <div className="text-purple-300 font-bold">ENTITIES & EVIDENCE INVOLVED:</div>
                    <p className="text-white/60 leading-normal">
                      Anil M. (@shadow_net_99), VOICE-NATIVE-882.wav, Kochi Cell Tower #404.
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
