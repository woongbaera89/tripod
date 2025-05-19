import { useCallback } from "react";
import { Connection, Edge, Node, ReactFlowInstance } from "reactflow";
import { addEdge } from "reactflow";
import { customNodes } from "@/data/customNodes";

export const useFlowEvents = (
  nodes: Node[],
  setNodes: (updater: (nodes: Node[]) => Node[]) => void,
  setEdges: (updater: (edges: Edge[]) => Edge[]) => void,
  reactFlowInstance: ReactFlowInstance | null
) => {
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

      const nodeType = customNodes.find((n) => n.type === type);
      const newNode: Node = {
        id: `${nodes.length + 1}`,
        type,
        position,
        data: {
          label: nodeType?.label || type,
          description: nodeType?.description || "",
          color: nodeType?.color || "gray",
          fields: { ...nodeType?.fields },
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes, reactFlowInstance]
  );

  return {
    onConnect,
    onDragOver,
    onDrop,
  };
};
