"use client";

import { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  BackgroundVariant,
  Node,
  ReactFlowInstance,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    data: { label: "Default Node" },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="absolute left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4 z-10">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Node Templates</h3>
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

function FlowComponent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const { getNodes, getEdges } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) {
        return;
      }

      if (!reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${nodes.length + 1}`,
        type,
        position,
        data: { label: `${type} Node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes, reactFlowInstance]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        const selectedNodes = getNodes().filter((node) => node.selected);
        const selectedEdges = getEdges().filter((edge) => edge.selected);

        if (selectedNodes.length > 0 || selectedEdges.length > 0) {
          setNodes((nds) => nds.filter((node) => !node.selected));
          setEdges((eds) => eds.filter((edge) => !edge.selected));
        }
      }
    },
    [getNodes, getEdges, setNodes, setEdges]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div className="w-full h-screen">
      <Sidebar />
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onInit={setReactFlowInstance}
          fitView
          deleteKeyCode={["Delete", "Backspace"]}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function Flow() {
  return (
    <ReactFlowProvider>
      <FlowComponent />
    </ReactFlowProvider>
  );
}
