'use client';

import React, { useState, useRef } from 'react';
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
  Layers,
  Activity,
  Maximize2,
  FileText
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

const ENTITY_COLORS: Record<EntityType, { bg: string; border: string; stroke: string; text: string }> = {
  Person: { bg: '#083344', border: '#0284c7', stroke: '#38bdf8', text: '#38bdf8' },
  Victim: { bg: '#4c0519', border: '#e11d48', stroke: '#fb7185', text: '#fb7185' },
  Device: { bg: '#3b0764', border: '#7e22ce', stroke: '#c084fc', text: '#c084fc' },
  Account: { bg: '#172554', border: '#1d4ed8', stroke: '#60a5fa', text: '#60a5fa' },
  Location: { bg: '#022c22', border: '#047857', stroke: '#34d399', text: '#34d399' },
  Vehicle: { bg: '#451a03', border: '#b45309', stroke: '#fbbf24', text: '#fbbf24' },
  Image: { bg: '#4c0519', border: '#be123c', stroke: '#f43f5e', text: '#f43f5e' },
  Audio: { bg: '#1e1b4b', border: '#4338ca', stroke: '#818cf8', text: '#818cf8' },
  Video: { bg: '#042f2e', border: '#0f766e', stroke: '#2dd4bf', text: '#2dd4bf' },
};

// Symmetrically aligned grid coordinates fitting 100% inside container
const NODE_COORDINATES: Record<string, { x: number; y: number }> = {
  'node-location-1': { x: 130, y: 70 },   // Top-Left (Kochi Tower)
  'node-suspect-a': { x: 450, y: 70 },    // Top-Center (Anil M.)
  'node-suspect-b': { x: 770, y: 70 },    // Top-Right (Rashid K.)
  
  'node-vehicle-1': { x: 130, y: 220 },   // Mid-Left (Black Sedan)
  'node-device-1': { x: 450, y: 220 },    // Mid-Center (iPhone 14 Pro)
  'node-account-1': { x: 760, y: 220 },   // Mid-Right (Instagram @shadow_net)
  
  'node-victim-1': { x: 130, y: 370 },    // Lower-Left (Protected Subject)
  'node-audio-1': { x: 450, y: 370 },     // Lower-Center (VOICE-NATIVE)
  'node-account-2': { x: 760, y: 370 },   // Lower-Right (Telegram Channel)

  'node-video-1': { x: 130, y: 510 },    // Bottom-Left (CCTV Clip)
  'node-image-1': { x: 760, y: 510 },    // Bottom-Right (EVID-9921)
};

