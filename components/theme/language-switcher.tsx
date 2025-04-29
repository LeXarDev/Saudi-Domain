"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GB, SA } from 'country-flag-icons/react/3x2';

const languages = [
  { code: "en", label: "English", flag: GB, dir: "ltr" },
  { code: "ar", label: "العَرَبِيّة", flag: SA, dir: "rtl" }
];

export function LanguageSwitcher() {
  const { locale, changeLocale } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="transition-all duration-200 hover:scale-110"
          aria-label="Change language"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {languages.map((language) => {
          const Flag = language.flag;
          const isRTL = language.dir === "rtl";
          const isSelected = locale === language.code;
          
          return (
            <DropdownMenuItem
              key={language.code}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                isSelected ? "bg-primary/10 text-primary" : "hover:bg-secondary"
              }`}
              onClick={() => {
                changeLocale(language.code as "en" | "ar");
                setOpen(false);
              }}
              dir={language.dir}
            >
              <div className="flex items-center gap-3 w-full" dir={language.dir}>
                {isRTL ? (
                  <>
                    <span className="font-medium">{language.label}</span>
                    <div className="ms-auto overflow-hidden rounded-sm">
                      <Flag className="h-4 w-5 object-cover" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="overflow-hidden rounded-sm">
                      <Flag className="h-4 w-5 object-cover" />
                    </div>
                    <span className="font-medium">{language.label}</span>
                  </>
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}