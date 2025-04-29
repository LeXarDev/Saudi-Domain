"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageSwitcher } from "@/components/theme/language-switcher";
import { Globe } from "lucide-react";

export function Header() {
  const { dictionary } = useLanguage();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-6 w-6 text-primary animate-pulse" />
          <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {dictionary.siteName}
          </Link>
        </div>
        
        <nav className="flex items-center space-x-2 rtl:space-x-reverse">
          <ThemeToggle />
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}