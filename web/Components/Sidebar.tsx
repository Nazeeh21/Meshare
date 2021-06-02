import { LayoutProps } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  faGlobe,
  faQuestionCircle,
  faPenNib,
  faSignOutAlt,
  // @ts-ignore
} from "@fortawesome/free-solid-svg-icons";
import { SidebarButton } from "./SidebarButton";
import { useGetUserQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
interface Props {
  image?: string;
}
export const Sidebar: React.FC<Props> = ({ image }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [active, setActive] = useState<Number>(0);
  const [_, logout] = useLogoutMutation();

  const userData = useSelector((state: RootStateOrAny) => state.main.userData);
  useEffect(() => {
    console.log("userData: ", userData);
  }, [userData]);

  return (
    <div className="h-sidebarH lg:w-32 md:w-32 bg-white w-1/12 rounded-l-md hidden md:flex flex-col justify-around">
      <div
        onClick={() => router.push(`https://www.github.com/${userData.name}`)}
        className="h-16 bg-iconBlue w-16 rounded-full mx-auto mt-8 overflow-hidden"
      >
        <img
          src={userData ? userData.avatarUrl : "/doraemon.svg"}
          alt={userData ? userData.name : "Default avatar"}
        />
      </div>
      <div>
        <div className="my-24">
          <SidebarButton
            click={() => setActive(0)}
            isActive={active === 0}
            icon={faGlobe}
            size={"2x"}
          />

          <SidebarButton
            click={() => setActive(1)}
            isActive={active === 1}
            icon={faQuestionCircle}
            size={"2x"}
          />

          <SidebarButton
            click={() => setActive(2)}
            isActive={active === 2}
            icon={faPenNib}
            size={"2x"}
          />
        </div>
      </div>
      <div>
        {/* <Button> */}
        <SidebarButton
          click={async () => {
            await logout();
            router.reload();
          }}
          icon={faSignOutAlt}
          color={"#BCD2E2"}
          size={"2x"}
        />
        {/* </Button> */}
      </div>
    </div>
  );
};
