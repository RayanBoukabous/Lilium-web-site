import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  alpha,
  Stack,
  Divider,
  Card,
  CardContent,
  IconButton,
  Chip,
  Avatar,
} from '@mui/material';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building2,
  Globe,
  MessageCircle,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Heart,
  Shield,
  Award,
  Users,
  TrendingUp,
} from 'lucide-react';
import { useTranslation } from '../i18n';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.phone'),
      value: '+213 540 832 898',
      subtitle: 'Appel direct',
      color: theme.palette.primary.main,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
      gridMd: 6,
      gridLg: 3,
    },
    {
      icon: Mail,
      title: t('contact.email'),
      value: 'contact@liliumpharma.com',
      subtitle: 'Réponse sous 24h',
      color: theme.palette.primary.main,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
      gridMd: 6,
      gridLg: 3,
    },
    {
      icon: MapPin,
      title: t('contact.address'),
      value: t('contact.addressValue'),
      subtitle: 'Siège social',
      color: theme.palette.primary.main,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
      gridMd: 12,
      gridLg: 6,
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      value: t('contact.hoursValue'),
      subtitle: 'Heures de bureau',
      color: theme.palette.primary.main,
      gradient: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
      gridMd: 12,
      gridLg: 3,
    },
  ];

  // Clean professional look – we keep the design minimal and aligned to theme

  return (
    <Box
      ref={containerRef}
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ultra Modern Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${alpha(theme.palette.primary.main, 0.06)} 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, ${alpha(theme.palette.primary.main, 0.04)} 0%, transparent 50%),
            linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, transparent 100%)
          `,
          zIndex: 0,
        }}
      />

      {/* Floating Particles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: alpha(theme.palette.primary.main, 0.6),
            animation: 'float 6s ease-in-out infinite',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '60%',
            right: '15%',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: alpha(theme.palette.primary.main, 0.4),
            animation: 'float 8s ease-in-out infinite reverse',
          },
        }}
      />

      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6 }, position: 'relative', zIndex: 2, pt: { xs: 8, md: 12 }, pb: 8 }}>
        {/* Hero Section with Ultra Modern Design */}
        <motion.div
          style={{ y, opacity, scale }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: 'center', mb: 12 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Chip
                icon={<Sparkles size={16} />}
                label="Contact Premium"
                sx={{
                  mb: 4,
                  px: 3,
                  py: 1,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  '& .MuiChip-icon': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            </motion.div>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                mb: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                textShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
              }}
            >
              {t('contact.title')}
            </Typography>

            <Typography
              variant="h5"
              sx={{ 
                maxWidth: 700, 
                mx: 'auto', 
                lineHeight: 1.6,
                fontWeight: 400,
                fontSize: { xs: '1.2rem', md: '1.4rem' },
                color: 'text.secondary',
                mb: 6,
              }}
            >
              {t('contact.subtitle')}
            </Typography>

            {/* Subheading divider */}
            <Box sx={{ height: 1, width: '100%', maxWidth: 900, mx: 'auto', backgroundColor: alpha(theme.palette.primary.main, 0.2) }} />
          </Box>
        </motion.div>

        {/* Stats removed for a cleaner professional hero */}

        {/* Contact Information Grid - Ultra Modern */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Box sx={{ mb: 12 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 8,
                textAlign: 'center',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', md: '2.5rem' },
                letterSpacing: '-0.02em',
              }}
            >
              {t('contact.getInTouch')}
            </Typography>

            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ mx: 'auto' }}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} sm={6} md={info.gridMd} lg={info.gridLg} key={info.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
                    whileHover={{ 
                      y: -10,
                      rotateX: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 0,
                        background: `linear-gradient(135deg, ${alpha(info.color, 0.05)} 0%, ${alpha(info.color, 0.02)} 100%)`,
                        border: `2px solid ${alpha(info.color, 0.1)}`,
                        borderRadius: 4,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: info.gradient,
                        },
                        '&:hover': {
                          borderColor: alpha(info.color, 0.3),
                          transform: 'translateY(-8px)',
                          boxShadow: `0 25px 50px ${alpha(info.color, 0.2)}`,
                          '&::before': {
                            height: 6,
                          },
                        },
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            height: '100%',
                            minHeight: { xs: 220, md: 240 },
                            justifyContent: 'flex-start',
                          }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.3 }}
                        >
                          <Box
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                background: info.gradient,
                                color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                                width: 80,
                                height: 80,
                                mb: 4,
                                boxShadow: `0 10px 30px ${alpha(info.color, 0.3)}`,
                              }}
                            >
                              <info.icon size={36} />
                          </Box>
                          </motion.div>
                          
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 700,
                              color: info.color,
                              mb: 3,
                              textTransform: 'uppercase',
                              letterSpacing: '0.1em',
                              fontSize: '0.8rem',
                            }}
                          >
                            {info.title}
                          </Typography>
                          
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'text.primary',
                              fontWeight: 600,
                              lineHeight: 1.4,
                              mb: 2,
                              fontSize: '1.1rem',
                            }}
                          >
                            {info.value}
                          </Typography>
                          
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              fontWeight: 500,
                              fontSize: '0.9rem',
                              mt: 'auto',
                            }}
                          >
                            {info.subtitle}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* Ultra Modern Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card
            elevation={0}
            sx={{
              p: 0,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.primary.main, 0.01)} 100%)`,
              border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 6,
              overflow: 'hidden',
              maxWidth: 900,
              mx: 'auto',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
              },
            }}
          >
            <Box
              sx={{
                p: 8,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                    mb: 4,
                    boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.3)}`,
                  }}
                >
                  <MessageCircle size={40} color="#ffffff" />
                </Box>
              </motion.div>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                {t('contact.sendMessage')}
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                  maxWidth: 500,
                  mx: 'auto',
                }}
              >
                {t('contact.sendMessageDesc')}
              </Typography>
            </Box>

            <CardContent sx={{ p: { xs: 4, md: 8 } }}>
              {submitSuccess ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, #10B981 0%, #059669 100%)`,
                        mb: 4,
                        boxShadow: `0 15px 35px ${alpha('#10B981', 0.3)}`,
                      }}
                    >
                      <CheckCircle size={50} color="#ffffff" />
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: '#10B981',
                        mb: 2,
                      }}
                    >
                      Message Envoyé !
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1.1rem',
                      }}
                    >
                      Nous vous répondrons dans les plus brefs délais.
                    </Typography>
                  </Box>
                </motion.div>
              ) : (
              <form onSubmit={handleSubmit}>
                  <Stack spacing={5}>
                    <Grid container spacing={{ xs: 2, md: 4 }}>
                    <Grid item xs={12} sm={6}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.2 }}
                        >
                      <TextField
                        fullWidth
                        label={t('contact.form.name')}
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                            '& fieldset': {
                                  borderColor: alpha(theme.palette.primary.main, 0.2),
                                  borderWidth: 2,
                            },
                            '&:hover fieldset': {
                                  borderColor: alpha(theme.palette.primary.main, 0.4),
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                                  boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'text.secondary',
                                fontWeight: 600,
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.3 }}
                        >
                      <TextField
                        fullWidth
                        label={t('contact.form.email')}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                            '& fieldset': {
                                  borderColor: alpha(theme.palette.primary.main, 0.2),
                                  borderWidth: 2,
                            },
                            '&:hover fieldset': {
                                  borderColor: alpha(theme.palette.primary.main, 0.4),
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                                  boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'text.secondary',
                                fontWeight: 600,
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                        </motion.div>
                      </Grid>
                  </Grid>

                    <Grid container spacing={{ xs: 2, md: 4 }}>
                    <Grid item xs={12} sm={6}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.4 }}
                        >
                      <TextField
                        fullWidth
                        label={t('contact.form.phone')}
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                            '& fieldset': {
                                  borderColor: alpha(theme.palette.primary.main, 0.2),
                                  borderWidth: 2,
                            },
                            '&:hover fieldset': {
                                  borderColor: alpha(theme.palette.primary.main, 0.4),
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                                  boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'text.secondary',
                                fontWeight: 600,
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 1.5 }}
                        >
                      <TextField
                        fullWidth
                        label={t('contact.form.subject')}
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                                borderRadius: 3,
                                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                            '& fieldset': {
                                  borderColor: alpha(theme.palette.primary.main, 0.2),
                                  borderWidth: 2,
                            },
                            '&:hover fieldset': {
                                  borderColor: alpha(theme.palette.primary.main, 0.4),
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                                  boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'text.secondary',
                                fontWeight: 600,
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                        </motion.div>
                      </Grid>
                  </Grid>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.6 }}
                    >
                  <TextField
                    fullWidth
                    label={t('contact.form.message')}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={6}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            backgroundColor: alpha('#667eea', 0.02),
                        '& fieldset': {
                              borderColor: alpha('#667eea', 0.2),
                              borderWidth: 2,
                        },
                        '&:hover fieldset': {
                              borderColor: alpha('#667eea', 0.4),
                        },
                        '&.Mui-focused fieldset': {
                              borderColor: '#667eea',
                          borderWidth: 2,
                              boxShadow: `0 0 0 4px ${alpha('#667eea', 0.1)}`,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'text.secondary',
                                fontWeight: 600,
                        '&.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.7 }}
                    >
                      <Box sx={{ pt: 4, textAlign: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                          disabled={isSubmitting}
                          endIcon={isSubmitting ? null : <ArrowRight size={20} />}
                      sx={{
                            px: 10,
                            py: 3,
                            borderRadius: 4,
                        textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '1.2rem',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                            boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                            border: 'none',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '-100%',
                              width: '100%',
                              height: '100%',
                              background: `linear-gradient(90deg, transparent, ${alpha('#ffffff', 0.2)}, transparent)`,
                              transition: 'left 0.5s',
                            },
                        '&:hover': {
                          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${theme.palette.primary.main} 100%)`,
                              boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.5)}`,
                              transform: 'translateY(-3px)',
                              '&::before': {
                                left: '100%',
                              },
                            },
                            '&:active': {
                              transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                          {isSubmitting ? 'Envoi en cours...' : t('contact.form.send')}
                    </Button>
                  </Box>
                    </motion.div>
                </Stack>
              </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Box>
  );
};

export default ContactPage;
