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
  OrchestrationSettings,
  AIProvider
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

// Lightweight event emitter & state store for Next.js client components
type Listener = () => void;

class ArgusStore {
  private listeners: Set<Listener> = new Set();

  public caseId: string = 'CASE-2026-KL-8942';
  public caseName: string = 'Operation ShieldWatch (Child Protection Division)';
  public overallRiskScore: number = 89.4;

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
  public filterCategory: string = 'ALL';

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
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
    
    // Add notebook entry for audit trace
    this.addNotebookEntry({
      id: `nb-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestampISO: new Date().toISOString(),
      title: `Hypothesis ${id.toUpperCase()} updated.`,
      description: `Investigator modified status of ${id} to ${status}.`,
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
