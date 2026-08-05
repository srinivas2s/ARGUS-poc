import { AIOrchestrator } from '../lib/ai-orchestrator';

export const AgentRegistry = {
  IngestionAgent: 'IngestionAgent-Alpha',
  MetadataAgent: 'MetadataAgent-v4',
  VisionMatchAgent: 'VisionMatch-Agent',
  RelationalGraphAgent: 'RelationalGraphAgent',
  ThreatScoreEngine: 'ThreatScoreEngine',
  SupervisorAgent: 'SupervisorAgent',
  execute: AIOrchestrator.executeSubAgentTask
};
