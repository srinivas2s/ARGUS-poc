'use client';

import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Layers, 
  Search, 
  Share2, 
  Info, 
  Maximize2,
  CheckCircle,
  User,
  ShieldAlert,
  Smartphone,
  AtSign,
  MapPin,
  Car,
  Image as ImageIcon,
  Volume2,
  Film
} from 'lucide-react';
import { argusStore } from '@/lib/store';
import { InteractiveGraph } from '@/components/graph/InteractiveGraph';
import { EntityType, RelationshipType } from '@/types';

const NODE_TYPES: EntityType[] = [
  'Person', 'Victim', 'Device', 'Account', 'Location', 'Vehicle', 'Image', 'Audio', 'Video'
];

const RELATIONSHIPS: RelationshipType[] = [
  'Owns', 'Uploaded', 'Contacted', 'Shared', 'Located at', 'Connected with'
];

export default function ConnectionsPage() {
  const [nodes, setNodes] = useState(argusStore.nodes);
  const [edges, setEdges] = useState(argusStore.edges);
  const [selectedNodeId, setSelectedNodeId] = useState(argusStore.selectedNodeId);

  useEffect(() => {
    return argusStore.subscribe(() => {
      setNodes(argusStore.nodes);
      setEdges(argusStore.edges);
      setSelectedNodeId(argusStore.selectedNodeId);
    });
  }, []);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold">
            <Network className="w-4 h-4 text-cyan-400" />
            <span>ARGUS RELATIONAL GRAPH ENGINE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-mono mt-0.5 text-white-glow">
            Dynamic Multi-Entity Connection Map
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            9 Entity Classes • 6 Directional Link Types • Real-Time Correlation Topology
          </p>
        </div>

        {/* Quick Node Type Pill Badges */}
        <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
          {NODE_TYPES.map((type) => (
            <span key={type} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Main Canvas & Details Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Graph Canvas (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <InteractiveGraph 
            nodes={nodes}
            edges={edges}
            selectedNodeId={selectedNodeId}
            onSelectNode={(id) => argusStore.setSelectedNode(id)}
          />

          {/* Relationship Schema Matrix */}
          <div className="glass-panel p-4 rounded-2xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="font-bold text-white flex items-center space-x-2">
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>SUPPORTED RELATIONSHIP MATRIX</span>
              </h2>
              <span className="text-slate-400 text-[10px]">6 Formal Edge Types</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {RELATIONSHIPS.map((rel) => (
                <div key={rel} className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-cyan-400 font-bold text-[11px]">{rel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Entity Inspector Side Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel-glow p-5 rounded-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-bold text-white text-sm flex items-center space-x-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>ENTITY SPECIFICATION</span>
              </h2>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px]">
                {selectedNode.type}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-slate-400 text-[10px]">NODE IDENTIFIER</div>
                <div className="text-base font-extrabold text-white">{selectedNode.label}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">RISK CALCULATED</div>
                  <div className={`text-base font-extrabold ${selectedNode.riskScore >= 85 ? 'text-pink-500' : 'text-emerald-400'}`}>
                    {selectedNode.riskScore}%
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">INVESTIGATION STATE</div>
                  <div className="text-xs font-bold text-cyan-300 truncate">{selectedNode.status}</div>
                </div>
              </div>

              {/* Edge Connections for this Node */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="text-slate-400 font-bold uppercase text-[10px]">DIRECT LINKAGES ({
                  edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).length
                })</div>

                <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                  {edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).map(edge => {
                    const targetNode = nodes.find(n => n.id === (edge.source === selectedNode.id ? edge.target : edge.source));
                    return (
                      <div key={edge.id} className="p-2 rounded bg-slate-900/60 border border-slate-800 flex justify-between items-center text-[10px]">
                        <span className="text-cyan-400 font-bold">{edge.label}</span>
                        <span className="text-slate-200 truncate max-w-[140px]">{targetNode?.label}</span>
                        <span className="text-slate-500">{edge.confidence}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Raw Attributes */}
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div className="text-slate-400 font-bold uppercase text-[10px]">METADATA ATTRIBUTES</div>
                {Object.entries(selectedNode.details).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-1 border-b border-slate-800/40 text-[10px]">
                    <span className="text-slate-400">{key}:</span>
                    <span className="text-slate-200 font-bold truncate max-w-[160px]">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
