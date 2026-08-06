'use client';

import React, { useState } from 'react';
import { FileText, BookOpenCheck, Clock, ShieldAlert, CheckCircle2, AlertTriangle, Eye, Layers } from 'lucide-react';
import { EvidenceModel } from '@/storage/localStorageProvider';
import { EvidenceService } from '@/services/evidenceService';

interface EvidenceExplorerProps {
  evidenceList: EvidenceModel[];
  selectedId: string | null;
  onSelectEvidence: (e: EvidenceModel) => void;
  onStatusChange: () => void;
}

const STATUS_WORKFLOWS: EvidenceModel['status'][] = [
  'Uploaded', 'Processing', 'Correlated', 'Verified', 'Flagged', 'Archived'
];

export const EvidenceExplorer: React.FC<EvidenceExplorerProps> = ({
  evidenceList,
  selectedId,
  onSelectEvidence,
  onStatusChange
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const handleStatusUpdate = async (id: string, newStatus: EvidenceModel['status']) => {
    await EvidenceService.updateEvidenceStatus(id, newStatus);
    onStatusChange();
  };

  const filteredList = filterType === 'ALL'
    ? evidenceList
    : evidenceList.filter(e => e.filetype === filterType || (filterType === 'MEDIA' && ['PNG','JPG','JPEG','WEBP','MP4','MP3','WAV'].includes(e.filetype)));

  return (
    <div className="glass-panel p-5 rounded-3xl border border-white/10 bg-black/80 font-mono text-xs space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2 text-sky-400 font-bold">
          <Layers className="w-4 h-4 text-sky-400" />
          <span>EVIDENCE EXPLORER REGISTRY ({filteredList.length})</span>
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1 text-white text-[11px] cursor-pointer"
        >
          <option value="ALL">FILTER ALL FORMATS</option>
          <option value="MEDIA">MEDIA ONLY (PNG/MP4/WAV)</option>
          <option value="PDF">PDF</option>
          <option value="WAV">WAV AUDIO</option>
          <option value="PNG">PNG IMAGE</option>
        </select>
      </div>

      {/* Table Registry */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
              <th className="py-2 px-3">EVIDENCE FILE</th>
              <th className="py-2 px-3">SOURCE</th>
              <th className="py-2 px-3">UPLOAD DATE</th>
              <th className="py-2 px-3">STATUS</th>
              <th className="py-2 px-3">PRIORITY</th>
              <th className="py-2 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((item) => {
              const isSelected = item.id === selectedId;

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectEvidence(item)}
                  className={`border-b border-white/5 cursor-pointer transition-all ${
                    isSelected ? 'bg-sky-500/20 border-sky-500/40 text-white' : 'hover:bg-white/5 text-white/70'
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="font-bold text-white flex items-center space-x-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 border border-white/15 text-sky-300 font-bold">
                        {item.filetype}
                      </span>
                      <span className="truncate max-w-[160px]">{item.filename}</span>
                    </div>
                    <div className="text-[9px] text-white/40 mt-0.5 space-x-2">
                      <span>ID: {item.id}</span>
                      <span>SIZE: {(item.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-[11px] text-white/60 max-w-[140px] truncate">
                    {item.source}
                  </td>

                  <td className="py-3 px-3 text-[10px] text-white/50 whitespace-nowrap">
                    {item.uploaded_at}
                  </td>

                  <td className="py-3 px-3">
                    <select
                      value={item.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusUpdate(item.id, e.target.value as EvidenceModel['status'])}
                      className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase border cursor-pointer bg-black ${
                        item.status === 'Verified' ? 'text-emerald-400 border-emerald-500/40' :
                        item.status === 'Correlated' ? 'text-sky-400 border-sky-500/40' :
                        item.status === 'Flagged' ? 'text-rose-400 border-rose-500/40' :
                        'text-amber-400 border-amber-500/40'
                      }`}
                    >
                      {STATUS_WORKFLOWS.map((s) => (
                        <option key={s} value={s} className="bg-slate-950 text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 px-3">
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                      item.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      item.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    }`}>
                      {item.priority}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvidence(item);
                      }}
                      className="p-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 transition-colors"
                      title="Inspect Evidence Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
