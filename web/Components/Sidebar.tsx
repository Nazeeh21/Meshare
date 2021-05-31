import { LayoutProps } from "framer-motion";
import React, { useState } from "react";
import {
  faGlobe,
  faQuestionCircle,
  faPenNib,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { SidebarButton } from "./SidebarButton";
interface Props {
  image?: string;
}
export const Sidebar: React.FC<Props> = ({ image }: Props) => {
  const [color, setColor] = useState("#BCD2E2");
  const [active, setActive] = useState(false);
  const [background, setBackground] = useState("#1389E6");
  return (
    <div className="h-sidebarH lg:w-32 md:w-32 bg-white w-1/12 rounded-l-md flex flex-col">
      <div className="h-16 bg-iconBlue w-16 rounded-full mx-auto mt-8 overflow-hidden">
        <img src="/miral.jpg" alt="" />
      </div>
      <div>
        <div className="my-24">
          <SidebarButton
            click={() => setBackground("#1389E6")}
            background={background}
            icon={faGlobe}
            color={color}
          />

          <SidebarButton
            click={() => {}}
            background={background}
            icon={faQuestionCircle}
            color={color}
          />

          <SidebarButton
            click={() => {}}
            background={background}
            icon={faPenNib}
            color={color}
          />
        </div>
      </div>
      <div>
        <SidebarButton click={() => {}} icon={faSignOutAlt} color={color} />
      </div>
    </div>
  );
};
