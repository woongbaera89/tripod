import { useCallback, useEffect } from "react";
import { useReactFlow, Node, Edge } from "reactflow";

export const useDeleteKey = (
  setNodes: (updater: (nodes: Node[]) => Node[]) => void,
  setEdges: (updater: (edges: Edge[]) => Edge[]) => void
) => {
  const { getNodes, getEdges } = useReactFlow();

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Delete") {
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
};
