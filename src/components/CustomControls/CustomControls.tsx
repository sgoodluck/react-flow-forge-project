import React from "react";
import { Controls, ControlButton, useReactFlow } from "reactflow";
import {
  FolderPlusIcon,
  FolderOpenIcon,
  PlusIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ViewfinderCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

type CustomControlsProps = {
  onAddNode: () => void;
  onSave: () => void;
  onRestore: () => void;
  onClearChart: () => void;
};

const CustomControls: React.FC<CustomControlsProps> = ({
  onAddNode,
  onSave,
  onRestore,
  onClearChart,
}) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <Controls
      showInteractive={false}
      showZoom={false}
      showFitView={false}
      className="text-gray-900"
    >
      <ControlButton onClick={onAddNode} title="Add Node" className="size-8">
        <PlusIcon />
      </ControlButton>
      <ControlButton onClick={onSave} title="Save Chart" className="size-8">
        <FolderPlusIcon />
      </ControlButton>
      <ControlButton
        onClick={onRestore}
        title="Restore Chart"
        className="size-8"
      >
        <FolderOpenIcon />
      </ControlButton>
      <ControlButton
        onClick={onClearChart}
        title="Clear Chart"
        className="size-8"
      >
        <TrashIcon />
      </ControlButton>
      <ControlButton
        onClick={() => zoomIn()}
        title="Zoom In"
        className="size-8"
      >
        <MagnifyingGlassPlusIcon className="text-2xl" />
      </ControlButton>
      <ControlButton
        onClick={() => zoomOut()}
        title="Zoom Out"
        className="size-8"
      >
        <MagnifyingGlassMinusIcon />
      </ControlButton>
      <ControlButton
        onClick={() => fitView()}
        title="Fit View"
        className="size-8"
      >
        <ViewfinderCircleIcon />
      </ControlButton>
    </Controls>
  );
};

export default CustomControls;
