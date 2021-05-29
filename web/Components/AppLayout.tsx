import { LayoutProps } from "framer-motion";
import React from "react";

export const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return <div className="min-h-screen bg-background p-4 flex">{children}</div>;
};
