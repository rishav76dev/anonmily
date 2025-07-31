"use client"
import Image from "next/image"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { useEffect, useState } from "react";

export default function Navbar() {
//     const [isDark, setIsDark] = useState(false);

//   useEffect(() => {
//     document.documentElement.classList.toggle('dark', isDark);
//   }, [isDark]);
  return (
    <nav className="p-4 md:p-6 font-display">
  <div className="container mx-auto flex md:flex-row justify-between items-center">

    <Link href="/" className="text-2xl max-sm:text-lg font-bold max-sm:mb-0 mt-1 md:mb-0 flex max-sm:items-center">
      <span>
        <Image src="/anon.png" alt="logo" height="40" width="40" className="rounded-xl max-sm:h-6 max-sm:w-6" />
      </span>
      <span className="ml-[-3px]">Anonmily</span>
    </Link>

    <div className="flex items-center space-x-4">

      <Switch />

      {/* <!-- Auth Button --> */}
      <Link href="/sign-in" >
        <button className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-200 bg-black text-white hover:bg-gray-800 hover:text-white rounded-full px-8 h-8 max-sm:px-4 max-sm:h-7">
          Login
        </button>
      </Link>

    </div>
  </div>
</nav>

  )
}
