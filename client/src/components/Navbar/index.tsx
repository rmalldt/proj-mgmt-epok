import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import { useGetAuthUserQuery } from "@/state/api";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { signOut } from "aws-amplify/auth";
import { Menu, Moon, Settings, Sun, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../Searchbar";

const Navbar = ({ onLoginWindowOpen }: { onLoginWindowOpen: () => void }) => {
  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  const isAuthenticated = authStatus === "authenticated";

  console.log("AUTH_STATUS", isAuthenticated);

  const { data: currentUser } = useGetAuthUserQuery(isAuthenticated);

  console.log("CUR_USER", currentUser);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  const currentUserDetails = currentUser?.userDetails;

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* Searchbar */}
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        )}
        <SearchBar />
      </div>
      {/* Icons */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? "rounded p-2 dark:hover:bg-gray-700"
              : "rounded p-2 hover:bg-gray-100"
          }
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>
        <Link
          href="settings"
          className={
            isDarkMode
              ? "h-min w-min rounded p-2 dark:hover:bg-gray-700"
              : "h-min w-min rounded p-2 hover:bg-gray-100"
          }
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
        <div className="hidden items-center justify-between md:flex">
          <div className="flex h-9 w-9 items-center justify-center">
            {isAuthenticated && !!currentUserDetails?.profilePictureUrl ? (
              <Image
                src={`https://evok-s3-images.s3.us-east-1.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                alt={currentUserDetails?.username || "User Profile Picture"}
                width={100}
                height={50}
                className="h-full rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
            )}
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {isAuthenticated && currentUserDetails
              ? currentUserDetails.username
              : "Guest"}
          </span>
          {isAuthenticated ? (
            <button
              className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          ) : (
            <button
              className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
              onClick={onLoginWindowOpen}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
