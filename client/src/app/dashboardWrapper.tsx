"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import StoreProvider, { useAppDispatch, useAppSelector } from "@/app/redux";
import {
  setIsAuthenticated,
  setIsLoginWindowOpen,
  setIsSidebarCollapsed,
} from "@/state";
import useMediaQueryMatch from "@/hooks/useMediaQueryMatch";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import AuthModal from "@/components/AuthModal";
import Spinner from "@/components/Spinner";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isLoginWindowOpen = useAppSelector(
    (state) => state.global.isLoginWindowOpen,
  );

  const isSm = useMediaQueryMatch("sm");

  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

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

  useEffect(() => {
    dispatch(setIsAuthenticated(authStatus === "authenticated"));
  }, [dispatch, authStatus]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <AuthModal
        isOpen={isLoginWindowOpen}
        onClose={() => dispatch(setIsLoginWindowOpen(false))}
      />
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 transition-all duration-300 dark:bg-dark-bg ${
          isSidebarCollapsed ? "" : "sm:pl-64"
        }`}
      >
        <Navbar />
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <StoreProvider>
      <Authenticator.Provider>
        <DashboardLayout>{children}</DashboardLayout>
      </Authenticator.Provider>
    </StoreProvider>
  );
};

export default DashboardWrapper;
