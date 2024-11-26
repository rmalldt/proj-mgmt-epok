"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import StoreProvider, { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import useMediaQueryMatch from "@/hooks/useMediaQueryMatch";
import { Authenticator } from "@aws-amplify/ui-react";
import AuthProvider from "./AuthProvider";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoginWindowOpen, setIsLoginWindowOpen] = useState(false);

  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const isSm = useMediaQueryMatch("sm");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isSm) dispatch(setIsSidebarCollapsed(true));
    else dispatch(setIsSidebarCollapsed(false));
  }, [dispatch, isSm]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <AuthProvider
        isOpen={isLoginWindowOpen}
        onClose={() => setIsLoginWindowOpen(false)}
      />
      <Sidebar onLoginWindowOpen={() => setIsLoginWindowOpen(true)} />
      <main
        className={`flex w-full flex-col bg-gray-50 transition-all duration-300 dark:bg-dark-bg ${
          isSidebarCollapsed ? "" : "sm:pl-64"
        }`}
      >
        <Navbar onLoginWindowOpen={() => setIsLoginWindowOpen(true)} />
        {children}
      </main>
    </div>
  );
};

/**
 * DashboardWrapper is created so that we can use states provided by StoreProvider
 * in the DashboardLayout and also make the states accessible to the entire app.
 */
const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <Authenticator.Provider>
        <DashboardLayout>{children}</DashboardLayout>
      </Authenticator.Provider>
    </StoreProvider>
  );
};

export default DashboardWrapper;
