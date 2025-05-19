import { Handle, Position } from "reactflow";

// TODO: refer reactflow node props
interface CustomNodeProps {
  type: string;
  selected: boolean;
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

const CustomNode = ({ type, selected, data }: CustomNodeProps) => {
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
              defaultValue={field.value}
              className="px-2 py-1 my-2 text-xs border rounded"
            />
          </div>
        ))}
      </div>
      {type !== "reset" && <Handle type="source" position={Position.Bottom} />}
    </div>
  );
};

export default CustomNode;
