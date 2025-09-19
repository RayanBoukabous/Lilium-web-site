import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Logo from './Logo';

interface LoadingSpinnerProps {
  message?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Chargement...', 
  size = 60 
}) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          gap: 3,
        }}
      >
        {/* Logo animé */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Logo size={size} variant="default" showText={false} animated={false} />
        </motion.div>

        {/* Spinner */}
        <CircularProgress
          size={size * 0.8}
          thickness={3}
          sx={{
            color: 'primary.main',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />

        {/* Message */}
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          {message}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default LoadingSpinner;
