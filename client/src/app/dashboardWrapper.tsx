"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import StoreProvider, { useAppDispatch, useAppSelector } from "@/app/redux";
import AuthProvider from "./authProvider";
import { setIsGuestUser, setIsSidebarCollapsed } from "@/state";
import useMediaQueryMatch from "@/hooks/useMediaQueryMatch";

export const DashboardLayout = ({
  children,
  isGuest,
}: {
  children: React.ReactNode;
  isGuest: boolean;
}) => {
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const isSm = useMediaQueryMatch("sm");

  useEffect(() => {
    dispatch(setIsGuestUser(isGuest));
  }, [dispatch, isGuest]);

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
  const [isGuest, setIsGuest] = useState(false);

  return isGuest ? (
    <StoreProvider>
      <DashboardLayout isGuest={isGuest}>{children}</DashboardLayout>
    </StoreProvider>
  ) : (
    <StoreProvider>
      <AuthProvider onHandleIsGuest={setIsGuest}>
        <DashboardLayout isGuest={isGuest}>{children}</DashboardLayout>
      </AuthProvider>
    </StoreProvider>
  );
};

export default DashboardWrapper;
