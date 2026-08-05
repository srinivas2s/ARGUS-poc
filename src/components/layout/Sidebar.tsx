'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Crosshair, 
  SearchCode, 
  Network, 
  Clock, 
  BookOpenCheck, 
  Lightbulb, 
  FileSpreadsheet, 
  Radio, 
  BrainCircuit, 
  Settings,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: any;
  badge?: string;
  accent?: 'cyan' | 'pink' | 'purple';
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'War Room', href: '/war-room', icon: Crosshair, badge: 'MAIN', accent: 'cyan' },
  { name: 'Clue Board', href: '/clues', icon: SearchCode, badge: '8 Clues' },
  { name: 'Connection Map', href: '/connections', icon: Network, badge: '9 Nodes', accent: 'cyan' },
  { name: 'Timeline', href: '/timeline', icon: Clock },
  { name: 'Living Notebook', href: '/notebook', icon: BookOpenCheck, badge: 'Agentic Log', accent: 'purple' },
  { name: 'Hypotheses', href: '/hypotheses', icon: Lightbulb, badge: '91% Conf', accent: 'pink' },
  { name: 'Case Reports', href: '/reports', icon: FileSpreadsheet },
  { name: 'Watchtower Mode', href: '/watchtower', icon: Radio, badge: 'LIVE', accent: 'pink' },
  { name: 'Explainable AI', href: '/explainable-ai', icon: BrainCircuit },
  { name: 'AI Orchestration', href: '/settings', icon: Settings },
  { name: 'Auth / Security', href: '/login', icon: ShieldCheck, badge: 'AUTH' },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/10 bg-black/80 backdrop-blur-xl flex flex-col justify-between select-none h-[calc(100vh-4rem)] sticky top-16 z-40 print:hidden">
      {/* Navigation List */}
      <div className="py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-white/40 font-semibold flex items-center justify-between">
          <span>INVESTIGATION MODULES</span>
          <ShieldCheck className="w-3.5 h-3.5 text-white/50" />
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white/10 border border-white/20 text-white shadow-md shadow-white/5'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive 
                    ? 'text-white' 
                    : 'text-white/40 group-hover:text-white/80'
                }`} />
                <span>{item.name}</span>
              </div>

              <div className="flex items-center space-x-1.5">
                {item.badge && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase font-semibold ${
                    item.accent === 'pink'
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                      : item.accent === 'purple'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-white/10 text-white/80 border border-white/20'
                  }`}>
                    {item.badge}
                  </span>
                )}
                <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                  isActive ? 'opacity-100 text-white' : 'text-white/30'
                }`} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer Info Box */}
      <div className="p-3 border-t border-white/10 bg-black/40">
        <div className="glass-panel p-3.5 rounded-2xl border-white/10 text-[11px] font-mono space-y-1.5">
          <div className="flex items-center justify-between text-white font-semibold">
            <span>ARGUS INTEL CORE</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <p className="text-white/50 text-[10px] leading-relaxed">
            Child Safeguarding Division // Autonomous Engine v3.4
          </p>
          <div className="pt-1.5 text-[9px] text-white/40 border-t border-white/10 flex justify-between">
            <span>AIR-GAPPED MODE</span>
            <span className="text-emerald-400">ONLINE</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
