import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  useTheme,
  useMediaQuery,
  Chip,
  alpha,
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Heart, 
  Globe, 
  Award, 
  Users,
  Leaf,
  Shield,
  Clock,
  Star,
  Microscope,
  Gavel,
  Sparkles
} from 'lucide-react';
import { useTranslation } from '../i18n';

const AboutSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();

  const stats = [
    { number: '15+', label: t('about.stats.years'), icon: Clock, color: '#3b82f6' },
    { number: '500K+', label: t('about.stats.clients'), icon: Users, color: '#10b981' },
    { number: '200+', label: t('about.stats.products'), icon: Leaf, color: '#f59e0b' },
    { number: '99.8%', label: t('about.stats.satisfaction'), icon: Star, color: '#ef4444' },
  ];

  const achievements = [
    { 
      icon: Award, 
      title: t('about.achievements.iso.title'), 
      description: t('about.achievements.iso.description'),
      color: '#3b82f6'
    },
    { 
      icon: Shield, 
      title: t('about.achievements.gmp.title'), 
      description: t('about.achievements.gmp.description'),
      color: '#10b981'
    },
    { 
      icon: Gavel, 
      title: t('about.achievements.ministerial.title'), 
      description: t('about.achievements.ministerial.description'),
      color: '#f59e0b'
    },
    { 
      icon: Microscope, 
      title: t('about.achievements.laboratory.title'), 
      description: t('about.achievements.laboratory.description'),
      color: '#8b5cf6'
    },
  ];

  const values = [
    {
      icon: Target,
      title: t('about.values.scientific.title'),
      description: t('about.values.scientific.description'),
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: Heart,
      title: t('about.values.wellbeing.title'),
      description: t('about.values.wellbeing.description'),
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: Globe,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      icon: Shield,
      title: t('about.values.security.title'),
      description: t('about.values.security.description'),
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ];

  const timeline = [
    { year: t('about.timeline.founded.year'), event: t('about.timeline.founded.event'), milestone: t('about.timeline.founded.milestone') },
    { year: t('about.timeline.certification.year'), event: t('about.timeline.certification.event'), milestone: t('about.timeline.certification.milestone') },
    { year: t('about.timeline.expansion.year'), event: t('about.timeline.expansion.event'), milestone: t('about.timeline.expansion.milestone') },
    { year: t('about.timeline.digital.year'), event: t('about.timeline.digital.event'), milestone: t('about.timeline.digital.milestone') },
    { year: t('about.timeline.leader.year'), event: t('about.timeline.leader.event'), milestone: t('about.timeline.leader.milestone') },
  ];

  return (
    <Box
      id="about"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Background Effects */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%)
          `,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip
              icon={<Sparkles size={16} />}
              label={t('hero.badge')}
              sx={{
                mb: 3,
                px: 2,
                py: 1,
                fontSize: '0.9rem',
                fontWeight: 600,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                color: 'white',
                '& .MuiChip-icon': {
                  color: 'white',
                },
              }}
            />

            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              sx={{
                fontWeight: 800,
                mb: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                lineHeight: 1.2,
              }}
            >
              {t('about.title')}
            </Typography>

            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ 
                maxWidth: 900, 
                mx: 'auto', 
                lineHeight: 1.6,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 400,
              }}
            >
              {t('about.subtitle')}
            </Typography>
          </Box>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
              mb: 8,
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1, ease: "easeOut" }}
              >
                <Card
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${alpha(stat.color, 0.1)} 0%, ${alpha(stat.color, 0.05)} 100%)`,
                    border: `2px solid ${alpha(stat.color, 0.2)}`,
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 40px ${alpha(stat.color, 0.2)}`,
                    },
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: `linear-gradient(90deg, ${stat.color} 0%, ${alpha(stat.color, 0.5)} 100%)`,
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${stat.color} 0%, ${alpha(stat.color, 0.8)} 100%)`,
                        color: 'white',
                      }}
                    >
                      <stat.icon size={24} />
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      mb: 1,
                      color: stat.color,
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Mission & Vision */}
        <Box sx={{ mb: 8 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: 6,
              alignItems: 'start',
            }}
          >
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            >
              <Card
                sx={{
                  p: 4,
                  height: '100%',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 100,
                    height: 100,
                    background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                    borderRadius: '50%',
                    transform: 'translate(30px, -30px)',
                  }}
                />
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        color: 'white',
                        mr: 2,
                      }}
                    >
                      <Target size={28} />
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                }}
              >
                {t('about.mission.title')}
              </Typography>
                  </Box>
              <Typography
                    variant="h6"
                color="text.secondary"
                    sx={{ 
                      lineHeight: 1.7,
                      fontSize: '1.1rem',
                      fontWeight: 400,
                    }}
                  >
                    {t('about.mission.description')}
              </Typography>
                </Box>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            >
              <Card
                sx={{
                  p: 4,
                  height: '100%',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
                  border: `2px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                  borderRadius: 4,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 100,
                    height: 100,
                    background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 70%)`,
                    borderRadius: '50%',
                    transform: 'translate(-30px, -30px)',
                  }}
                />
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                        color: 'white',
                        mr: 2,
                      }}
                    >
                      <Eye size={28} />
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: 'secondary.main',
                }}
              >
                {t('about.vision.title')}
              </Typography>
                  </Box>
              <Typography
                    variant="h6"
                color="text.secondary"
                    sx={{ 
                      lineHeight: 1.7,
                      fontSize: '1.1rem',
                      fontWeight: 400,
                    }}
                  >
                    {t('about.vision.description')}
              </Typography>
                </Box>
              </Card>
            </motion.div>
          </Box>
        </Box>

              {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
        >
          <Box sx={{ mb: 8 }}>
                <Typography
              variant="h3"
                  sx={{
                fontWeight: 700,
                textAlign: 'center',
                mb: 6,
                    color: 'text.primary',
                  }}
                >
              {t('about.values.title')}
                </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                gap: 4,
              }}
            >
                  {values.map((value, index) => (
                      <motion.div
                  key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1, ease: "easeOut" }}
                      >
                  <Card
                          sx={{
                      p: 4,
                      height: '100%',
                      background: 'background.paper',
                      border: `2px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: 4,
                      position: 'relative',
                      overflow: 'hidden',
                            '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                              borderColor: 'primary.main',
                            },
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          }}
                        >
                          <Box
                            sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: value.gradient,
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          background: value.gradient,
                          color: 'white',
                          flexShrink: 0,
                        }}
                      >
                        <value.icon size={24} />
                          </Box>
                          <Box>
                            <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            mb: 2,
                            color: 'text.primary',
                          }}
                            >
                              {value.title}
                            </Typography>
                            <Typography
                          variant="body1"
                              color="text.secondary"
                          sx={{
                            lineHeight: 1.6,
                            fontSize: '1rem',
                          }}
                            >
                              {value.description}
                            </Typography>
                          </Box>
                        </Box>
                  </Card>
                      </motion.div>
                  ))}
            </Box>
              </Box>
            </motion.div>

          {/* Achievements */}
            <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.8 }}
        >
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                mb: 6,
                color: 'text.primary',
              }}
            >
              {t('about.achievements.title')}
            </Typography>
            <Box
                sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
                gap: 3,
              }}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.0 + index * 0.1, ease: "easeOut" }}
                >
                  <Card
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      background: `linear-gradient(135deg, ${alpha(achievement.color, 0.1)} 0%, ${alpha(achievement.color, 0.05)} 100%)`,
                      border: `2px solid ${alpha(achievement.color, 0.2)}`,
                      borderRadius: 4,
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: `0 20px 40px ${alpha(achievement.color, 0.2)}`,
                      },
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                        >
                          <Box
                            sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                          p: 2,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${achievement.color} 0%, ${alpha(achievement.color, 0.8)} 100%)`,
                          color: 'white',
                        }}
                      >
                        <achievement.icon size={24} />
                      </Box>
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                        mb: 1,
                        color: achievement.color,
                        fontSize: '1.1rem',
                      }}
                    >
                      {achievement.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '0.9rem',
                        lineHeight: 1.4,
                      }}
                    >
                      {achievement.description}
                    </Typography>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 2.4 }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                textAlign: 'center',
                mb: 6,
                color: 'text.primary',
              }}
            >
              {t('about.timeline.title')}
            </Typography>
            <Box
              sx={{
                position: 'relative',
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              {/* Timeline Line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: 4,
                  background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  transform: 'translateX(-50%)',
                  borderRadius: 2,
                }}
              />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.6 + index * 0.1, ease: "easeOut" }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 4,
                      flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                    }}
                  >
                    <Box
                      sx={{
                        flex: 1,
                        textAlign: index % 2 === 0 ? 'right' : 'left',
                        pr: index % 2 === 0 ? 4 : 0,
                        pl: index % 2 === 0 ? 0 : 4,
                      }}
                    >
                      <Card
                        sx={{
                          p: 3,
                          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
                          border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                          borderRadius: 3,
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.15)}`,
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            mb: 1,
                                color: 'primary.main',
                              }}
                            >
                          {item.event}
                            </Typography>
                            <Typography
                              variant="body2"
                          color="text.secondary"
                        >
                          {item.milestone}
                        </Typography>
                      </Card>
                    </Box>
                    
                    {/* Timeline Dot */}
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        border: `4px solid ${theme.palette.background.paper}`,
                        position: 'relative',
                        zIndex: 2,
                        mx: 2,
                      }}
                    />
                    
                    <Box
                      sx={{
                        flex: 1,
                        textAlign: index % 2 === 0 ? 'left' : 'right',
                        pl: index % 2 === 0 ? 4 : 0,
                        pr: index % 2 === 0 ? 0 : 4,
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 800,
                          color: 'primary.main',
                          fontSize: '2rem',
                        }}
                      >
                        {item.year}
                            </Typography>
                    </Box>
                          </Box>
                        </motion.div>
                    ))}
            </Box>
          </Box>
            </motion.div>
      </Container>
    </Box>
  );
};

export default AboutSection;