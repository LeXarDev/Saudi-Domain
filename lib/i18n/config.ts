import type { Locale } from "./types";

export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";

// Define dictionary structure
export type Dictionary = {
  siteName: string;
  description: string;
  direction: "ltr" | "rtl";
  nav: {
    home: string;
    about: string;
    contact: string;
  };
  domainChecker: {
    title: string;
    subtitle: string;
    placeholder: string;
    checkButton: string;
    addDomain: string;
    checkAllTLDs: string;
    error: {
      invalidDomain: string;
      required: string;
      networkError: string;
      unknown: string;
    };
    reserved: string;
    available: string;
    unavailable: string;
    register: string;
    copy: string;
    copied: string;
    share: string;
    shared: string;
    price: string;
    checking: string;
    history: {
      title: string;
      empty: string;
      clear: string;
    };
  };
  footer: {
    rightsReserved: string;
    poweredBy: string;
  };
};