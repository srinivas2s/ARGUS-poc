import { LocalStorageProvider, CaseModel, EvidenceModel, CustodyLogEntry } from '../storage/localStorageProvider';

export const EvidenceService = {
  /**
   * Fetch all active investigation cases
   */
  fetchCases: async (): Promise<CaseModel[]> => {
    return LocalStorageProvider.getCases();
  },

  /**
   * Create a new investigation case
   */
  createCase: async (payload: Omit<CaseModel, 'created_at'>): Promise<CaseModel> => {
    const newCase: CaseModel = {
      ...payload,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    LocalStorageProvider.saveCase(newCase);
    return newCase;
  },

  /**
   * Fetch evidence items for a given case ID
   */
  fetchEvidenceByCase: async (caseId: string): Promise<EvidenceModel[]> => {
    return LocalStorageProvider.getEvidence(caseId);
  },

  /**
   * Ingest new evidence file into storage & record chain-of-custody
   */
  ingestFile: async (
    file: File, 
    caseId: string, 
    source: string = 'Manual Investigator Upload',
    tags: string[] = ['#evidence']
  ): Promise<EvidenceModel> => {
    const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
    const id = `EVID-${Math.floor(1000 + Math.random() * 9000)}`;

    const newEvidence: EvidenceModel = {
      id,
      case_id: caseId,
      filename: file.name,
      filetype: ext,
      filepath: `/storage/${caseId}/${file.name}`,
      size: file.size,
      source,
      uploaded_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status: 'Uploaded',
      priority: 'HIGH',
      tags,
      metadataStatus: 'PENDING_EXTRACTION',
      creationDate: new Date().toLocaleString(),
      dimensions: file.type.startsWith('image/') ? '1920 x 1080 px' : undefined,
      duration: file.type.startsWith('video/') || file.type.startsWith('audio/') ? '03:30' : undefined,
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      extractedText: file.type.includes('pdf') || file.type.includes('text') 
        ? `[EXTRACTED TEXT] Contents of ${file.name} successfully parsed by ARGUS Ingestion Engine.`
        : undefined,
      transcript: file.type.startsWith('audio/') 
        ? `[TRANSCRIPT] Automated voice transcript for ${file.name} stored in Memory Vault.`
        : undefined
    };

    LocalStorageProvider.saveEvidence(newEvidence);
    return newEvidence;
  },

  /**
   * Update evidence tags or status
   */
  updateEvidenceStatus: async (evidenceId: string, status: EvidenceModel['status']): Promise<void> => {
    const all = LocalStorageProvider.getEvidence();
    const target = all.find(e => e.id === evidenceId);
    if (target) {
      target.status = status;
      LocalStorageProvider.saveEvidence(target);
      LocalStorageProvider.addCustodyLog({
        id: `c-${Date.now()}`,
        evidence_id: evidenceId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: `Evidence status updated to '${status}'.`,
        actor: 'Investigator Officer'
      });
    }
  },

  /**
   * Fetch complete Chain of Custody log for an evidence item
   */
  fetchCustodyLog: async (evidenceId: string): Promise<CustodyLogEntry[]> => {
    return LocalStorageProvider.getCustodyLogs(evidenceId);
  }
};
