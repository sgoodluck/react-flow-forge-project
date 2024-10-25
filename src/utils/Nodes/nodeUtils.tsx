import { Node } from 'reactflow';

export const createNode = (): Node => {
  const newNodeId = generateNodeId();
  return {
    id: newNodeId,
    data: { label: `Node` },
    position: { x: Math.random() * 250, y: Math.random() * 250 },
  };
};

export const generateNodeId = (length: number = 8): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'node-';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

