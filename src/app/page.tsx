'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Crosshair, 
  Network, 
  BookOpenCheck, 
  Radio, 
  Lightbulb, 
  ArrowRight,
  Sparkles,
  Lock,
  Cpu,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-6rem)] flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-black p-6 md:p-12 cyber-dot-bg">
      {/* Radar sweep background effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[600px] h-[600px] rounded-full border border-cyan-500/30 relative flex items-center justify-center">
          <div className="w-[450px] h-[450px] rounded-full border border-cyan-500/20" />
          <div className="w-[300px] h-[300px] rounded-full border border-cyan-500/20" />
          <div className="w-[150px] h-[150px] rounded-full border border-cyan-500/20" />
          <div className="radar-beam" />
        </div>
      </div>

      {/* Top Banner Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 font-mono text-xs shadow-cyber-cyan">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>KERALA POLICE HAC'KP 2026 ENTRY</span>
        </div>
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
          <span className="flex items-center space-x-1">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>AIR-GAPPED CLASSIFIED</span>
          </span>
        </div>
      </div>

      {/* Hero Content Section */}
      <div className="relative z-10 my-auto max-w-4xl space-y-6 pt-8 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="inline-block">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white font-mono">
              ARGUS
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-cyan-400 text-cyan-glow font-mono mt-1">
              Agentic Relational Graph for Unified Safeguarding
            </p>
          </div>

          <p className="text-lg md:text-xl text-slate-300 font-sans leading-relaxed max-w-3xl pt-2">
            An autonomous investigative intelligence system designed to protect children by transforming massive amounts of digital evidence into actionable intelligence.
          </p>
        </motion.div>

        {/* Feature Badges Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs pt-4"
        >
          <div className="glass-panel p-3 rounded-lg border-cyan-500/30 flex items-center space-x-2.5">
            <Network className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="text-white font-bold">Relational Graph</div>
              <div className="text-slate-400 text-[10px]">9 Entity Types</div>
            </div>
          </div>

          <div className="glass-panel p-3 rounded-lg border-purple-500/30 flex items-center space-x-2.5">
            <BookOpenCheck className="w-5 h-5 text-purple-400" />
            <div>
              <div className="text-white font-bold">Living Notebook</div>
              <div className="text-slate-400 text-[10px]">Continuous Audit</div>
            </div>
          </div>

          <div className="glass-panel p-3 rounded-lg border-pink-500/30 flex items-center space-x-2.5">
            <Lightbulb className="w-5 h-5 text-pink-400" />
            <div>
              <div className="text-white font-bold">Hypothesis Engine</div>
              <div className="text-slate-400 text-[10px]">Probability Reasoning</div>
            </div>
          </div>

          <div className="glass-panel p-3 rounded-lg border-emerald-500/30 flex items-center space-x-2.5">
            <Radio className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-white font-bold">Watchtower Mode</div>
              <div className="text-slate-400 text-[10px]">Continuous Monitor</div>
            </div>
          </div>
        </motion.div>

        {/* Primary CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <Link
            href="/war-room"
            className="group relative inline-flex items-center space-x-3 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3.5 rounded-xl font-mono font-bold text-sm transition-all shadow-cyber-cyan hover:scale-105"
          >
            <Crosshair className="w-5 h-5 text-black" />
            <span>ENTER WAR ROOM</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/dashboard"
            className="glass-panel hover:bg-slate-900 text-slate-200 px-6 py-3.5 rounded-xl font-mono text-sm transition-all border border-slate-700 flex items-center space-x-2"
          >
            <Eye className="w-4 h-4 text-slate-400" />
            <span>VIEW COMMAND DASHBOARD</span>
          </Link>

          <Link
            href="/settings"
            className="glass-panel hover:bg-slate-900 text-purple-300 px-5 py-3.5 rounded-xl font-mono text-xs transition-all border border-purple-500/30 flex items-center space-x-2"
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>CONFIGURE MODEL ORCHESTRATION</span>
          </Link>
        </motion.div>
      </div>

      {/* Footer System Specs */}
      <div className="relative z-10 border-t border-slate-800/80 pt-4 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-slate-500 gap-2">
        <div className="flex items-center space-x-4">
          <span>KERALA POLICE HAC'KP 2026</span>
          <span>•</span>
          <span>NOT A CHATBOT // AUTONOMOUS AGENT ENGINE</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-cyan-400">NEO4J + FASTAPI SIMULATION</span>
          <span>•</span>
          <span className="text-purple-400">OPENAI / GEMINI / DEEPSEEK READY</span>
        </div>
      </div>
    </div>
  );
}
