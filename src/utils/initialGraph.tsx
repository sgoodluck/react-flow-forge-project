import { MarkerType, Node } from "reactflow";
import { CustomNodeData } from "./interfaces";

// Raw data

export const initialNodes: Node<CustomNodeData>[] = [
  {
    id: "Dpe0tuh8",
    type: "custom",
    data: {
      label: "Confirm Design",
      isActive: false,
      isComplete: true,
    },
    position: { x: -59.27, y: -143.61 },
  },
  {
    id: "rQ9nXAFF",
    type: "custom",
    data: {
      label: "Source Materials",
      isActive: false,
      isComplete: true,
    },
    position: { x: 134.38, y: -143.3 },
  },
  {
    id: "lePDKFkI",
    type: "custom",
    data: {
      label: "Load Machine",
      isActive: false,
      isComplete: true,
    },
    position: { x: 340.8, y: -142.09 },
  },
  {
    id: "uOE94CJL",
    type: "custom",
    data: {
      label: "Initial Cutting",
      isActive: true,
      isComplete: false,
    },
    position: { x: 529.96, y: -217.48 },
  },
  {
    id: "UxPUMxy6",
    type: "custom",
    data: {
      label: "Polishing",
      isActive: false,
      isComplete: true,
    },
    position: { x: 527.56, y: -64.62 },
  },
  {
    id: "8J8VVKQe",
    type: "custom",
    data: {
      label: "Review",
      isActive: false,
      isComplete: false,
    },
    position: { x: 728.81, y: -144.23 },
  },
];

export const initialEdges = [
  {
    id: "e1-2", // Unique ID for the edge
    source: "uOE94CJL",
    target: "8J8VVKQe",
    animated: true,
    markerend: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e2-3", // Unique ID for the edge
    source: "UxPUMxy6",
    target: "8J8VVKQe",
    markerend: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e3-4", // Unique ID for the edge
    source: "lePDKFkI",
    target: "uOE94CJL",
    markerend: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e4-5", // Unique ID for the edge
    source: "lePDKFkI",
    target: "UxPUMxy6",
    markerend: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e5-6", // Unique ID for the edge
    source: "rQ9nXAFF",
    target: "lePDKFkI",
    markerend: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "e6-7", // Unique ID for the edge
    source: "Dpe0tuh8",
    target: "rQ9nXAFF",
    markerend: {
      type: MarkerType.ArrowClosed,
    },
  },
];
