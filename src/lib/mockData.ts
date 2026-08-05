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

export const INITIAL_NODES: GraphNode[] = [
  {
    id: 'node-suspect-a',
    label: 'Anil M. (@shadow_net_99)',
    type: 'Person',
    riskScore: 94,
    status: 'Flagged',
    location: 'Kochi, Kerala',
    timestamp: '2026-08-05 22:15',
    details: {
      'FullName': 'Anil Kumar M.',
      'Known Aliases': ['@shadow_net_99', 'CipherKochi', 'DarkHarbor_X'],
      'Primary District': 'Ernakulam, Kochi',
      'CSAM Alert Level': 'CRITICAL (Tier 1)',
      'Associated Accounts': 4,
      'IP Cluster': '103.28.14.92'
    }
  },
  {
    id: 'node-suspect-b',
    label: 'Rashid K. (@dark_harbor)',
    type: 'Person',
    riskScore: 89,
    status: 'Under Investigation',
    location: 'Kozhikode, Kerala',
    timestamp: '2026-08-05 21:40',
    details: {
      'FullName': 'Rashid Khan',
      'Known Handles': ['@dark_harbor', 'KozhikodeNode'],
      'Primary District': 'Kozhikode, Kerala',
      'Telegram Groups': ['HiddenChannel_KL', 'Matrix_Vault_9'],
      'Device IMEI': '869402048192019'
    }
  },
  {
    id: 'node-victim-1',
    label: 'Protected Subject #KL-409',
    type: 'Victim',
    riskScore: 98,
    status: 'Flagged',
    location: 'Thiruvananthapuram, Kerala',
    timestamp: '2026-08-05 20:10',
    details: {
      'Case ID': 'VICTIM-KL-2026-409',
      'Age Bracket': '12-14 years',
      'Status': 'URGENT RESCUE PRIORITY',
      'Last Geo Pin': 'Pattam, Thiruvananthapuram',
      'School Zone': 'Central District'
    }
  },
  {
    id: 'node-device-1',
    label: 'iPhone 14 Pro (MAC: 3A:8B:12)',
    type: 'Device',
    riskScore: 82,
    status: 'Verified',
    location: 'Kochi Cyber Cell Lab',
    details: {
      'Device Model': 'Apple iPhone 14 Pro',
      'Serial Number': 'F2LDK8940QX',
      'MAC Address': '3A:8B:12:E4:99:A1',
      'EXIF Camera Identifier': 'Apple-iOS-Camera-16.2',
      'SIM Serial': '8991002019482'
    }
  },
  {
    id: 'node-account-1',
    label: 'Instagram (@shadow_net_99)',
    type: 'Account',
    riskScore: 91,
    status: 'Flagged',
    details: {
      'Platform': 'Instagram',
      'Username': '@shadow_net_99',
      'Creation Date': '2026-08-05 22:25:12',
      'Linked Email': 'shadow_k*@protonmail.com',
      'Post Count': 14,
      'Encrypted Link in Bio': 't.me/+X92kL90aQ'
    }
  },
  {
    id: 'node-account-2',
    label: 'Telegram Channel (ShieldVault)',
    type: 'Account',
    riskScore: 95,
    status: 'Flagged',
    details: {
      'Platform': 'Telegram',
      'Channel Name': 'ShieldVault_Internal',
      'Subscribers': 128,
      'Admin Handle': '@dark_harbor',
      'Content Class': 'CSAM Media Hub (Flagged)'
    }
  },
  {
    id: 'node-location-1',
    label: 'Kochi Tower BSSID 404-45',
    type: 'Location',
    riskScore: 78,
    status: 'Under Investigation',
    location: 'Kaloor, Ernakulam',
    details: {
      'Latitude': 9.9816,
      'Longitude': 76.2999,
      'Cell Tower ID': 'KL-ERN-40445',
      'Matched IPs': ['103.28.14.92', '49.207.214.10'],
      'Time Window': '22:00 - 23:45 IST'
    }
  },
  {
    id: 'node-vehicle-1',
    label: 'Black Sedan (KL-07-CY-8891)',
    type: 'Vehicle',
    riskScore: 70,
    status: 'Under Investigation',
    location: 'Edappally Toll Plaza',
    details: {
      'Plate Number': 'KL-07-CY-8891',
      'Make/Model': 'Hyundai Verna 2023',
      'Owner Name': 'Anil Kumar M.',
      'ANPR Camera Hit': 'Edappally Toll 23:12 IST'
    }
  },
  {
    id: 'node-image-1',
    label: 'EVID-9921.png (Stego Payload)',
    type: 'Image',
    riskScore: 96,
    status: 'Flagged',
    details: {
      'File Name': 'EVID-9921.png',
      'SHA256 Hash': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      'Steganography Flag': 'DETECTED (Hidden LSB payload)',
      'Resolution': '3840x2160',
      'NUDITY_DETECTION': 'High Severity Flag'
    }
  },
  {
    id: 'node-audio-1',
    label: 'VOICE-NATIVE-882.wav',
    type: 'Audio',
    riskScore: 85,
    status: 'Verified',
    details: {
      'Duration': '00:01:42',
      'Speaker ID Vector': 'SPK-VECTOR-9912 (Matches Anil M. 89% match)',
      'Accent Profile': 'Central Kerala Malayalam Dialect',
      'Acoustic Background': 'Indoor ambient fan noise + vehicle horn'
    }
  },
  {
    id: 'node-video-1',
    label: 'CCTV-CLIP-MALAPPURAM.mp4',
    type: 'Video',
    riskScore: 74,
    status: 'Under Investigation',
    details: {
      'Duration': '00:03:15',
      'Source': 'KSRTC Station CCTV',
      'Object Detection': 'Subject Anil M. observed at ticket counter',
      'Timestamp': '2026-08-05 19:40 IST'
    }
  }
];

