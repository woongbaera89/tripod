"use client";

import { Flow } from "@/components/Flow";

export default function Home() {
  return (
    <Flow.Provider>
      <Flow />
    </Flow.Provider>
  );
}
