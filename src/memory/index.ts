import { argusStore } from '../lib/store';
import { ClueItem, GraphNode, GraphEdge, Hypothesis, NotebookEntry, EvidenceItem } from '../types';

export interface MemoryVaultStore {
  notes: NotebookEntry[];
  clues: ClueItem[];
  evidence: EvidenceItem[];
  relationships: GraphEdge[];
  nodes: GraphNode[];
  hypotheses: Hypothesis[];
}

export const MemoryVault = {
  // Retrieve complete snapshot of Memory Vault
  getSnapshot: (): MemoryVaultStore => {
    return {
      notes: argusStore.notebook,
      clues: argusStore.clues,
      evidence: argusStore.evidence || [],
      relationships: argusStore.edges,
      nodes: argusStore.nodes,
      hypotheses: argusStore.hypotheses,
    };
  },

  // Query evidence by entity ID
  getEvidenceForEntity: (entityId: string) => {
    const clues = argusStore.clues.filter(c => c.entityIds.includes(entityId));
    const notes = argusStore.notebook.filter(n => n.description.includes(entityId) || n.title.includes(entityId));
    const edges = argusStore.edges.filter(e => e.source === entityId || e.target === entityId);
    return { clues, notes, edges };
  },

  // Add new note to persistent memory
  addNote: (title: string, description: string, agentName: string = 'SupervisorAgent') => {
    const isoString = new Date().toISOString();
    const newEntry: NotebookEntry = {
      id: `note-${Date.now()}`,
      time: isoString.replace('T', ' ').substring(0, 16),
      timestampISO: isoString,
      title,
      description,
      agentName,
      operationType: 'OFFICER_REVIEW',
      status: 'COMPLETE',
    };
    argusStore.addNotebookEntry(newEntry);
    return newEntry;
  },

  // Query high confidence hypotheses
  getVerifiedHypotheses: () => {
    return argusStore.hypotheses.filter(h => h.confidence >= 80);
  }
};
