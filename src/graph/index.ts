export { InteractiveGraph } from '../components/graph/InteractiveGraph';
import { argusStore } from '../lib/store';

export const GraphService = {
  getNodes: () => argusStore.nodes,
  getEdges: () => argusStore.edges,
  setSelectedNode: (id: string | null) => argusStore.setSelectedNode(id)
};
