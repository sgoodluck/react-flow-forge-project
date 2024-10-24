import ReactFlow, { Background, BackgroundVariant, MarkerType, Panel, Controls, ControlButton } from 'reactflow';
import { useState } from 'react';
import 'reactflow/dist/style.css';
import { CustomControls } from '@components/CustomControls';
import { createNode } from '@utils/Nodes';

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
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const saveChart = () => {
    console.log("Saved");
  }

  const restoreChart = () => {
    console.log("Restored")
  }

  const addNode = () => {
    console.log("Adding a node!")
    const newNode = createNode(nodes);
    console.log("New Node: ", newNode)
    setNodes((currNodes) => currNodes.concat(newNode))
    console.log("Node State: ", nodes)
  }

  return (
    <>
      <div style={{ width: '90vw', height: '90vh' }}>
        <ReactFlow nodes={nodes} edges={edges} >
          <CustomControls
            onAddNode={addNode}
            onSave={saveChart}
            onRestore={restoreChart}
          />
          <Background color="#ccc" variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>
    </>
  );
}
