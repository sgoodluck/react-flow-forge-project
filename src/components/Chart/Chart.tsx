import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  MarkerType,
  useReactFlow,
  useNodesState,
  useEdgesState,
  Connection,
  Node,
  Position,
} from "reactflow";
import { useCallback, useRef, useState } from "react";
import "reactflow/dist/style.css";
import { CustomControls } from "@components/CustomControls";
import { saveFlow, restoreFlow } from "@utils/Chart";
import { createNode } from "@utils/Nodes";
import { ContextMenu } from "@components/ContextMenu";

interface MenuPosition {
  id: string;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

const flowKey = "flow-forge";
const initialNodes = [
  {
    id: "1",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 0, y: 0 },
    data: { label: "1" },
  },
  {
    id: "2",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 200, y: 0 },
    data: { label: "2" },
  },
  {
    id: "3",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 400, y: 0 },
    data: { label: "3" },
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerend: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    markerend: {
      type: MarkerType.ArrowClosed,
    },
  },
];

export const Chart = () => {
  const { getViewport, setViewport } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [menu, setMenu] = useState<MenuPosition | null>(null);
  const paneRef = useRef<HTMLDivElement>(null);

  const addNode = () => {
    const newNode = createNode();
    setNodes((currNodes) => currNodes.concat(newNode));
  };
  const connectNodes = useCallback(
    (params: Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges],
  );

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();

      const pane = paneRef.current?.getBoundingClientRect();
      if (pane) {
        const x = event.clientX - pane.left;
        const y = event.clientY - pane.top;

        setMenu({
          id: node.id,
          top: y < pane.height - 200 ? y : pane.height - 200,
          left: x < pane.width - 200 ? x : pane.width - 200,
        });
      }
    },
    [setMenu],
  );

  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

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
          zoom: flow.viewport.zoom || 1,
        });
      }
    }
  }, [setNodes, setEdges, setViewport]);

  const clearChart = (): void => {
    saveChart();
    setNodes([]);
    setEdges([]);
  };

  return (
    <>
      <div className="h-screen w-screen">
        <ReactFlow
          fitView
          ref={paneRef}
          nodes={nodes}
          edges={edges}
          nodesDraggable={true}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={connectNodes}
          onNodeContextMenu={onNodeContextMenu}
          onPaneClick={onPaneClick}
        >
          <CustomControls
            onAddNode={addNode}
            onSave={saveChart}
            onRestore={restoreChart}
            onClearChart={clearChart}
          />
          <Background color="#ccc" variant={BackgroundVariant.Dots} />
          {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
        </ReactFlow>
      </div>
    </>
  );
};
