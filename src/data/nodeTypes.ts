export interface NodeType {
  type: string;
  label: string;
  description: string;
  color: string;
  fields?: {
    [key: string]: {
      type: string;
      label: string;
      value: string | number;
    };
  };
}

export const nodeTypes: NodeType[] = [
  {
    type: "start",
    label: "Start",
    description: "Process start point",
    color: "blue",
  },
  {
    type: "delay",
    label: "Delay",
    description: "Wait for specified milliseconds",
    color: "yellow",
    fields: {
      delay: { type: "number", label: "Delay (s)", value: 60 },
    },
  },
  {
    type: "openUrl",
    label: "Open URL",
    description: "Open specified URL",
    color: "purple",
    fields: {
      url: { type: "string", label: "URL", value: "https://" },
    },
  },
  {
    type: "reset",
    label: "Reset",
    description: "Reset and restart the process",
    color: "red",
  },
];
