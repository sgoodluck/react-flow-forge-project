import React, { useState, useCallback, ChangeEvent } from "react";
import { Handle, Position, NodeProps } from "reactflow";

interface CustomNodeData {
  label: string;
  onLabelChange: (id: string, newLabel: string) => void;
}

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({
  id,
  data,
  isConnectable,
}) => {
  const [label, setLabel] = useState(data.label);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  }, []);

  const onBlur = useCallback(() => {
    data.onLabelChange(id, label);
  }, [id, label, data]);

  return (
    <div className="rounded-md border-2 border-gray-200 bg-white px-4 py-2 shadow-md">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        className="h-3 w-3 bg-blue-500"
      />
      <div className="text-xs text-gray-400">Task ID: {id}</div>
      <input
        className="nodrag mt-2 w-full rounded border border-gray-300 px-2 py-1 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
        value={label}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="Describe task..."
      />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="h-3 w-3 bg-blue-500"
      />
    </div>
  );
};

export default CustomNode;
