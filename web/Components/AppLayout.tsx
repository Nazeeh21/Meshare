import { LayoutProps } from "framer-motion";
import { withUrqlClient } from "next-urql";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "../generated/graphql";
import { getUsers } from "../redux/actions/main";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";
import { ActivityBar } from "./ActivityBar";
import { Bottombar } from "./Bottombar";
import { MidComponent } from "./MidComponent";
import { Sidebar } from "./Sidebar";

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch()
  const [{ data, error }] = useGetUserQuery({
    pause: isServer(),
  });

  // console.log('data: ', data);
  
  useEffect(() => {
    dispatch(getUsers(data, error))
  }, [data])
  return (
    <div className="sm:min-h-screen h-screen w-full bg-background p-0 sm:p-4 flex">
      <Sidebar />
      <MidComponent children={children} />
      <ActivityBar />
      {/* {children} */}
      <Bottombar />
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(AppLayout);