export const INITIAL_EDGES: GraphEdge[] = [
  {
    id: 'edge-1',
    source: 'node-suspect-a',
    target: 'node-device-1',
    label: 'Owns',
    confidence: 96,
    timestamp: '2026-08-05 22:15'
  },
  {
    id: 'edge-2',
    source: 'node-suspect-a',
    target: 'node-account-1',
    label: 'Owns',
    confidence: 94,
    timestamp: '2026-08-05 22:25'
  },
  {
    id: 'edge-3',
    source: 'node-account-1',
    target: 'node-image-1',
    label: 'Uploaded',
    confidence: 99,
    timestamp: '2026-08-05 22:42'
  },
  {
    id: 'edge-4',
    source: 'node-suspect-a',
    target: 'node-suspect-b',
    label: 'Connected with',
    confidence: 91,
    timestamp: '2026-08-05 23:05'
  },
  {
    id: 'edge-5',
    source: 'node-suspect-b',
    target: 'node-account-2',
    label: 'Owns',
    confidence: 95,
    timestamp: '2026-08-05 21:40'
  },
  {
    id: 'edge-6',
    source: 'node-account-1',
    target: 'node-account-2',
    label: 'Shared',
    confidence: 88,
    timestamp: '2026-08-05 22:45'
  },
  {
    id: 'edge-7',
    source: 'node-suspect-a',
    target: 'node-location-1',
    label: 'Located at',
    confidence: 92,
    timestamp: '2026-08-05 23:08'
  },
  {
    id: 'edge-8',
    source: 'node-suspect-a',
    target: 'node-vehicle-1',
    label: 'Owns',
    confidence: 98,
    timestamp: '2026-08-05 18:30'
  },
  {
    id: 'edge-9',
    source: 'node-suspect-a',
    target: 'node-victim-1',
    label: 'Contacted',
    confidence: 93,
    timestamp: '2026-08-05 20:42'
  },
  {
    id: 'edge-10',
    source: 'node-suspect-a',
    target: 'node-audio-1',
    label: 'Uploaded',
    confidence: 89,
    timestamp: '2026-08-05 22:50'
  },
  {
    id: 'edge-11',
    source: 'node-vehicle-1',
    target: 'node-location-1',
    label: 'Located at',
    confidence: 87,
    timestamp: '2026-08-05 23:12'
  }
];

