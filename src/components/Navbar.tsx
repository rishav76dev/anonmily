"use client";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitch } from "@/components/ui/switch";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  slug: string;
}
export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    // create a global context for if user is logged in or not
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          cache: "no-store",
          credentials: "include",
        });
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
    const intervalId = setInterval(fetchUser, 2000);

    return () => clearInterval(intervalId);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    startTransition(() => {
      setUser(null);
      router.push("/"); // go home
      router.refresh(); // refresh server comps
    });
  }

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

          {!user ? (
            <>
              <Link href="/auth/login">
                <button className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-200 bg-black text-white hover:bg-gray-800 hover:text-white rounded-full px-8 h-8 max-sm:px-4 max-sm:h-7">
                  Login
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-200 bg-black text-white hover:bg-gray-800 hover:text-white rounded-full px-8 h-8 max-sm:px-4 max-sm:h-7"
            >
              {isPending ? "Logging out..." : "Logout"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
