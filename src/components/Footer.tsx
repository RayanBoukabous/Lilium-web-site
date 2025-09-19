import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer: React.FC = () => {
  const theme = useTheme();

  const footerSections = [
    {
      title: 'Entreprise',
      links: [
        { label: 'À Propos', href: '#about' },
        { label: 'Notre Mission', href: '#mission' },
        { label: 'Équipe', href: '#team' },
        { label: 'Carrières', href: '#careers' },
      ],
    },
    {
      title: 'Produits',
      links: [
        { label: 'Compléments Alimentaires', href: '#supplements' },
        { label: 'Vitamines', href: '#vitamins' },
        { label: 'Mineraux', href: '#minerals' },
        { label: 'Produits Naturels', href: '#natural' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Consultation', href: '#consultation' },
        { label: 'Analyse', href: '#analysis' },
        { label: 'Formation', href: '#training' },
        { label: 'Support', href: '#support' },
      ],
    },
    {
      title: 'Légal',
      links: [
        { label: 'Mentions Légales', href: '#legal' },
        { label: 'Politique de Confidentialité', href: '#privacy' },
        { label: 'CGV', href: '#terms' },
        { label: 'Cookies', href: '#cookies' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Logo et Description */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box sx={{ mb: 2 }}>
                <Logo size={48} variant="default" showText={true} animated={false} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                Leader en production et vente de compléments alimentaires de qualité supérieure 
                en Algérie et Tunisie. Nous nous engageons pour votre santé et votre bien-être.
              </Typography>
              
              {/* Contact Info */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MapPin size={16} color={theme.palette.primary.main} />
                  <Typography variant="body2" color="text.secondary">
                    Alger, Algérie & Tunis, Tunisie
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone size={16} color={theme.palette.primary.main} />
                  <Typography variant="body2" color="text.secondary">
                    +213 XXX XXX XXX
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Mail size={16} color={theme.palette.primary.main} />
                  <Typography variant="body2" color="text.secondary">
                    contact@liliumpharma.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Globe size={16} color={theme.palette.primary.main} />
                  <Typography variant="body2" color="text.secondary">
                    www.liliumpharma.com
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          {/* Sections de liens */}
          {footerSections.map((section, index) => (
            <Grid item xs={12} sm={6} md={2} key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  {section.title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {section.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'primary.main',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Lilium Pharma. Tous droits réservés.
            </Typography>
            
            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.href}
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </IconButton>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
