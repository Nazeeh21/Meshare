import { LayoutProps } from "framer-motion";
import React from "react";
import { SearchBarHolder } from "./SearchBarHolder";
import { CreateQuestion } from "./CreateQuestion";

export const MidComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="sm:h-sidebarH h-screen w-full bg-midSection sm:pt-12 sm:px-4 p-0 overflow-hidden ">
      {/* <SearchBarHolder children={children} /> */}
      <CreateQuestion />
    </div>
  );
};
