"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Hero() {
  const { user, isLoading, isAuthenticated } = useAuth();

  return (
    <main className="flex-grow flex flex-col items-center justify-center h-[60vh] max-sm:h-[42vh]">
      <section className="text-center flex flex-col items-center justify-end">
        <h1 className="text-3xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] dark:from-white dark:to-[#6EA8FF] text-transparent bg-clip-text pb-5">
          {isAuthenticated && user ? `Welcome back!` : "Ask. Answer."} <br />
          {isAuthenticated && user ? "Ready to go?" : "Stay Anonymous."}
        </h1>
        <p className="mt-5 text-xl font-semibold text-gray-700 dark:text-gray-200 text-center tracking-tight leading-6 max-w-2xl">
          {isAuthenticated && user
            ? `Hey @${user.slug}! Your  community awaits.`
            : "Anonmily — Your thoughts, your rules, your mystery."
          }
        </p>

        <div className="mt-8 flex gap-4 flex-col sm:flex-row">
          {isLoading ? (
            <Button
              size="lg"
              disabled
              className="bg-gradient-to-b from-gray-400 to-gray-500 text-white cursor-not-allowed"
            >
              Loading...
            </Button>
          ) : isAuthenticated && user ? (
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-b from-black to-[#001E80] dark:from-[#6EA8FF] dark:to-[#0044CC] text-white dark:text-black hover:from-gray-900 hover:to-[#002a99] dark:hover:from-[#8EBFFF] dark:hover:to-[#0055FF] transition-all"
            >
              <Link href={`/${user.slug}`}>Go to My Profile</Link>
            </Button>
          ) : (
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-b from-black to-[#001E80] dark:from-[#6EA8FF] dark:to-[#0044CC] text-white dark:text-black hover:from-gray-900 hover:to-[#002a99] dark:hover:from-[#8EBFFF] dark:hover:to-[#0055FF] transition-all"
            >
              <Link href="/auth/register">Get Started</Link>
            </Button>
          )}

          {/* <Button asChild variant="outline" size="lg" className="dark:border-gray-500 dark:text-gray-200">
            <Link href="/explore">Ask a Question</Link>
          </Button> */}
        </div>
      </section>
    </main>
  );
}
