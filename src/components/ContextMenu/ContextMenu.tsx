
import { generateNodeId } from '@utils/Nodes';
import { useCallback } from 'react';
import { useReactFlow, Node, Edge } from 'reactflow'

interface ContextMenuProps {
  id: string;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  [key: string]: any;
}

export const ContextMenu = ({
  id,
  top,
  left,
  right,
  bottom,
  ...props
}: ContextMenuProps) => {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    if (node) {
      const position = {
        x: node.position.x + 50,
        y: node.position.y + 50,
      };

      addNodes({
        ...node,
        id: generateNodeId(),
        position,
        selected: false,
        dragging: false,
      });
    }
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes: Node[]) => nodes.filter((node) => node.id !== id));
    setEdges((edges: Edge[]) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left, right, bottom }}
      className="context-menu"
      {...props}
    >
      <p style={{ margin: '0.5em' }}>
        <small>node: {id}</small>
      </p>
      <button onClick={duplicateNode}>Duplicate</button>
      <button onClick={deleteNode}>Delete</button>
    </div>
  );
}
