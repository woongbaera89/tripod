import { useState } from "react";
import { Node, Edge } from "reactflow";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useNodeExecution = (nodes: Node[], edges: Edge[]) => {
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [agentUrl, setAgentUrl] = useState("");

  const executeNode = async (node: Node) => {
    await delay(1000);
    switch (node.type) {
      case "start":
        // 시작 노드는 다음 노드로 진행
        setMessage("[Start] Job starting...");
        return findNextNode(node.id);

      case "delay":
        // 딜레이 노드는 지정된 시간만큼 대기
        console.log(node.data);
        const delayTime = (node.data.fields?.delay?.value ?? 0) * 1000;
        // setMessage(`[Delay] wait for ${delayTime}ms...`);
        let remainingTime = delayTime;
        const interval = setInterval(() => {
          setMessage(`[Delay] wait for ${remainingTime}ms...`);
          if (remainingTime <= 0) {
            clearInterval(interval);
            setMessage("[Delay] done");
          }
          remainingTime -= 1000;
        }, 1000);
        await delay(delayTime);
        return findNextNode(node.id);

      case "openUrl":
        // URL 열기
        const url = node.data.fields?.url?.value;
        setMessage(`[Open url] ${url}`);
        if (url) {
          setAgentUrl(url);
        }
        return findNextNode(node.id);

      case "reset":
        // 리셋 노드는 프로세스를 다시 시작
        setMessage("[Reset] Job reset");
        return findStartNode();

      default:
        return null;
    }
  };

  const findStartNode = () => {
    return nodes.find((node) => node.type === "start");
  };

  const findNextNode = (currentNodeId: string) => {
    const edge = edges.find((edge) => edge.source === currentNodeId);
    if (!edge) return null;
    return nodes.find((node) => node.id === edge.target);
  };

  const executeFlow = async () => {
    setIsRunning(true);
    setMessage("[Start] Job starting...");
    let currentNode = findStartNode();
    while (currentNode) {
      const nextNode = await executeNode(currentNode);
      currentNode = nextNode ?? undefined;
    }
    setIsRunning(false);
  };

  return { executeFlow, isRunning, message, agentUrl };
};
