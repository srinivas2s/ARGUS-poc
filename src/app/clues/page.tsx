'use client';

import React, { useState, ChangeEvent } from 'react';
import { 
  SearchCode, 
  UserCheck, 
  MapPin, 
  AtSign, 
  MessageSquare, 
  FileText, 
  Smartphone, 
  Activity, 
  ShieldAlert,
  Search,
  Filter
} from 'lucide-react';
import { MOCK_CLUES } from '@/lib/mockData';
import { ClueCategory } from '@/types';

const CATEGORIES: { id: ClueCategory | 'ALL'; name: string; icon: any }[] = [
  { id: 'ALL', name: 'All Clues', icon: SearchCode },
  { id: 'Suspects', name: 'Suspects', icon: UserCheck },
  { id: 'Locations', name: 'Locations', icon: MapPin },
  { id: 'Aliases', name: 'Aliases', icon: AtSign },
  { id: 'Accounts', name: 'Accounts', icon: AtSign },
  { id: 'Conversations', name: 'Conversations', icon: MessageSquare },
  { id: 'Metadata', name: 'Metadata', icon: FileText },
  { id: 'Devices', name: 'Devices', icon: Smartphone },
  { id: 'Patterns', name: 'Patterns', icon: Activity },
];

export default function CluesPage() {
  const [activeCategory, setActiveCategory] = useState<ClueCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredClues = MOCK_CLUES.filter((clue) => {
    const matchesCategory = activeCategory === 'ALL' || clue.category === activeCategory;
    const matchesSearch = clue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          clue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          clue.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold">
            <SearchCode className="w-4 h-4 text-cyan-400" />
            <span>ARGUS FORENSIC CLUE MATRIX</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono mt-0.5 text-white-glow">
            Categorized Forensic Clue Board
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            8 Distinct Categories • Autonomous Multi-Modal Pattern Extraction
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search clues, hashes, handles..."
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-500 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-black font-bold shadow-cyber-cyan'
                  : 'glass-panel text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Clues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClues.map((clue) => (
          <div
            key={clue.id}
            className={`glass-panel p-5 rounded-2xl space-y-3 border flex flex-col justify-between transition-all hover:scale-[1.01] ${
              clue.riskLevel === 'CRITICAL' 
                ? 'border-pink-500/50 shadow-cyber-pink bg-pink-950/10' 
                : 'border-slate-800 hover:border-cyan-500/40'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                  {clue.category}
                </span>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  clue.riskLevel === 'CRITICAL' 
                    ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40' 
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  {clue.riskLevel} RISK
                </span>
              </div>

              <h2 className="font-mono font-bold text-white text-sm leading-snug">
                {clue.title}
              </h2>

              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                {clue.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 font-mono text-[11px]">
              <div className="flex justify-between items-center text-slate-400">
                <span>Confidence Score:</span>
                <span className="text-cyan-300 font-bold">{clue.confidenceScore}%</span>
              </div>

              <div className="flex justify-between items-center text-slate-400 text-[10px]">
                <span>Timestamp:</span>
                <span className="text-slate-500">{clue.timestamp}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {clue.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[9px]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
