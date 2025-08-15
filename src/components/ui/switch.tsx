"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"

function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <SwitchPrimitive.Root
      checked={theme === "dark"}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      className={cn(
        "peer relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-800 data-[state=unchecked]:bg-yellow-200",
        className
      )}
    >
      {/* Background icons */}
      <Sun
        size={14}
        className={cn(
          "absolute left-1 text-white transition-opacity duration-200",
          theme === "dark" ? "opacity-0" : "opacity-100"
        )}
      />
      <Moon
        size={14}
        className={cn(
          "absolute right-1 text-white transition-opacity duration-200",
          theme === "dark" ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Moving thumb with icon */}
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none relative block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 flex items-center justify-center"
        )}
      >
        {/* Active icon on the thumb */}
        <Sun
          size={12}
          className={cn(
            "absolute text-yellow-500 transition-opacity duration-200",
            theme === "dark" ? "opacity-0" : "opacity-100"
          )}
        />
        <Moon
          size={12}
          className={cn(
            "absolute text-gray-700 transition-opacity duration-200",
            theme === "dark" ? "opacity-100" : "opacity-0"
          )}
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { ThemeSwitch }
