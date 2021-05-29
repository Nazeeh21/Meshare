import { LayoutProps } from "framer-motion";
import React from "react";
interface Props {
  image: string;
}
export const Sidebar: React.FC<Props> = ({ image }: Props) => {
  return (
    <div className="h-sidebarH lg:w-32 md:w-32 bg-white w-1/12 rounded-l-md flex flex-col">
      <div className="h-16 bg-iconBlue w-16 rounded-full mx-auto mt-8 overflow-hidden">
        <img src="/miral.jpg" alt="" />
      </div>
      <div>
        <div>
          <img src="/browse.png" alt="" />
        </div>
      </div>
    </div>
  );
};