export const MOCK_CLUES: ClueItem[] = [
  {
    id: 'clue-1',
    title: 'Suspect Alias Matching (@shadow_net_99 & @dark_harbor)',
    category: 'Suspects',
    description: 'NLP Stylometry and IP overlap confirm high correlation between Anil M. and alias @dark_harbor active in Kerala darknet circles.',
    riskLevel: 'CRITICAL',
    confidenceScore: 91,
    entityIds: ['node-suspect-a', 'node-suspect-b'],
    timestamp: '2026-08-05 23:15 IST',
    tags: ['Stylometry', 'Cross-Platform', 'Kerala Cyber Cell']
  },
  {
    id: 'clue-2',
    title: 'Kaloor Tower BSSID Geolocation Overlay',
    category: 'Locations',
    description: 'Cell tower ping at 11:08 PM IST places suspect device within 250m radius of Kaloor Junction, Ernakulam.',
    riskLevel: 'HIGH',
    confidenceScore: 92,
    entityIds: ['node-location-1', 'node-suspect-a'],
    timestamp: '2026-08-05 23:08 IST',
    tags: ['GPS EXIF', 'BSSID Ping', 'Ernakulam']
  },
  {
    id: 'clue-3',
    title: 'Cross-Platform Handle Linkage (@shadow_net_99)',
    category: 'Aliases',
    description: 'Instagram handle creation matched to identical ProtonMail registration on Matrix protocol.',
    riskLevel: 'HIGH',
    confidenceScore: 95,
    entityIds: ['node-account-1', 'node-suspect-a'],
    timestamp: '2026-08-05 22:25 IST',
    tags: ['ProtonMail', 'Matrix Protocol', 'Identity Resolution']
  },
  {
    id: 'clue-4',
    title: 'Flagged Telegram Channel (ShieldVault)',
    category: 'Accounts',
    description: '128-member encrypted group detected distributing illicit media payloads with custom stego headers.',
    riskLevel: 'CRITICAL',
    confidenceScore: 96,
    entityIds: ['node-account-2', 'node-image-1'],
    timestamp: '2026-08-05 21:40 IST',
    tags: ['Telegram Bot', 'CSAM Vault', 'Steganography']
  },
  {
    id: 'clue-5',
    title: 'Intercepted Chat Transcript #8891',
    category: 'Conversations',
    description: 'Malayalam language chat log contains explicit grooming language and meeting coordinate negotiations.',
    riskLevel: 'CRITICAL',
    confidenceScore: 98,
    entityIds: ['node-victim-1', 'node-suspect-a'],
    timestamp: '2026-08-05 22:42 IST',
    tags: ['Grooming Pattern', 'Malayalam NLP', 'Urgent Action']
  },
  {
    id: 'clue-6',
    title: 'EXIF Steganography Hash Payload (EVID-9921.png)',
    category: 'Metadata',
    description: 'Image binary contains embedded LSB cipher key referencing crypto wallet 0x71C...409A.',
    riskLevel: 'HIGH',
    confidenceScore: 96,
    entityIds: ['node-image-1'],
    timestamp: '2026-08-05 20:12 IST',
    tags: ['LSB Stego', 'Crypto Wallet', 'Forensic Hash']
  },
  {
    id: 'clue-7',
    title: 'Target Device Hardware Signature (iPhone 14 Pro)',
    category: 'Devices',
    description: 'IMEI matched to active Airtel eSIM registered under fake national identity document in Thrissur.',
    riskLevel: 'HIGH',
    confidenceScore: 88,
    entityIds: ['node-device-1'],
    timestamp: '2026-08-05 22:15 IST',
    tags: ['Fake ID', 'eSIM Profile', 'Thrissur Division']
  },
  {
    id: 'clue-8',
    title: 'Coordinated Nighttime Activity Burst Pattern',
    category: 'Patterns',
    description: 'Target accounts exhibit strict burst activity strictly between 22:00 IST and 01:30 IST across 14 consecutive days.',
    riskLevel: 'MEDIUM',
    confidenceScore: 84,
    entityIds: ['node-account-1', 'node-account-2'],
    timestamp: '2026-08-05 23:35 IST',
    tags: ['Temporal Clustering', 'Night Burst', 'Cyber Intelligence']
  }
];

