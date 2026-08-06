'use client';

import React from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Volume2, 
  Clock, 
  MapPin, 
  HardDrive, 
  Maximize2
} from 'lucide-react';
import { EvidenceModel } from '@/storage/localStorageProvider';

interface FilePreviewPanelProps {
  evidence: EvidenceModel | null;
}

export const FilePreviewPanel: React.FC<FilePreviewPanelProps> = ({ evidence }) => {
  if (!evidence) {
    return (
      <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-black/60 font-mono text-center space-y-3 flex flex-col items-center justify-center min-h-[350px]">
        <FileText className="w-10 h-10 text-white/20" />
        <div className="text-white/40 text-xs font-semibold">SELECT AN EVIDENCE ARTIFACT FROM REGISTRY TO PREVIEW</div>
      </div>
    );
  }

  const isImage = ['PNG', 'JPG', 'JPEG', 'WEBP'].includes(evidence.filetype);
  const isPDF = evidence.filetype === 'PDF' || evidence.filetype === 'TXT' || evidence.filetype === 'DOCX';
  const isVideo = ['MP4', 'WEBM'].includes(evidence.filetype);
  const isAudio = ['MP3', 'WAV'].includes(evidence.filetype);

  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 bg-black/80 font-mono text-xs space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 border border-sky-500/30 text-sky-300 font-bold uppercase">
            {evidence.filetype}
          </span>
          <h3 className="font-bold text-white text-sm truncate max-w-[240px]">{evidence.filename}</h3>
        </div>

        <span className="text-[10px] text-white/40">ID: {evidence.id}</span>
      </div>

      {/* 1. IMAGE PREVIEW PANEL */}
      {isImage && (
        <div className="space-y-3">
          <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/10 bg-slate-950 flex items-center justify-center">
            {evidence.previewUrl ? (
              <img src={evidence.previewUrl} alt={evidence.filename} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center space-y-2">
                <ImageIcon className="w-10 h-10 text-sky-400 mx-auto" />
                <span className="text-white/40 text-[10px] block">IMAGE HARDWARE SAMPLE</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-white/10 space-y-0.5">
              <span className="text-white/40 text-[9px] block">DIMENSIONS</span>
              <span className="text-sky-300 font-bold">{evidence.dimensions || '3840 x 2160 px'}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-white/10 space-y-0.5">
              <span className="text-white/40 text-[9px] block">FILE SIZE</span>
              <span className="text-emerald-400 font-bold">{(evidence.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-white/10 space-y-0.5 col-span-2">
              <span className="text-white/40 text-[9px] block">EXIF GEO-LOCATION DATA</span>
              <span className="text-amber-400 font-bold flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{evidence.locationData || 'Kochi, Kerala (9.9312° N, 76.2673° E)'}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. PDF & DOCUMENT PREVIEW PANEL */}
      {isPDF && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-2 max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/10 pb-1">
              <span>EXTRACTED TEXT CONTENT</span>
              <span>PAGE 1 OF 3</span>
            </div>
            <p className="text-white/80 text-xs leading-relaxed font-mono">
              {evidence.extractedText || 'Forensic memory extraction log: Target device iPhone 14 Pro MAC 3A:8B:12 linked to payload uploads.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-white/10 space-y-0.5">
              <span className="text-white/40 text-[9px] block">TIMESTAMPS</span>
              <span className="text-sky-300 font-bold">{evidence.uploaded_at}</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-white/10 space-y-0.5">
              <span className="text-white/40 text-[9px] block">FILE SIZE</span>
              <span className="text-emerald-400 font-bold">{(evidence.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. VIDEO PREVIEW PANEL */}
      {isVideo && (
        <div className="space-y-3">
          <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/10 bg-slate-950 flex flex-col items-center justify-center space-y-2">
            <Film className="w-10 h-10 text-sky-400 animate-pulse" />
            <span className="text-white font-bold text-xs">CCTV SURVEILLANCE CLIP STREAM</span>
            <span className="text-white/40 text-[10px]">DURATION: {evidence.duration || '04:12'}</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-white/10 space-y-1">
            <span className="text-white/40 text-[9px] block font-bold uppercase">SUBTITLES & SPEECH TRANSCRIPT</span>
            <p className="text-white/80 text-[10px] leading-normal">
              [00:14] CCTV Toll Gate #12: Black Sedan (KL-07-CY-8891) passed intersection heading East towards Kochi.
            </p>
          </div>
        </div>
      )}

      {/* 4. AUDIO PREVIEW PANEL */}
      {isAudio && (
        <div className="space-y-3">
          {/* Animated Waveform Graphic */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-purple-300 font-bold flex items-center space-x-1">
                <Volume2 className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>WAVEFORM AUDIO ANALYSIS</span>
              </span>
              <span className="text-white/40">DURATION: {evidence.duration || '02:45'}</span>
            </div>

            <div className="flex items-center space-x-1 h-12 pt-1">
              {[40, 70, 20, 90, 60, 30, 80, 100, 50, 20, 90, 70, 40, 60, 80, 30, 90, 50, 70, 40, 60, 90, 20, 80].map((h, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-purple-500/80 rounded-full transition-all duration-300"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-white/10 space-y-1">
            <span className="text-purple-300 text-[9px] block font-bold uppercase">TRANSCRIPT AREA</span>
            <p className="text-white/80 text-[11px] leading-relaxed font-mono">
              {evidence.transcript || 'Suspect A: Meet near cell tower BSSID-404 at 22:15. Channel access code is SHIELD-99.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
