import { LayoutProps } from "framer-motion";
import React from "react";

export const Sidebar: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-sidebarH bg-white w-24 rounded-l-md">{children}</div>
  );
};
