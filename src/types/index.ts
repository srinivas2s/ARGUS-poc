export type EntityType = 
  | 'Person' 
  | 'Victim' 
  | 'Device' 
  | 'Account' 
  | 'Location' 
  | 'Vehicle' 
  | 'Image' 
  | 'Audio' 
  | 'Video';

export type RelationshipType = 
  | 'Owns' 
  | 'Uploaded' 
  | 'Contacted' 
  | 'Shared' 
  | 'Located at' 
  | 'Connected with';

export type ClueCategory = 
  | 'Suspects' 
  | 'Locations' 
  | 'Aliases' 
  | 'Accounts' 
  | 'Conversations' 
  | 'Metadata' 
  | 'Devices' 
  | 'Patterns';

export type AIProvider = 
  | 'OpenAI' 
  | 'Gemini' 
  | 'Claude' 
  | 'DeepSeek' 
  | 'Llama' 
  | 'Mistral' 
  | 'Local models';

export interface GraphNode {
  id: string;
  label: string;
  type: EntityType;
  riskScore: number; // 0 to 100
  details: Record<string, string | number | boolean | string[]>;
  image?: string;
  status: 'Flagged' | 'Under Investigation' | 'Verified' | 'Low Threat';
  location?: string;
  timestamp?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: RelationshipType;
  confidence: number; // 0 to 100
  timestamp?: string;
  evidenceId?: string;
}

export interface ClueItem {
  id: string;
  title: string;
  category: ClueCategory;
  description: string;
  riskLevel: 'HIGH' | 'CRITICAL' | 'MEDIUM' | 'LOW';
  confidenceScore: number;
  entityIds: string[];
  timestamp: string;
  tags: string[];
  metadata?: Record<string, string | number>;
}

export interface TimelineEvent {
  id: string;
  time: string;
  timestampISO: string;
  title: string;
  description: string;
  category: 'ACCOUNT' | 'MESSAGE' | 'LOCATION' | 'MEDIA' | 'ALERT' | 'RISK';
  entityId?: string;
  riskScoreImpact?: number; // e.g. +15
  evidenceId?: string;
  confidence: number;
}

export interface NotebookEntry {
  id: string;
  time: string;
  timestampISO: string;
  title: string;
  description: string;
  agentName: string;
  operationType: 'IMAGE_INGESTION' | 'METADATA_EXTRACTION' | 'FACE_MATCHING' | 'ACCOUNT_IDENTIFICATION' | 'TIMELINE_UPDATE' | 'RISK_RECALCULATION' | 'OFFICER_REVIEW';
  status: 'COMPLETE' | 'IN_PROGRESS' | 'PENDING_APPROVAL';
  officerSignoff?: string;
  riskScoreAfter?: number;
  evidenceRef?: string;
}

export interface Hypothesis {
  id: string;
  code: string; // e.g. "Hypothesis A"
  statement: string;
  confidence: number; // 0 - 100
  reasoning: string[];
  supportingEvidence: string[];
  entityRefs: string[];
  status: 'PROPOSED' | 'VALIDATED' | 'REJECTED' | 'UNDER_REVIEW';
  lastUpdated: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  type: 'IMAGE' | 'AUDIO' | 'VIDEO' | 'METADATA' | 'CHAT_LOG' | 'NETWORK_PCAP' | 'CRYPTO_TRANSACTION';
  hash: string;
  ingestedAt: string;
  source: string;
  csamMatchScore?: number;
  exifGeo?: string;
  deviceSerial?: string;
  riskScore: number;
}

export interface XAIReasoningStep {
  stepIndex: number;
  title: string;
  agent: string;
  inputs: string[];
  outputs: string;
  confidence: number;
  evidenceSources: string[];
  investigatorComment?: string;
  approvalStatus: 'APPROVED' | 'PENDING' | 'FLAGGED';
}

export interface WatchtowerEvent {
  id: string;
  timestamp: string;
  type: 'NEW_RELATIONSHIP' | 'THREAT_SPIKE' | 'METADATA_CORRELATION' | 'MEDIA_DETECTION' | 'LOCATION_PING';
  source: string;
  message: string;
  riskScore: number;
  entityId: string;
}

export interface OrchestrationSettings {
  provider: AIProvider;
  modelName: string;
  apiKey: string;
  temperature: number;
  memoryOption: 'Graph Memory' | 'Vector DB Buffer' | 'Hybrid Relational Memory';
  toolPermissions: {
    faceMatching: boolean;
    exifParsing: boolean;
    darknetLookup: boolean;
    automatedScraper: boolean;
    hypothesisGeneration: boolean;
  };
  reasoningDepth: 'Fast (1-pass)' | 'Standard (Multi-hop)' | 'Exhaustive Deep Graph Search';
}
