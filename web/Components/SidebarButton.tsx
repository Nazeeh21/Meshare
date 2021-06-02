import { LayoutProps } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
interface Props {
  click?: any;
  icon: any;
  color?: string;
  isActive?: boolean;
  size: any;
}

export const SidebarButton: React.FC<Props> = ({
  children,
  click,
  icon,
  isActive,
  size,
}) => {
  return (
    <div
      onClick={click}
      className={` mt-4 ${
        isActive ? "bg-iconBlue" : "bg-white"
      } flex justify-center items-center p-3 w-8/12 mx-auto rounded-lg cursor-pointer `}
    >
      <FontAwesomeIcon
        icon={icon}
        size={size}
        color={isActive ? "white" : "iconGrey"}
      />
    </div>
  );
};
