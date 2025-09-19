import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import { useTranslation } from '../hooks/useTranslation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isRTL } = useTranslation();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 8, // Pour compenser la hauteur du header fixe
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;

