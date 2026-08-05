import { 
  GraphNode, 
  GraphEdge, 
  ClueItem, 
  TimelineEvent, 
  NotebookEntry, 
  Hypothesis, 
  EvidenceItem, 
  XAIReasoningStep,
  WatchtowerEvent,
  OrchestrationSettings
} from '../types';
import { 
  INITIAL_NODES, 
  INITIAL_EDGES, 
  MOCK_CLUES, 
  MOCK_TIMELINE_EVENTS, 
  MOCK_NOTEBOOK_ENTRIES, 
  MOCK_HYPOTHESES, 
  MOCK_EVIDENCE_ITEMS, 
  MOCK_XAI_STEPS, 
  MOCK_WATCHTOWER_EVENTS,
  DEFAULT_ORCHESTRATION_SETTINGS 
} from './mockData';

export interface CaseFile {
  id: string;
  name: string;
  threatScore: number;
  status: 'ACTIVE' | 'PENDING' | 'CLOSED';
}

export const AVAILABLE_CASES: CaseFile[] = [
  { id: 'CASE-2026-KL-8942', name: 'Operation ShieldWatch', threatScore: 89.4, status: 'ACTIVE' },
  { id: 'CASE-2026-KL-4012', name: 'Operation DarkNet Stealth', threatScore: 76.2, status: 'ACTIVE' },
  { id: 'CASE-2026-KL-9910', name: 'Operation CyberVault', threatScore: 92.1, status: 'ACTIVE' },
  { id: 'CASE-2026-KL-1055', name: 'Operation PhantomSignal', threatScore: 64.5, status: 'CLOSED' },
];

export interface AuthUser {
  name: string;
  code: string;
  role: string;
  loginTime: string;
}

type Listener = () => void;

class ArgusStore {
  private listeners: Set<Listener> = new Set();

  public caseId: string = 'CASE-2026-KL-8942';
  public caseName: string = 'Operation ShieldWatch';
  public overallRiskScore: number = 89.4;
  public user: AuthUser | null = null;
  public isSidebarCollapsed: boolean = false;

  public nodes: GraphNode[] = [...INITIAL_NODES];
  public edges: GraphEdge[] = [...INITIAL_EDGES];
  public clues: ClueItem[] = [...MOCK_CLUES];
  public timeline: TimelineEvent[] = [...MOCK_TIMELINE_EVENTS];
  public notebook: NotebookEntry[] = [...MOCK_NOTEBOOK_ENTRIES];
  public hypotheses: Hypothesis[] = [...MOCK_HYPOTHESES];
  public evidence: EvidenceItem[] = [...MOCK_EVIDENCE_ITEMS];
  public xaiSteps: XAIReasoningStep[] = [...MOCK_XAI_STEPS];
  public watchtowerEvents: WatchtowerEvent[] = [...MOCK_WATCHTOWER_EVENTS];
  public settings: OrchestrationSettings = { ...DEFAULT_ORCHESTRATION_SETTINGS };

  public selectedNodeId: string | null = 'node-suspect-a';
  public selectedClueId: string | null = 'clue-1';
  public isWatchtowerActive: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('argus_user');
      if (storedUser) {
        try {
          this.user = JSON.parse(storedUser);
        } catch (e) {
          this.user = null;
        }
      }
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.notify();
  }

  public setCase(caseId: string) {
    const foundCase = AVAILABLE_CASES.find(c => c.id === caseId);
    if (foundCase) {
      this.caseId = foundCase.id;
      this.caseName = foundCase.name;
      this.overallRiskScore = foundCase.threatScore;
      this.notify();
    }
  }

  public login(name: string, code: string): boolean {
    if (code.trim() === '12') {
      this.user = {
        name: name.trim() || 'Lead Investigator',
        code: '12',
        role: 'Senior Cyber Investigator',
        loginTime: new Date().toLocaleTimeString('en-US', { hour12: false }) + ' IST'
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('argus_user', JSON.stringify(this.user));
      }
      this.notify();
      return true;
    }
    return false;
  }

  public logout() {
    this.user = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('argus_user');
    }
    this.notify();
  }

  public setSelectedNode(id: string | null) {
    this.selectedNodeId = id;
    this.notify();
  }

  public setSelectedClue(id: string | null) {
    this.selectedClueId = id;
    this.notify();
  }

  public updateHypothesisStatus(id: string, status: Hypothesis['status']) {
    this.hypotheses = this.hypotheses.map((h) => 
      h.id === id ? { ...h, status, lastUpdated: new Date().toLocaleTimeString('en-US') + ' IST' } : h
    );
    
    this.addNotebookEntry({
      id: `nb-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestampISO: new Date().toISOString(),
      title: `Hypothesis ${id.toUpperCase()} updated.`,
      description: `Investigator ${this.user?.name || 'Officer'} modified status of ${id} to ${status}.`,
      agentName: 'HumanInvestigator',
      operationType: 'OFFICER_REVIEW',
      status: 'COMPLETE',
      riskScoreAfter: this.overallRiskScore
    });

    this.notify();
  }

  public addNotebookEntry(entry: NotebookEntry) {
    this.notebook = [entry, ...this.notebook];
    this.notify();
  }

  public addWatchtowerEvent(event: WatchtowerEvent) {
    this.watchtowerEvents = [event, ...this.watchtowerEvents];
    this.notify();
  }

  public updateSettings(newSettings: Partial<OrchestrationSettings>) {
    this.settings = { ...this.settings, ...newSettings };
    this.notify();
  }

  public toggleWatchtower() {
    this.isWatchtowerActive = !this.isWatchtowerActive;
    this.notify();
  }

  public approveXAIStep(stepIndex: number, comment?: string) {
    this.xaiSteps = this.xaiSteps.map(step => 
      step.stepIndex === stepIndex 
        ? { ...step, approvalStatus: 'APPROVED', investigatorComment: comment || step.investigatorComment } 
        : step
    );
    this.notify();
  }
}

export const argusStore = new ArgusStore();
