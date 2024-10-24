import { Node } from 'reactflow';

export const createNode = (nodes: Node[]): Node => {
  const newNodeId = (nodes.length + 1).toString();
  return {
    id: newNodeId,
    data: { label: `Node ${newNodeId}` },
    position: { x: Math.random() * 250, y: Math.random() * 250 },
  };
};
