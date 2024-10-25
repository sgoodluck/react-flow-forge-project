import { Position, MarkerType, Node } from "reactflow";
import { CustomNodeData } from "./interfaces";

export const initialNodes: Node<CustomNodeData>[] = [
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

export const initialEdges = [
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
