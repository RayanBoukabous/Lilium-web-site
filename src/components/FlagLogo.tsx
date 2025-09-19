import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Box, useTheme, alpha } from '@mui/material';

interface FlagLogoProps {
  size?: number;
  delay?: number;
  duration?: number;
}

const FlagLogo: React.FC<FlagLogoProps> = ({ 
  size = 120, 
  delay = 0.5, 
  duration = 1.5 
}) => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    const tl = gsap.timeline({ delay: delay });
    
    // Animation du conteneur principal
    gsap.set(containerRef.current, { 
      opacity: 0, 
      scale: 0.8, 
      y: 20 
    });
    
    tl.to(containerRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: duration * 0.6,
      ease: 'power2.out',
      force3D: true
    });
    
    // Animation du logo
    gsap.set(logoRef.current, { 
      scale: 0.8, 
      opacity: 0, 
      y: 20, 
      rotateX: -15 
    });
    
    tl.to(logoRef.current, {
      scale: 1,
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: duration * 0.5,
      ease: 'back.out(1.7)',
      force3D: true
    }, '-=0.3');
    
    return () => {
      tl.kill();
    };
  }, [delay, duration]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        transformStyle: 'preserve-3d',
      }}
    >

      {/* Logo PNG avec animation pro et sympa */}
      <Box
        ref={logoRef}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Animation de flottement et de rotation subtile */}
        <Box
          sx={{
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Effet de pulsation subtile */}
          <Box
            sx={{
              position: 'relative',
              transformStyle: 'preserve-3d'
            }}
          >
            <Box
              component="img"
              src="/logo_main_white.png"
              alt="Lilium Pharma Logo"
              sx={{
                width: size,
                height: size * 0.8,
                objectFit: 'contain',
                objectPosition: 'center',
                filter: `
                  drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))
                  drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))
                  contrast(1.1)
                  brightness(1.05)
                `,
                borderRadius: 2,
                position: 'relative',
                zIndex: 3,
              }}
            />

            {/* Effet de brillance qui traverse le logo */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                pointerEvents: 'none',
                zIndex: 4,
                borderRadius: 2,
              }}
            />

            {/* Effet de halo subtil */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '120%',
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 1,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FlagLogo;
