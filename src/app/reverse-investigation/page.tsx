'use client';

import React, { useState } from 'react';
import { 
  SearchCode, 
  AlertTriangle, 
  HelpCircle, 
  Clock, 
  Network, 
  FileQuestion, 
  RefreshCw,
  PlusCircle
} from 'lucide-react';
import { argusStore } from '@/lib/store';
import { ContradictionEngine } from '@/engines/contradiction-engine';

interface MissingGapItem {
  id: string;
  category: 'MISSING_ENTITY' | 'MISSING_METADATA' | 'MISSING_TIMESTAMP' | 'INCOMPLETE_RELATIONSHIP' | 'MISSING_EVIDENCE';
  title: string;
  description: string;
  impactScore: number;
  suggestedProbe: string;
  status: 'UNRESOLVED' | 'PROBING' | 'RESOLVED';
}

const INITIAL_GAPS: MissingGapItem[] = [
  {
    id: 'gap-001',
    category: 'MISSING_ENTITY',
    title: 'Unidentified Intermediary Telegram Admin',
    description: 'Relational gap detected between Anil M. and Channel HiddenVault_KL. An encrypted proxy middleman relay is missing from node graph.',
    impactScore: 88,
    suggestedProbe: 'Execute Telegram API hash lookup on bot admin handles.',
    status: 'UNRESOLVED'
  },
  {
    id: 'gap-002',
    category: 'MISSING_METADATA',
    title: 'Stripped EXIF Geo-Coordinates on EVID-9921.png',
    description: 'Image upload contains sanitized GPS tags. Camera hardware model and shutter speed metadata are missing.',
    impactScore: 76,
    suggestedProbe: 'Run Neural EXIF Recovery algorithm on thumbnail quant tables.',
    status: 'UNRESOLVED'
  },
  {
    id: 'gap-003',
    category: 'MISSING_TIMESTAMP',
    title: 'Unstamped Audio Intercept Chunk',
    description: 'VOICE-NATIVE-882.wav missing packet transmission header timestamp.',
    impactScore: 65,
    suggestedProbe: 'Align audio background noise frequency against ISP power grid hum.',
    status: 'PROBING'
  },
  {
    id: 'gap-004',
    category: 'INCOMPLETE_RELATIONSHIP',
    title: 'Unlinked Vehicle Ownership (Black Sedan KL-07-CY-8891)',
    description: 'Vehicle is linked to location pin but ownership registration entity link is broken.',
    impactScore: 82,
    suggestedProbe: 'Query Kerala MVD RTO registration database for plate KL-07-CY-8891.',
    status: 'UNRESOLVED'
  },
  {
    id: 'gap-005',
    category: 'MISSING_EVIDENCE',
    title: 'Corroborating Financial Transaction Log',
    description: 'Hypothesis H2 requires crypto wallet transaction ledger proof between suspect handles.',
    impactScore: 91,
    suggestedProbe: 'Scrape USDT TRC20 ledger addresses associated with @shadow_net_99.',
    status: 'UNRESOLVED'
  }
];

export default function ReverseInvestigationPage() {
  const [gaps, setGaps] = useState<MissingGapItem[]>(INITIAL_GAPS);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const contradictions = ContradictionEngine.detectConflicts([], [], []);

  const handleResolveGap = (id: string) => {
    setGaps(prev => prev.map(g => g.id === id ? { ...g, status: 'RESOLVED' } : g));
  };

  const filteredGaps = filterCategory === 'ALL'
    ? gaps
    : gaps.filter(g => g.category === filterCategory);

  return (
    <div className="space-y-6 pb-12 font-mono">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-sky-500/20 bg-black/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm tracking-wider">
            <SearchCode className="w-5 h-5 text-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>REVERSE INVESTIGATION & GAP ANALYSIS ENGINE</span>
          </div>
          <p className="text-white/60 text-xs mt-1 leading-relaxed max-w-2xl">
            Autonomous reverse-deduction system pinpointing missing entities, metadata voids, timestamp gaps, incomplete relationships, and unverified evidence.
          </p>
        </div>
        <button
          onClick={() => setGaps(INITIAL_GAPS)}
          className="px-4 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>RE-SCAN GAPS</span>
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 text-xs">
        {['ALL', 'MISSING_ENTITY', 'MISSING_METADATA', 'MISSING_TIMESTAMP', 'INCOMPLETE_RELATIONSHIP', 'MISSING_EVIDENCE'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
              filterCategory === cat
                ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-bold'
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Main List of Missing Gaps */}
      <div className="space-y-4">
        {filteredGaps.map((gap) => (
          <div 
            key={gap.id}
            className="glass-panel p-5 rounded-2xl border border-white/10 bg-black/60 hover:border-sky-500/40 transition-all space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-3">
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${
                  gap.category === 'MISSING_ENTITY' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
                  gap.category === 'MISSING_METADATA' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                  gap.category === 'MISSING_TIMESTAMP' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  gap.category === 'INCOMPLETE_RELATIONSHIP' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {gap.category.replace('_', ' ')}
                </span>
                <h3 className="text-white text-sm font-bold">{gap.title}</h3>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs text-rose-400 font-bold">IMPACT: {gap.impactScore}%</span>
                {gap.status === 'RESOLVED' ? (
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full">
                    RESOLVED
                  </span>
                ) : (
                  <button
                    onClick={() => handleResolveGap(gap.id)}
                    className="text-xs text-sky-400 hover:text-white bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 px-3 py-1 rounded-full cursor-pointer transition-all"
                  >
                    RESOLVE VOID
                  </button>
                )}
              </div>
            </div>

            <p className="text-white/70 text-xs leading-relaxed">{gap.description}</p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
              <div className="flex items-center space-x-2 text-sky-300">
                <PlusCircle className="w-3.5 h-3.5 text-sky-400" />
                <span>PROBE ACTION: {gap.suggestedProbe}</span>
              </div>
              <span className="text-white/40">GAP ID: {gap.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Contradiction Warnings Section */}
      <div className="pt-6 space-y-4">
        <h2 className="text-sm font-bold text-white flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>CONTRADICTION DETECTION ENGINE WARNINGS ({contradictions.length})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contradictions.map((c) => (
            <div key={c.id} className="glass-panel p-4 rounded-2xl border border-amber-500/30 bg-amber-950/10 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-amber-400 font-bold uppercase">{c.type} CONFLICT</span>
                <span className="text-rose-400 font-bold text-[10px] bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-500/30">{c.severity}</span>
              </div>
              <h4 className="text-white font-bold text-xs">{c.title}</h4>
              <p className="text-white/60 text-[11px] leading-relaxed">{c.description}</p>
              <div className="pt-2 text-[10px] text-white/50 border-t border-white/10 flex justify-between">
                <span>ACTION: {c.suggestedAction}</span>
                <span>{c.detectedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
