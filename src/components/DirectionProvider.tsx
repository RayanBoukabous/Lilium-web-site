import React, { useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface DirectionProviderProps {
  children: React.ReactNode;
}

const DirectionProvider: React.FC<DirectionProviderProps> = ({ children }) => {
  const { isRTL } = useTranslation();

  useEffect(() => {
    // Appliquer la direction au document HTML
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = isRTL ? 'ar' : 'fr';
    
    // Ajouter une classe CSS pour le support RTL
    if (isRTL) {
      document.documentElement.classList.add('rtl');
      document.documentElement.classList.remove('ltr');
    } else {
      document.documentElement.classList.add('ltr');
      document.documentElement.classList.remove('rtl');
    }
  }, [isRTL]);

  return <>{children}</>;
};

export default DirectionProvider;
