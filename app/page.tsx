import { LanguageSelector } from "@/i18n/LenguajeSelector";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('common')
  return (
    <div>
      <LanguageSelector />
      Academia: {t('principiante')}
    </div>
  );
}
  