import { defaultLocale } from "./config";
import { Locale, Dictionary } from "./types";
import enDict from "./dictionaries/en.json";
import arDict from "./dictionaries/ar.json";

const dictionaries: Record<Locale, Dictionary> = {
  en: enDict as unknown as Dictionary,
  ar: arDict as unknown as Dictionary,
};

export const getDictionary = (locale: Locale = defaultLocale): Dictionary => {
  // Always use the correct dictionary based on locale
  const dictionary = dictionaries[locale];
  if (!dictionary) {
    console.warn(`Dictionary not found for locale: ${locale}, falling back to default`);
    return dictionaries[defaultLocale];
  }
  return dictionary;
};