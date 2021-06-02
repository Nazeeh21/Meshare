import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SidebarButton } from "./SidebarButton";
import {
  faGlobe,
  faQuestionCircle,
  faPenNib,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

export const Bottombar = () => {
  return (
    <div className=" h-16 absolute bottom-0 flex justify-around items-center sm:hidden bg-white rounded-t-lg shadow-2xl opacity-30 w-screen">
      <img
        onClick={() => console.log("clicked")}
        className="h-10 w-10 bg-iconBlue rounded-full overflow-hidden"
        src="/doraemon.svg"
        alt=""
      />

      <FontAwesomeIcon
        onClick={() => console.log("clicked")}
        className="h-10 w-10"
        icon={faQuestionCircle}
        size="xs"
        color="#BCD2E2"
      />
      <FontAwesomeIcon
        onClick={() => {}}
        className="h-10 w-10"
        icon={faGlobe}
        size="xs"
        color="#BCD2E2"
      />
      <FontAwesomeIcon
        onClick={() => {}}
        className="h-10 w-10"
        icon={faPenNib}
        size="xs"
        color="#BCD2E2"
      />
      <FontAwesomeIcon
        onClick={() => {}}
        className="h-10 w-10"
        icon={faNewspaper}
        size="xs"
        color="#1C3F73"
      />
    </div>
  );
};
