import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Tooltip title={mode === 'light' ? 'Passer au thème sombre' : 'Passer au thème clair'}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: 'text.primary',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            transform: 'scale(1.1)',
          },
        }}
        aria-label="Basculer le thème"
      >
        {mode === 'light' ? (
          <Moon size={20} />
        ) : (
          <Sun size={20} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;

