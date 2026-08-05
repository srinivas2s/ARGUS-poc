import { GraphNode, GraphEdge } from '@/types';

export interface DigitalTwinSimulation {
  entitiesCount: number;
  relationshipsCount: number;
  activeDevicesCount: number;
  locationsCount: number;
  behavioralPatternsCount: number;
  simulatedActivities: {
    id: string;
    timestamp: string;
    actor: string;
    action: string;
    location: string;
    riskScore: number;
  }[];
  twinNodes: GraphNode[];
  twinEdges: GraphEdge[];
}

export const DigitalTwinEngine = {
  /**
   * Generates real-time Digital Twin simulation model containing virtualized entities,
   * relationships, ongoing activities, hardware devices, behavioral patterns, and geo-locations.
   */
  generateTwinModel: (baseNodes: GraphNode[], baseEdges: GraphEdge[]): DigitalTwinSimulation => {
    return {
      entitiesCount: baseNodes.length,
      relationshipsCount: baseEdges.length,
      activeDevicesCount: baseNodes.filter(n => n.type === 'Device').length + 2,
      locationsCount: baseNodes.filter(n => n.type === 'Location').length + 1,
      behavioralPatternsCount: 7,
      simulatedActivities: [
        {
          id: 'act-101',
          timestamp: 'Just now',
          actor: 'Anil M. (@shadow_net_99)',
          action: 'Pings Cell Tower BSSID-404',
          location: 'Kochi, Kerala',
          riskScore: 94
        },
        {
          id: 'act-102',
          timestamp: '2 mins ago',
          actor: 'Rashid K. (@dark_harbor)',
          action: 'Created Telegram Channel HiddenVault_KL',
          location: 'Kozhikode, Kerala',
          riskScore: 89
        },
        {
          id: 'act-103',
          timestamp: '5 mins ago',
          actor: 'Black Sedan (KL-07-CY-8891)',
          action: 'Passed CCTV toll gate #12',
          location: 'Aluva, Ernakulam',
          riskScore: 78
        },
        {
          id: 'act-104',
          timestamp: '8 mins ago',
          actor: 'iPhone 14 Pro (MAC: 3A:8B:12)',
          action: 'Uploaded encrypted voice payload',
          location: 'Thiruvananthapuram',
          riskScore: 85
        }
      ],
      twinNodes: baseNodes,
      twinEdges: baseEdges
    };
  }
};
