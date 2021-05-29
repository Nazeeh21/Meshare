import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AppLayout } from "../../Components/AppLayout";
import { MidComponent } from "../../Components/MidComponent";
import { Sidebar } from "../../Components/Sidebar";
import { isServer } from "../../utils/isServer";
import { getPageFiles } from "next/dist/next-server/server/get-page-files";
import { ActivityBar } from "../../Components/ActivityBar";

const AuthSuccess = () => {
  const router = useRouter();
  useEffect(() => {
    if (!isServer()) {
      // console.log(window.sessionStorage.getItem())
    }
  }, [isServer()]);
  return (
    <AppLayout>
      <Sidebar />
      <MidComponent />
      <ActivityBar />
    </AppLayout>
  );
};

export default AuthSuccess;
