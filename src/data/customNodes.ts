export interface CustomNode {
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

export const customNodes: CustomNode[] = [
  {
    type: "start",
    label: "Start",
    description: "Process start point",
    color: "green",
  },
  {
    type: "openUrl",
    label: "Open URL",
    description: "Open specified URL",
    color: "yellow",
    fields: {
      url: {
        type: "string",
        label: "URL",
        value:
          "https://nextrows.com/new?p=Create+a+sheet+from+the+following+URL%3A+https://news.naver.com/section/105",
      },
    },
  },
  {
    type: "delay",
    label: "Delay",
    description: "Wait for specified milliseconds",
    color: "blue",
    fields: {
      delay: { type: "number", label: "Delay (s)", value: 60 },
    },
  },
  {
    type: "reset",
    label: "Reset",
    description: "Reset and restart the process",
    color: "red",
  },
];
