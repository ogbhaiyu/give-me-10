"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { openPayment } from "@/components/give-actions";
import { money } from "@/config";

const subscribe = () => () => {};

export function SiteHeader() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-emerald-500 font-mono text-sm font-bold text-emerald-950 transition-transform hover:rotate-6">
            {money}
          </span>
          <span className="text-sm font-medium tracking-tight text-balance">
            The Ten Dollar Fund
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label="Switch between light and dark mode"
            title="Switch theme"
          >
            {mounted &&
              (resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />)}
          </Button>
          <Button size="sm" onClick={openPayment}>
            Give {money}
          </Button>
        </div>
      </div>
    </header>
  );
}
