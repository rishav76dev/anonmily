"use client";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitch } from "@/components/ui/switch";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@/hooks/useAuthQueries";

export default function Navbar() {
  const { user, isLoading } = useAuth();
  const logoutMutation = useLogout();

  return (
    <nav className="p-4 md:p-6 font-display">
      <div className="container mx-auto flex md:flex-row justify-between items-center">
        <Link
          href="/"
          className="text-2xl max-sm:text-lg font-bold max-sm:mb-0 mt-1 md:mb-0 flex max-sm:items-center"
        >
          <Image
            src="/anon-ok.png"
            alt="logo"
            width={0}
            height={0}
            className="rounded-xl w-10 h-auto"
            sizes="40px"
          />
          <span className="ml-[-3px]">Anonmily</span>
        </Link>

        <div className="flex items-center space-x-4">
          <ThemeSwitch />

          {isLoading ? (
            <div className="w-full dark:bg-gray-600 bg-gray-300 rounded-full px-8 h-8 max-sm:px-4 max-sm:h-7 flex items-center justify-center">
              <span className="text-sm">Loading...</span>
            </div>
          ) : !user ? (
            <>
              <Link href="/auth/login">
                <button className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-200 bg-black text-white hover:bg-gray-800 hover:text-white rounded-full px-8 h-8 max-sm:px-4 max-sm:h-7">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-200 bg-black text-white hover:bg-gray-800 hover:text-white rounded-full px-8 h-8 max-sm:px-4 max-sm:h-7 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {logoutMutation.isPending ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
