import { useState } from "react";
import { useNodeExecution } from "../hooks/useNodeExecution";
import { useReactFlow } from "reactflow";

export const Toolbar = () => {
  const reactFlowInstance = useReactFlow();
  const { isRunning, message, agentUrl, executeFlow } = useNodeExecution(
    reactFlowInstance.getNodes(),
    reactFlowInstance.getEdges()
  );

  return (
    <>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto rounded-lg m-4 p-2 z-50 bg-black/30 backdrop-blur-sm shadow-lg flex gap-2">
        <button
          onClick={executeFlow}
          disabled={isRunning}
          className="bg-green-400 font-bold text-xl p-3 px-6 rounded-md line-clamp-1 text-ellipsis"
        >
          {isRunning ? `Message: ${message}` : "RUN"}
        </button>
      </div>
      <AgentScreen src={agentUrl} />
    </>
  );
};

const AgentScreen = ({ src }: { src: string }) => {
  const [collapsed, setCollapsed] = useState(true);

  if (!src) return null;

  return (
    <div
      className="fixed w-3/4 h-3/4 right-0 bottom-0 m-8 z-50 origin-bottom-right"
      style={{
        transform: collapsed ? "scale(0.2)" : "scale(1)",
      }}
    >
      <div className="relative w-full h-full shadow-2xl">
        <iframe src={src} className="w-full h-full" />
        {collapsed ? (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute top-0 left-0 w-full h-full bg-black/50 text-white flex items-center justify-center"
          >
            <ExpandIcon size={200} />
          </button>
        ) : (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -top-12 right-0 p-4 bg-black/50 text-white flex items-center justify-center"
          >
            <ExpandIcon />
          </button>
        )}
      </div>
    </div>
  );
};

const ExpandIcon = ({ size = 20 }: { size?: number }) => {
  return (
    <svg
      fill="#fff"
      height={size}
      width={size}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 242.133 242.133"
    >
      <path
        id="XMLID_15_"
        d="M227.133,83.033c8.283,0,15-6.716,15-15V15c0-8.284-6.717-15-15-15H174.1c-8.284,0-15,6.716-15,15
	s6.716,15,15,15h16.82l-69.854,69.854L51.213,30h16.82c8.284,0,15-6.716,15-15s-6.716-15-15-15H15C6.717,0,0,6.716,0,15v53.033
	c0,8.284,6.717,15,15,15c8.285,0,15-6.716,15-15v-16.82l69.854,69.854L30,190.92V174.1c0-8.284-6.715-15-15-15
	c-8.283,0-15,6.716-15,15v53.033c0,8.284,6.717,15,15,15h53.033c8.284,0,15-6.716,15-15c0-8.284-6.716-15-15-15h-16.82
	l69.854-69.854l69.854,69.854H174.1c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h53.033c8.283,0,15-6.716,15-15V174.1
	c0-8.284-6.717-15-15-15c-8.285,0-15,6.716-15,15v16.82l-69.854-69.854l69.854-69.854v16.82
	C212.133,76.317,218.848,83.033,227.133,83.033z"
      />
    </svg>
  );
};
