/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import { useSelector, RootStateOrAny } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faQuestionCircle,
  faPenNib,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

export const Bottombar = () => {
  const router = useRouter();
  const userData = useSelector((state: RootStateOrAny) => state.main.userData);
  return (
    <div className=" h-16 absolute bottom-0 flex justify-around items-center md:hidden bg-white rounded-t-lg shadow-2xl opacity-30 w-screen">
      <img
        onClick={() => router.push(`https://www.github.com/${userData.name}`)}
        className="h-10 w-10 bg-iconBlue rounded-full overflow-hidden"
        src={userData ? userData.avatarUrl : "/doraemon.svg"}
        alt={userData ? userData.name : "Default avatar"}
      />

      <FontAwesomeIcon
        onClick={() => router.push("/my-questions")}
        className="h-10 w-10"
        icon={faQuestionCircle}
        size="xs"
        color="#BCD2E2"
      />
      <FontAwesomeIcon
        onClick={() => router.push("/")}
        className="h-10 w-10"
        icon={faGlobe}
        size="xs"
        color="#BCD2E2"
      />
      <FontAwesomeIcon
        onClick={() => router.push("/create-question")}
        className="h-10 w-10"
        icon={faPenNib}
        size="xs"
        color="#BCD2E2"
      />
      <FontAwesomeIcon
        onClick={() => router.push("/bookmarked-questions")}
        className="h-10 w-10"
        icon={faNewspaper}
        size="xs"
        color="#1C3F73"
      />
    </div>
  );
};
