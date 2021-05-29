import { LayoutProps } from "framer-motion";
import React from "react";

export const MidComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-sidebarH w-full bg-midSection pt-12 px-4 ">
      {children}
    </div>
  );
};
