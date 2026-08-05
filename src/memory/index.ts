import { argusStore } from '../lib/store';

export const MemoryEngine = {
  getGraphMemory: () => argusStore.nodes,
  getNotebookAudit: () => argusStore.notebook,
  getTimeline: () => argusStore.timeline
};
