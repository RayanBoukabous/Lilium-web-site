import React, { useEffect, useRef } from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import { gsap } from 'gsap';

interface LogoProps {
  size?: number;
  variant?: 'default' | 'white' | 'dark';
  showText?: boolean;
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 40, 
  variant = 'default', 
  showText = true, 
  animated = true 
}) => {
  const theme = useTheme();
  const logoRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated || !logoRef.current) return;

    const tl = gsap.timeline();
    
    // Animation du triangle
    if (triangleRef.current) {
      gsap.set(triangleRef.current, { 
        scaleY: 0, 
        scaleX: 0.3, 
        y: -size * 0.2, 
        opacity: 0 
      });
      tl.to(triangleRef.current, {
        scaleY: 1,
        scaleX: 1,
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        force3D: true
      });
    }
    
    // Animation de la carte
    if (cardRef.current) {
      gsap.set(cardRef.current, { scale: 0.9, opacity: 0, y: 5 });
      tl.to(cardRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        force3D: true
      }, '-=0.3');
    }
    
    // Animation du texte
    if (textRef.current && showText) {
      gsap.set(textRef.current, { opacity: 0, x: -8, scale: 0.95 });
      tl.to(textRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        force3D: true
      }, '-=0.2');
    }
    
    return () => {
      tl.kill();
    };
  }, [animated, size, showText]);

  const getTextColor = () => {
    switch (variant) {
      case 'white':
        return '#ffffff';
      case 'dark':
        return theme.palette.text.primary;
      default:
        return theme.palette.text.primary;
    }
  };

  const logoComponent = (
    <Box ref={logoRef} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      {/* Logo avec effet professionnel */}
      <Box
        sx={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Tringle élégante et discrète */}
        {animated && (
          <Box
            ref={triangleRef}
            sx={{
              position: 'absolute',
              top: -size * 0.05,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                width: size * 0.12,
                height: size * 0.2,
                background: `linear-gradient(180deg, 
                  ${alpha(theme.palette.primary.main, 0.9)} 0%, 
                  ${theme.palette.primary.main} 100%
                )`,
                borderRadius: '0 0 4px 4px',
                boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -size * 0.03,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: size * 0.2,
                  height: size * 0.06,
                  background: `linear-gradient(135deg, 
                    ${alpha(theme.palette.primary.main, 0.8)} 0%, 
                    ${theme.palette.primary.main} 100%
                  )`,
                  borderRadius: '50%',
                  boxShadow: `0 1px 4px ${alpha(theme.palette.primary.main, 0.3)}`,
                }
              }}
            />
          </Box>
        )}

        {/* Carte principale avec design professionnel */}
        <Box
          ref={cardRef}
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Effet de vent très subtil */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 1.5,
                background: `
                  linear-gradient(135deg, 
                    ${alpha('#ffffff', 0.98)} 0%, 
                    ${alpha('#f8fafc', 0.95)} 50%, 
                    ${alpha('#ffffff', 0.98)} 100%
                  )
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `
                  0 4px 20px ${alpha(theme.palette.common.black, 0.08)},
                  0 2px 8px ${alpha(theme.palette.common.black, 0.04)},
                  inset 0 1px 0 ${alpha('#ffffff', 0.9)},
                  inset 0 -1px 0 ${alpha(theme.palette.common.black, 0.02)}
                `,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(8px)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    ${alpha(theme.palette.primary.main, 0.4)} 20%, 
                    ${alpha(theme.palette.primary.main, 0.6)} 50%, 
                    ${alpha(theme.palette.primary.main, 0.4)} 80%, 
                    transparent 100%
                  )`,
                  zIndex: 1,
                }
              }}
            >
              {/* Logo image */}
              <Box
                component="img"
                src="/logo_main_white.png"
                alt="LILIUM PHARMA"
                sx={{
                  width: '75%',
                  height: '75%',
                  objectFit: 'contain',
                  filter: variant === 'white' ? 'brightness(0) invert(1)' : 'none',
                  transition: 'all 0.3s ease',
                  zIndex: 2,
                  position: 'relative',
                }}
                onError={(e) => {
                  // Fallback si l'image ne charge pas
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.setAttribute('style', 'display: flex');
                }}
              />
              
              {/* Fallback si l'image ne charge pas */}
              <Box
                sx={{
                  width: '75%',
                  height: '75%',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  color: 'white',
                  fontSize: size * 0.25,
                  fontWeight: 800,
                  zIndex: 2,
                  position: 'relative',
                }}
              >
                LP
              </Box>
              
              {/* Effet de brillance très subtil */}
              {animated && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                    pointerEvents: 'none',
                    zIndex: 3,
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Texte du logo */}
      {showText && (
        <Box ref={textRef}>
          <Box>
            <Box
              sx={{
                fontSize: size * 0.45,
                fontWeight: 800,
                color: getTextColor(),
                lineHeight: 1,
                letterSpacing: '-0.02em',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              LILIUM
            </Box>
            <Box
              sx={{
                fontSize: size * 0.28,
                fontWeight: 600,
                color: getTextColor(),
                opacity: 0.9,
                lineHeight: 1,
                letterSpacing: '0.08em',
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              PHARMA
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );

  return logoComponent;
};

export default Logo;