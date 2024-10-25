import ReactFlow, { Background, BackgroundVariant, MarkerType, useReactFlow, useNodesState, useEdgesState } from 'reactflow';
import { useState, useCallback } from 'react';
import 'reactflow/dist/style.css';
import { CustomControls } from '@components/CustomControls';
import { saveFlow, restoreFlow } from '@utils/Chart'
import { createNode } from '@utils/Nodes';

// TODO: Remove nodes
// TODO: Connect Nodes

const flowKey = "flow-forge"
const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: '1' }
  },
  {
    id: '2',
    position: { x: 0, y: 100 },
    data: { label: '2' }
  },
  {
    id: '3',
    position: { x: 0, y: 200 },
    data: { label: '3' }
  },
];
const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    markerend: {
      type: MarkerType.ArrowClosed,
    }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    markerend: {
      type: MarkerType.ArrowClosed,
    }
  },
];

export const Chart = () => {
  const { getViewport, setViewport } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const saveChart = useCallback(() => {
    const viewport = getViewport() || { x: 0, y: 0, zoom: 1 };
    saveFlow(flowKey, nodes, edges, viewport);
  }, [nodes, edges]);

  const restoreChart = useCallback(() => {
    const flow = restoreFlow(flowKey);
    if (flow) {
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (flow.viewport) {
        setViewport({
          x: flow.viewport.x || 0,
          y: flow.viewport.y || 0,
          zoom: flow.viewport.zoom || 1
        });
      }
    }
  }, [setNodes, setEdges, setViewport]);

  const addNode = () => {
    const newNode = createNode(nodes);
    setNodes((currNodes) => currNodes.concat(newNode));
  }

  const clearChart = (): void => {
    saveChart();
    setNodes([]);
    setEdges([]);
  };

  return (
    <>
      <div style={{ width: '90vw', height: '90vh' }}>
        <ReactFlow nodes={nodes} edges={edges} nodesDraggable={true} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}>
          <CustomControls
            onAddNode={addNode}
            onSave={saveChart}
            onRestore={restoreChart}
            onClearChart={clearChart}
          />
          <Background color="#ccc" variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
    </>
  );
}

