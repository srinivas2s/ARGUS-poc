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
  Layers
} from 'lucide-react';
import { GraphNode, GraphEdge, EntityType } from '@/types';

interface InteractiveGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
}

const ENTITY_ICONS: Record<EntityType, any> = {
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

const ENTITY_COLORS: Record<EntityType, { bg: string; border: string; text: string }> = {
  Person: { bg: 'bg-cyan-950/90', border: 'border-sky-500', text: 'text-sky-400' },
  Victim: { bg: 'bg-pink-950/90', border: 'border-pink-500', text: 'text-pink-400' },
  Device: { bg: 'bg-purple-950/90', border: 'border-purple-500', text: 'text-purple-300' },
  Account: { bg: 'bg-blue-950/90', border: 'border-blue-500', text: 'text-blue-400' },
  Location: { bg: 'bg-emerald-950/90', border: 'border-emerald-500', text: 'text-emerald-400' },
  Vehicle: { bg: 'bg-amber-950/90', border: 'border-amber-500', text: 'text-amber-400' },
  Image: { bg: 'bg-rose-950/90', border: 'border-rose-500', text: 'text-rose-400' },
  Audio: { bg: 'bg-indigo-950/90', border: 'border-indigo-500', text: 'text-indigo-400' },
  Video: { bg: 'bg-teal-950/90', border: 'border-teal-500', text: 'text-teal-400' },
};

// Symmetrically aligned tactical topology (no overlap)
const NODE_COORDINATES: Record<string, { x: number; y: number }> = {
  'node-suspect-a': { x: 450, y: 130 }, // Central Suspect (Top Center)
  'node-location-1': { x: 170, y: 130 }, // Top Left
  'node-suspect-b': { x: 740, y: 130 }, // Top Right
  
  'node-vehicle-1': { x: 170, y: 260 }, // Mid Left
  'node-device-1': { x: 450, y: 280 },  // Center Mid
  'node-account-1': { x: 740, y: 260 }, // Mid Right
  
  'node-victim-1': { x: 170, y: 390 },  // Bottom Left Tier 1
  'node-audio-1': { x: 450, y: 430 },   // Center Bottom
  'node-account-2': { x: 740, y: 380 }, // Bottom Right Tier 1

  'node-video-1': { x: 170, y: 490 },  // Far Bottom Left
  'node-image-1': { x: 740, y: 490 },  // Far Bottom Right
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
    <div className="relative w-full h-[560px] rounded-3xl overflow-hidden border border-white/10 bg-black cyber-grid-bg select-none shadow-2xl">
      {/* Top Left Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 font-mono text-[11px]">
        <div className="glass-card px-3.5 py-1.5 rounded-full border-sky-500/30 flex items-center space-x-2 text-sky-400 font-bold">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span>GRAPH MATRIX ({filteredNodes.length} NODES)</span>
        </div>

        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="glass-card px-3 py-1.5 rounded-full border-white/10 bg-black text-white focus:outline-none focus:border-sky-500 text-[11px] font-mono cursor-pointer"
        >
          <option value="ALL" className="bg-slate-950 text-white">FILTER ALL TYPES</option>
          <option value="Person" className="bg-slate-950 text-white">Person</option>
          <option value="Victim" className="bg-slate-950 text-white">Victim</option>
          <option value="Device" className="bg-slate-950 text-white">Device</option>
          <option value="Account" className="bg-slate-950 text-white">Account</option>
          <option value="Location" className="bg-slate-950 text-white">Location</option>
          <option value="Vehicle" className="bg-slate-950 text-white">Vehicle</option>
          <option value="Image" className="bg-slate-950 text-white">Image</option>
          <option value="Audio" className="bg-slate-950 text-white">Audio</option>
          <option value="Video" className="bg-slate-950 text-white">Video</option>
        </select>
      </div>

      {/* Top Right Zoom Controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-1 glass-card p-1 rounded-full border-white/10">
        <button 
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.4))}
          className="p-2 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setZoomLevel(1)}
          className="p-2 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
          title="Reset Zoom"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.65))}
          className="p-2 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
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
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="26" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#38BDF8" opacity="0.85" />
            </marker>
          </defs>

          {/* Draw Connection Edges */}
          {edges.map((edge) => {
            const srcPos = NODE_COORDINATES[edge.source] || { x: 300, y: 250 };
            const tgtPos = NODE_COORDINATES[edge.target] || { x: 500, y: 250 };
            const isSelected = selectedNodeId === edge.source || selectedNodeId === edge.target;

            const midX = (srcPos.x + tgtPos.x) / 2;
            const midY = (srcPos.y + tgtPos.y) / 2;

            return (
              <g key={edge.id}>
                <line
                  x1={srcPos.x}
                  y1={srcPos.y}
                  x2={tgtPos.x}
                  y2={tgtPos.y}
                  stroke={isSelected ? '#38BDF8' : 'rgba(255, 255, 255, 0.18)'}
                  strokeWidth={isSelected ? 2.5 : 1.25}
                  strokeDasharray={edge.label === 'Contacted' || edge.label === 'Shared' ? '4,4' : 'none'}
                  markerEnd="url(#arrowhead)"
                />
                
                {/* Edge Label Pill */}
                <rect
                  x={midX - 30}
                  y={midY - 9}
                  width="60"
                  height="18"
                  rx="9"
                  fill="#000000"
                  stroke={isSelected ? '#38BDF8' : 'rgba(255, 255, 255, 0.2)'}
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={midY + 3.5}
                  textAnchor="middle"
                  fill={isSelected ? '#38BDF8' : '#CBD5E1'}
                  fontSize="8.5"
                  fontFamily="monospace"
                  fontWeight="600"
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
              {/* High Risk Pulse Halo */}
              {node.riskScore >= 85 && (
                <div className="absolute -inset-1.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 animate-ping pointer-events-none" />
              )}

              {/* Node Card Container */}
              <div 
                className={`glass-card px-3.5 py-2 rounded-2xl border flex items-center space-x-2.5 shadow-xl transition-all ${style.border} ${
                  isSelected ? 'border-sky-400 bg-slate-950 shadow-sky-500/40 scale-105' : 'hover:border-sky-400/60'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl ${style.bg} flex items-center justify-center border border-white/10 shrink-0`}>
                  <Icon className={`w-4 h-4 ${style.text}`} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-mono font-bold text-white truncate max-w-[145px]">
                    {node.label}
                  </div>
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 space-x-2">
                    <span className="uppercase text-sky-400 font-semibold">{node.type}</span>
                    <span className={`font-bold ${node.riskScore >= 85 ? 'text-rose-400' : 'text-emerald-400'}`}>
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
      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-3 glass-card px-4 py-2 rounded-full border-white/10 text-[10px] font-mono text-slate-400">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400" />
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
