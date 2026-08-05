'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Network, 
  Video, 
  Clock, 
  FileSearch, 
  TrendingUp, 
  ArrowUpRight,
  ChevronRight,
  Crosshair,
  UserCheck,
  MapPin,
  Flame
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import Link from 'next/link';
import { argusStore } from '@/lib/store';

const THREAT_TIMELINE_DATA = [
  { time: '18:00', risk: 42, alerts: 2 },
  { time: '19:00', risk: 51, alerts: 3 },
  { time: '20:00', risk: 68, alerts: 5 },
  { time: '21:00', risk: 75, alerts: 6 },
  { time: '22:00', risk: 82, alerts: 8 },
  { time: '23:00', risk: 89.4, alerts: 12 },
];

const ENTITY_DISTRIBUTION_DATA = [
  { name: 'Persons', count: 48, color: '#00E5FF' },
  { name: 'Victims', count: 12, color: '#FF006E' },
  { name: 'Devices', count: 86, color: '#8B5CF6' },
  { name: 'Accounts', count: 124, color: '#3B82F6' },
  { name: 'Locations', count: 42, color: '#10B981' },
  { name: 'Media', count: 30, color: '#F59E0B' },
];

export default function DashboardPage() {
  const [riskScore, setRiskScore] = useState(argusStore.overallRiskScore);

  useEffect(() => {
    return argusStore.subscribe(() => {
      setRiskScore(argusStore.overallRiskScore);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="glass-panel-glow p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>CYBER INTELLIGENCE COMMAND CENTER</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white font-mono mt-1 text-white-glow">
            Investigative Intelligence Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Active Case: <span className="text-cyan-300">{argusStore.caseId}</span> // Operation ShieldWatch
          </p>
        </div>

        <div className="flex items-center space-x-3 font-mono">
          <Link
            href="/war-room"
            className="btn-cyan-gradient flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold"
          >
            <Crosshair className="w-4 h-4 text-black" />
            <span>OPEN TACTICAL WAR ROOM</span>
          </Link>
        </div>
      </div>

      {/* Required Cards Grid (6 Metric Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Active Investigations */}
        <div className="glass-panel p-4 rounded-xl space-y-2 border-cyan-500/20">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Active Investigations</span>
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-white">14</div>
          <div className="text-[10px] font-mono text-cyan-400 flex items-center space-x-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+3 cases this week</span>
          </div>
        </div>

        {/* High-Risk Alerts */}
        <div className="glass-panel-pink p-4 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>High-Risk Alerts</span>
            <AlertTriangle className="w-4 h-4 text-pink-500 animate-bounce" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-pink-500 text-pink-glow">7</div>
          <div className="text-[10px] font-mono text-pink-400 flex items-center space-x-1">
            <Flame className="w-3 h-3" />
            <span>2 Critical (Kochi/Trivandrum)</span>
          </div>
        </div>

        {/* Connected Entities */}
        <div className="glass-panel p-4 rounded-xl space-y-2 border-purple-500/20">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Connected Entities</span>
            <Network className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-purple-300">342</div>
          <div className="text-[10px] font-mono text-purple-400">9 Entity Categories</div>
        </div>

        {/* Synthetic Media Detections */}
        <div className="glass-panel p-4 rounded-xl space-y-2 border-amber-500/20">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Synthetic Media</span>
            <Video className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-300">19</div>
          <div className="text-[10px] font-mono text-amber-400">Deepfake & LSB Stego</div>
        </div>

        {/* Timeline Events */}
        <div className="glass-panel p-4 rounded-xl space-y-2 border-blue-500/20">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Timeline Events</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-blue-300">1,280</div>
          <div className="text-[10px] font-mono text-blue-400">Time-Ordered Correlated</div>
        </div>

        {/* Evidence Items */}
        <div className="glass-panel p-4 rounded-xl space-y-2 border-emerald-500/20">
          <div className="flex items-center justify-between text-slate-400 font-mono text-xs">
            <span>Evidence Items</span>
            <FileSearch className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-300">84</div>
          <div className="text-[10px] font-mono text-emerald-400">Cryptographic Hashes</div>
        </div>
      </div>

      {/* Main Charts & High Priority Suspect Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Velocity Chart (2 Columns) */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold font-mono text-white flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>CASE THREAT VELOCITY & RISK ELEVATION</span>
              </h2>
              <p className="text-[11px] font-mono text-slate-400">
                Composite risk recalculation over 6 hours (Kerala Time)
              </p>
            </div>
            <span className="text-xs font-mono text-pink-400 font-bold px-2 py-1 bg-pink-950/40 border border-pink-500/30 rounded">
              CURRENT RISK: {riskScore}%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={THREAT_TIMELINE_DATA}>
                <defs>
                  <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF006E" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#FF006E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#94A3B8" fontSize={11} fontFamily="monospace" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#F8FAFC', fontFamily: 'monospace' }} 
                />
                <Area type="monotone" dataKey="risk" stroke="#FF006E" strokeWidth={2} fillOpacity={1} fill="url(#riskGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Entity Category Breakdown Bar Chart */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold font-mono text-white flex items-center space-x-2">
              <Network className="w-4 h-4 text-purple-400" />
              <span>RELATIONAL ENTITY MATRIX</span>
            </h2>
            <p className="text-[11px] font-mono text-slate-400">
              Active graph nodes by type
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ENTITY_DISTRIBUTION_DATA} layout="vertical">
                <XAxis type="number" stroke="#94A3B8" fontSize={11} fontFamily="monospace" />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} fontFamily="monospace" width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#F8FAFC', fontFamily: 'monospace' }} 
                />
                <Bar dataKey="count" fill="#00E5FF" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Priority Suspect & Quick Quick Peek */}
      <div className="glass-panel p-5 rounded-2xl space-y-4 border-pink-500/20">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold font-mono text-white flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-pink-500" />
            <span>PRIMARY HIGH-THREAT SUSPECT QUICK PEEK</span>
          </h2>
          <Link href="/clues" className="text-xs font-mono text-cyan-400 hover:underline flex items-center space-x-1">
            <span>VIEW ALL CLUES & ENTITIES</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="glass-panel-pink p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Anil M. (@shadow_net_99)</span>
              <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 border border-pink-500/40 rounded text-[10px]">
                RISK 94%
              </span>
            </div>
            <div className="text-slate-400 text-[11px] space-y-1">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>District: Ernakulam (Kochi Tower Hit)</span>
              </div>
              <p>Primary handle correlated across Instagram and Telegram Vault.</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-2 border-purple-500/30">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">Rashid K. (@dark_harbor)</span>
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded text-[10px]">
                RISK 89%
              </span>
            </div>
            <div className="text-slate-400 text-[11px] space-y-1">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-purple-400" />
                <span>District: Kozhikode (Matrix Node Admin)</span>
              </div>
              <p>CSAM Vault admin with 128 encrypted channel members.</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-xl space-y-2 border-cyan-500/30">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 text-sm">Protected Subject #KL-409</span>
              <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded text-[10px]">
                RESCUE PRIORITY
              </span>
            </div>
            <div className="text-slate-400 text-[11px] space-y-1">
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Pattam, Thiruvananthapuram</span>
              </div>
              <p>Continuous AI monitoring active for location shift alerts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
