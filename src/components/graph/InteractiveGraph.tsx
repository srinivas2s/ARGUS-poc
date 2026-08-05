'use client';

import React, { useState } from 'react';
import { 
  User, 
  ShieldAlert, 
  Smartphone, 
  AtSign, 
  MapPin, 
  Car, 
  Image as ImageIcon, 
  Volume2, 
  Film,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Activity,
  Layers
} from 'lucide-react';
import { GraphNode, GraphEdge, EntityType } from '@/types';

interface InteractiveGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
}

const ENTITY_ICONS: Record<EntityType, React.ElementType> = {
  Person: User,
  Victim: ShieldAlert,
  Device: Smartphone,
  Account: AtSign,
  Location: MapPin,
  Vehicle: Car,
  Image: ImageIcon,
  Audio: Volume2,
  Video: Film,
};

const ENTITY_COLORS: Record<EntityType, { bg: string; border: string; text: string; glow: string }> = {
  Person: { bg: 'bg-cyan-950/80', border: 'border-cyan-500', text: 'text-cyan-400', glow: 'box-shadow: 0 0 15px rgba(0, 229, 255, 0.4)' },
  Victim: { bg: 'bg-pink-950/90', border: 'border-pink-500', text: 'text-pink-400', glow: 'box-shadow: 0 0 20px rgba(255, 0, 110, 0.5)' },
  Device: { bg: 'bg-purple-950/80', border: 'border-purple-500', text: 'text-purple-300', glow: 'box-shadow: 0 0 15px rgba(139, 92, 246, 0.4)' },
  Account: { bg: 'bg-blue-950/80', border: 'border-blue-500', text: 'text-blue-400', glow: 'box-shadow: 0 0 15px rgba(59, 130, 246, 0.4)' },
  Location: { bg: 'bg-emerald-950/80', border: 'border-emerald-500', text: 'text-emerald-400', glow: 'box-shadow: 0 0 15px rgba(16, 185, 129, 0.4)' },
  Vehicle: { bg: 'bg-amber-950/80', border: 'border-amber-500', text: 'text-amber-400', glow: 'box-shadow: 0 0 15px rgba(245, 158, 11, 0.4)' },
  Image: { bg: 'bg-rose-950/80', border: 'border-rose-500', text: 'text-rose-400', glow: 'box-shadow: 0 0 15px rgba(244, 63, 94, 0.4)' },
  Audio: { bg: 'bg-indigo-950/80', border: 'border-indigo-500', text: 'text-indigo-400', glow: 'box-shadow: 0 0 15px rgba(99, 102, 241, 0.4)' },
  Video: { bg: 'bg-teal-950/80', border: 'border-teal-500', text: 'text-teal-400', glow: 'box-shadow: 0 0 15px rgba(20, 184, 166, 0.4)' },
};

// Preset SVG Coordinates for a high-tech tactical radar layout
const NODE_COORDINATES: Record<string, { x: number; y: number }> = {
  'node-suspect-a': { x: 380, y: 160 },
  'node-suspect-b': { x: 620, y: 140 },
  'node-victim-1': { x: 220, y: 320 },
  'node-device-1': { x: 420, y: 340 },
  'node-account-1': { x: 550, y: 260 },
  'node-account-2': { x: 700, y: 300 },
  'node-location-1': { x: 260, y: 140 },
  'node-vehicle-1': { x: 140, y: 200 },
  'node-image-1': { x: 620, y: 410 },
  'node-audio-1': { x: 460, y: 450 },
  'node-video-1': { x: 120, y: 380 },
};

