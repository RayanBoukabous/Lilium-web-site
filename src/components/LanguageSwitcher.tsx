import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  alpha,
  useTheme,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation, type Language } from '../i18n';

const languages = [
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'ar' as Language, name: 'العربية', flag: '🇩🇿' },
];

const LanguageSwitcher: React.FC = () => {
  const theme = useTheme();
  const { language, setLanguage, isRTL } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    handleClose();
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <IconButton
          onClick={handleClick}
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha('#10b981', 0.1)} 100%)`,
            border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: 3,
            p: 1.5,
            '&:hover': {
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha('#10b981', 0.2)} 100%)`,
              border: `2px solid ${alpha(theme.palette.primary.main, 0.4)}`,
              boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Globe size={20} color={theme.palette.primary.main} />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
                fontSize: '0.8rem',
              }}
            >
              {currentLanguage?.flag}
            </Typography>
            <ChevronDown 
              size={14} 
              color={theme.palette.primary.main}
              style={{
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
              }}
            />
          </Box>
        </IconButton>
      </motion.div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: isRTL ? 'left' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isRTL ? 'left' : 'right',
        }}
        PaperProps={{
          sx: {
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
            backdropFilter: 'blur(20px)',
            border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRadius: 4,
            boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.15)}`,
            minWidth: 200,
            mt: 1,
            '& .MuiMenuItem-root': {
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              '&:hover': {
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha('#10b981', 0.1)} 100%)`,
                transform: 'translateX(4px)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            },
          },
        }}
      >
        <AnimatePresence>
          {languages.map((lang, index) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <MenuItem
                onClick={() => handleLanguageChange(lang.code)}
                sx={{
                  py: 1.5,
                  px: 2,
                  direction: lang.code === 'ar' ? 'rtl' : 'ltr',
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
                    {lang.flag}
                  </Typography>
                </ListItemIcon>
                <ListItemText
                  primary={lang.name}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: 'text.primary',
                  }}
                />
                {language === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check 
                      size={18} 
                      color={theme.palette.primary.main}
                    />
                  </motion.div>
                )}
              </MenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </Menu>
    </>
  );
};

export default LanguageSwitcher;

