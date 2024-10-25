import ReactFlow, {
  Background,
  BackgroundVariant,
  useReactFlow,
  useNodesState,
  useEdgesState,
  Connection,
  NodeTypes,
  Node,
} from "reactflow";
import { useCallback, useEffect, useRef, useState } from "react";
import "reactflow/dist/style.css";
import { CustomControls } from "@components/CustomControls";
import { ContextMenu } from "@components/ContextMenu";
import { MenuPosition } from "@utils/interfaces";
import { CustomNode } from "@components/CustomNode";
import { updateNodeStates } from "@utils/Nodes/nodeUtils";
import {
  saveChart,
  restoreChart,
  addNode as addNodeUtil,
  connectNodes as connectNodesUtil,
} from "@utils/Chart";
import { initialEdges, initialNodes } from "@utils/initialGraph";

const flowKey = "flow-forge";
const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

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
  }, [nodes, edges]);

  const updateNodeLabel = useCallback(
    (nodeId: string, newLabel: string) => {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node,
        ),
      );
    },
    [setNodes],
  );

  const addNode = useCallback(() => {
    addNodeUtil(setNodes, updateNodeLabel);
  }, [updateNodeLabel]);

  const connectNodes = useCallback(
    (params: Connection) => connectNodesUtil(setEdges)(params),
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

  const saveCurrentChart = useCallback(() => {
    saveChart(flowKey, nodes, edges, getViewport);
  }, [nodes, edges]);

  const restoreCurrentChart = useCallback(() => {
    restoreChart(flowKey, setNodes, setEdges, setViewport);
  }, [setNodes, setEdges, setViewport]);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        fitView
        ref={paneRef}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={connectNodes}
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
      >
        <CustomControls
          onAddNode={addNode}
          onSave={saveCurrentChart}
          onRestore={restoreCurrentChart}
          onClearChart={() => {
            saveCurrentChart();
            setNodes([]);
            setEdges([]);
          }}
        />
        <Background color="#ccc" variant={BackgroundVariant.Dots} />
        {menu && <ContextMenu {...menu} />}
      </ReactFlow>
    </div>
  );
};