export const InteractiveGraph: React.FC<InteractiveGraphProps> = ({
  nodes,
  edges,
  selectedNodeId,
  onSelectNode
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [filterType, setFilterType] = useState<string>('ALL');
  
  // Interactive Mouse Drag & Pan state
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLDivElement | null>(null);

  const filteredNodes = filterType === 'ALL' 
    ? nodes 
    : nodes.filter(n => n.type === filterType);

  // Mouse Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'SELECT') {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Open Full Screen Standalone View in a NEW Browser Tab
  const handleOpenNewTab = () => {
    const win = window.open('', '_blank');
    if (!win) return;

    const graphSvg = document.getElementById('argus-graph-matrix-svg');
    const svgHtml = graphSvg ? graphSvg.outerHTML : '';
    
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ARGUS Intel Core // Relational Graph Matrix</title>
          <style>
            * { box-sizing: border-box; }
            body { margin: 0; background: #030712; color: #fff; font-family: monospace; display: flex; flex-direction: column; min-height: 100vh; overflow: hidden; }
            .header { padding: 16px 24px; font-size: 14px; font-weight: bold; color: #38BDF8; letter-spacing: 1.5px; border-bottom: 1px solid rgba(255,255,255,0.1); background: #000; display: flex; justify-content: space-between; align-items: center; }
            .badge { background: rgba(56, 189, 248, 0.15); color: #38BDF8; padding: 4px 12px; border-radius: 9999px; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 11px; }
            .canvas-container { flex: 1; display: flex; justify-content: center; align-items: center; padding: 20px; background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 0); background-size: 24px 24px; }
            svg { width: 100%; height: 85vh; }
          </style>
        </head>
        <body>
          <div class="header">
            <span>ARGUS INTEL CORE // RELATIONAL GRAPH MATRIX (FULLSCREEN STANDALONE)</span>
            <span class="badge">${nodes.length} ACTIVE NODES // CLASSIFIED</span>
          </div>
          <div class="canvas-container">
            ${svgHtml}
          </div>
        </body>
      </html>
    `);
    win.document.close();
  };

  // Download PDF Report with Full Printable SVG Graph & Metadata Table
  const handleDownloadPDF = () => {
    const printWin = window.open('', '_blank');
    if (!printWin) return;

    const graphSvg = document.getElementById('argus-graph-matrix-svg');
    const svgHtml = graphSvg ? graphSvg.outerHTML : '';

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ARGUS_Forensic_Graph_Report</title>
          <style>
            @media print { 
              @page { size: landscape; margin: 10mm; } 
              body { background: #ffffff !important; color: #000000 !important; -webkit-print-color-adjust: exact; }
              .graph-box { background: #030712 !important; }
            }
            body { font-family: system-ui, -apple-system, sans-serif; background: #ffffff; color: #0f172a; padding: 24px; margin: 0; }
            .report-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 16px; }
            .title { color: #0284c7; font-size: 20px; font-weight: 800; font-family: monospace; letter-spacing: 1px; }
            .sub-title { color: #475569; font-size: 11px; font-family: monospace; }
            .graph-box { border: 1px solid #cbd5e1; border-radius: 20px; padding: 16px; background: #030712; margin-bottom: 20px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
            svg { width: 100%; height: 500px; }
            .table-container { width: 100%; overflow: hidden; border-radius: 12px; border: 1px solid #cbd5e1; }
            table { width: 100%; border-collapse: collapse; font-family: monospace; font-size: 11px; }
            th { background: #f1f5f9; color: #0284c7; padding: 10px 14px; text-align: left; border-bottom: 1px solid #cbd5e1; }
            td { padding: 10px 14px; border-bottom: 1px solid #e2e8f0; background: #ffffff; color: #0f172a; }
            .risk-high { color: #e11d48; font-weight: bold; }
            .risk-normal { color: #059669; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="report-header">
            <div>
              <div class="title">ARGUS FORENSIC INVESTIGATION // RELATIONAL GRAPH REPORT</div>
              <div class="sub-title">CHILD SAFEGUARDING DIVISION // AUTONOMOUS ENGINE v3.4</div>
            </div>
            <div style="text-align: right;" class="sub-title">
              <div>CONFIDENTIAL // LEVEL 4 CLEARANCE</div>
              <div>DATE: ${new Date().toLocaleString()} IST</div>
            </div>
          </div>

          <div class="graph-box">
            ${svgHtml}
          </div>

          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>NODE ID</th>
                  <th>TYPE</th>
                  <th>LABEL / IDENTIFIER</th>
                  <th>THREAT RISK SCORE</th>
                </tr>
              </thead>
              <tbody>
                ${nodes.map(n => `
                  <tr>
                    <td>${n.id}</td>
                    <td style="color: #0284c7; font-weight: bold;">${n.type.toUpperCase()}</td>
                    <td>${n.label}</td>
                    <td class="${n.riskScore >= 85 ? 'risk-high' : 'risk-normal'}">${n.riskScore}% THREAT RISK</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <script>
            setTimeout(() => {
              window.print();
            }, 600);
          </script>
        </body>
      </html>
    `);
    printWin.document.close();
  };

  // Calculate line end points so arrows stop cleanly at node boundaries
  const calculateEdgeEndpoints = (src: { x: number; y: number }, tgt: { x: number; y: number }) => {
    const dx = tgt.x - src.x;
    const dy = tgt.y - src.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const ux = dx / dist;
    const uy = dy / dist;

    // Node card padding bounds (half-width 92px, half-height 24px)
    const nodeHalfWidth = 92;
    const nodeHalfHeight = 24;

    const scale = Math.min(
      Math.abs(ux) > 0 ? nodeHalfWidth / Math.abs(ux) : Infinity,
      Math.abs(uy) > 0 ? nodeHalfHeight / Math.abs(uy) : Infinity
    );

    const startX = src.x + ux * scale;
    const startY = src.y + uy * scale;
    const endX = tgt.x - ux * scale;
    const endY = tgt.y - uy * scale;

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    return { startX, startY, endX, endY, midX, midY };
  };

  return (
    <div 
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative w-full h-[550px] rounded-3xl overflow-hidden border border-white/10 bg-black cyber-grid-bg select-none shadow-2xl transition-all duration-300 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* Unified Non-Overlapping Control Bar across Top Header */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left Filter Controls */}
        <div className="flex items-center space-x-2 pointer-events-auto font-mono text-[11px]">
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

        {/* Right Action Controls */}
        <div className="flex items-center space-x-1 glass-card p-1 rounded-full border-white/10 pointer-events-auto">
          <button 
            onClick={handleDownloadPDF}
            className="px-3 py-1.5 hover:bg-white/10 rounded-full text-sky-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5 text-[10px] font-mono font-bold"
            title="Download Printable PDF Report"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>DOWNLOAD PDF</span>
          </button>

          <div className="h-4 w-px bg-white/10 mx-0.5" />

          <button 
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
            className="p-2 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => {
              setZoomLevel(1);
              setPanOffset({ x: 0, y: 0 });
            }}
            className="p-2 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer text-[10px] font-mono px-2 font-bold"
            title="Reset Position & Zoom"
          >
            RESET
          </button>

          <button 
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.5))}
            className="p-2 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-white/10 mx-0.5" />

          <button 
            onClick={handleOpenNewTab}
            className="p-2 hover:bg-white/10 rounded-full text-sky-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
            title="Open Fullscreen Standalone View in New Tab"
          >
            <Maximize2 className="w-4 h-4 text-sky-400" />
          </button>
        </div>
      </div>

      {/* SVG Canvas for Edges & Nodes with Drag & Zoom Transform */}
      <div 
        className="w-full h-full transition-transform duration-75 ease-out"
        style={{ 
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`, 
          transformOrigin: 'center center' 
        }}
      >
        <svg id="argus-graph-matrix-svg" viewBox="0 0 900 580" preserveAspectRatio="xMidYMid meet" className="w-full h-full absolute inset-0 z-10">
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#38BDF8" opacity="0.9" />
            </marker>
          </defs>

          {/* Draw Connection Edges */}
          {edges.map((edge) => {
            const srcPos = NODE_COORDINATES[edge.source] || { x: 300, y: 250 };
            const tgtPos = NODE_COORDINATES[edge.target] || { x: 500, y: 250 };
            const isSelected = selectedNodeId === edge.source || selectedNodeId === edge.target;

            const { startX, startY, endX, endY, midX, midY } = calculateEdgeEndpoints(srcPos, tgtPos);

            return (
              <g key={edge.id}>
                {/* Connecting Vector Arrow Line */}
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={isSelected ? '#38BDF8' : 'rgba(255, 255, 255, 0.25)'}
                  strokeWidth={isSelected ? 2.5 : 1.25}
                  strokeDasharray={edge.label === 'Contacted' || edge.label === 'Shared' ? '4,4' : 'none'}
                  markerEnd="url(#arrowhead)"
                />
                
                {/* Clean Edge Label Pill */}
                <rect
                  x={midX - 28}
                  y={midY - 8}
                  width="56"
                  height="16"
                  rx="8"
                  fill="#000000"
                  stroke={isSelected ? '#38BDF8' : 'rgba(255, 255, 255, 0.3)'}
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

          {/* Render Vector SVG Nodes for 100% Crisp Print & Export Fidelity */}
          {filteredNodes.map((node) => {
            const pos = NODE_COORDINATES[node.id] || { x: 400, y: 250 };
            const isSelected = selectedNodeId === node.id;
            const style = ENTITY_COLORS[node.type] || ENTITY_COLORS.Person;
            const Icon = ENTITY_ICONS[node.type] || User;

            const x = pos.x;
            const y = pos.y;

            return (
              <g 
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNode(node.id);
                }}
                className="cursor-pointer group"
              >
                {/* Outer Glow Halo for High Risk Nodes */}
                {node.riskScore >= 85 && (
                  <rect
                    x={x - 80}
                    y={y - 22}
                    width="160"
                    height="44"
                    rx="14"
                    fill="none"
                    stroke="#F43F5E"
                    strokeWidth="1.5"
                    opacity="0.4"
                  />
                )}

                {/* Node Card Outer Rectangle */}
                <rect
                  x={x - 78}
                  y={y - 20}
                  width="156"
                  height="40"
                  rx="12"
                  fill="#030712"
                  stroke={isSelected ? '#38BDF8' : style.border}
                  strokeWidth={isSelected ? '2' : '1.2'}
                />

                {/* Icon Inner Square Box with Lucide Symbol */}
                <foreignObject x={x - 72} y={y - 14} width="28" height="28" className="pointer-events-none">
                  <div className="w-full h-full rounded-xl bg-slate-900 border border-white/20 flex items-center justify-center">
                    <Icon className={`w-3.5 h-3.5 ${style.text}`} />
                  </div>
                </foreignObject>

                {/* Label Text */}
                <text
                  x={x - 36}
                  y={y - 2}
                  fill="#FFFFFF"
                  fontSize="9.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.label.length > 15 ? node.label.substring(0, 14) + '…' : node.label}
                </text>

                {/* Type Label Text */}
                <text
                  x={x - 36}
                  y={y + 11}
                  fill={style.text}
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.type.toUpperCase()}
                </text>

                {/* Risk Score Percentage Text */}
                <text
                  x={x + 70}
                  y={y + 11}
                  textAnchor="end"
                  fill={node.riskScore >= 85 ? '#F43F5E' : '#10B981'}
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.riskScore}% RISK
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Status Legend & Pan Hint */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-3 glass-card px-4 py-2 rounded-full border-white/10 text-[10px] font-mono text-slate-400">
        <div className="flex items-center space-x-1 text-sky-400 font-semibold border-r border-white/10 pr-2">
          <Activity className="w-3 h-3 text-sky-400" />
          <span>DRAG TO MOVE</span>
        </div>
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
