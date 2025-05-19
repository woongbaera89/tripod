"use client";

import { useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  ReactFlowInstance,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import { initialNodes, initialEdges } from "@/data/initialFlowStates";
import { useDeleteKey } from "@/hooks/useDeleteKey";
import { useFlowEvents } from "@/hooks/useFlowEvents";

const FlowComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const { onConnect, onDragOver, onDrop } = useFlowEvents(
    reactFlowInstance,
    nodes,
    setNodes,
    setEdges
  );

  useDeleteKey(setNodes, setEdges);

  return (
    <div className="w-full h-screen flex flex-row">
      <Sidebar />
      <div className="flex-grow">
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
};

export const Flow = Object.assign(FlowComponent, {
  Provider: ReactFlowProvider,
});
