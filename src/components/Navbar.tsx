"use client";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 md:p-6 font-display">
      <div className="container mx-auto flex md:flex-row justify-between items-center">
        <Link
          href="/"
          className="text-2xl max-sm:text-lg font-bold max-sm:mb-0 mt-1 md:mb-0 flex max-sm:items-center"
        >
          <span>
            <Image
              src="/anon.png"
              alt="logo"
              width={0}
              height={0}
              className="rounded-xl w-10 h-auto"
              sizes="40px"
            />
          </span>
          <span className="ml-[-3px]">Anonmily</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Switch />

          {/* <!-- Auth Button --> */}
          <Link href="/auth/login">
            <button className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-200 bg-black text-white hover:bg-gray-800 hover:text-white rounded-full px-8 h-8 max-sm:px-4 max-sm:h-7">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
