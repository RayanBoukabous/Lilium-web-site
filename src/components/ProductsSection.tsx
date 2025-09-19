import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Heart, 
  Brain, 
  Bone, 
  Eye, 
  Shield,
  Star,
  ShoppingCart,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { formatPrice, getImageUrl, getCountriesNames } from '../services/api';
import { productDescriptions, productBenefits } from '../data/productDescriptions';
import LoadingSpinner from './LoadingSpinner';

const ProductsSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();

  const productCategories = [
    {
      icon: Heart,
      title: 'Santé Cardiovasculaire',
      description: 'Compléments pour maintenir un cœur en bonne santé',
      products: ['Oméga-3', 'Coenzyme Q10', 'Magnésium'],
      color: '#ef4444',
    },
    {
      icon: Brain,
      title: 'Santé Cognitive',
      description: 'Supports pour la mémoire et les fonctions cérébrales',
      products: ['Ginkgo Biloba', 'Phosphatidylsérine', 'Vitamine B12'],
      color: '#3b82f6',
    },
    {
      icon: Bone,
      title: 'Santé Osseuse',
      description: 'Renforcement des os et des articulations',
      products: ['Calcium', 'Vitamine D3', 'Collagène'],
      color: '#f59e0b',
    },
    {
      icon: Eye,
      title: 'Santé Oculaire',
      description: 'Protection et amélioration de la vision',
      products: ['Lutéine', 'Zéaxanthine', 'Vitamine A'],
      color: '#8b5cf6',
    },
    {
      icon: Shield,
      title: 'Immunité',
      description: 'Renforcement du système immunitaire',
      products: ['Vitamine C', 'Zinc', 'Échinacée'],
      color: '#10b981',
    },
    {
      icon: Leaf,
      title: 'Détoxification',
      description: 'Nettoyage et purification de l\'organisme',
      products: ['Chlorella', 'Spiruline', 'Curcuma'],
      color: '#22c55e',
    },
  ];


  return (
    <Box
      id="products"
      sx={{
        py: 8,
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Nos Produits
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
            >
              Découvrez notre gamme complète de compléments alimentaires, 
              formulés avec les meilleurs ingrédients naturels.
            </Typography>
          </Box>
        </motion.div>

        {/* Product Categories */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 4,
              textAlign: 'center',
              color: 'text.primary',
            }}
          >
            Catégories de Produits
          </Typography>
          <Grid container spacing={3}>
            {productCategories.map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={category.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      p: 3,
                      textAlign: 'center',
                      border: `2px solid ${category.color}20`,
                      '&:hover': {
                        borderColor: category.color,
                        transform: 'translateY(-8px)',
                        boxShadow: `0 12px 40px ${category.color}30`,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
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
                            backgroundColor: `${category.color}20`,
                            color: category.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <category.icon size={32} />
                        </Box>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          color: 'text.primary',
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, lineHeight: 1.6 }}
                      >
                        {category.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                        {category.products.map((product) => (
                          <Chip
                            key={product}
                            label={product}
                            size="small"
                            sx={{
                              backgroundColor: `${category.color}15`,
                              color: category.color,
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Products */}
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              mb: 4,
              textAlign: 'center',
              color: 'text.primary',
            }}
          >
            Nos Produits Lilium Pharma
          </Typography>
          
          {loading && (
            <LoadingSpinner message="Chargement de nos produits..." size={80} />
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              Erreur lors du chargement des produits: {error}
            </Alert>
          )}
          
          {!loading && !error && (
            <Grid container spacing={4}>
              {products.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        border: `2px solid ${theme.palette.primary[200]}`,
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: `0 20px 40px ${theme.palette.primary[200]}`,
                          borderColor: 'primary.main',
                        },
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {/* Badge pour les pays */}
                      <Chip
                        label={getCountriesNames(product.pays).join(', ')}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          zIndex: 1,
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                        icon={<MapPin size={12} />}
                      />

                      {/* Product Image */}
                      <CardMedia
                        component="img"
                        image={getImageUrl(product.image)}
                        alt={product.fname}
                        sx={{
                          height: 200,
                          objectFit: 'contain',
                          backgroundColor: 'grey.50',
                          p: 2,
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.setAttribute('style', 'display: flex');
                        }}
                      />
                      
                      {/* Fallback icon si l'image ne charge pas */}
                      <Box
                        sx={{
                          height: 200,
                          backgroundColor: 'grey.100',
                          display: 'none',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                        }}
                      >
                        <Leaf size={64} color={theme.palette.primary.main} />
                      </Box>

                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            color: 'text.primary',
                            fontSize: '1.1rem',
                            lineHeight: 1.3,
                          }}
                        >
                          {product.fname}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2, lineHeight: 1.6, minHeight: 48 }}
                        >
                          {productDescriptions[product.fname] || product.nom}
                        </Typography>

                        {/* Product Benefits */}
                        <Box sx={{ mb: 2 }}>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
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

                        {/* Price and CTA */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                color: 'primary.main',
                                fontSize: '1.2rem',
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
                          <Button
                            variant="contained"
                            size="small"
                            endIcon={<ShoppingCart size={16} />}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/product/${product.id}`);
                            }}
                            sx={{
                              borderRadius: 2,
                              textTransform: 'none',
                              fontWeight: 600,
                              px: 2,
                              py: 1,
                              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                              '&:hover': {
                                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                                transform: 'scale(1.05)',
                              },
                              transition: 'all 0.3s ease',
                            }}
                          >
                            Voir détails
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}

          {/* View All Products Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowRight size={20} />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 3,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                }}
              >
                Voir Tous les Produits
              </Button>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsSection;
