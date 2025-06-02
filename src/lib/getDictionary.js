import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
  const lowerCaseLocale = locale.toLowerCase();
  if (lowerCaseLocale in dictionaries) {
    return dictionaries[lowerCaseLocale]();
  }
  // Fallback to English if the locale is not found or not supported
  return dictionaries.en();
};
