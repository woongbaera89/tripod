import { useState } from "react";

export const Toolbar = () => {
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto rounded-lg m-4 p-2 z-50 bg-black/30 backdrop-blur-sm shadow-lg flex gap-2">
      {isRunning ? (
        <button
          onClick={handleStop}
          className="bg-red-400 font-bold w-24 text-xl p-3 px-6 rounded-md"
        >
          STOP
        </button>
      ) : (
        <button
          onClick={handleRun}
          className="bg-green-500 font-bold w-24 text-xl p-3 px-6 rounded-md"
        >
          RUN
        </button>
      )}
    </div>
  );
};
