import React from 'react';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const FloatingParticles: React.FC = () => {
  const theme = useTheme();

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            backgroundColor: theme.palette.primary.main,
            opacity: 0.1,
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </Box>
  );
};

export default FloatingParticles;
