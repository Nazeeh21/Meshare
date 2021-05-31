import { LayoutProps } from "framer-motion";
import React, { useState } from "react";
import {
  faGlobe,
  faQuestionCircle,
  faPenNib,
  faSignOutAlt,
// @ts-ignore
} from "@fortawesome/free-solid-svg-icons";
import { SidebarButton } from "./SidebarButton";
interface Props {
  image?: string;
}
export const Sidebar: React.FC<Props> = ({ image }: Props) => {
  const [active, setActive] = useState<Number>(0);
  return (
    <div className="h-sidebarH lg:w-32 md:w-32 bg-white w-1/12 rounded-l-md flex flex-col">
      <div className="h-16 bg-iconBlue w-16 rounded-full mx-auto mt-8 overflow-hidden">
        <img src="/miral.jpg" alt="" />
      </div>
      <div>
        <div className="my-24">
          <SidebarButton
            click={() => setActive(0)}
            isActive={active === 0}
            icon={faGlobe}
          />

          <SidebarButton
            click={() => setActive(1)}
            isActive={active === 1}
            icon={faQuestionCircle}
          />

          <SidebarButton
            click={() => setActive(2)}
            isActive={active === 2}
            icon={faPenNib}
          />
        </div>
      </div>
      <div>
        <SidebarButton click={() => {}} icon={faSignOutAlt} color={"#BCD2E2"} />
      </div>
    </div>
  );
};
