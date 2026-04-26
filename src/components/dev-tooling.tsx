"use client";

import dynamic from "next/dynamic";

const ErrorReporter = dynamic(() => import("@/components/ErrorReporter"), {
  ssr: false,
});

export default function DevTooling() {
  if (process.env.NODE_ENV !== "development") return null;
  return <ErrorReporter />;
}
