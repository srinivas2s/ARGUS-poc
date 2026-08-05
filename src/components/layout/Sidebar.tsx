'use client';

import React, { useState, useEffect } from 'react';
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
  ShieldCheck,
  Search
} from 'lucide-react';
import { argusStore } from '@/lib/store';

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
  { name: 'Clue Board', href: '/clues', icon: SearchCode, badge: '8 CLUES' },
  { name: 'Connection Map', href: '/connections', icon: Network, badge: '9 NODES', accent: 'cyan' },
  { name: 'Timeline', href: '/timeline', icon: Clock },
  { name: 'Living Notebook', href: '/notebook', icon: BookOpenCheck, badge: 'LOG', accent: 'purple' },
  { name: 'Reverse Engine', href: '/reverse-investigation', icon: Search, badge: 'GAP ANALYSIS', accent: 'cyan' },
  { name: 'Hypotheses', href: '/hypotheses', icon: Lightbulb, badge: '91% CONF', accent: 'pink' },
  { name: 'Case Reports', href: '/reports', icon: FileSpreadsheet },
  { name: 'Watchtower Mode', href: '/watchtower', icon: Radio, badge: 'LIVE', accent: 'pink' },
  { name: 'Explainable AI', href: '/explainable-ai', icon: BrainCircuit },
  { name: 'AI Orchestration', href: '/settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(argusStore.isSidebarCollapsed);

  useEffect(() => {
    const unsubscribe = argusStore.subscribe(() => {
      setIsCollapsed(argusStore.isSidebarCollapsed);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    argusStore.toggleSidebar();
  };

  return (
    <aside 
      className={`shrink-0 border-r border-white/10 bg-black/80 backdrop-blur-xl flex flex-col justify-between select-none h-full z-40 print:hidden overflow-hidden transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Navigation Header & Collapse Toggle */}
      <div className="py-4 px-3 space-y-1 flex-1 overflow-y-auto no-scrollbar overscroll-contain">
        <div className={`px-2 pb-2 text-[10px] font-mono uppercase tracking-widest text-white/40 font-semibold flex items-center ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}>
          {!isCollapsed && <span>INVESTIGATION MODULES</span>}
          <button 
            onClick={handleToggle}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className={`w-4 h-4 text-sky-400 transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Module Links */}
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={`group flex items-center rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                isCollapsed 
                  ? 'justify-center p-2.5' 
                  : 'justify-between px-3 py-2.5'
              } ${
                isActive
                  ? 'bg-white/10 border border-white/20 text-white shadow-md shadow-white/5'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive 
                    ? 'text-white' 
                    : 'text-white/40 group-hover:text-white/80'
                }`} />
                {!isCollapsed && <span>{item.name}</span>}
              </div>

              {!isCollapsed && (
                <div className="flex items-center space-x-1.5">
                  {item.badge && (
                    <span className={`h-5 inline-flex items-center justify-center px-2.5 rounded-full text-[9px] font-mono uppercase font-bold whitespace-nowrap shrink-0 border ${
                      item.accent === 'pink'
                        ? 'bg-pink-500/20 text-pink-300 border-pink-500/30'
                        : item.accent === 'purple'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                        : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isActive ? 'opacity-100 text-white' : 'text-white/30'
                  }`} />
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Info Box */}
      <div className={`border-t border-white/10 bg-black/40 shrink-0 ${isCollapsed ? 'p-2 text-center' : 'p-3'}`}>
        {isCollapsed ? (
          <div className="flex justify-center" title="ARGUS INTEL CORE ONLINE">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
        ) : (
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
        )}
      </div>
    </aside>
  );
};
