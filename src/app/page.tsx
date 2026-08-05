'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Crosshair, 
  Network, 
  BookOpenCheck, 
  Radio, 
  Lightbulb, 
  ArrowRight,
  Eye,
  Lock,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-6rem)] flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-black p-6 md:p-10 cyber-grid-bg">
      {/* Radial spotlight effect */}
      <div className="absolute inset-0 bg-grid pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

      {/* Top Banner Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-sky-500/30 bg-sky-950/20 text-xs text-sky-300">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-semibold tracking-wide">AUTONOMOUS INTELLIGENCE ACTIVE</span>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono text-white/50">
          <span className="flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>AIR-GAPPED CLASSIFIED</span>
          </span>
        </div>
      </div>

      {/* Hero Content Section */}
      <div className="relative z-10 my-auto max-w-5xl space-y-6 py-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <div className="space-y-1">
            <div className="text-xs font-mono tracking-widest text-sky-400/80 uppercase font-semibold">
              AGENTIC RELATIONAL GRAPH FOR UNIFIED SAFEGUARDING
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-white font-sans">
              ARGUS Intelligence, <br className="hidden md:block" />
              <span className="text-gradient-sky font-extrabold">
                Perfected.
              </span>
            </h1>
          </div>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl">
            Enterprise-grade child protection platform powered by real-time relational graphs, continuous sub-agent reasoning, and explainable AI audit trails.
          </p>
        </motion.div>

        {/* Premium Feature Cards (Equal Height Flex Grid) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-stretch"
        >
          <div className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-3 h-full">
            <div>
              <Network className="w-5 h-5 text-sky-400 mb-2" />
              <div className="text-white font-semibold text-sm">Relational Graph</div>
            </div>
            <div className="text-slate-400 text-xs leading-relaxed">
              9 Entity Classes & 6 Link Topologies
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-3 h-full">
            <div>
              <BookOpenCheck className="w-5 h-5 text-indigo-400 mb-2" />
              <div className="text-white font-semibold text-sm">Living Notebook</div>
            </div>
            <div className="text-slate-400 text-xs leading-relaxed">
              Continuous Real-Time Audit Ledger
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-3 h-full">
            <div>
              <Lightbulb className="w-5 h-5 text-pink-400 mb-2" />
              <div className="text-white font-semibold text-sm">Hypothesis Engine</div>
            </div>
            <div className="text-slate-400 text-xs leading-relaxed">
              Probabilistic Reasoning Chains
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-3 h-full">
            <div>
              <Radio className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-white font-semibold text-sm">Watchtower Mode</div>
            </div>
            <div className="text-slate-400 text-xs leading-relaxed">
              Continuous Telemetry Surveillance
            </div>
          </div>
        </motion.div>

        {/* Action Buttons Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          <Link
            href="/war-room"
            className="btn-white-pill inline-flex items-center justify-center gap-2 px-5 py-3 text-sm"
          >
            <Crosshair className="w-4 h-4 text-black" />
            <span>ENTER WAR ROOM</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </Link>

          <Link
            href="/dashboard"
            className="btn-sky-gradient inline-flex items-center justify-center gap-2 px-5 py-3 text-sm"
          >
            <Eye className="w-4 h-4 text-white" />
            <span>COMMAND DASHBOARD</span>
          </Link>

          <Link
            href="/settings"
            className="btn-outline-pill inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-mono"
          >
            <Cpu className="w-4 h-4 text-slate-400" />
            <span>AI ORCHESTRATION</span>
          </Link>
        </motion.div>
      </div>

      {/* Footer System Specs */}
      <div className="relative z-10 border-t border-white/10 pt-3 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-2 font-mono">
        <div>
          ARGUS INTEL CORE // AUTONOMOUS MULTI-AGENT ENGINE
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sky-400">NEO4J GRAPH MATRIX</span>
          <span>•</span>
          <span>AIR-GAPPED DEPLOYMENT</span>
        </div>
      </div>
    </div>
  );
}
