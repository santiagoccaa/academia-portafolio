'use server';

import { COOKIE_SITE_LANGUAGE } from '@/const/cookies/cookies';
import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
  const coockieStore = await cookies();
  const headersStore = await headers();

  let locale = 'en'

  const isCookieLocale = coockieStore.get(COOKIE_SITE_LANGUAGE);
  if (isCookieLocale) {
    // If cookie is there, use it
    locale = isCookieLocale.value;
  } else if (headersStore.get('accept-language')) {
    console.log('headersStore.get("accept-language")', headersStore.get('accept-language'));
    // If cookie is not there, use accept language
    locale = getValidLanguage(headersStore.get('accept-language') || 'en');
    // DO NOT ASSIGN THE COOKIE! USer has to manually select the language to be assigned
  }


  return {
    locale,
    messages: (await import(`./translations/${locale}.json`)).default,
  };
});

// accept-language en-GB,en-US;q=0.9,en;q=0.8
const getValidLanguage = (lang: string) => {
  const languages = lang.split(',');
  for (const language of languages) {
    const lang = language.split('-')[0];
    if (isSupportedLocale(lang)) {
      return lang;
    }
  }
  return 'en';
};

const isSupportedLocale = (lang: string) => {
  return ['en', 'es', 'fr', 'de'].includes(lang);
};
