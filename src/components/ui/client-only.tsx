"use client";

import type { FC, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
}

const ClientOnly: FC<ClientOnlyProps> = ({ children }) => {
  if (typeof window === "undefined") {
    return null;
  }
  return <>{children}</>;
};

export default ClientOnly;
