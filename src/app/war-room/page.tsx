'use client';

import React, { useState, useEffect } from 'react';
import { 
  Crosshair, 
  ShieldAlert, 
  Activity, 
  Clock, 
  FileText, 
  BookOpenCheck, 
  Radio, 
  Flame, 
  AlertTriangle,
  ChevronRight,
  User,
  MapPin,
  Maximize2,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { argusStore } from '@/lib/store';
import { InteractiveGraph } from '@/components/graph/InteractiveGraph';
import Link from 'next/link';

export default function WarRoomPage() {
  const [nodes, setNodes] = useState(argusStore.nodes);
  const [edges, setEdges] = useState(argusStore.edges);
  const [selectedNodeId, setSelectedNodeId] = useState(argusStore.selectedNodeId);
  const [notebook, setNotebook] = useState(argusStore.notebook);
  const [timeline, setTimeline] = useState(argusStore.timeline);
  const [evidence, setEvidence] = useState(argusStore.evidence);
  const [watchtowerEvents, setWatchtowerEvents] = useState(argusStore.watchtowerEvents);
  const [riskScore, setRiskScore] = useState(argusStore.overallRiskScore);

  useEffect(() => {
    return argusStore.subscribe(() => {
      setNodes(argusStore.nodes);
      setEdges(argusStore.edges);
      setSelectedNodeId(argusStore.selectedNodeId);
      setNotebook(argusStore.notebook);
      setTimeline(argusStore.timeline);
      setEvidence(argusStore.evidence);
      setWatchtowerEvents(argusStore.watchtowerEvents);
      setRiskScore(argusStore.overallRiskScore);
    });
  }, []);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="space-y-6">
      {/* Top War Room Header & Risk Indicator */}
      <div className="glass-panel-glow p-4 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold">
            <Crosshair className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>ARGUS TACTICAL WAR ROOM // OPERATION SHIELDWATCH</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono mt-0.5 text-white-glow">
            Tactical Intelligence & Entity Canvas
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Autonomous multi-modal correlation active • Senior Supervisor Stream
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Main Risk Indicator Gauge */}
          <div className="flex items-center space-x-3 glass-panel-pink px-4 py-2 rounded-xl">
            <Flame className="w-6 h-6 text-pink-500 animate-bounce" />
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Composite Threat Level</div>
              <div className="text-xl font-extrabold font-mono text-pink-500 text-pink-glow">
                {riskScore}% CRITICAL
              </div>
            </div>
          </div>

          <Link
            href="/notebook"
            className="flex items-center space-x-2 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-300 px-3.5 py-2 rounded-xl text-xs font-mono transition-colors shadow-cyber-purple"
          >
            <BookOpenCheck className="w-4 h-4 text-purple-400" />
            <span>LIVING NOTEBOOK</span>
          </Link>
        </div>
      </div>

      {/* Main 3-Column War Room Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Evidence Panel & Threat Monitor (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Evidence Panel */}
          <div className="glass-panel p-4 rounded-2xl space-y-3 border-cyan-500/20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-xs font-bold font-mono text-white flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>EVIDENCE INVENTORY</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-400">{evidence.length} ITEMS</span>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {evidence.map((item) => (
                <div key={item.id} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white truncate max-w-[150px]">{item.title}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {item.type}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">Source: {item.source}</div>
                  {item.csamMatchScore && (
                    <div className="text-[10px] text-pink-400 font-bold">
                      CSAM Match: {item.csamMatchScore}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Node Inspector Drawer */}
          <div className="glass-panel p-4 rounded-2xl space-y-3 border-purple-500/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-xs font-bold font-mono text-white flex items-center space-x-1.5">
                <User className="w-4 h-4 text-purple-400" />
                <span>SELECTED NODE INSPECTOR</span>
              </h2>
              <span className="text-[10px] font-mono text-cyan-400">{selectedNode.type}</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="font-bold text-white text-sm">{selectedNode.label}</div>
              <div className="flex items-center space-x-2 text-[11px]">
                <span className="text-slate-400">Status:</span>
                <span className="text-cyan-300">{selectedNode.status}</span>
              </div>
              <div className="flex items-center space-x-2 text-[11px]">
                <span className="text-slate-400">Risk Score:</span>
                <span className="text-pink-400 font-bold">{selectedNode.riskScore}%</span>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1 text-[10px] text-slate-300">
                <div className="text-slate-400 font-bold uppercase">Attribute Breakdown</div>
                {Object.entries(selectedNode.details).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-0.5 border-b border-slate-800/40">
                    <span className="text-slate-500">{key}:</span>
                    <span className="text-slate-200 truncate max-w-[140px]">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Intelligence Graph Canvas (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <InteractiveGraph 
            nodes={nodes}
            edges={edges}
            selectedNodeId={selectedNodeId}
            onSelectNode={(id) => argusStore.setSelectedNode(id)}
          />

          {/* Timeline Reconstruction Engine Panel (Bottom Scrubber) */}
          <div className="glass-panel p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-xs font-bold font-mono text-white flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>TIMELINE RECONSTRUCTION SCRUBBER</span>
              </h2>
              <Link href="/timeline" className="text-[10px] font-mono text-cyan-400 hover:underline">
                EXPAND FULL TIMELINE
              </Link>
            </div>

            <div className="space-y-2">
              {timeline.slice(0, 4).map((evt) => (
                <div key={evt.id} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center space-x-3">
                    <span className="text-cyan-400 font-bold text-[11px]">{evt.time}</span>
                    <span className="text-white font-semibold">{evt.title}</span>
                  </div>
                  <div className="text-[10px] text-pink-400 font-bold">
                    +{evt.riskScoreImpact}% Risk
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Living Notebook & Live Alerts (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Living AI Investigation Notebook Feed */}
          <div className="glass-panel p-4 rounded-2xl space-y-3 border-purple-500/30">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-xs font-bold font-mono text-white flex items-center space-x-1.5">
                <BookOpenCheck className="w-4 h-4 text-purple-400" />
                <span>LIVING NOTEBOOK STREAM</span>
              </h2>
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            </div>

            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {notebook.map((entry) => (
                <div key={entry.id} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-300 font-bold">{entry.time}</span>
                    <span className="text-[9px] text-slate-500">{entry.agentName}</span>
                  </div>
                  <div className="text-white font-semibold text-[11px]">{entry.title}</div>
                  <p className="text-[10px] text-slate-400 leading-tight">{entry.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Live Alerts Stream */}
          <div className="glass-panel-pink p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-xs font-bold font-mono text-white flex items-center space-x-1.5">
                <Radio className="w-4 h-4 text-pink-500 animate-spin" />
                <span>LIVE ALERTS STREAM</span>
              </h2>
              <span className="text-[9px] bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded font-mono">
                REALTIME
              </span>
            </div>

            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 font-mono text-xs">
              {watchtowerEvents.slice(0, 3).map((wt) => (
                <div key={wt.id} className="p-2 rounded-lg bg-black/60 border border-pink-500/30 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-pink-400 font-bold">{wt.timestamp}</span>
                    <span className="text-slate-500">{wt.type}</span>
                  </div>
                  <p className="text-[10px] text-slate-200">{wt.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
