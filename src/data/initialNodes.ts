import { Node, Edge } from "reactflow";
import { CustomNode, customNodes } from "./customNodes";

const createInitialNode = (
  type: CustomNode["type"],
  position: { x: number; y: number }
): Node => {
  const { label, description, fields } = customNodes.find(
    (n) => n.type === type
  )!;
  return {
    id: type,
    type,
    position,
    data: {
      label,
      description,
      fields,
    },
  };
};

export const initialNodes: Node[] = [
  createInitialNode("start", { x: 300, y: 25 }),
  createInitialNode("openUrl", { x: 150, y: 125 }),
  createInitialNode("delay", { x: 350, y: 300 }),
  createInitialNode("reset", { x: 300, y: 450 }),
];

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "start", target: "openUrl" },
  { id: "e2-3", source: "openUrl", target: "delay" },
  { id: "e3-4", source: "delay", target: "reset" },
];
