import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  useTheme,
  alpha,
  IconButton,
} from '@mui/material';
import {
  FavoriteBorder,
  Star,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../types';
import { productDescriptions, productBenefits } from '../data/productDescriptions';

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
  maxProducts?: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProduct,
  allProducts,
  maxProducts = 4,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Filtrer les produits similaires (exclure le produit actuel)
  const relatedProducts = allProducts
    .filter(product => product.id !== currentProduct.id)
    .slice(0, maxProducts);

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}€`;
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `https://liliumpharma.com/${imagePath}`;
  };

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            mb: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Produits Similaires
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Découvrez d'autres produits de notre gamme qui pourraient vous intéresser
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {relatedProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
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
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  borderRadius: 3,
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                    borderColor: theme.palette.primary.main,
                  },
                  transition: 'all 0.3s ease',
                }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Badge de promotion */}
                <Chip
                  label="Recommandé"
                  color="primary"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    zIndex: 1,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                  }}
                />

                {/* Bouton favori */}
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 1,
                    background: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      background: alpha(theme.palette.background.paper, 1),
                      transform: 'scale(1.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Gérer l'ajout aux favoris
                  }}
                >
                  <FavoriteBorder />
                </IconButton>

                {/* Image du produit */}
                <Box
                  sx={{
                    height: 200,
                    position: 'relative',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {product.image ? (
                    <Box
                      component="img"
                      src={getImageUrl(product.image)}
                      alt={product.fname}
                      sx={{
                        maxWidth: '80%',
                        maxHeight: '80%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))',
                        transition: 'transform 0.3s ease',
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '2rem',
                      }}
                    >
                      🧬
                    </Box>
                  )}
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* Nom du produit */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: 'text.primary',
                      fontSize: '1.1rem',
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.fname}
                  </Typography>

                  {/* Description courte */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {productDescriptions[product.fname] || product.nom}
                  </Typography>

                  {/* Bénéfices */}
                  <Box sx={{ mb: 2 }}>
                    {productBenefits[product.fname]?.slice(0, 2).map((benefit, benefitIndex) => (
                      <Chip
                        key={benefitIndex}
                        label={benefit}
                        size="small"
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          fontSize: '0.7rem',
                          mr: 0.5,
                          mb: 0.5,
                          height: 20,
                        }}
                      />
                    ))}
                  </Box>

                  {/* Note */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          sx={{
                            color: i < 4 ? theme.palette.warning.main : 'inherit',
                            fontSize: '1rem',
                          }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                      4.8
                    </Typography>
                  </Box>

                  {/* Prix et CTA */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.primary.main,
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
                      endIcon={<ArrowForward sx={{ fontSize: '1rem' }} />}
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
                      Voir
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Bouton pour voir tous les produits */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button
          variant="outlined"
          size="large"
          endIcon={<ArrowForward />}
          onClick={() => navigate('/')}
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
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Voir Tous les Produits
        </Button>
      </Box>
    </Box>
  );
};

export default RelatedProducts;
