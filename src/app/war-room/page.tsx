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
  Cpu,
  BrainCircuit,
  Eye,
  Layers,
  Network
} from 'lucide-react';
import { argusStore } from '@/lib/store';
import { InteractiveGraph } from '@/components/graph/InteractiveGraph';
import Link from 'next/link';

interface AgentDebateProfile {
  id: string;
  name: string;
  role: string;
  icon: any;
  status: 'ACTIVE_DEBATING' | 'REASONING' | 'CONSENSUS_REACHED' | 'STANDBY';
  confidenceScore: number;
  observations: string;
  reasoning: string;
  accentColor: string;
  borderColor: string;
}

const DEBATE_AGENTS: AgentDebateProfile[] = [
  {
    id: 'agent-commander',
    name: 'Commander Agent',
    role: 'Tactical Operations Leader',
    icon: Crosshair,
    status: 'ACTIVE_DEBATING',
    confidenceScore: 95,
    observations: 'High-risk target network localized across Kochi & Thiruvananthapuram border.',
    reasoning: 'Synthesizing multi-modal correlation from Vision, Risk & Timeline agents to dispatch law enforcement.',
    accentColor: 'text-sky-400',
    borderColor: 'border-sky-500/40'
  },
  {
    id: 'agent-timeline',
    name: 'Timeline Agent',
    role: 'Temporal Reconstruction',
    icon: Clock,
    status: 'CONSENSUS_REACHED',
    confidenceScore: 92,
    observations: 'Cell tower BSSID-404 ping coincides with Telegram payload upload at 22:15:04.',
    reasoning: 'Sequential timing matches suspect device boot vector with 92% temporal alignment.',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/40'
  },
  {
    id: 'agent-correlation',
    name: 'Correlation Agent',
    role: 'Multi-Hop Entity Linker',
    icon: Network,
    status: 'ACTIVE_DEBATING',
    confidenceScore: 94,
    observations: 'Direct edge connection confirmed between suspect @shadow_net_99 and Victim #KL-409.',
    reasoning: 'Cross-platform IP cluster matches encrypted relay proxy endpoints.',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/40'
  },
  {
    id: 'agent-memory',
    name: 'Memory Agent',
    role: 'Memory Vault Retrieval',
    icon: Layers,
    status: 'CONSENSUS_REACHED',
    confidenceScore: 96,
    observations: 'Retrieved 8 historical forensic clues and 3 matching CSAM hash signatures.',
    reasoning: 'Evidence items match previous Tier 1 safeguarding case profile VICTIM-KL-2026-409.',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/40'
  },
  {
    id: 'agent-risk',
    name: 'Risk Agent',
    role: 'Threat & Anomaly Scorer',
    icon: Flame,
    status: 'ACTIVE_DEBATING',
    confidenceScore: 98,
    observations: 'Composite threat score calculated at 94% CRITICAL.',
    reasoning: 'Urgent rescue priority flagged due to ongoing active payload transmission.',
    accentColor: 'text-rose-400',
    borderColor: 'border-rose-500/40'
  },
  {
    id: 'agent-vision',
    name: 'Vision Agent',
    role: 'Computer Vision & EXIF Parser',
    icon: Eye,
    status: 'REASONING',
    confidenceScore: 88,
    observations: 'CCTV-CLIP-MALAPPURAM plate match confirmed for Black Sedan KL-07-CY-8891.',
    reasoning: 'Optical character recognition confidence 88% on night surveillance feed.',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/40'
  }
];

