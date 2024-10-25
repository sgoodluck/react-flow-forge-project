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
  NodeTypes,
} from "reactflow";
import { useCallback, useEffect, useRef, useState } from "react";
import "reactflow/dist/style.css";
import { CustomControls } from "@components/CustomControls";
import { saveFlow, restoreFlow } from "@utils/Chart";
import { createNode } from "@utils/Nodes";
import { ContextMenu } from "@components/ContextMenu";
import { CustomNodeData, MenuPosition } from "@utils/interfaces";
import { CustomNode } from "@components/CustomNode";
import { updateNodeStates } from "@utils/Nodes/nodeUtils";

const flowKey = "flow-forge";
const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: "Sample-1",
    type: "custom",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 0, y: 0 },
    data: {
      label: "Task A",
      onLabelChange: () => {},
      isActive: false,
      isComplete: false,
    },
  },
  {
    id: "Sample-2",
    type: "custom",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 300, y: 0 },
    data: {
      label: "Task B",
      onLabelChange: () => {},
      isActive: false,
      isComplete: false,
    },
  },
  {
    id: "Sample-3",
    type: "custom",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 600, y: 0 },
    data: {
      label: "Task C",
      onLabelChange: () => {},
      isActive: false,
      isComplete: false,
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "Sample-1",
    target: "Sample-2",
    markerend: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e2-3",
    source: "Sample-2",
    target: "Sample-3",
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

  useEffect(() => {
    const updatedNodes = updateNodeStates(nodes, edges);
    if (JSON.stringify(updatedNodes) !== JSON.stringify(nodes)) {
      setNodes(updatedNodes);
    }
  }, [nodes, edges, setNodes]);

  const updateNodeLabel = useCallback(
    (nodeId: string, newLabel: string) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, label: newLabel } };
          }
          return node;
        }),
      );
    },
    [setNodes],
  );

  const addNode = useCallback(() => {
    const newNode = createNode();
    newNode.data.onLabelChange = updateNodeLabel;
    setNodes((currNodes) => currNodes.concat(newNode));
  }, [updateNodeLabel, setNodes]);

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
          nodeTypes={nodeTypes}
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
