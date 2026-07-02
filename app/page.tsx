import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('common')
  return (
    <div>
      Academia: {t('principiante')}
    </div>
  );
}
  