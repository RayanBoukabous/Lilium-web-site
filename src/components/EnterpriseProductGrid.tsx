import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Badge,
  Avatar,
  LinearProgress,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
  Stack,
  Rating,
  Skeleton,
} from '@mui/material';
import {
  Heart,
  HeartOff,
  Eye,
  ShoppingCart,
  Star,
  MapPin,
  Leaf,
  Zap,
  TrendingUp,
  Award,
  Shield,
  Clock,
  Filter,
  Grid3X3,
  List,
  Search,
  X,
  ChevronRight,
  Sparkles,
  Target,
  Users,
  BarChart3,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { formatPrice, getImageUrl, getCountriesNames } from '../services/api';
import AddToCartButton from './AddToCartButton';
import { Product } from '../types';

interface EnterpriseProductGridProps {
  maxProducts?: number;
  showFilters?: boolean;
  enableQuickView?: boolean;
  enableWishlist?: boolean;
  enableRecommendations?: boolean;
  layout?: 'grid' | 'masonry' | 'list';
  density?: 'compact' | 'comfortable' | 'spacious';
}

const EnterpriseProductGrid: React.FC<EnterpriseProductGridProps> = ({
  maxProducts = 12,
  showFilters = true,
  enableQuickView = true,
  enableWishlist = true,
  enableRecommendations = true,
  layout = 'grid',
  density = 'comfortable',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const { products, loading, error } = useProducts();

  // États Enterprise
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'list'>('grid');
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'price' | 'rating' | 'newest'>('relevance');
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Refs pour animations
  const gridRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filtrage et tri intelligent
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Recherche intelligente
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.informations?.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par pays
    if (selectedCountries.length > 0) {
      filtered = filtered.filter(product =>
        product.pays.some(countryId => selectedCountries.includes(countryId))
      );
    }

    // Filtre par prix
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Tri intelligent
    switch (sortBy) {
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        // Simulation de rating basé sur l'ID pour la démo
        filtered.sort((a, b) => (b.id % 5) - (a.id % 5));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Tri par pertinence (recommandations IA)
        filtered.sort((a, b) => {
          const aScore = calculateRelevanceScore(a);
          const bScore = calculateRelevanceScore(b);
          return bScore - aScore;
        });
    }

    return filtered.slice(0, maxProducts);
  }, [products, searchTerm, selectedCountries, priceRange, sortBy, maxProducts]);

  // Score de pertinence IA (simulation)
  const calculateRelevanceScore = (product: Product): number => {
    let score = 0;
    
    // Boost pour les produits populaires
    score += (product.id % 10) * 10;
    
    // Boost pour les produits avec images
    if (product.image) score += 20;
    
    // Boost pour les produits avec informations complètes
    if (product.informations?.description) score += 15;
    
    // Boost pour les produits dans la wishlist
    if (wishlist.has(product.id)) score += 50;
    
    return score;
  };

  // Gestion de la wishlist
  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  // Quick View Modal
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Animations d'entrée
  useEffect(() => {
    if (productRefs.current.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        },
        { threshold: 0.1 }
      );

      productRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    }
  }, [filteredProducts]);

  // Layout responsive
  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return viewMode === 'list' ? 1 : 3;
  };

  const getCardHeight = () => {
    switch (density) {
      case 'compact': return 280;
      case 'spacious': return 400;
      default: return 340;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={isMobile ? '100%' : isTablet ? '48%' : '31%'}
              height={getCardHeight()}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error" gutterBottom>
            Erreur de chargement
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {error}
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Enterprise */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Catalogue Premium
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {filteredProducts.length} produits trouvés
            </Typography>
          </Box>
          
          {/* Contrôles Enterprise */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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

            <Divider orientation="vertical" flexItem />

            <Button
              variant="outlined"
              startIcon={<Filter size={16} />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filtres
            </Button>
          </Box>
        </Box>

        {/* Barre de recherche Enterprise */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box sx={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                placeholder="Recherche intelligente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  backgroundColor: theme.palette.background.paper,
                }}
              />
              <Search size={20} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: theme.palette.text.secondary }} />
            </Box>
            
            <Button
              variant="contained"
              startIcon={<Sparkles size={16} />}
              sx={{ minWidth: 140 }}
            >
              IA Search
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Grid Enterprise */}
      <Box
        ref={gridRef}
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
          gap: 3,
          minHeight: 400,
        }}
      >
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              ref={(el) => (productRefs.current[index] = el)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              style={{ height: viewMode === 'list' ? 'auto' : getCardHeight() }}
            >
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 3,
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${theme.palette.primary.main}15`,
                    borderColor: theme.palette.primary.main,
                  },
                }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Badge Premium */}
                <Chip
                  label="Premium"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    zIndex: 2,
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                  icon={<Award size={12} />}
                />

                {/* Wishlist Button */}
                {enableWishlist && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 2,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,1)',
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                  >
                    {wishlist.has(product.id) ? (
                      <Heart size={16} fill={theme.palette.error.main} color={theme.palette.error.main} />
                    ) : (
                      <HeartOff size={16} />
                    )}
                  </IconButton>
                )}

                {/* Product Image */}
                <Box sx={{ position: 'relative', height: viewMode === 'list' ? 120 : 180, overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={getImageUrl(product.image)}
                    alt={product.fname}
                    sx={{
                      height: '100%',
                      objectFit: 'contain',
                      backgroundColor: theme.palette.grey[50],
                      p: 2,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  
                  {/* Overlay Actions */}
                  <Fade in={hoveredProduct === product.id}>
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                        p: 2,
                        display: 'flex',
                        gap: 1,
                        justifyContent: 'center',
                      }}
                    >
                      {enableQuickView && (
                        <Tooltip title="Aperçu rapide">
                          <IconButton
                            size="small"
                            sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openQuickView(product);
                            }}
                          >
                            <Eye size={16} />
                          </IconButton>
                        </Tooltip>
                      )}
                      
                      <Tooltip title="Ajouter au panier">
                        <IconButton
                          size="small"
                          sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                        >
                          <ShoppingCart size={16} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Fade>
                </Box>

                {/* Product Info */}
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        lineHeight: 1.3,
                        flex: 1,
                        mr: 1,
                      }}
                    >
                      {product.fname}
                    </Typography>
                    
                    <Chip
                      label={getCountriesNames(product.pays).join(', ')}
                      size="small"
                      sx={{
                        fontSize: '0.65rem',
                        height: 20,
                        backgroundColor: theme.palette.grey[100],
                      }}
                      icon={<MapPin size={10} />}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      fontSize: '0.85rem',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.nom}
                  </Typography>

                  {/* Rating & Stats */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Rating
                      value={4.2 + (product.id % 3) * 0.3}
                      precision={0.1}
                      size="small"
                      readOnly
                    />
                    <Typography variant="caption" color="text.secondary">
                      ({120 + product.id * 5})
                    </Typography>
                  </Box>

                  {/* Price & CTA */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        fontSize: '1.1rem',
                      }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                    
                    <AddToCartButton
                      product={product}
                      variant="contained"
                      size="small"
                    />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
            onClick={closeQuickView}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Paper sx={{ p: 4, maxWidth: 600, width: '100%', maxHeight: '90vh', overflow: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Aperçu Rapide
                  </Typography>
                  <IconButton onClick={closeQuickView}>
                    <X size={20} />
                  </IconButton>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                  <Box sx={{ flex: 1 }}>
                    <img
                      src={getImageUrl(quickViewProduct.image)}
                      alt={quickViewProduct.fname}
                      style={{
                        width: '100%',
                        height: 200,
                        objectFit: 'contain',
                        borderRadius: 8,
                        backgroundColor: theme.palette.grey[50],
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {quickViewProduct.fname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {quickViewProduct.nom}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 2 }}>
                      {formatPrice(quickViewProduct.price)}
                    </Typography>
                    <AddToCartButton
                      product={quickViewProduct}
                      variant="contained"
                      fullWidth
                    />
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default EnterpriseProductGrid;


