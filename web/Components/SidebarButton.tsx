import { LayoutProps } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Tooltip } from "@material-ui/core";
interface Props {
  click?: any;
  icon: any;
  color?: string;
  isActive?: boolean;
  size: any;
  title: string;
}

export const SidebarButton: React.FC<Props> = ({
  children,
  click,
  icon,
  isActive,
  size,
  title,
}) => {
  return (
    <Tooltip title={title}>
      <div
        onClick={click}
        className={` mt-4 ${
          isActive ? "bg-iconBlue" : "bg-white hover:bg-medGrey"
        } flex justify-center items-center p-3 w-8/12 mx-auto rounded-lg cursor-pointer `}
      >
        <FontAwesomeIcon
          icon={icon}
          size={size}
          color={isActive ? "white" : "iconGrey"}
        />
      </div>
    </Tooltip>
  );
};
