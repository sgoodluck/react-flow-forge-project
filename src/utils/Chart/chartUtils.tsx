export const saveFlow = (
  flowKey: string,
  nodes: any[],
  edges: any[],
  viewport: { x: number; y: number; zoom: number },
) => {
  const flowData = {
    nodes,
    edges,
    viewport,
  };

  localStorage.setItem(flowKey, JSON.stringify(flowData));
};

export const restoreFlow = (flowKey: string) => {
  const flowData = localStorage.getItem(flowKey);

  if (flowData) {
    return JSON.parse(flowData);
  } else {
    console.log("No saved chart available");
    return null;
  }
};
