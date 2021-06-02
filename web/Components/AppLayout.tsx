import { LayoutProps } from "framer-motion";
import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { ActivityBar } from "./ActivityBar";
import { Bottombar } from "./Bottombar";
import { MidComponent } from "./MidComponent";
import { Sidebar } from "./Sidebar";

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
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