export const MOCK_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'time-1',
    time: '10:25 PM',
    timestampISO: '2026-08-05T22:25:00Z',
    title: 'Instagram account created.',
    description: 'Handle @shadow_net_99 registered from IP 103.28.14.92 via ProtonMail relay.',
    category: 'ACCOUNT',
    entityId: 'node-account-1',
    riskScoreImpact: 15,
    confidence: 99
  },
  {
    id: 'time-2',
    time: '10:42 PM',
    timestampISO: '2026-08-05T22:42:00Z',
    title: 'Message detected.',
    description: 'Automated NLP scanner flagged high-risk grooming discourse directed towards Victim #KL-409.',
    category: 'MESSAGE',
    entityId: 'node-victim-1',
    riskScoreImpact: 25,
    confidence: 94
  },
  {
    id: 'time-3',
    time: '11:08 PM',
    timestampISO: '2026-08-05T23:08:00Z',
    title: 'Location identified.',
    description: 'BSSID triangulation confirmed target device connected to Kaloor cell tower, Kochi.',
    category: 'LOCATION',
    entityId: 'node-location-1',
    riskScoreImpact: 18,
    confidence: 92
  },
  {
    id: 'time-4',
    time: '11:21 PM',
    timestampISO: '2026-08-05T23:21:00Z',
    title: 'Additional account discovered.',
    description: 'Graph agent auto-correlated @shadow_net_99 with Telegram admin handle @dark_harbor.',
    category: 'ACCOUNT',
    entityId: 'node-suspect-b',
    riskScoreImpact: 20,
    confidence: 91
  },
  {
    id: 'time-5',
    time: '11:35 PM',
    timestampISO: '2026-08-05T23:35:00Z',
    title: 'Risk score increased.',
    description: 'Composite threat calculation engine raised total case risk score to 89.4% (CRITICAL THREAT).',
    category: 'RISK',
    riskScoreImpact: 11,
    confidence: 98
  }
];

export const MOCK_NOTEBOOK_ENTRIES: NotebookEntry[] = [
  {
    id: 'nb-1',
    time: '08:10 PM',
    timestampISO: '2026-08-05T20:10:00Z',
    title: 'Image entered into the system.',
    description: 'Cyber Crime Division uploaded forensic file EVID-9921.png captured from seized cloud storage.',
    agentName: 'IngestionAgent-Alpha',
    operationType: 'IMAGE_INGESTION',
    status: 'COMPLETE',
    riskScoreAfter: 45,
    evidenceRef: 'EVID-9921.png'
  },
  {
    id: 'nb-2',
    time: '08:12 PM',
    timestampISO: '2026-08-05T20:12:00Z',
    title: 'Metadata extracted.',
    description: 'EXIF parser extracted camera model Apple iPhone 14 Pro, timestamp 2026-08-05 19:42, and GPS coordinates 9.9312° N, 76.2673° E.',
    agentName: 'MetadataAgent-v4',
    operationType: 'METADATA_EXTRACTION',
    status: 'COMPLETE',
    riskScoreAfter: 58,
    evidenceRef: 'EXIF-LOG-9921'
  },
  {
    id: 'nb-3',
    time: '08:15 PM',
    timestampISO: '2026-08-05T20:15:00Z',
    title: 'Face matching initiated.',
    description: 'Facial vector engine cross-referenced subject face against Kerala Police offender database and Interpol Yellow/Red notice registry.',
    agentName: 'VisionMatch-Agent',
    operationType: 'FACE_MATCHING',
    status: 'COMPLETE',
    riskScoreAfter: 68,
    evidenceRef: 'FACE-VEC-8812'
  },
  {
    id: 'nb-4',
    time: '08:17 PM',
    timestampISO: '2026-08-05T20:17:00Z',
    title: 'Additional account identified.',
    description: 'Agentic graph correlate matched face vector to darknet handle @dark_harbor across 2 illicit channels.',
    agentName: 'RelationalGraphAgent',
    operationType: 'ACCOUNT_IDENTIFICATION',
    status: 'COMPLETE',
    riskScoreAfter: 76,
    evidenceRef: 'ACC-LINK-901'
  },
  {
    id: 'nb-5',
    time: '08:20 PM',
    timestampISO: '2026-08-05T20:20:00Z',
    title: 'Timeline updated.',
    description: '5 temporal events auto-synthesized and linked to suspect timeline with high confidence timestamps.',
    agentName: 'TimelineSynthesizer',
    operationType: 'TIMELINE_UPDATE',
    status: 'COMPLETE',
    riskScoreAfter: 82
  },
  {
    id: 'nb-6',
    time: '08:24 PM',
    timestampISO: '2026-08-05T20:24:00Z',
    title: 'Risk score recalculated.',
    description: 'Autonomous threat engine evaluated multi-modal clues and elevated case status to 89.4% (CRITICAL THREAT LEVEL).',
    agentName: 'ThreatScoreEngine',
    operationType: 'RISK_RECALCULATION',
    status: 'COMPLETE',
    riskScoreAfter: 89
  },
  {
    id: 'nb-7',
    time: '08:30 PM',
    timestampISO: '2026-08-05T20:30:00Z',
    title: 'Officer review requested.',
    description: 'System automatically drafted tactical interception directive and dispatched urgent dispatch alert to DySP Ernakulam.',
    agentName: 'SupervisorAgent',
    operationType: 'OFFICER_REVIEW',
    status: 'PENDING_APPROVAL',
    officerSignoff: 'Pending DySP Ernakulam Approval',
    riskScoreAfter: 89
  }
];

