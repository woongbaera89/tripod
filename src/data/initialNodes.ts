import { Node, Edge } from "reactflow";
import { nodeTypes } from "./nodeTypes";

const createInitialNode = (
  type: string,
  position: { x: number; y: number }
): Node => {
  const nodeType = nodeTypes.find((n) => n.type === type);
  return {
    id: type,
    type,
    position,
    data: {
      label: nodeType?.label || type,
      description: nodeType?.description || "",
      fields: nodeType?.fields || {},
    },
  };
};

export const initialNodes: Node[] = [
  createInitialNode("start", { x: 250, y: 25 }),
  createInitialNode("delay", { x: 150, y: 125 }),
  createInitialNode("openUrl", { x: 350, y: 325 }),
  createInitialNode("reset", { x: 250, y: 475 }),
];

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "start", target: "delay" },
  { id: "e2-3", source: "delay", target: "openUrl" },
  { id: "e3-4", source: "openUrl", target: "reset" },
];
