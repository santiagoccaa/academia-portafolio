# 🌐 Next.js Internationalization with next-intl

This project uses [next-intl](https://next-intl.dev/docs/getting-started) to implement multilingual.

## 📁 Estructura principal

- `/i18n/request.ts`  
   Set `next-intl` to detect the language from a cookie (`language`) or use "en" by default. Load the corresponding translation file (`translations/{locale}.json`).

- `/i18n/setLangCooki.ts`  
   It is a **server action** function that saves the selected language in a cookie.

- `/components/LanguageSelector.tsx`  
  A React client component that allows the user to choose the language from a <select>. Changing the language updates the cookie.

- `/app/layout.tsx`  
  Provides translation context using `NextIntlClientProvider` to the entire app. It also gets the current `locale`.

- `/translations/{locale}.json`  
  JSON translation files (`en.json`, `es.json`, etc.), which contain the keys and texts in each language.

- `next.config.ts`  
  Configure Next.js with `next-intl` using the official plugin.

## ✅ How to change the language in the app

1. Use the `<LanguageSelector />` component.
2. This will update the `language` cookie with the chosen language.
3. When navigating or reloading, `next-intl` will detect the cookie and load the corresponding translations.

## 🌍 Add a new language

1. Create a JSON file in `/translations` with the language code, for example:

```bash
   translations/it.json
```

2. Add the translated keys and values ​​to the new file.

```bash
{
  "home": {
    "title": "Dokyumento",
    "description": "Dokyumento sakusei wa taikutsuda",
  }
}
```

3. An option must be added to the <LanguageSelector /> component

```tsx
<option value="it">Italiano</option>
```

4. To render translated texts, use the useTranslation hook

```tsx
import { useTranslations } from 'next-intl';

export default function NavbarItem({ label }: { label: string }) {
  const t = useTranslations();
  return (
    <div>
      <h1>{t('navbar.title')}</h1>
      <p>{t('navbar.description')}</p>
    </div>
  );
}
```
