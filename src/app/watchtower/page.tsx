'use client';

import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldAlert, 
  Flame, 
  TrendingUp, 
  Network, 
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';
import { argusStore } from '@/lib/store';
import { WatchtowerEvent } from '@/types';

export default function WatchtowerPage() {
  const [isActive, setIsActive] = useState<boolean>(argusStore.isWatchtowerActive);
  const [events, setEvents] = useState<WatchtowerEvent[]>(argusStore.watchtowerEvents);
  const [riskScore, setRiskScore] = useState<number>(argusStore.overallRiskScore);

  useEffect(() => {
    return argusStore.subscribe(() => {
      setIsActive(argusStore.isWatchtowerActive);
      setEvents(argusStore.watchtowerEvents);
      setRiskScore(argusStore.overallRiskScore);
    });
  }, []);

  // Simulate incoming live telemetry stream
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const types: WatchtowerEvent['type'][] = [
        'NEW_RELATIONSHIP', 'THREAT_SPIKE', 'METADATA_CORRELATION', 'MEDIA_DETECTION', 'LOCATION_PING'
      ];
      const selectedType = types[Math.floor(Math.random() * types.length)];
      const nowStr = new Date().toLocaleTimeString('en-US', { hour12: false }) + ' IST';

      const newEvent: WatchtowerEvent = {
        id: `wt-${Date.now()}`,
        timestamp: nowStr,
        type: selectedType,
        source: 'Kerala Police AI Watchtower',
        message: `Autonomous scan detected ${selectedType} ping on suspect handle @shadow_net_99.`,
        riskScore: Math.min(100, Math.max(70, riskScore + (Math.random() * 2 - 0.8))),
        entityId: 'node-suspect-a'
      };

      argusStore.addWatchtowerEvent(newEvent);
    }, 4000);

    return () => clearInterval(interval);
  }, [isActive, riskScore]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-panel-glow p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-pink-500 font-mono text-xs font-semibold">
            <Radio className="w-4 h-4 text-pink-500 animate-spin" />
            <span>KERALA POLICE AUTONOMOUS WATCHTOWER MONITOR</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono mt-0.5">
            Continuous Autonomous Investigation Mode
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Automatic Event Stream • Auto-Relationship Discovery • Dynamic Threat Scoring
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex items-center space-x-3 font-mono text-xs">
          <button
            onClick={() => argusStore.toggleWatchtower()}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
              isActive
                ? 'bg-pink-500 text-white shadow-cyber-pink animate-pulse'
                : 'bg-emerald-500 text-black shadow-cyber-cyan'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'PAUSE MONITORING' : 'RESUME AUTONOMOUS SCAN'}</span>
          </button>
        </div>
      </div>

      {/* Realtime Threat Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="glass-panel-pink p-5 rounded-2xl space-y-1">
          <div className="text-slate-400 text-[10px] uppercase">DYNAMIC COMPOSITE RISK SCORE</div>
          <div className="text-3xl font-extrabold text-pink-500 text-pink-glow">
            {riskScore.toFixed(1)}% HIGH
          </div>
          <div className="text-pink-400 text-[10px]">Updating live every 4 seconds</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-1 border-purple-500/30">
          <div className="text-slate-400 text-[10px] uppercase">AUTO-DISCOVERED LINKS</div>
          <div className="text-3xl font-extrabold text-purple-300">11</div>
          <div className="text-purple-400 text-[10px]">Graph Correlator Engine</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl space-y-1 border-cyan-500/30">
          <div className="text-slate-400 text-[10px] uppercase">STREAM STATUS</div>
          <div className="text-3xl font-extrabold text-cyan-300">
            {isActive ? 'ACTIVE STREAM' : 'PAUSED'}
          </div>
          <div className="text-cyan-400 text-[10px]">Air-Gapped Kerala Pipeline</div>
        </div>
      </div>

      {/* Live Event Stream Ledger */}
      <div className="glass-panel p-6 rounded-2xl space-y-4 border border-pink-500/30">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 font-mono text-xs">
          <h2 className="font-bold text-white flex items-center space-x-2">
            <Zap className="w-4 h-4 text-pink-500" />
            <span>REAL-TIME WATCHTOWER TELEMETRY FEED</span>
          </h2>
          <span className="text-slate-400">{events.length} TOTAL EVENTS</span>
        </div>

        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1 font-mono text-xs">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-pink-500/40 transition-colors"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="text-pink-400 font-bold px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20">
                    {evt.timestamp}
                  </span>
                  <span className="text-cyan-300 font-semibold">{evt.type}</span>
                </div>

                <span className="text-pink-400 font-bold text-sm">
                  {evt.riskScore.toFixed(1)}% RISK
                </span>
              </div>

              <p className="text-slate-200 font-sans text-sm leading-relaxed">
                {evt.message}
              </p>

              <div className="text-[10px] text-slate-500 flex justify-between border-t border-slate-800/60 pt-2">
                <span>Source: {evt.source}</span>
                <span>Entity: {evt.entityId}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
