export interface DecisionStep {
  id: string;
  stage: 'INPUT_INGESTION' | 'FEATURE_EXTRACTION' | 'RELATIONAL_MAPPING' | 'REASONING_SYNTHESIS' | 'OUTPUT_HYPOTHESIS';
  title: string;
  inputData: string;
  processApplied: string;
  symbolicReasoning: string;
  outputResult: string;
  confidenceScore: number;
  supportingEvidence: string[];
  timestamp: string;
}

export const ExplainabilityEngine = {
  /**
   * Explains step-by-step AI decision logic from raw intelligence input to synthesized threat hypothesis.
   */
  getTraceabilitySteps: (hypothesisId?: string): DecisionStep[] => {
    return [
      {
        id: 'trace-1',
        stage: 'INPUT_INGESTION',
        title: 'Raw Multi-Channel Data Ingestion',
        inputData: 'Ingested 4 Telegram logs, 1 CCTV clip (KL-07-CY-8891), and 1 audio WAV file.',
        processApplied: 'NLP entity extraction + Computer Vision plate recognition & face matching.',
        symbolicReasoning: 'Parsed 3 phone numbers, 2 handles (@shadow_net_99, @dark_harbor), and 1 vehicle registration pin.',
        outputResult: 'Identified 11 relational entities with high-risk CSAM markers.',
        confidenceScore: 96,
        supportingEvidence: ['EVID-9921.png', 'CCTV-CLIP-MALAPPURAM', 'VOICE-NATIVE-882.wav'],
        timestamp: '2026-08-05 20:10:00'
      },
      {
        id: 'trace-2',
        stage: 'FEATURE_EXTRACTION',
        title: 'EXIF Metadata & Vector Clustering',
        inputData: 'JPEG EXIF tags + Cell Tower BSSID-404 geo pin.',
        processApplied: 'Vector embedding distance computation in 1536-dim latent space.',
        symbolicReasoning: 'Device IMEI matches known suspect device registered to Kochi district.',
        outputResult: 'Entity cluster localized to Pattam, Thiruvananthapuram & Kochi border.',
        confidenceScore: 92,
        supportingEvidence: ['Cell Tower Log #404', 'IMEI-869402048192019'],
        timestamp: '2026-08-05 20:45:00'
      },
      {
        id: 'trace-3',
        stage: 'RELATIONAL_MAPPING',
        title: 'Graph Traversal & Contact Analysis',
        inputData: 'Target Node: Anil M. (@shadow_net_99)',
        processApplied: 'Multi-hop shortest path traversal + co-location frequency analysis.',
        symbolicReasoning: 'Direct contact link confirmed between Anil M. and Victim #KL-409 via encrypted proxy channel.',
        outputResult: 'High-threat network sub-graph constructed with 9 nodes and 12 directed edges.',
        confidenceScore: 94,
        supportingEvidence: ['Encrypted Telegram Log #09', 'Protected Subject #KL-409'],
        timestamp: '2026-08-05 21:15:00'
      },
      {
        id: 'trace-4',
        stage: 'REASONING_SYNTHESIS',
        title: 'Autonomous Multi-Agent Consensus',
        inputData: 'Agent Reports: Commander (94%), Risk (98%), Vision (88%), Timeline (92%).',
        processApplied: 'Weighted Bayesian consensus aggregation.',
        symbolicReasoning: 'Corroboration threshold exceeded. Threat level upgraded to CRITICAL (Tier 1).',
        outputResult: 'Actionable rescue & law-enforcement dispatch order recommended.',
        confidenceScore: 95,
        supportingEvidence: ['Agent Consensus Matrix v3.4'],
        timestamp: '2026-08-05 21:50:00'
      }
    ];
  }
};
