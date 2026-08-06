'use client';

import React, { useState, useRef } from 'react';
import { Download, CheckCircle2, AlertCircle, Film, Volume2, Image as ImageIcon, FileText } from 'lucide-react';
import { EvidenceService } from '@/services/evidenceService';
import { EvidenceModel } from '@/storage/localStorageProvider';

interface DragDropZoneProps {
  caseId: string;
  onFileIngested: (e: EvidenceModel) => void;
}

const SUPPORTED_EXTENSIONS = [
  'PDF', 'TXT', 'DOCX', 'CSV', 'JSON', 
  'PNG', 'JPG', 'JPEG', 'WEBP', 
  'MP4', 'MP3', 'WAV'
];

export const DragDropZone: React.FC<DragDropZoneProps> = ({ caseId, onFileIngested }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const processFiles = async (files: FileList | File[]) => {
    setIsUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split('.').pop()?.toUpperCase() || '';
      
      // Determine default tag based on file extension
      const defaultTag = ['MP4'].includes(ext) ? '#video' :
        ['MP3', 'WAV'].includes(ext) ? '#audio' :
        ['PNG', 'JPG', 'JPEG', 'WEBP'].includes(ext) ? '#image' : '#document';

      const ingested = await EvidenceService.ingestFile(
        file, 
        caseId, 
        'Direct Drag-and-Drop Ingestion',
        ['#evidence', defaultTag, `#${ext.toLowerCase()}`]
      );
      onFileIngested(ingested);
    }
    setIsUploading(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`glass-panel p-6 rounded-3xl border-2 border-dashed transition-all cursor-pointer select-none text-center font-mono flex flex-col items-center justify-center space-y-3 ${
        isDragging
          ? 'border-sky-400 bg-sky-950/30 scale-[1.01]'
          : 'border-white/20 bg-black/60 hover:border-sky-500/50 hover:bg-black/80'
      }`}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files && processFiles(e.target.files)}
        multiple
        className="hidden"
        accept=".pdf,.txt,.docx,.csv,.json,.png,.jpg,.jpeg,.webp,.mp4,.mp3,.wav"
      />

      <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center">
        {isUploading ? (
          <CheckCircle2 className="w-6 h-6 text-sky-400 animate-bounce" />
        ) : (
          <Download className="w-6 h-6 text-sky-400" />
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-white font-bold text-sm">
          {isUploading ? 'INGESTING EVIDENCE INTO STORAGE...' : 'DRAG & DROP EVIDENCE FILES HERE'}
        </h3>
        <p className="text-white/50 text-xs">
          Click or drop forensic artifacts to trigger automated metadata & chain-of-custody logging.
        </p>
      </div>

      {/* Supported Formats Grid */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
        {SUPPORTED_EXTENSIONS.map((ext) => (
          <span
            key={ext}
            className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-sky-300 font-bold uppercase"
          >
            {ext}
          </span>
        ))}
      </div>
    </div>
  );
};