export default function WarRoomPage() {
  const [nodes, setNodes] = useState(argusStore.nodes);
  const [edges, setEdges] = useState(argusStore.edges);
  const [selectedNodeId, setSelectedNodeId] = useState(argusStore.selectedNodeId);
  const [riskScore, setRiskScore] = useState(argusStore.overallRiskScore);
  const [agents, setAgents] = useState<AgentDebateProfile[]>(DEBATE_AGENTS);

  useEffect(() => {
    return argusStore.subscribe(() => {
      setNodes(argusStore.nodes);
      setEdges(argusStore.edges);
      setSelectedNodeId(argusStore.selectedNodeId);
      setRiskScore(argusStore.overallRiskScore);
    });
  }, []);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="space-y-6 font-mono pb-12">
      {/* Top War Room Header & Risk Indicator */}
      <div className="glass-panel-glow p-5 rounded-3xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-black/80">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold">
            <Crosshair className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>ARGUS MULTI-AGENT DEBATE ROOM & OPERATIONS CONTROL</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-0.5 text-white-glow">
            Tactical Operations & Agent Consensus
          </h1>
          <p className="text-xs text-white/50">
            Real-time debate & reasoning stream between 6 autonomous specialized intelligence sub-agents.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 glass-panel px-4 py-2 rounded-2xl border-rose-500/30">
            <Flame className="w-6 h-6 text-rose-500 animate-pulse" />
            <div>
              <div className="text-[10px] text-white/50 uppercase">CONSENSUS THREAT SCORE</div>
              <div className="text-xl font-extrabold text-rose-400">
                {riskScore}% CRITICAL
              </div>
            </div>
          </div>

          <Link
            href="/notebook"
            className="flex items-center space-x-2 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-300 px-3.5 py-2.5 rounded-2xl text-xs transition-colors shadow-cyber-purple font-bold"
          >
            <BookOpenCheck className="w-4 h-4 text-purple-400" />
            <span>LIVING NOTEBOOK</span>
          </Link>
        </div>
      </div>

      {/* 6 Multi-Agent Debate Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs">
          <span className="text-sky-400 font-bold uppercase flex items-center space-x-2">
            <BrainCircuit className="w-4 h-4 text-sky-400 animate-pulse" />
            <span>ACTIVE SUB-AGENT DEBATE PANEL (6 AGENTS)</span>
          </span>
          <span className="text-white/40">CONSENSUS STATE: 95% ALIGNED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => {
            const Icon = agent.icon;

            return (
              <div 
                key={agent.id}
                className={`glass-panel p-4 rounded-3xl border bg-black/60 space-y-3 transition-all ${agent.borderColor}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className={`w-4 h-4 ${agent.accentColor}`} />
                    </div>
                    <div>
                      <div className="text-white text-xs font-bold">{agent.name}</div>
                      <div className="text-white/40 text-[10px]">{agent.role}</div>
                    </div>
                  </div>

                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                    agent.status === 'ACTIVE_DEBATING' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30 animate-pulse' :
                    agent.status === 'CONSENSUS_REACHED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  }`}>
                    {agent.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-white/10 space-y-1">
                    <div className="text-white/40 text-[9px] font-bold uppercase">OBSERVATIONS:</div>
                    <p className="text-white/80 text-[10px] leading-normal">{agent.observations}</p>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-white/10 space-y-1">
                    <div className="text-white/40 text-[9px] font-bold uppercase">TACTICAL REASONING:</div>
                    <p className="text-white/60 text-[10px] leading-normal">{agent.reasoning}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                  <span className="text-white/40">CONFIDENCE:</span>
                  <span className={`font-bold ${agent.accentColor}`}>{agent.confidenceScore}% SCORE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main 12-Column Operations Room Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        {/* Left Column: Entity Inspector (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 rounded-3xl border border-purple-500/30 bg-black/80 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h2 className="text-xs font-bold text-white flex items-center space-x-1.5">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>SELECTED NODE INSPECTOR</span>
              </h2>
              <span className="text-xs text-sky-400 font-bold">{selectedNode.type}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-white text-sm">{selectedNode.label}</div>
              <div className="flex items-center justify-between text-[11px] text-white/60">
                <span>STATUS: <strong className="text-sky-300">{selectedNode.status}</strong></span>
                <span>RISK: <strong className="text-rose-400 font-bold">{selectedNode.riskScore}%</strong></span>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px]">
                <div className="text-white/40 text-[10px] font-bold uppercase">Attribute Breakdown</div>
                {Object.entries(selectedNode.details).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-0.5 border-b border-white/5">
                    <span className="text-white/50">{key}:</span>
                    <span className="text-white/90 truncate max-w-[160px]">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Intelligence Graph (8 Cols) */}
        <div className="lg:col-span-8">
          <InteractiveGraph 
            nodes={nodes}
            edges={edges}
            selectedNodeId={selectedNodeId}
            onSelectNode={(id) => argusStore.setSelectedNode(id)}
          />
        </div>
      </div>
    </div>
  );
}
