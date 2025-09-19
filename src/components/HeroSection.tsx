import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  useTheme,
  useMediaQuery,
  alpha,
  Chip,
  Stack,
} from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Award, 
  Users, 
  ArrowRight,
  Heart,
  Sparkles,
  Crown
} from 'lucide-react';
import FloatingParticles from './FloatingParticles';
import SmoothAnimation from './SmoothAnimation';
import FlagLogo from './FlagLogo';
import { useTranslation } from '../i18n';

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const { t } = useTranslation();

  const prefersReducedMotion = useReducedMotion();

  // Single, brand-aligned accent color derived from theme
  const accent = theme.palette.primary.main;

  const features = [
    { icon: Shield, text: t('hero.features.quality') },
    { icon: Award, text: t('hero.features.premium') },
    { icon: Users, text: t('hero.features.expertise') },
    { icon: Heart, text: t('hero.features.health') },
  ];


  const certifications = [
    { name: 'ISO 9001', color: '#10b981' },
    { name: 'GMP', color: '#3b82f6' },
    { name: 'HACCP', color: '#f59e0b' },
    { name: 'FDA', color: '#ef4444' },
  ];

  return (
    <Box
      id="home"
      sx={{
        background: `
          radial-gradient(circle at 20% 80%, ${alpha(accent, 0.10)} 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${alpha(accent, 0.08)} 0%, transparent 50%),
          linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(accent, 0.04)} 100%)
        `,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, ${alpha(accent, 0.8)} 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, ${alpha(accent, 0.5)} 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px, 150px 150px, 200px 200px',
          animation: 'float 20s ease-in-out infinite',
        }}
      />
      
      {/* Floating Particles */}
      {!prefersReducedMotion && <FloatingParticles />}

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minHeight: '80vh' }}>
          {/* Content */}
          <Box sx={{ width: '100%' }}>
            <SmoothAnimation direction="right" delay={0.1} duration={0.6} immediate={true}>
              <Box sx={{ mb: 4 }}>
                {/* Premium Badge */}
                <SmoothAnimation direction="up" delay={0.2} duration={0.5}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 2,
                      px: 4,
                      py: 2,
                      background: `linear-gradient(135deg, ${accent} 0%, ${alpha(accent, 0.85)} 100%)`,
                      color: '#ffffff',
                      borderRadius: 6,
                      boxShadow: `0 12px 40px ${alpha(accent, 0.25)}`,
                      border: `2px solid ${alpha(accent, 0.35)}`,
                      position: 'relative',
                      overflow: 'hidden',
                      mb: 4,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                        animation: prefersReducedMotion ? 'none' : 'shimmer 2.2s infinite',
                      },
                    }}
                  >
                    {!prefersReducedMotion ? (
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      >
                        <Crown size={24} />
                      </motion.div>
                    ) : (
                      <Crown size={24} />
                    )}
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                      {t('hero.badge')}
                    </Typography>
                    {!prefersReducedMotion ? (
                      <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity }}
                      >
                        <Sparkles size={20} />
                      </motion.div>
                    ) : (
                      <Sparkles size={20} />
                    )}
                  </Box>
                </SmoothAnimation>

                {/* Main Title avec Logo à droite */}
                <SmoothAnimation direction="up" delay={0.3} duration={0.5}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 3, md: 6, lg: 8 }, 
                    mb: 3, 
                    flexWrap: 'wrap',
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}>
                    {/* Titre principal */}
                    <Box sx={{ 
                      flex: 1, 
                      minWidth: 0,
                      textAlign: { xs: 'center', md: 'left' }
                    }}>
                      <Typography
                        variant={isMobile ? 'h3' : isTablet ? 'h2' : 'h1'}
                        sx={{
                          fontWeight: 800,
                          background: `linear-gradient(135deg, ${accent} 0%, ${alpha(accent, 0.85)} 100%)`,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
                          lineHeight: 1.1,
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {t('hero.title').split(',')[0]},
                        <br />
                        {t('hero.title').split(',')[1]}
                      </Typography>
                    </Box>
                    
                    {/* Logo avec effet drapeau à droite */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <FlagLogo 
                        size={isMobile ? 100 : isTablet ? 140 : 180} 
                        delay={0.4} 
                        duration={1.0} 
                      />
                    </Box>
                  </Box>
                </SmoothAnimation>

                {/* Subtitle */}
                <SmoothAnimation direction="up" delay={0.5} duration={0.5}>
                  <Typography
                    variant={isMobile ? 'h6' : 'h5'}
                    color="text.secondary"
                    sx={{ 
                      mb: 4, 
                      lineHeight: 1.7,
                      fontSize: { xs: '1.1rem', md: '1.4rem' },
                      fontWeight: 400,
                    }}
                  >
                    {t('hero.subtitle')}
                  </Typography>
                </SmoothAnimation>

                {/* Features Grid */}
                <Box sx={{ mb: 5 }}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
                    {features.map((feature, index) => (
                      <Box key={feature.text}>
                        <SmoothAnimation direction="up" delay={0.55 + index * 0.05} duration={0.4}>
                          <Card
                            sx={{
                              p: 3,
                              height: '100%',
                              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(accent, 0.04)} 100%)`,
                              border: `1px solid ${alpha(accent, 0.18)}`,
                              borderRadius: 4,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-3px)',
                                boxShadow: `0 12px 38px ${alpha(accent, 0.2)}`,
                                border: `1px solid ${alpha(accent, 0.35)}`,
                              },
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Box
                                sx={{
                                  p: 1.5,
                                  borderRadius: 3,
                                  background: `linear-gradient(135deg, ${accent} 0%, ${alpha(accent, 0.85)} 100%)`,
                                  color: '#ffffff',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <feature.icon size={20} />
                              </Box>
                              <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                {feature.text}
                              </Typography>
                            </Box>
                          </Card>
                        </SmoothAnimation>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Certifications */}
                <SmoothAnimation direction="up" delay={0.8} duration={0.4}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
                      {t('hero.certifications')}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {certifications.map((cert, index) => (
                        <SmoothAnimation key={cert.name} direction="scale" delay={0.9 + index * 0.05} duration={0.3}>
                          <Chip
                            label={cert.name}
                            sx={{
                              background: `linear-gradient(135deg, ${alpha(cert.color, 0.1)} 0%, ${alpha(cert.color, 0.05)} 100%)`,
                              border: `1px solid ${alpha(cert.color, 0.3)}`,
                              color: cert.color,
                              fontWeight: 600,
                              '&:hover': {
                                background: `linear-gradient(135deg, ${alpha(cert.color, 0.2)} 0%, ${alpha(cert.color, 0.1)} 100%)`,
                                transform: 'translateY(-1px)',
                              },
                            }}
                          />
                        </SmoothAnimation>
                      ))}
                    </Stack>
                  </Box>
                </SmoothAnimation>

                {/* CTA Buttons */}
                <SmoothAnimation direction="up" delay={1.0} duration={0.4}>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Button
                      component={Link}
                      to="/products"
                      variant="contained"
                      size="large"
                      endIcon={<ArrowRight size={24} />}
                      sx={{
                        px: 6,
                        py: 2,
                        fontSize: '1.2rem',
                        borderRadius: 4,
                        fontWeight: 700,
                          background: `linear-gradient(135deg, ${accent} 0%, ${alpha(accent, 0.85)} 100%)`,
                          boxShadow: `0 8px 30px ${alpha(accent, 0.3)}`,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${alpha(accent, 0.9)} 0%, ${accent} 100%)`,
                          boxShadow: `0 12px 40px ${alpha(accent, 0.4)}`,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {t('hero.cta.discover')}
                    </Button>
                    <Button
                      component={Link}
                      to="/contact"
                      variant="outlined"
                      size="large"
                      sx={{
                        px: 6,
                        py: 2,
                        fontSize: '1.2rem',
                        borderRadius: 4,
                        fontWeight: 700,
                        border: `3px solid ${accent}`,
                        color: accent,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${alpha(accent, 0.08)} 0%, ${alpha(accent, 0.16)} 100%)`,
                          border: `3px solid ${accent}`,
                          color: accent,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {t('hero.cta.contact')}
                    </Button>
                  </Box>
                </SmoothAnimation>
              </Box>
            </SmoothAnimation>
          </Box>
        </Box>
      </Container>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </Box>
  );
};

export default HeroSection;
