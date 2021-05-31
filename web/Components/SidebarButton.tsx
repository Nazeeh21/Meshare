import { LayoutProps } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
interface Props {
  background?: string;
  click?: any;
  icon: any;
  color: string;
}

export const SidebarButton: React.FC<Props> = ({
  children,
  background,
  click,
  icon,
  color,
}) => {
  return (
    <div
      onClick={click}
      className={` mt-4 bg-${background} flex justify-center items-center p-3 w-8/12 mx-auto rounded-lg cursor-pointer `}
    >
      <FontAwesomeIcon icon={icon} size={"2x"} color={color} />
    </div>
  );
};
