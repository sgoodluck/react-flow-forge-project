import React, { } from 'react';
import { Controls, ControlButton, useReactFlow } from 'reactflow';
import { MdZoomIn, MdZoomOut, MdFitScreen, MdSave, MdRestore, MdAdd } from 'react-icons/md';

type CustomControlsProps = {
  onAddNode: () => void;
  onSave: () => void;
  onRestore: () => void;
};

const CustomControls: React.FC<CustomControlsProps> = ({ onAddNode, onSave, onRestore }) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <Controls showInteractive={false} showZoom={false} showFitView={false}>
      <ControlButton onClick={onAddNode} title="Add Node">
        <MdAdd />
      </ControlButton>
      <ControlButton onClick={onSave} title="Save">
        <MdSave />
      </ControlButton>
      <ControlButton onClick={onRestore} title="Restore">
        <MdRestore />
      </ControlButton>
      <ControlButton onClick={() => zoomIn()} title="zoom in">
        <MdZoomIn />
      </ControlButton>
      <ControlButton onClick={() => zoomOut()} title="zoom out">
        <MdZoomOut />
      </ControlButton>
      <ControlButton onClick={() => fitView()} title="fit view">
        <MdFitScreen />
      </ControlButton>
    </Controls>
  );
};

export default CustomControls;