export const MOCK_HYPOTHESES: Hypothesis[] = [
  {
    id: 'hyp-a',
    code: 'Hypothesis A',
    statement: 'Suspect A (@shadow_net_99) and Suspect B (@dark_harbor) are the same individual operating across surface and darknet channels.',
    confidence: 91,
    status: 'VALIDATED',
    lastUpdated: '2026-08-05 23:25 IST',
    reasoning: [
      'Exact matching IP subnet (103.28.14.92) across Instagram and Telegram admin connections.',
      'NLP stylometry analysis of Malayalam-English code-switching patterns shows 94.2% linguistic fingerprint match.',
      'Identical LSB steganography key signature embedded in media posted by both handles.'
    ],
    supportingEvidence: ['EVID-9921.png', 'EXIF-LOG-9921', 'INTERCEPT-CHAT-8891'],
    entityRefs: ['node-suspect-a', 'node-suspect-b']
  },
  {
    id: 'hyp-b',
    code: 'Hypothesis B',
    statement: 'Victim location changed between two timestamps (Thiruvananthapuram to Kozhikode via Kochi transit corridor).',
    confidence: 82,
    status: 'PROPOSED',
    lastUpdated: '2026-08-05 23:10 IST',
    reasoning: [
      'Cell tower handover record indicates device movement along National Highway 66.',
      'ANPR camera hit at Edappally Toll Plaza registered vehicle KL-07-CY-8891 at 23:12 IST.',
      'Active signal gap between 21:00 IST and 22:30 IST matches travel duration.'
    ],
    supportingEvidence: ['TOWER-LOG-40445', 'ANPR-EDAPPALLY-8891'],
    entityRefs: ['node-victim-1', 'node-location-1', 'node-vehicle-1']
  },
  {
    id: 'hyp-c',
    code: 'Hypothesis C',
    statement: 'A coordinated network of 5 automated syndication accounts has been identified distributing encrypted payloads in Kerala.',
    confidence: 88,
    status: 'UNDER_REVIEW',
    lastUpdated: '2026-08-05 22:50 IST',
    reasoning: [
      'Identical bot posting interval (every 42 minutes) across 3 distinct encrypted messaging applications.',
      'Shared crypto wallet receiving address (0x71C...409A) embedded in metadata.',
      'Automated hash matching links 14 media uploads to single primary source node.'
    ],
    supportingEvidence: ['TELEGRAM-VAULT-LOG', 'CRYPTO-TX-0x71C'],
    entityRefs: ['node-account-2', 'node-image-1']
  }
];

export const MOCK_EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: 'EVID-9921',
    title: 'EVID-9921.png (High Resolution Image)',
    type: 'IMAGE',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    ingestedAt: '2026-08-05 20:10 IST',
    source: 'Seized Cloud Bucket',
    csamMatchScore: 98.4,
    exifGeo: '9.9312° N, 76.2673° E (Kochi)',
    deviceSerial: 'Apple-iPhone14Pro-F2LDK',
    riskScore: 96
  },
  {
    id: 'EVID-8812',
    title: 'VOICE-INTERCEPT-2026.wav',
    type: 'AUDIO',
    hash: 'fa821c902b4142109ab77c1209e87b6a12093849102938401928340192834019',
    ingestedAt: '2026-08-05 22:50 IST',
    source: 'Cell Intercept Node',
    riskScore: 85
  },
  {
    id: 'EVID-7701',
    title: 'CCTV-CLIP-EDAPPALLY.mp4',
    type: 'VIDEO',
    hash: '8910239401928340192834019283401928340192834019283401928340192834',
    ingestedAt: '2026-08-05 23:15 IST',
    source: 'Kochi City Surveillance',
    riskScore: 74
  },
  {
    id: 'EVID-5540',
    title: 'Crypto Transaction Ledger (0x71C...409A)',
    type: 'CRYPTO_TRANSACTION',
    hash: '0x9910293840192834019283401928340192834019283401928340192834019283',
    ingestedAt: '2026-08-05 21:30 IST',
    source: 'Blockchain Intelligence API',
    riskScore: 91
  }
];

