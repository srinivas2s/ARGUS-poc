'use client';

import React, { useState, ChangeEvent } from 'react';
import { 
  Clock, 
  AtSign, 
  MessageSquare, 
  MapPin, 
  SearchCode, 
  TrendingUp, 
  Play, 
  Pause, 
  RotateCcw,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { MOCK_TIMELINE_EVENTS } from '@/lib/mockData';

export default function TimelinePage() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(MOCK_TIMELINE_EVENTS.length - 1);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>ARGUS FORENSIC TIMELINE ENGINE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono mt-0.5 text-white-glow">
            Timeline Reconstruction Engine
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Chronological Digital Footprint & Risk Score Velocity Scrubber
          </p>
        </div>

        {/* Scrubber Playback Controls */}
        <div className="flex items-center space-x-3 font-mono text-xs">
          <button
            onClick={() => setActiveStep(0)}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
            title="Reset to Start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handlePlayToggle}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold transition-all ${
              isPlaying
                ? 'bg-pink-500 text-white shadow-cyber-pink'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyber-cyan'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'PAUSE PLAYBACK' : 'SIMULATE RECONSTRUCTION'}</span>
          </button>
        </div>
      </div>

      {/* Scrubber Slider */}
      <div className="glass-panel p-5 rounded-2xl space-y-3 font-mono text-xs">
        <div className="flex justify-between text-slate-400">
          <span>TIME SCRUBBER SEQUENCE:</span>
          <span className="text-cyan-400 font-bold">
            EVENT {activeStep + 1} OF {MOCK_TIMELINE_EVENTS.length} ({MOCK_TIMELINE_EVENTS[activeStep].time})
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={MOCK_TIMELINE_EVENTS.length - 1}
          value={activeStep}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setActiveStep(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
      </div>

      {/* Main Chronological Timeline Stream */}
      <div className="relative border-l-2 border-cyan-500/40 ml-4 pl-6 space-y-8 py-4">
        {MOCK_TIMELINE_EVENTS.slice(0, activeStep + 1).map((evt, idx) => (
          <div key={evt.id} className="relative group">
            {/* Timeline Node Pulsing Dot */}
            <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-black border-2 border-cyan-400 flex items-center justify-center shadow-cyber-cyan">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* Event Glass Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center space-x-3">
                  <span className="text-cyan-400 font-extrabold text-sm px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30">
                    {evt.time}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 text-[10px] font-bold">
                    {evt.category}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-pink-400 font-bold">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{evt.riskScoreImpact}% RISK IMPACT</span>
                </div>
              </div>

              <h2 className="font-mono font-bold text-white text-lg pt-1">
                {evt.title}
              </h2>

              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                {evt.description}
              </p>

              <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center font-mono text-[11px] text-slate-400">
                <span>Confidence Rating: <strong className="text-cyan-300">{evt.confidence}%</strong></span>
                <span className="text-slate-500">ISO: {evt.timestampISO}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
