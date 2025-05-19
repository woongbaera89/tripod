import { DragEvent } from "react";

const Sidebar = () => {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="h-full w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Templates</h3>
        <div className="space-y-2">
          <div
            className="p-3 border border-blue-500 rounded cursor-move bg-blue-50 hover:bg-blue-100 transition-colors"
            onDragStart={(event) => onDragStart(event, "input")}
            draggable
          >
            Input Node
          </div>
          <div
            className="p-3 border border-gray-500 rounded cursor-move bg-gray-50 hover:bg-gray-100 transition-colors"
            onDragStart={(event) => onDragStart(event, "default")}
            draggable
          >
            Default Node
          </div>
          <div
            className="p-3 border border-pink-500 rounded cursor-move bg-pink-50 hover:bg-pink-100 transition-colors"
            onDragStart={(event) => onDragStart(event, "output")}
            draggable
          >
            Output Node
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
