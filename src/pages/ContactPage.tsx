import React, { useState } from 'react';
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
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building2,
  Globe,
} from 'lucide-react';
import { useTranslation } from '../i18n';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.phone'),
      value: '+213 540 832 898',
      subtitle: 'Appel direct',
    },
    {
      icon: Mail,
      title: t('contact.email'),
      value: 'contact@liliumpharma.com',
      subtitle: 'Réponse sous 24h',
    },
    {
      icon: MapPin,
      title: t('contact.address'),
      value: t('contact.addressValue'),
      subtitle: 'Siège social',
    },
    {
      icon: Clock,
      title: t('contact.hours'),
      value: t('contact.hoursValue'),
      subtitle: 'Heures de bureau',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${alpha(theme.palette.primary.main, 0.02)} 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, pt: { xs: 8, md: 12 }, pb: 8 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 200,
                mb: 3,
                color: 'text.primary',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              {t('contact.title')}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ 
                maxWidth: 600, 
                mx: 'auto', 
                lineHeight: 1.6,
                fontWeight: 300,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
              }}
            >
              {t('contact.subtitle')}
            </Typography>
          </Box>
        </motion.div>

        {/* Contact Information Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 300,
                mb: 6,
                color: 'text.primary',
                fontSize: '1.8rem',
                letterSpacing: '-0.02em',
                textAlign: 'center',
              }}
            >
              {t('contact.getInTouch')}
            </Typography>

            <Grid container spacing={4}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} sm={6} lg={3} key={info.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        p: 0,
                        backgroundColor: 'background.paper',
                        border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                        borderRadius: 2,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        height: '100%',
                        '&:hover': {
                          borderColor: alpha(theme.palette.primary.main, 0.2),
                          transform: 'translateY(-4px)',
                          boxShadow: `0 12px 30px ${alpha(theme.palette.primary.main, 0.12)}`,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            height: '100%',
                          }}
                        >
                          <Box
                            sx={{
                              p: 3,
                              borderRadius: 2,
                              backgroundColor: alpha(theme.palette.primary.main, 0.08),
                              color: theme.palette.primary.main,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 64,
                              height: 64,
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                              mb: 3,
                            }}
                          >
                            <info.icon size={28} />
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: 'text.secondary',
                              mb: 2,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              fontSize: '0.75rem',
                            }}
                          >
                            {info.title}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              color: 'text.primary',
                              fontWeight: 500,
                              lineHeight: 1.4,
                              mb: 1,
                              fontSize: '1rem',
                            }}
                          >
                            {info.value}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              fontWeight: 400,
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

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card
            elevation={0}
            sx={{
              p: 0,
              backgroundColor: 'background.paper',
              border: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
              borderRadius: 3,
              overflow: 'hidden',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <Box
              sx={{
                p: 6,
                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                borderBottom: `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 300,
                  mb: 2,
                  color: 'text.primary',
                  fontSize: '1.8rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {t('contact.sendMessage')}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                {t('contact.sendMessageDesc')}
              </Typography>
            </Box>

            <CardContent sx={{ p: 6 }}>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
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
                            borderRadius: 2,
                            backgroundColor: alpha(theme.palette.text.primary, 0.02),
                            '& fieldset': {
                              borderColor: alpha(theme.palette.text.primary, 0.12),
                              borderWidth: 1,
                            },
                            '&:hover fieldset': {
                              borderColor: alpha(theme.palette.primary.main, 0.3),
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'text.secondary',
                            fontWeight: 500,
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                            borderRadius: 2,
                            backgroundColor: alpha(theme.palette.text.primary, 0.02),
                            '& fieldset': {
                              borderColor: alpha(theme.palette.text.primary, 0.12),
                              borderWidth: 1,
                            },
                            '&:hover fieldset': {
                              borderColor: alpha(theme.palette.primary.main, 0.3),
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'text.secondary',
                            fontWeight: 500,
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t('contact.form.phone')}
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: alpha(theme.palette.text.primary, 0.02),
                            '& fieldset': {
                              borderColor: alpha(theme.palette.text.primary, 0.12),
                              borderWidth: 1,
                            },
                            '&:hover fieldset': {
                              borderColor: alpha(theme.palette.primary.main, 0.3),
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'text.secondary',
                            fontWeight: 500,
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                            borderRadius: 2,
                            backgroundColor: alpha(theme.palette.text.primary, 0.02),
                            '& fieldset': {
                              borderColor: alpha(theme.palette.text.primary, 0.12),
                              borderWidth: 1,
                            },
                            '&:hover fieldset': {
                              borderColor: alpha(theme.palette.primary.main, 0.3),
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: theme.palette.primary.main,
                              borderWidth: 2,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'text.secondary',
                            fontWeight: 500,
                            '&.Mui-focused': {
                              color: theme.palette.primary.main,
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>

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
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.text.primary, 0.02),
                        '& fieldset': {
                          borderColor: alpha(theme.palette.text.primary, 0.12),
                          borderWidth: 1,
                        },
                        '&:hover fieldset': {
                          borderColor: alpha(theme.palette.primary.main, 0.3),
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: 2,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'text.secondary',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                      },
                    }}
                  />

                  <Box sx={{ pt: 2, textAlign: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<Send size={20} />}
                      sx={{
                        px: 8,
                        py: 2.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: '1.1rem',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
                        boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.9)} 0%, ${theme.palette.primary.main} 100%)`,
                          boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {t('contact.form.send')}
                    </Button>
                  </Box>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ContactPage;
