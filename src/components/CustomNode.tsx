import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { useReactFlow } from "reactflow";

// TODO: refer reactflow node props
interface CustomNodeProps {
  type: string;
  selected: boolean;
  id: string;
  data: {
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
  };
}

export const CustomNode = ({ type, selected, id, data }: CustomNodeProps) => {
  const { setNodes } = useReactFlow();

  const onFieldChange = useCallback(
    (fieldKey: string, value: string | number) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                fields: {
                  ...node.data.fields,
                  [fieldKey]: {
                    ...node.data.fields?.[fieldKey],
                    value,
                  },
                },
              },
            };
          }
          return node;
        })
      );
    },
    [id, setNodes]
  );

  return (
    <div
      className={`bg-white p-4 py-2 rounded-lg shadow-md border border-gray-${
        selected ? 500 : 100
      } `}
    >
      {type !== "start" && <Handle type="target" position={Position.Top} />}
      <div className="flex flex-col">
        <div className="font-bold">{data.label}</div>
        {Object.entries(data.fields ?? {}).map(([key, field]) => (
          <div key={key} className="flex flex-col">
            <input
              type={field.type}
              placeholder={field.label}
              value={field.value}
              onChange={(e) => onFieldChange(key, e.target.value)}
              className="px-2 py-1 my-2 text-xs border rounded"
            />
          </div>
        ))}
      </div>
      {type !== "reset" && <Handle type="source" position={Position.Bottom} />}
    </div>
  );
};