export const InteractiveGraph: React.FC<InteractiveGraphProps> = ({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredNodes = filterType === 'ALL' 
    ? nodes 
    : nodes.filter(n => n.type === filterType);

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-black cyber-grid-bg select-none shadow-cyber-cyan">
      {/* Top Left Canvas Controls & Entity Filter */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 font-mono text-[11px]">
        <div className="glass-panel px-3 py-1.5 rounded-lg border-cyan-500/30 flex items-center space-x-2 text-cyan-400 font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>GRAPH MATRIX ({filteredNodes.length} NODES)</span>
        </div>

        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="glass-panel px-2.5 py-1.5 rounded-lg border-slate-700 bg-slate-900 text-slate-200 focus:outline-none focus:border-cyan-500 text-[11px]"
        >
          <option value="ALL">FILTER ALL TYPES</option>
          <option value="Person">Person</option>
          <option value="Victim">Victim</option>
          <option value="Device">Device</option>
          <option value="Account">Account</option>
          <option value="Location">Location</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Image">Image</option>
          <option value="Audio">Audio</option>
          <option value="Video">Video</option>
        </select>
      </div>

      {/* Top Right Zoom Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-1 glass-panel p-1 rounded-lg border-slate-800">
        <button 
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.5))}
          className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-cyan-400 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setZoomLevel(1)}
          className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-cyan-400 transition-colors"
          title="Reset Zoom"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.65))}
          className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-cyan-400 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* SVG Canvas for Edges & Nodes */}
      <div 
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
      >
        <svg className="w-full h-full absolute inset-0 pointer-events-none">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#00E5FF" opacity="0.8" />
            </marker>
          </defs>

          {/* Draw Edges */}
          {edges.map((edge) => {
            const srcPos = NODE_COORDINATES[edge.source] || { x: 300, y: 250 };
            const tgtPos = NODE_COORDINATES[edge.target] || { x: 500, y: 250 };
            const isSelected = selectedNodeId === edge.source || selectedNodeId === edge.target;

            return (
              <g key={edge.id}>
                {/* Connection Line */}
                <line
                  x1={srcPos.x}
                  y1={srcPos.y}
                  x2={tgtPos.x}
                  y2={tgtPos.y}
                  stroke={isSelected ? '#00E5FF' : 'rgba(30, 41, 59, 0.9)'}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  strokeDasharray={edge.label === 'Contacted' || edge.label === 'Shared' ? '4,4' : 'none'}
                  markerEnd="url(#arrowhead)"
                />
                
                {/* Label Pill on Edge */}
                <rect
                  x={(srcPos.x + tgtPos.x) / 2 - 35}
                  y={(srcPos.y + tgtPos.y) / 2 - 10}
                  width="70"
                  height="18"
                  rx="4"
                  fill="#000000"
                  stroke={isSelected ? '#00E5FF' : 'rgba(30, 41, 59, 0.8)'}
                  strokeWidth="1"
                />
                <text
                  x={(srcPos.x + tgtPos.x) / 2}
                  y={(srcPos.y + tgtPos.y) / 2 + 3}
                  textAnchor="middle"
                  fill={isSelected ? '#00E5FF' : '#94A3B8'}
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {edge.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Render Interactive Nodes */}
        {filteredNodes.map((node) => {
          const pos = NODE_COORDINATES[node.id] || { x: 400, y: 250 };
          const isSelected = selectedNodeId === node.id;
          const Icon = ENTITY_ICONS[node.type] || User;
          const style = ENTITY_COLORS[node.type] || ENTITY_COLORS.Person;

          return (
            <div
              key={node.id}
              onClick={() => onSelectNode(node.id)}
              className={`absolute cursor-pointer -translate-x-1/2 -translate-y-1/2 transition-all duration-200 group ${
                isSelected ? 'scale-110 z-30' : 'hover:scale-105 z-20'
              }`}
              style={{ left: pos.x, top: pos.y }}
            >
              {/* Outer Pulse Halo for High Threat Nodes */}
              {node.riskScore >= 85 && (
                <div className="absolute -inset-2 rounded-xl bg-pink-500/20 border border-pink-500/40 animate-ping pointer-events-none" />
              )}

              {/* Node Card Container */}
              <div 
                className={`glass-panel px-3 py-2 rounded-xl border flex items-center space-x-2.5 shadow-lg ${style.border} ${
                  isSelected ? 'border-cyan-400 bg-slate-900 shadow-cyber-cyan' : 'hover:border-cyan-500/60'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg ${style.bg} flex items-center justify-center border border-slate-700`}>
                  <Icon className={`w-4 h-4 ${style.text}`} />
                </div>
                <div>
                  <div className="text-[11px] font-mono font-bold text-white truncate max-w-[130px]">
                    {node.label}
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 space-x-2">
                    <span className="uppercase text-cyan-400">{node.type}</span>
                    <span className={`font-bold ${node.riskScore >= 85 ? 'text-pink-500' : 'text-emerald-400'}`}>
                      {node.riskScore}% RISK
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Status Legend */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-4 glass-panel px-3 py-1.5 rounded-lg border-slate-800 text-[10px] font-mono text-slate-400">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Person</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-pink-500" />
          <span>Victim</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          <span>Device</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>Account</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Location</span>
        </div>
      </div>
    </div>
  );
};
