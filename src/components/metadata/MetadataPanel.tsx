'use client';

import React from 'react';
import { FileText, ShieldAlert, MapPin, HardDrive, Cpu, CheckCircle2 } from 'lucide-react';
import { EvidenceModel } from '@/storage/localStorageProvider';

interface MetadataPanelProps {
  evidence: EvidenceModel | null;
}

export const MetadataPanel: React.FC<MetadataPanelProps> = ({ evidence }) => {
  if (!evidence) return null;

  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 bg-black/80 font-mono text-xs space-y-3">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2 text-sky-400 font-bold">
          <FileText className="w-4 h-4 text-sky-400" />
          <span>EXIF & METADATA INSPECTOR</span>
        </div>
        <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          {evidence.metadataStatus}
        </span>
      </div>

      <div className="space-y-2 text-[11px]">
        <div className="flex justify-between py-1 border-b border-white/5">
          <span className="text-white/40">FILE NAME:</span>
          <span className="text-white font-bold">{evidence.filename}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-white/5">
          <span className="text-white/40">FILE TYPE:</span>
          <span className="text-sky-300 font-bold">{evidence.filetype}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-white/5">
          <span className="text-white/40">SHA-256 HASH:</span>
          <span className="text-white/70 font-mono text-[9px] truncate max-w-[180px] break-all">
            a8f9c2d3e4b5a67890123456789abcdef0123456
          </span>
        </div>
        <div className="flex justify-between py-1 border-b border-white/5">
          <span className="text-white/40">SOURCE SEIZURE:</span>
          <span className="text-amber-300">{evidence.source}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-white/5">
          <span className="text-white/40">INGESTION TIME:</span>
          <span className="text-white/80">{evidence.uploaded_at}</span>
        </div>
      </div>
    </div>
  );
};
