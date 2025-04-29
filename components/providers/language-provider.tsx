"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Locale, Dictionary } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  dictionary: Dictionary;
  changeLocale: (locale: Locale) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ 
  children, 
  initialLocale = "en" 
}: { 
  children: ReactNode;
  initialLocale?: Locale;
}) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [dictionary, setDictionary] = useState<Dictionary>(getDictionary(initialLocale));
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Reset cache and force reload of dictionary
    localStorage.removeItem('dictionary_cache');
    const newDictionary = getDictionary(locale);
    setDictionary(newDictionary);
    
    // Update HTML dir attribute for RTL support
    const dir = newDictionary.direction;
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
    
    // Force re-render of components using translations
    router.refresh();
  }, [locale, router]);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    
    // Update URL to reflect locale change (in real app with Next.js i18n routing)
    // This is a simplified version
    const newPath = pathname?.replace(`/${locale}/`, `/${newLocale}/`) || `/${newLocale}`;
    router.push(newPath);
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        locale, 
        dictionary, 
        changeLocale,
        isRTL: locale === "ar"
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};