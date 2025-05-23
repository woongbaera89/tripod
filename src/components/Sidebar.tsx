import React from "react";
import { customNodes } from "@/data/customNodes";

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 p-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold">Tripod</h3>
        <p className="text-gray-500">
          Drag and drop nodes to create your workflow.
        </p>
        <div className="space-y-2">
          {customNodes.map(({ color, description, label, type }) => (
            <div
              key={type}
              className={`p-3 border border-${color}-500 rounded cursor-move bg-${color}-50 hover:bg-${color}-100 transition-colors`}
              onDragStart={(event) => onDragStart(event, type)}
              draggable
            >
              <div className="font-medium">{label}</div>
              <div className="text-sm text-gray-500">{description}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
