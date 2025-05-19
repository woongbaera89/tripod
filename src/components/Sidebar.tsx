import React from "react";
import { nodeTypes } from "@/data/nodeTypes";

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Node Templates</h3>
        <div className="space-y-2">
          {nodeTypes.map((node) => (
            <div
              key={node.type}
              className={`p-3 border border-${node.color}-500 rounded cursor-move bg-${node.color}-50 hover:bg-${node.color}-100 transition-colors`}
              onDragStart={(event) => onDragStart(event, node.type)}
              draggable
            >
              <div className="font-medium">{node.label}</div>
              <div className="text-sm text-gray-500">{node.description}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
