import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Fab,
  Drawer,
  useTheme,
  useMediaQuery,
  Paper,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Filter,
  Grid3X3,
  List,
  Sparkles,
  TrendingUp,
  Award,
  Brain,
  ArrowUp,
  Settings,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EnterpriseProductGrid from '../components/EnterpriseProductGrid';
import AIRecommendations from '../components/AIRecommendations';
import AdvancedFilters from '../components/AdvancedFilters';
import Layout from '../components/Layout';

interface FilterState {
  search: string;
  priceRange: [number, number];
  countries: number[];
  categories: string[];
  sortBy: 'relevance' | 'price' | 'rating' | 'newest' | 'popularity';
  availability: 'all' | 'inStock' | 'lowStock';
  features: string[];
  aiEnabled: boolean;
  personalized: boolean;
}

const EnterpriseProductsPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [showFilters, setShowFilters] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    search: '',
    priceRange: [0, 5000],
    countries: [],
    categories: [],
    sortBy: 'relevance',
    availability: 'all',
    features: [],
    aiEnabled: true,
    personalized: true,
  });
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'list'>('grid');
  const [density, setDensity] = useState<'compact' | 'comfortable' | 'spacious'>('comfortable');

  // Gestion du scroll pour le bouton "back to top"
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestion des filtres
  const handleFiltersChange = (filters: FilterState) => {
    setCurrentFilters(filters);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (currentFilters.search) count++;
    if (currentFilters.countries.length > 0) count++;
    if (currentFilters.categories.length > 0) count++;
    if (currentFilters.features.length > 0) count++;
    if (currentFilters.priceRange[0] > 0 || currentFilters.priceRange[1] < 5000) count++;
    return count;
  };

  return (
    <Layout>
      <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
        {/* Hero Section Enterprise */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'white',
            py: 8,
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
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            }}
          />

          <Container maxWidth="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Catalogue Enterprise
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 300,
                    maxWidth: 600,
                    mx: 'auto',
                  }}
                >
                  Découvrez nos produits premium avec notre technologie IA avancée
                </Typography>

                {/* Stats Enterprise */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap', mb: 4 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      500+
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Produits Premium
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      95%
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Précision IA
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                      24/7
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Support Pro
                    </Typography>
                  </Box>
                </Box>

                {/* CTA Buttons */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Sparkles size={20} />}
                    sx={{
                      backgroundColor: 'white',
                      color: theme.palette.primary.main,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Découvrir avec IA
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Filter size={20} />}
                    onClick={() => setShowFilters(true)}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    Filtres Avancés
                  </Button>
                </Stack>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* Contrôles Enterprise */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Paper
            sx={{
              p: 3,
              mb: 4,
              background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.light}05 100%)`,
              border: `1px solid ${theme.palette.primary.light}20`,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              {/* Filtres actifs */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Filtres actifs :
                </Typography>
                {getActiveFiltersCount() > 0 && (
                  <Chip
                    label={`${getActiveFiltersCount()} filtres`}
                    color="primary"
                    size="small"
                    onDelete={() => setShowFilters(true)}
                  />
                )}
                {currentFilters.search && (
                  <Chip
                    label={`Recherche: "${currentFilters.search}"`}
                    variant="outlined"
                    size="small"
                    onDelete={() => setCurrentFilters(prev => ({ ...prev, search: '' }))}
                  />
                )}
              </Box>

              {/* Contrôles de vue */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Tooltip title="Vue Grille">
                  <IconButton
                    onClick={() => setViewMode('grid')}
                    color={viewMode === 'grid' ? 'primary' : 'default'}
                  >
                    <Grid3X3 size={20} />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Vue Liste">
                  <IconButton
                    onClick={() => setViewMode('list')}
                    color={viewMode === 'list' ? 'primary' : 'default'}
                  >
                    <List size={20} />
                  </IconButton>
                </Tooltip>

                <Button
                  variant="outlined"
                  startIcon={<Filter size={16} />}
                  onClick={() => setShowFilters(true)}
                  sx={{ ml: 2 }}
                >
                  Filtres
                  {getActiveFiltersCount() > 0 && (
                    <Chip
                      label={getActiveFiltersCount()}
                      size="small"
                      color="primary"
                      sx={{ ml: 1, height: 20, minWidth: 20 }}
                    />
                  )}
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Grid de produits Enterprise */}
          <EnterpriseProductGrid
            maxProducts={24}
            showFilters={false}
            enableQuickView={true}
            enableWishlist={true}
            enableRecommendations={true}
            layout={viewMode}
            density={density}
          />

          {/* Recommandations IA */}
          <Box sx={{ mt: 8 }}>
            <AIRecommendations
              maxRecommendations={6}
              showExplanation={true}
              enablePersonalization={true}
            />
          </Box>
        </Container>

        {/* Filtres Drawer */}
        <Drawer
          anchor="right"
          open={showFilters}
          onClose={() => setShowFilters(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: isMobile ? '100%' : 400,
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
            },
          }}
        >
          <AdvancedFilters
            onFiltersChange={handleFiltersChange}
            onClose={() => setShowFilters(false)}
            isOpen={showFilters}
          />
        </Drawer>

        {/* Back to Top FAB */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              style={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 1000,
              }}
            >
              <Fab
                color="primary"
                onClick={scrollToTop}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ArrowUp size={24} />
              </Fab>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Layout>
  );
};

export default EnterpriseProductsPage;


