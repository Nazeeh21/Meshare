import { LayoutProps } from "framer-motion";
import React from "react";

export const ActivityBar: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-sidebarH w-3/12 rounded-r-md bg-activityBlue">
      {children}
    </div>
  );
};