export const MOCK_XAI_STEPS: XAIReasoningStep[] = [
  {
    stepIndex: 1,
    title: 'Multimodal Feature Extraction & EXIF Analysis',
    agent: 'Ingestion & Metadata Agent v4.2',
    inputs: ['EVID-9921.png raw byte stream'],
    outputs: 'Extracted GPS (Kochi), camera serial, and LSB steganographic key.',
    confidence: 99.1,
    evidenceSources: ['EVID-9921.png', 'ExifTool v12.60'],
    investigatorComment: 'Verified EXIF data matches suspect handset.',
    approvalStatus: 'APPROVED'
  },
  {
    stepIndex: 2,
    title: 'Facial Biometric & Database Vector Cross-Reference',
    agent: 'Biometric Vision Agent',
    inputs: ['Bounding box [120, 45, 340, 280] from EVID-9921.png'],
    outputs: '94.8% vector similarity to offender record Anil M. (State Crime Records Bureau).',
    confidence: 94.8,
    evidenceSources: ['Kerala SCRB Database', 'Interpol Face Registry'],
    investigatorComment: 'Face match verified by Sub-Inspector Cyber Cell.',
    approvalStatus: 'APPROVED'
  },
  {
    stepIndex: 3,
    title: 'Cross-Platform Graph Correlation & Alias Resolution',
    agent: 'Agentic Relational Graph Engine',
    inputs: ['IP 103.28.14.92', 'ProtonMail key', 'Handles @shadow_net_99 & @dark_harbor'],
    outputs: 'Synthesized 9-node entity graph establishing high-confidence relationship between suspect handles.',
    confidence: 91.5,
    evidenceSources: ['Instagram Metadata', 'Telegram Vault Logs', 'ISP IP Logs'],
    investigatorComment: 'High confidence connection established.',
    approvalStatus: 'APPROVED'
  },
  {
    stepIndex: 4,
    title: 'Automated Threat Level & Risk Score Recalculation',
    agent: 'Composite Risk Assessment Agent',
    inputs: ['Clue IDs 1 through 8', 'CSAM severity score 98.4%', 'Victim proximity metrics'],
    outputs: 'Risk score elevated from 62.0% to 89.4% (CRITICAL ALERT). Tactical intercept recommended.',
    confidence: 98.0,
    evidenceSources: ['Kerala Child Protection Protocol Matrix', 'ARGUS Risk Engine'],
    investigatorComment: 'Awaiting DySP final sign-off for raid dispatch.',
    approvalStatus: 'PENDING'
  }
];

export const MOCK_WATCHTOWER_EVENTS: WatchtowerEvent[] = [
  {
    id: 'wt-1',
    timestamp: '23:42:01 IST',
    type: 'THREAT_SPIKE',
    source: 'ARGUS Threat Engine',
    message: 'Risk score escalated to 89.4% due to new location triangulation near Kaloor Junction.',
    riskScore: 89.4,
    entityId: 'node-suspect-a'
  },
  {
    id: 'wt-2',
    timestamp: '23:40:15 IST',
    type: 'NEW_RELATIONSHIP',
    source: 'Graph Correlator',
    message: 'Discovered direct contact link between @shadow_net_99 and burner wallet 0x71C...409A.',
    riskScore: 86.0,
    entityId: 'node-account-1'
  },
  {
    id: 'wt-3',
    timestamp: '23:38:00 IST',
    type: 'MEDIA_DETECTION',
    source: 'Vision Sub-Agent',
    message: 'Flagged 1 new high-resolution image with embedded LSB steganography.',
    riskScore: 92.1,
    entityId: 'node-image-1'
  },
  {
    id: 'wt-4',
    timestamp: '23:35:10 IST',
    type: 'LOCATION_PING',
    source: 'Cell Tower Feeds',
    message: 'Cellular ping hit on Ernakulam BSSID 404-45 (Accuracy: 150m radius).',
    riskScore: 78.5,
    entityId: 'node-location-1'
  }
];

export const DEFAULT_ORCHESTRATION_SETTINGS: OrchestrationSettings = {
  provider: 'Gemini',
  modelName: 'Gemini 3.6 Flash (High Reasoning)',
  apiKey: 'argus_live_poc_key_2026_hackp',
  temperature: 0.2,
  memoryOption: 'Hybrid Relational Memory',
  toolPermissions: {
    faceMatching: true,
    exifParsing: true,
    darknetLookup: true,
    automatedScraper: true,
    hypothesisGeneration: true
  },
  reasoningDepth: 'Standard (Multi-hop)'
};
