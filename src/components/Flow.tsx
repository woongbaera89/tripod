"use client";

import { useState } from "react";
import ReactFlow, {
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
import { initialNodes, initialEdges } from "@/data/initialNodes";
import { useDeleteKey } from "@/hooks/useDeleteKey";
import { useFlowEvents } from "@/hooks/useFlowEvents";
import { CustomNode } from "./CustomNode";
import { Toolbar } from "./Toolbar";

const nodeTypes = {
  start: CustomNode,
  delay: CustomNode,
  openUrl: CustomNode,
  reset: CustomNode,
};

const FlowComponent = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const { onConnect, onDragOver, onDrop } = useFlowEvents(
    nodes,
    setNodes,
    setEdges,
    reactFlowInstance
  );

  useDeleteKey(setNodes, setEdges);

  return (
    <div className="w-full h-screen flex relative">
      <Sidebar />
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode={["Delete", "Backspace"]}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
      <Toolbar />
    </div>
  );
};

export const Flow = Object.assign(FlowComponent, {
  Provider: ReactFlowProvider,
});
