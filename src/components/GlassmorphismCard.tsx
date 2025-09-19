import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'strong';
  blur?: number;
  borderRadius?: number;
  border?: boolean;
  hover?: boolean;
  animation?: boolean;
  delay?: number;
  sx?: any;
  className?: string;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  intensity = 'medium',
  blur = 20,
  borderRadius = 16,
  border = true,
  hover = true,
  animation = true,
  delay = 0,
  sx,
  className
}) => {
  const getIntensityStyles = () => {
    switch (intensity) {
      case 'light':
        return {
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 100%
          )`,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        };
      case 'strong':
        return {
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.25) 0%, 
            rgba(255, 255, 255, 0.1) 100%
          )`,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          shadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
        };
      default: // medium
        return {
          background: `linear-gradient(135deg, 
            rgba(255, 255, 255, 0.15) 0%, 
            rgba(255, 255, 255, 0.05) 100%
          )`,
          borderColor: 'rgba(255, 255, 255, 0.25)',
          shadow: '0 15px 45px rgba(0, 0, 0, 0.15)'
        };
    }
  };

  const intensityStyles = getIntensityStyles();

  const cardProps = animation ? {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      filter: 'blur(10px)'
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: 'blur(0px)'
    },
    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut" as const
    },
    whileHover: hover ? {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 }
    } : undefined
  } : {};

  if (animation) {
    return (
      <motion.div
        {...cardProps}
        className={className}
        style={{
          position: 'relative',
          borderRadius,
          backdropFilter: `blur(${blur}px)`,
          background: intensityStyles.background,
          border: border ? `1px solid ${intensityStyles.borderColor}` : 'none',
          boxShadow: intensityStyles.shadow,
          overflow: 'hidden',
          ...sx
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 3 }}>
          {children}
        </Box>
      </motion.div>
    );
  }

  return (
    <Box
      className={className}
      sx={{
        position: 'relative',
        borderRadius,
        backdropFilter: `blur(${blur}px)`,
        background: intensityStyles.background,
        border: border ? `1px solid ${intensityStyles.borderColor}` : 'none',
        boxShadow: intensityStyles.shadow,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(135deg, 
              rgba(255, 255, 255, 0.1) 0%, 
              transparent 50%, 
              rgba(255, 255, 255, 0.05) 100%
            )
          `,
          borderRadius: 'inherit',
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `
            linear-gradient(90deg, 
              transparent 0%, 
              rgba(255, 255, 255, 0.4) 50%, 
              transparent 100%
            )
          `,
          zIndex: 2,
        },
        ...sx
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default GlassmorphismCard;
