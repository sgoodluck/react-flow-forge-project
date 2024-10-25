import { Node, Edge, Connection, addEdge } from "reactflow";
import { createNode } from "@utils/Nodes";

// Utility function save the current chart
export const saveChart = (
  flowKey: string,
  nodes: Node[],
  edges: Edge[],
  getViewport: () => any,
) => {
  const viewport = getViewport() || { x: 0, y: 0, zoom: 1 };

  const flowData = {
    nodes,
    edges,
    viewport,
  };

  localStorage.setItem(flowKey, JSON.stringify(flowData));
};

// Utility function to restore the flow state
export const restoreChart = (
  flowKey: string,
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
  setViewport: (viewport: any) => void,
) => {
  let flow;
  const flowData = localStorage.getItem(flowKey);

  if (flowData) {
    flow = JSON.parse(flowData);
  } else {
    console.log("No saved chart available");
  }

  if (flow) {
    setNodes(flow.nodes || []);
    setEdges(flow.edges || []);

    if (flow.viewport) {
      setViewport({
        x: flow.viewport.x || 0,
        y: flow.viewport.y || 1,
        zoom: flow.viewport.zoom || 1,
      });
    }
  }
};

// Add a new node to the flow
export const addNode = (
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  updateNodeLabel: (nodeId: string, newLabel: string) => void,
) => {
  const newNode = createNode();
  newNode.data.onLabelChange = updateNodeLabel;

  setNodes((prevNodes: Node[]) => {
    return [...prevNodes, newNode];
  });
};

// Utility function to connect nodes
export const connectNodes = (
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>,
) => {
  return (params: Connection) =>
    setEdges((edges: Edge[]) => addEdge(params, edges));
};

// Utility function to restore flow from local storage
export const restoreFlow = (flowKey: string) => {
  const flowData = localStorage.getItem(flowKey);

  if (flowData) {
    return JSON.parse(flowData);
  } else {
    console.log("No saved chart available");
    return null;
  }
};
