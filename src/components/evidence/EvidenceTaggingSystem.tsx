'use client';

import React, { useState } from 'react';
import { BookOpenCheck, Plus, CheckCircle2 } from 'lucide-react';

interface EvidenceTaggingSystemProps {
  initialTags: string[];
  onTagsUpdated: (tags: string[]) => void;
}

const PRESET_TAGS = [
  '#location', '#account', '#device', '#chat', '#image', '#risk', '#timeline'
];

export const EvidenceTaggingSystem: React.FC<EvidenceTaggingSystemProps> = ({ initialTags, onTagsUpdated }) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [customTag, setCustomTag] = useState('');

  const toggleTag = (tag: string) => {
    const updated = tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag];
    setTags(updated);
    onTagsUpdated(updated);
  };

  const addCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTag.trim()) return;
    const formatted = customTag.startsWith('#') ? customTag.trim() : `#${customTag.trim()}`;
    if (!tags.includes(formatted)) {
      const updated = [...tags, formatted];
      setTags(updated);
      onTagsUpdated(updated);
    }
    setCustomTag('');
  };

  return (
    <div className="glass-panel p-4 rounded-3xl border border-white/10 bg-black/80 font-mono text-xs space-y-3">
      <div className="flex items-center space-x-2 text-sky-400 font-bold border-b border-white/10 pb-2">
        <BookOpenCheck className="w-3.5 h-3.5 text-sky-400" />
        <span>EVIDENCE TAGGING SYSTEM</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {PRESET_TAGS.map((tag) => {
          const isSelected = tags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-[10px] px-2.5 py-1 rounded-full font-bold transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                  : 'bg-white/5 text-white/50 border-white/10 hover:text-white'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <form onSubmit={addCustomTag} className="flex gap-2 pt-1">
        <input
          type="text"
          placeholder="Add custom tag (e.g. #telecom)..."
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-sky-500"
        />
        <button
          type="submit"
          className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-black font-bold rounded-xl transition-all flex items-center space-x-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>ADD</span>
        </button>
      </form>
    </div>
  );
};
