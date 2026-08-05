'use client';

import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Play, 
  Pause, 
  ShieldAlert, 
  Flame, 
  Zap,
  Activity,
  Network
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

  // Simulate incoming live telemetry stream & radar targets
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
        source: 'ARGUS Autonomous Radar Probe',
        message: `Realtime scan registered ${selectedType.replace('_', ' ')} anomaly on suspect node @shadow_net_99.`,
        riskScore: Math.min(100, Math.max(70, riskScore + (Math.random() * 2 - 0.8))),
        entityId: 'node-suspect-a'
      };

      argusStore.addWatchtowerEvent(newEvent);
    }, 3500);

    return () => clearInterval(interval);
  }, [isActive, riskScore]);

  return (
    <div className="space-y-6 font-mono pb-12">
      {/* Top Banner */}
      <div className="glass-panel-glow p-5 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-black/80">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-semibold">
            <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>ARGUS WATCHTOWER MODE // AUTONOMOUS MONITORING</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-0.5 text-white-glow">
            Full-Screen Watchtower Operations Center
          </h1>
          <p className="text-xs text-white/50">
            Realtime radar telemetry, anomaly detection, relationship updates, activity tracking & dynamic threat scoring.
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => argusStore.toggleWatchtower()}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl font-bold transition-all cursor-pointer ${
              isActive
                ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-cyber-pink animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-cyber-cyan'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'PAUSE MONITORING' : 'RESUME RADAR SCAN'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Sweep Visualization + Anomaly Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tactical Radar Visualization (5 Cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-rose-500/30 bg-black/90 flex flex-col items-center justify-center relative overflow-hidden space-y-4">
          <div className="w-full flex justify-between items-center text-xs text-white/70 border-b border-white/10 pb-3">
            <span className="text-rose-400 font-bold flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>RADAR TELEMETRY SCOPE</span>
            </span>
            <span className="text-emerald-400 font-bold">RANGE: 200KM</span>
          </div>

          {/* SVG Tactical Radar Sweep */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Concentric Circles */}
            <div className="absolute inset-0 rounded-full border border-rose-500/20" />
            <div className="absolute inset-8 rounded-full border border-rose-500/30" />
            <div className="absolute inset-16 rounded-full border border-rose-500/40" />
            <div className="absolute inset-24 rounded-full border border-rose-500/50" />

            {/* Radar Crosshairs */}
            <div className="absolute inset-x-0 h-px bg-rose-500/30 top-1/2" />
            <div className="absolute inset-y-0 w-px bg-rose-500/30 left-1/2" />

            {/* Animated Rotating Radar Beam Line */}
            {isActive && (
              <div 
                className="absolute w-full h-full rounded-full animate-spin pointer-events-none"
                style={{ animationDuration: '4s' }}
              >
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-rose-500/40 to-transparent origin-bottom-right rounded-tl-full" />
              </div>
            )}

            {/* Target Blips */}
            <div className="absolute top-16 left-20 w-3 h-3 rounded-full bg-rose-500 animate-ping" title="Suspect Node A (94%)" />
            <div className="absolute bottom-20 right-16 w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" title="Target Device B (82%)" />
            <div className="absolute top-28 right-20 w-2.5 h-2.5 rounded-full bg-emerald-400" title="Cell Tower Location" />
          </div>

          <div className="w-full pt-2 border-t border-white/10 flex justify-between text-[11px] text-white/50">
            <span>TARGET LOCK: ANIL M.</span>
            <span>BEARING: 045° NE</span>
            <span className="text-rose-400 font-bold">SWEEP: 360°</span>
          </div>
        </div>

        {/* Right Column: 3 Tactical Metric Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-4 rounded-2xl border border-rose-500/40 bg-rose-950/20 space-y-1">
              <div className="text-white/40 text-[10px] uppercase font-bold">THREAT SCORE</div>
              <div className="text-3xl font-extrabold text-rose-400">{riskScore.toFixed(1)}%</div>
              <div className="text-rose-300 text-[10px]">Tier 1 Critical Level</div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-sky-500/40 bg-sky-950/20 space-y-1">
              <div className="text-white/40 text-[10px] uppercase font-bold">RELATIONSHIP UPDATES</div>
              <div className="text-3xl font-extrabold text-sky-400">12 LINKS</div>
              <div className="text-sky-300 text-[10px]">Autonomous Graph Synced</div>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 space-y-1">
              <div className="text-white/40 text-[10px] uppercase font-bold">ANOMALY DETECTION</div>
              <div className="text-3xl font-extrabold text-emerald-400">03 ALERTS</div>
              <div className="text-emerald-300 text-[10px]">Zero False Positives</div>
            </div>
          </div>

          {/* Live Telemetry Stream Ledger */}
          <div className="glass-panel p-5 rounded-3xl border border-white/10 bg-black/60 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
              <h2 className="font-bold text-white flex items-center space-x-2">
                <Zap className="w-4 h-4 text-rose-400" />
                <span>REALTIME WATCHTOWER EVENT STREAM</span>
              </h2>
              <span className="text-white/40">{events.length} EVENTS LOGGED</span>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 text-xs">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-white/10 space-y-1.5 hover:border-rose-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-rose-400 font-bold px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-[10px]">
                        {evt.timestamp}
                      </span>
                      <span className="text-sky-300 font-semibold">{evt.type}</span>
                    </div>
                    <span className="text-rose-400 font-bold">{evt.riskScore.toFixed(1)}% RISK</span>
                  </div>

                  <p className="text-white/80 text-xs leading-relaxed">{evt.message}</p>

                  <div className="text-[10px] text-white/40 flex justify-between border-t border-white/5 pt-1.5">
                    <span>PROBE: {evt.source}</span>
                    <span>ENTITY: {evt.entityId}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
