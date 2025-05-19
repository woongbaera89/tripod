import { Node, Edge } from "reactflow";
import { CustomNode, customNodes } from "./customNodes";

const createInitialNode = (
  id: number,
  type: CustomNode["type"],
  position: { x: number; y: number },
  fields?: {
    [key: string]: {
      type: string;
      label: string;
      value: string | number;
    };
  }
): Node => {
  const { label, description } = customNodes.find((n) => n.type === type)!;
  return {
    id: id.toString(),
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
  createInitialNode(1, "start", { x: 250, y: 25 }),
  createInitialNode(
    2,
    "openUrl",
    { x: 25, y: 125 },
    {
      url: {
        type: "string",
        label: "URL",
        value: "https://nextrows.com",
      },
    }
  ),
  createInitialNode(
    3,
    "delay",
    { x: 350, y: 200 },
    {
      delay: { type: "number", label: "Delay (s)", value: 10 },
    }
  ),
  createInitialNode(
    4,
    "openUrl",
    { x: 50, y: 350 },
    {
      url: {
        type: "string",
        label: "URL",
        value:
          "https://nextrows.com/f/qz0pc2/s/6sczts?p=Add+data+with+latest+with+a+new+sheet",
      },
    }
  ),
  createInitialNode(
    5,
    "delay",
    { x: 350, y: 400 },
    {
      delay: { type: "number", label: "Delay (s)", value: 60 },
    }
  ),
  createInitialNode(6, "reset", { x: 225, y: 600 }),
];

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5" },
  { id: "e5-6", source: "5", target: "6" },
];
