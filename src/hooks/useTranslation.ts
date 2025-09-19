import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useMemo } from 'react';

export type Language = 'fr' | 'en' | 'ar';

export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  const setLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
  };

  const isRTL = useMemo(() => {
    return i18n.language === 'ar';
  }, [i18n.language]);

  return {
    language: i18n.language as Language,
    setLanguage,
    t,
    isRTL,
  };
};

