import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SearchBarHolder = ({ children }) => {
  return (
    <div className="h-full">
      <div className="flex">
        <input
          type="text"
          className="bg-greyS w-full h-16 rounded-tl-md outline-none text-lg font-sans px-2"
          placeholder="Search"
        />
        <FontAwesomeIcon
          onClick={() => {}}
          className="w-16 bg-greyS p-2 h-16 rounded-tr-md border-l-4 border-white cursor-pointer"
          icon={faSearch}
          size={"xs"}
        />
      </div>
      <div className="h-full p-4 bg-white overflow-y-auto">{children}</div>
    </div>
  );
};
