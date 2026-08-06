export interface CaseModel {
  id: string;
  name: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  status: 'OPEN' | 'UNDER_INVESTIGATION' | 'PENDING_REVIEW' | 'CLOSED';
  assignedOfficer: string;
  tags: string[];
  created_at: string;
}

export interface EvidenceModel {
  id: string;
  case_id: string;
  filename: string;
  filetype: string; // e.g. 'PDF' | 'PNG' | 'JPG' | 'MP4' | 'MP3' | 'WAV' | 'JSON' | 'CSV' | 'TXT' | 'DOCX'
  filepath: string;
  size: number;
  source: string;
  uploaded_at: string;
  status: 'Uploaded' | 'Processing' | 'Correlated' | 'Verified' | 'Flagged' | 'Archived';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  tags: string[];
  metadataStatus: 'PENDING_EXTRACTION' | 'PARSED' | 'CORRELATED';
  // Media Preview Specific Attributes
  previewUrl?: string;
  dimensions?: string; // e.g. '3840x2160'
  locationData?: string; // e.g. 'Kochi, Kerala (9.9312° N, 76.2673° E)'
  creationDate?: string;
  extractedText?: string;
  duration?: string; // e.g. '04:12'
  subtitles?: string;
  transcript?: string;
}

export interface CaseNoteModel {
  id: string;
  case_id: string;
  content: string;
  author: string;
  timestamp: string;
}

export interface CaseClueModel {
  id: string;
  case_id: string;
  title: string;
  confidence: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
}

export interface CustodyLogEntry {
  id: string;
  evidence_id: string;
  timestamp: string;
  action: string;
  actor: string;
}

const STORAGE_KEYS = {
  CASES: 'argus_cases_v1',
  EVIDENCE: 'argus_evidence_v1',
  NOTES: 'argus_notes_v1',
  CLUES: 'argus_clues_v1',
  CUSTODY: 'argus_custody_v1'
};

const DEFAULT_CASES: CaseModel[] = [
  {
    id: 'CASE-2026-8891',
    name: 'Operation Shieldwatch CSAM Probe',
    priority: 'CRITICAL',
    description: 'Autonomous multi-modal forensic investigation into encrypted channel payload distribution.',
    status: 'UNDER_INVESTIGATION',
    assignedOfficer: 'Inv. Officer S. Nair',
    tags: ['#csam', '#telegram', '#kochi', '#device_seizure'],
    created_at: '2026-08-05 18:00:00'
  }
];

const DEFAULT_EVIDENCE: EvidenceModel[] = [
  {
    id: 'EVID-9921',
    case_id: 'CASE-2026-8891',
    filename: 'EVID-9921.png',
    filetype: 'PNG',
    filepath: '/evidence/EVID-9921.png',
    size: 2489000,
    source: 'Seized Mobile Physical Dump',
    uploaded_at: '2026-08-05 20:12:00',
    status: 'Verified',
    priority: 'CRITICAL',
    tags: ['#image', '#risk', '#location'],
    metadataStatus: 'PARSED',
    previewUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60',
    dimensions: '3840 x 2160 px',
    locationData: 'Kochi, Kerala (9.9312° N, 76.2673° E)',
    creationDate: '2026-08-05 19:40:00'
  },
  {
    id: 'EVID-8820',
    case_id: 'CASE-2026-8891',
    filename: 'VOICE-NATIVE-882.wav',
    filetype: 'WAV',
    filepath: '/evidence/VOICE-NATIVE-882.wav',
    size: 15400000,
    source: 'Encrypted Telecom Intercept',
    uploaded_at: '2026-08-05 20:45:00',
    status: 'Correlated',
    priority: 'HIGH',
    tags: ['#chat', '#account', '#timeline'],
    metadataStatus: 'PARSED',
    duration: '02:45',
    transcript: 'Suspect A: Meet near cell tower BSSID-404 at 22:15. Channel access code is SHIELD-99.'
  },
  {
    id: 'EVID-7712',
    case_id: 'CASE-2026-8891',
    filename: 'Forensic_Report_KL409.pdf',
    filetype: 'PDF',
    filepath: '/evidence/Forensic_Report_KL409.pdf',
    size: 4890000,
    source: 'State Cyber Forensics Lab',
    uploaded_at: '2026-08-05 21:00:00',
    status: 'Uploaded',
    priority: 'MEDIUM',
    tags: ['#device', '#timeline'],
    metadataStatus: 'PARSED',
    extractedText: 'DEEP MEMORY ANALYSIS REPORT: iPhone 14 Pro MAC 3A:8B:12 linked to Telegram channel @shadow_net_99.'
  }
];

const DEFAULT_CUSTODY: CustodyLogEntry[] = [
  { id: 'c-1', evidence_id: 'EVID-9921', timestamp: '09:12 AM', action: 'Evidence uploaded to secure vault.', actor: 'Inv. Officer S. Nair' },
  { id: 'c-2', evidence_id: 'EVID-9921', timestamp: '09:15 AM', action: 'Metadata extraction started.', actor: 'ARGUS Ingestion Engine' },
  { id: 'c-3', evidence_id: 'EVID-9921', timestamp: '09:17 AM', action: 'Timeline updated & EXIF geo pinned.', actor: 'Timeline Agent' },
  { id: 'c-4', evidence_id: 'EVID-9921', timestamp: '09:20 AM', action: 'Investigator review initiated.', actor: 'Inv. Officer S. Nair' }
];

export const LocalStorageProvider = {
  getCases: (): CaseModel[] => {
    if (typeof window === 'undefined') return DEFAULT_CASES;
    const raw = localStorage.getItem(STORAGE_KEYS.CASES);
    return raw ? JSON.parse(raw) : DEFAULT_CASES;
  },

  saveCase: (newCase: CaseModel): void => {
    const cases = LocalStorageProvider.getCases();
    const updated = [newCase, ...cases.filter(c => c.id !== newCase.id)];
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(updated));
  },

  getEvidence: (caseId?: string): EvidenceModel[] => {
    if (typeof window === 'undefined') return DEFAULT_EVIDENCE;
    const raw = localStorage.getItem(STORAGE_KEYS.EVIDENCE);
    const list: EvidenceModel[] = raw ? JSON.parse(raw) : DEFAULT_EVIDENCE;
    return caseId ? list.filter(e => e.case_id === caseId) : list;
  },

  saveEvidence: (item: EvidenceModel): void => {
    const list = LocalStorageProvider.getEvidence();
    const updated = [item, ...list.filter(e => e.id !== item.id)];
    localStorage.setItem(STORAGE_KEYS.EVIDENCE, JSON.stringify(updated));

    // Log chain of custody entry
    LocalStorageProvider.addCustodyLog({
      id: `c-${Date.now()}`,
      evidence_id: item.id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: `Evidence '${item.filename}' ingested under status '${item.status}'.`,
      actor: 'System Ingestion Service'
    });
  },

  getCustodyLogs: (evidenceId?: string): CustodyLogEntry[] => {
    if (typeof window === 'undefined') return DEFAULT_CUSTODY;
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTODY);
    const logs: CustodyLogEntry[] = raw ? JSON.parse(raw) : DEFAULT_CUSTODY;
    return evidenceId ? logs.filter(l => l.evidence_id === evidenceId) : logs;
  },

  addCustodyLog: (entry: CustodyLogEntry): void => {
    const logs = LocalStorageProvider.getCustodyLogs();
    const updated = [entry, ...logs];
    localStorage.setItem(STORAGE_KEYS.CUSTODY, JSON.stringify(updated));
  }
};
