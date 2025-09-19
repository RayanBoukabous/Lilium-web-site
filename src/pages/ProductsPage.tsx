import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  Alert,
  Fab,
  Tooltip,
  IconButton,
  Slider,
  Paper,
  Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ArrowUpDown,
  Grid3X3 as GridIcon,
  List as ListIcon,
  ShoppingCart,
  Heart,
  HeartOff,
  Star,
  MapPin,
  Leaf,
  ArrowUp,
  Filter,
  Award,
  Shield,
  Brain,
  Bone,
  Eye,
  Plus,
  Minus,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { formatPrice, getImageUrl, getCountriesNames } from '../services/api';
import { productDescriptions, productBenefits } from '../data/productDescriptions';
import LoadingSpinner from '../components/LoadingSpinner';
import Layout from '../components/Layout';
import AddToCartButton from '../components/AddToCartButton';

const ProductsPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { products, loading, error } = useProducts();

  // États pour les filtres et la recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  // Catégories de produits
  const categories = [
    { id: 'all', name: 'Tous les produits', icon: GridIcon, color: theme.palette.primary.main },
    { id: 'fertility', name: 'Fertilité', icon: Heart, color: '#ef4444' },
    { id: 'vitamins', name: 'Vitamines', icon: Star, color: '#f97316' },
    { id: 'minerals', name: 'Minéraux', icon: Award, color: '#eab308' },
    { id: 'immune', name: 'Immunité', icon: Shield, color: '#22c55e' },
    { id: 'cognitive', name: 'Cognitive', icon: Brain, color: '#0ea5e9' },
    { id: 'bone', name: 'Os & Articulations', icon: Bone, color: '#8b5cf6' },
    { id: 'vision', name: 'Vision', icon: Eye, color: '#ec4899' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  // Pays disponibles
  const countries = [
    { id: 1, name: 'Algérie', flag: '🇩🇿' },
    { id: 2, name: 'Tunisie', flag: '🇹🇳' },
    { id: 3, name: 'Maroc', flag: '🇲🇦' },
  ];

  // Filtrage et tri des produits
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Recherche par nom
      const matchesSearch = product.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.nom.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtre par prix
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      // Filtre par pays
      const matchesCountry = selectedCountries.length === 0 || 
                            product.pays.some(country => selectedCountries.includes(country));
      
      return matchesSearch && matchesPrice && matchesCountry;
    });

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
        default:
          return a.fname.localeCompare(b.fname);
      }
    });

    return filtered;
  }, [products, searchTerm, priceRange, selectedCountries, sortBy]);

  // Gestion des favoris
  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  // Gestion des quantités
  const updateQuantity = (productId: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta)
    }));
  };

  // Navigation vers la page de détail du produit
  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Détection du scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  if (loading) {
    return (
      <Layout>
        <LoadingSpinner message="Chargement de notre catalogue..." size={80} />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Alert severity="error" sx={{ mb: 4 }}>
            Erreur lors du chargement des produits: {error}
          </Alert>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          pt: { xs: 8, md: 10 },
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            color: 'primary.contrastText',
            py: { xs: 6, md: 8 },
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
              opacity: 0.1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                sx={{
                  fontWeight: 700,
                  textAlign: 'center',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Notre Catalogue
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  opacity: 0.9,
                  maxWidth: 600,
                  mx: 'auto',
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                }}
              >
                Découvrez notre gamme complète de compléments alimentaires de qualité pharmaceutique
              </Typography>
            </motion.div>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Filtres et Recherche */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 4,
                border: `1px solid ${theme.palette.divider}`,
                backgroundColor: 'background.paper',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: 'repeat(4, 1fr)',
                  },
                  gap: 3,
                  alignItems: 'center',
                }}
              >
                {/* Recherche */}
                <Box>
                  <TextField
                    fullWidth
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search size={20} color={theme.palette.primary.main} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Box>

                {/* Tri */}
                <Box>
                  <FormControl fullWidth>
                    <InputLabel>Trier par</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      label="Trier par"
                      startAdornment={<ArrowUpDown size={20} style={{ marginRight: 8 }} />}
                    >
                      <MenuItem value="name">Nom (A-Z)</MenuItem>
                      <MenuItem value="price-asc">Prix (Croissant)</MenuItem>
                      <MenuItem value="price-desc">Prix (Décroissant)</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Mode d'affichage */}
                <Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Vue grille">
                      <IconButton
                        onClick={() => setViewMode('grid')}
                        color={viewMode === 'grid' ? 'primary' : 'default'}
                        sx={{
                          backgroundColor: viewMode === 'grid' ? 'primary.main' : 'transparent',
                          color: viewMode === 'grid' ? 'primary.contrastText' : 'text.secondary',
                          '&:hover': {
                            backgroundColor: viewMode === 'grid' ? 'primary.dark' : 'primary.light',
                            color: 'primary.contrastText',
                          },
                        }}
                      >
                        <GridIcon size={20} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Vue liste">
                      <IconButton
                        onClick={() => setViewMode('list')}
                        color={viewMode === 'list' ? 'primary' : 'default'}
                        sx={{
                          backgroundColor: viewMode === 'list' ? 'primary.main' : 'transparent',
                          color: viewMode === 'list' ? 'primary.contrastText' : 'text.secondary',
                          '&:hover': {
                            backgroundColor: viewMode === 'list' ? 'primary.dark' : 'primary.light',
                            color: 'primary.contrastText',
                          },
                        }}
                      >
                        <ListIcon size={20} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Bouton Filtres */}
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<Filter size={20} />}
                    onClick={() => setShowFilters(!showFilters)}
                    fullWidth
                    sx={{
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Filtres Avancés
                  </Button>
                </Box>
              </Box>

              {/* Filtres Avancés */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Divider sx={{ my: 3 }} />
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                          xs: '1fr',
                          md: 'repeat(3, 1fr)',
                        },
                        gap: 3,
                      }}
                    >
                      {/* Prix */}
                      <Box>
                        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                          Prix: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                        </Typography>
                        <Slider
                          value={priceRange}
                          onChange={(_, newValue) => setPriceRange(newValue as number[])}
                          valueLabelDisplay="auto"
                          min={0}
                          max={5000}
                          step={100}
                          sx={{
                            color: 'primary.main',
                            '& .MuiSlider-thumb': {
                              boxShadow: `0 0 0 8px ${theme.palette.primary.main}20`,
                            },
                          }}
                        />
                      </Box>

                      {/* Pays */}
                      <Box>
                        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                          Pays
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {countries.map((country) => (
                            <Chip
                              key={country.id}
                              label={`${country.flag} ${country.name}`}
                              clickable
                              color={selectedCountries.includes(country.id) ? 'primary' : 'default'}
                              onClick={() => {
                                setSelectedCountries(prev =>
                                  prev.includes(country.id)
                                    ? prev.filter(id => id !== country.id)
                                    : [...prev, country.id]
                                );
                              }}
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'primary.light',
                                  color: 'primary.contrastText',
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Box>

                      {/* Catégories */}
                      <Box>
                        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                          Catégories
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {categories.slice(0, 4).map((category) => (
                            <Chip
                              key={category.id}
                              label={category.name}
                              clickable
                              color={selectedCategory === category.id ? 'primary' : 'default'}
                              onClick={() => setSelectedCategory(category.id)}
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'primary.light',
                                  color: 'primary.contrastText',
                                },
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Paper>
          </motion.div>

          {/* Résultats */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </Typography>
          </Box>

          {/* Grille des Produits - Design Professionnel */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 4,
            }}
          >
            {filteredProducts.map((product) => (
              <Box key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                      <Card
                        onClick={() => handleProductClick(product.id)}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative',
                          overflow: 'hidden',
                          border: `1px solid ${theme.palette.divider}`,
                          borderRadius: 4,
                          backgroundColor: 'background.paper',
                          cursor: 'pointer',
                          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          '&:hover': {
                            boxShadow: `0 20px 48px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
                            borderColor: 'primary.main',
                            transform: 'translateY(-8px)',
                          },
                        }}
                      >
                        {/* Badge Favori */}
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(product.id);
                          }}
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            zIndex: 2,
                            backgroundColor: 'background.paper',
                            boxShadow: 2,
                            '&:hover': {
                              backgroundColor: 'primary.main',
                              color: 'primary.contrastText',
                              transform: 'scale(1.1)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {favorites.has(product.id) ? (
                            <Heart size={20} color={theme.palette.error.main} fill={theme.palette.error.main} />
                          ) : (
                            <HeartOff size={20} />
                          )}
                        </IconButton>

                        {/* Badge Pays */}
                        <Chip
                          label={getCountriesNames(product.pays).join(', ')}
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            zIndex: 2,
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                          icon={<MapPin size={12} />}
                        />

                        {/* Image du Produit - Mise en avant */}
                        <Box
                          sx={{
                            height: 280,
                            width: '100%',
                            position: 'relative',
                            backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.50',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            borderBottom: `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          {product.image ? (
                            <Box
                              component="img"
                              src={getImageUrl(product.image)}
                              alt={product.fname}
                              sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                  transform: 'scale(1.05)',
                                },
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.nextElementSibling?.setAttribute('style', 'display: flex');
                              }}
                            />
                          ) : null}
                          
                          {/* Fallback icon */}
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: 'primary.main',
                              display: product.image ? 'none' : 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              flexDirection: 'column',
                              gap: 2,
                            }}
                          >
                            <Leaf size={64} />
                            <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
                              {product.fname}
                            </Typography>
                          </Box>
                        </Box>

                        <CardContent sx={{ 
                          flexGrow: 1, 
                          p: 3, 
                          display: 'flex', 
                          flexDirection: 'column',
                          minHeight: 320,
                        }}>
                          {/* Titre du produit */}
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 1,
                              color: 'text.primary',
                              fontSize: '1.1rem',
                              lineHeight: 1.3,
                              minHeight: 44,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {product.fname}
                          </Typography>
                          
                          {/* Description */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ 
                              mb: 2, 
                              lineHeight: 1.6,
                              minHeight: 48,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {productDescriptions[product.fname] || product.nom}
                          </Typography>

                          {/* Bénéfices du Produit */}
                          <Box sx={{ mb: 2, minHeight: 40 }}>
                            {productBenefits[product.fname]?.slice(0, 2).map((benefit, benefitIndex) => (
                              <Chip
                                key={benefitIndex}
                                label={benefit}
                                size="small"
                                sx={{
                                  backgroundColor: `${theme.palette.primary.main}15`,
                                  color: theme.palette.primary.main,
                                  fontWeight: 500,
                                  fontSize: '0.7rem',
                                  mr: 0.5,
                                  mb: 0.5,
                                  height: 20,
                                }}
                              />
                            ))}
                            <Chip
                              label="Certifié"
                              size="small"
                              sx={{
                                backgroundColor: `${theme.palette.success.main}20`,
                                color: theme.palette.success.main,
                                fontWeight: 500,
                                fontSize: '0.7rem',
                                mb: 0.5,
                                height: 20,
                              }}
                            />
                          </Box>

                          {/* Rating */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, minHeight: 24 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  fill={i < 4 ? '#fbbf24' : 'none'}
                                  color="#fbbf24"
                                />
                              ))}
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                              4.8 (127 avis)
                            </Typography>
                          </Box>

                          {/* Prix */}
                          <Box sx={{ mb: 2, minHeight: 48 }}>
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 700,
                                color: 'primary.main',
                                fontSize: '1.4rem',
                              }}
                            >
                              {formatPrice(product.price)}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: '0.7rem' }}
                            >
                              Prix TTC
                            </Typography>
                          </Box>

                          {/* Contrôle de quantité */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, minHeight: 40 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              Quantité:
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(product.id, -1);
                                }}
                                sx={{
                                  backgroundColor: 'grey.100',
                                  '&:hover': { backgroundColor: 'grey.200' },
                                }}
                              >
                                <Minus size={16} />
                              </IconButton>
                              <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>
                                {quantities[product.id] || 0}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(product.id, 1);
                                }}
                                sx={{
                                  backgroundColor: 'primary.main',
                                  color: 'primary.contrastText',
                                  '&:hover': { backgroundColor: 'primary.dark' },
                                }}
                              >
                                <Plus size={16} />
                              </IconButton>
                            </Box>
                          </Box>

                          {/* Bouton Commander */}
                          <Box sx={{ mt: 'auto' }}>
                            <AddToCartButton
                              product={product}
                              variant="contained"
                              size="medium"
                              fullWidth
                            />
                          </Box>
                        </CardContent>
                      </Card>
                </motion.div>
              </Box>
            ))}
          </Box>

          {/* Message si aucun produit trouvé */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: 'center',
                  borderRadius: 4,
                  backgroundColor: 'background.paper',
                  border: `2px dashed ${theme.palette.divider}`,
                }}
              >
                <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary' }}>
                  Aucun produit trouvé
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Essayez de modifier vos critères de recherche ou de filtrage
                </Typography>
              </Paper>
            </motion.div>
          )}
        </Container>

        {/* Bouton Retour en Haut */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Fab
                color="primary"
                onClick={scrollToTop}
                sx={{
                  position: 'fixed',
                  bottom: 24,
                  right: 24,
                  zIndex: 1000,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: `0 8px 32px ${theme.palette.primary.main}40`,
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

export default ProductsPage;