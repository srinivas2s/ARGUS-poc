'use client';

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Layers, 
  FileText, 
  Clock, 
  Network, 
  BookOpenCheck, 
  SearchCode, 
  Radio, 
  ShieldAlert, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { CaseCreationPanel } from '@/components/case-intake/CaseCreationPanel';
import { DragDropZone } from '@/components/upload/DragDropZone';
import { EvidenceExplorer } from '@/components/evidence/EvidenceExplorer';
import { FilePreviewPanel } from '@/components/file-preview/FilePreviewPanel';
import { EvidenceTaggingSystem } from '@/components/evidence/EvidenceTaggingSystem';
import { ChainOfCustodyLog } from '@/components/evidence/ChainOfCustodyLog';
import { MetadataPanel } from '@/components/metadata/MetadataPanel';
import { LocalStorageProvider, CaseModel, EvidenceModel, CustodyLogEntry } from '@/storage/localStorageProvider';
import { EvidenceService } from '@/services/evidenceService';

export default function CaseIntakePage() {
  const [cases, setCases] = useState<CaseModel[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseModel | null>(null);
  const [evidenceList, setEvidenceList] = useState<EvidenceModel[]>([]);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceModel | null>(null);
  const [custodyLogs, setCustodyLogs] = useState<CustodyLogEntry[]>([]);
  const [centerTab, setCenterTab] = useState<'VIEWER' | 'TIMELINE' | 'METADATA'>('VIEWER');
  const [rightTab, setRightTab] = useState<'NOTEBOOK' | 'CLUES' | 'CUSTODY'>('NOTEBOOK');

  const reloadData = () => {
    const loadedCases = LocalStorageProvider.getCases();
    setCases(loadedCases);
    const activeCase = loadedCases[0] || null;
    setSelectedCase(activeCase);

    if (activeCase) {
      const items = LocalStorageProvider.getEvidence(activeCase.id);
      setEvidenceList(items);
      const activeEvid = items[0] || null;
      setSelectedEvidence(activeEvid);
      if (activeEvid) {
        setCustodyLogs(LocalStorageProvider.getCustodyLogs(activeEvid.id));
      }
    }
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleSelectCase = (c: CaseModel) => {
    setSelectedCase(c);
    const items = LocalStorageProvider.getEvidence(c.id);
    setEvidenceList(items);
    const activeEvid = items[0] || null;
    setSelectedEvidence(activeEvid);
    if (activeEvid) {
      setCustodyLogs(LocalStorageProvider.getCustodyLogs(activeEvid.id));
    }
  };

  const handleSelectEvidence = (e: EvidenceModel) => {
    setSelectedEvidence(e);
    setCustodyLogs(LocalStorageProvider.getCustodyLogs(e.id));
  };

  const handleFileIngested = (newEvidence: EvidenceModel) => {
    if (selectedCase) {
      const updated = LocalStorageProvider.getEvidence(selectedCase.id);
      setEvidenceList(updated);
      setSelectedEvidence(newEvidence);
      setCustodyLogs(LocalStorageProvider.getCustodyLogs(newEvidence.id));
    }
  };

  return (
    <div className="space-y-6 font-mono pb-12 select-none">
      {/* Top Banner */}
      <div className="glass-panel-glow p-5 rounded-3xl border border-sky-500/30 bg-black/80 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-sky-400 text-xs font-semibold">
            <Download className="w-4 h-4 text-sky-400 animate-pulse" />
            <span>ARGUS EVIDENCE INTAKE & INVESTIGATION WORKSPACE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-0.5 text-white-glow">
            Secure Evidence Management System
          </h1>
          <p className="text-xs text-white/50">
            Create cases, ingest multi-format artifacts, verify chain-of-custody & inspect EXIF metadata prior to AI pipeline processing.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="bg-sky-500/10 border border-sky-500/30 px-3.5 py-2 rounded-2xl text-sky-300 font-bold flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>AI INGESTION INFRASTRUCTURE READY</span>
          </div>
        </div>
      </div>

      {/* Top Row: Case Creation Panel & Drag-and-Drop Zone */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <CaseCreationPanel 
            onCaseCreated={(c) => {
              setCases(prev => [c, ...prev]);
              handleSelectCase(c);
            }} 
          />
        </div>

        <div className="lg:col-span-6 space-y-4">
          <DragDropZone 
            caseId={selectedCase?.id || 'CASE-2026-8891'} 
            onFileIngested={handleFileIngested} 
          />

          {/* Active Case Selector Dropdown */}
          {cases.length > 0 && (
            <div className="glass-panel p-4 rounded-3xl border border-white/10 bg-black/60 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-white/40">ACTIVE CASE:</span>
                <span className="text-sky-300 font-bold">{selectedCase?.name}</span>
                <span className="text-white/30">({selectedCase?.id})</span>
              </div>
              <span className="text-emerald-400 font-bold uppercase text-[10px] bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                {selectedCase?.status}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Section 8: 3-Column Investigation Workspace Layout */}
      {/* ┌──────────────┬───────────────────┬───────────────┐ */}
      {/* │ File list    │ Evidence viewer   │ Notebook      │ */}
      {/* │              │                   │               │ */}
      {/* │ PDF          │ Timeline          │ Clues         │ */}
      {/* │ Images       │ Metadata          │ Notes         │ */}
      {/* │ Videos       │ Graph             │ Alerts        │ */}
      {/* └──────────────┴───────────────────┴───────────────┘ */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs">
          <span className="text-sky-400 font-bold uppercase flex items-center space-x-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>3-COLUMN INVESTIGATION WORKSPACE</span>
          </span>
          <span className="text-white/40">FILE REGISTRY & AUDIT VAULT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* COLUMN 1: File List & Registry (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <EvidenceExplorer 
              evidenceList={evidenceList}
              selectedId={selectedEvidence?.id || null}
              onSelectEvidence={handleSelectEvidence}
              onStatusChange={reloadData}
            />

            {selectedEvidence && (
              <EvidenceTaggingSystem 
                initialTags={selectedEvidence.tags} 
                onTagsUpdated={(updatedTags) => {
                  if (selectedEvidence) {
                    selectedEvidence.tags = updatedTags;
                    LocalStorageProvider.saveEvidence(selectedEvidence);
                  }
                }}
              />
            )}
          </div>

          {/* COLUMN 2: Evidence Viewer, Timeline & Metadata (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* View Switcher Tabs */}
            <div className="flex rounded-2xl glass-card p-1 border-white/10 text-xs font-bold">
              <button
                onClick={() => setCenterTab('VIEWER')}
                className={`flex-1 py-1.5 rounded-xl transition-all ${
                  centerTab === 'VIEWER' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-white/50 hover:text-white'
                }`}
              >
                PREVIEW
              </button>
              <button
                onClick={() => setCenterTab('METADATA')}
                className={`flex-1 py-1.5 rounded-xl transition-all ${
                  centerTab === 'METADATA' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-white/50 hover:text-white'
                }`}
              >
                METADATA
              </button>
            </div>

            {centerTab === 'VIEWER' ? (
              <FilePreviewPanel evidence={selectedEvidence} />
            ) : (
              <MetadataPanel evidence={selectedEvidence} />
            )}
          </div>

          {/* COLUMN 3: Notebook, Clues & Chain of Custody (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* View Switcher Tabs */}
            <div className="flex rounded-2xl glass-card p-1 border-white/10 text-xs font-bold">
              <button
                onClick={() => setRightTab('NOTEBOOK')}
                className={`flex-1 py-1.5 rounded-xl transition-all ${
                  rightTab === 'NOTEBOOK' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-white/50 hover:text-white'
                }`}
              >
                CUSTODY LOG
              </button>
              <button
                onClick={() => setRightTab('CLUES')}
                className={`flex-1 py-1.5 rounded-xl transition-all ${
                  rightTab === 'CLUES' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-white/50 hover:text-white'
                }`}
              >
                CLUES & NOTES
              </button>
            </div>

            {rightTab === 'NOTEBOOK' ? (
              <ChainOfCustodyLog logs={custodyLogs} />
            ) : (
              <div className="glass-panel p-5 rounded-3xl border border-purple-500/30 bg-black/80 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-purple-300 font-bold">CASE CLUES & ANNOTATIONS</span>
                  <span className="text-white/40">2 ITEMS</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                    <span className="text-sky-300 font-bold">Clue #01: Cell Tower Pin</span>
                    <p className="text-white/60 text-[10px]">Location matched BSSID-404 pin in Ernakulam.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950 border border-white/10 space-y-1">
                    <span className="text-purple-300 font-bold">Clue #02: EXIF Hardware Match</span>
                    <p className="text-white/60 text-[10px]">JPEG camera shutter speed aligns with lab baseline.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
