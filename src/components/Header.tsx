import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
  alpha,
} from '@mui/material';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import CartIcon from './CartIcon';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../i18n';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const { t, isRTL } = useTranslation();
  
  // Refs pour les animations GSAP
  const headerRef = useRef<HTMLDivElement>(null);
  const contactBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Animation GSAP au montage du composant
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animation de la barre de contact
    if (contactBarRef.current) {
      gsap.set(contactBarRef.current, { opacity: 0, y: -30 });
      tl.to(contactBarRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        force3D: true
      });
    }
    
    // Animation du header principal
    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 0, y: -40 });
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        force3D: true
      }, '-=0.3');
    }
    
    // Animation du logo
    if (logoRef.current) {
      gsap.set(logoRef.current, { opacity: 0, x: -30, scale: 0.9 });
      tl.to(logoRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        force3D: true
      }, '-=0.5');
    }
    
    // Animation de la navigation
    if (navRef.current && !isMobile && !isTablet) {
      gsap.set(navRef.current, { opacity: 0, y: -20 });
      tl.to(navRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        force3D: true
      }, '-=0.4');
    }
    
    // Animation des actions
    if (actionsRef.current) {
      gsap.set(actionsRef.current, { opacity: 0, x: 30, scale: 0.9 });
      tl.to(actionsRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        force3D: true
      }, '-=0.3');
    }
    
    return () => {
      tl.kill();
    };
  }, [isMobile, isTablet]);

  const menuItems = [
    { label: t('nav.home'), href: '/', isAnchor: false },
    { label: t('nav.about'), href: '#about', isAnchor: true },
    { label: t('nav.products'), href: '/products', isAnchor: false },
    { label: t('consultation.title'), href: '/consultation', isAnchor: false, isSpecial: true },
    { label: t('nav.contact'), href: '/contact', isAnchor: false },
  ];

  const drawer = (
    <Box 
      sx={{ 
        width: 300,
        height: '100%',
        background: `
          radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
          linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)
        `,
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 3,
          borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          flexDirection: isRTL ? 'row-reverse' : 'row',
        }}
      >
        <Logo size={36} variant="default" showText={true} animated={true} />
        <IconButton 
          onClick={handleDrawerToggle}
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.error.main, 0.05)} 100%)`,
            border: `2px solid ${alpha(theme.palette.error.main, 0.2)}`,
            borderRadius: 3,
            '&:hover': {
              background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.2)} 0%, ${alpha(theme.palette.error.main, 0.1)} 100%)`,
              border: `2px solid ${alpha(theme.palette.error.main, 0.4)}`,
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <X size={20} />
        </IconButton>
      </Box>
      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <Box key={item.label}>
            <ListItem
              component={item.isAnchor ? "a" : Link}
              href={item.isAnchor ? item.href : undefined}
              to={!item.isAnchor ? item.href : undefined}
              sx={{
                cursor: 'pointer',
                borderRadius: 3,
                mb: 1,
                background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha('#10b981', 0.1)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  transform: isRTL ? 'translateX(-8px)' : 'translateX(8px)',
                  boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onClick={handleDrawerToggle}
            >
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  textAlign: isRTL ? 'right' : 'left',
                }}
              />
            </ListItem>
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Top Contact Bar */}
      <Box
        ref={contactBarRef}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #10b981 100%)`,
          color: 'white',
          py: 1,
          display: { xs: 'none', md: 'block' },
        }}
      >
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone size={16} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    +213 123 456 789
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Mail size={16} />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    contact@lilium-pharma.com
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MapPin size={16} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Algérie & Tunisie
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        <AppBar 
          ref={headerRef}
          position="fixed" 
          elevation={0} 
          sx={{ 
            zIndex: theme.zIndex.drawer + 1,
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            backdropFilter: 'blur(20px)',
            borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            boxShadow: `0 4px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
            {/* Logo */}
            <Box ref={logoRef}>
              <Logo size={48} variant="default" showText={!isMobile} animated={false} />
            </Box>

            {/* Navigation Desktop */}
            {!isMobile && !isTablet && (
              <Box ref={navRef}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {menuItems.map((item) => (
                    <Box key={item.label}>
                      <Button
                        component={item.isAnchor ? "a" : Link}
                        href={item.isAnchor ? item.href : undefined}
                        to={!item.isAnchor ? item.href : undefined}
                        sx={{
                          color: item.isSpecial ? 'white' : 'text.primary',
                          fontWeight: 600,
                          px: 3,
                          py: 1.5,
                          borderRadius: 3,
                          position: 'relative',
                          overflow: 'hidden',
                          background: item.isSpecial 
                            ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                            : 'transparent',
                          '&:hover': {
                            background: item.isSpecial
                              ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
                              : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha('#10b981', 0.1)} 100%)`,
                            color: item.isSpecial ? 'white' : theme.palette.primary.main,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            width: 0,
                            height: '3px',
                            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #10b981 100%)`,
                            transition: 'all 0.3s ease',
                            transform: 'translateX(-50%)',
                          },
                          '&:hover::before': {
                            width: '80%',
                          },
                        }}
                      >
                        {item.label}
                      </Button>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* Actions */}
            <Box ref={actionsRef} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CartIcon />
              <LanguageSwitcher />
              <ThemeToggle />
                {(isMobile || isTablet) && (
                  <IconButton
                    onClick={handleDrawerToggle}
                    sx={{
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha('#10b981', 0.1)} 100%)`,
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      borderRadius: 3,
                      p: 1.5,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha('#10b981', 0.2)} 100%)`,
                        border: `2px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Menu size={20} />
                  </IconButton>
                )}
            </Box>
          </Toolbar>
        </Container>
        </AppBar>

      {/* Drawer Mobile */}
      <Drawer
        variant="temporary"
        anchor={isRTL ? "left" : "right"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 300,
            background: `
              radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
              linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)
            `,
            borderLeft: isRTL ? 'none' : `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRight: isRTL ? `2px solid ${alpha(theme.palette.primary.main, 0.1)}` : 'none',
            backdropFilter: 'blur(20px)',
            boxShadow: `0 0 60px ${alpha(theme.palette.primary.main, 0.1)}`,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
