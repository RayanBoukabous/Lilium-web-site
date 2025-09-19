import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  Chip,
  useTheme,
  alpha,
  Fade,
  Zoom,
} from '@mui/material';
import {
  ArrowBack,
  Science,
  LocalPharmacy,
  Security,
  CheckCircle,
  Download,
  Share,
  Favorite,
  FavoriteBorder,
  Star,
} from '@mui/icons-material';
import { useProducts } from '../hooks/useProducts';
import { productDescriptions, productBenefits } from '../data/productDescriptions';
import { getImageUrl, formatPrice } from '../services/api';
import type { Product } from '../types';
import FloatingParticles from '../components/FloatingParticles';
import LoadingSpinner from '../components/LoadingSpinner';
import AddToCartButton from '../components/AddToCartButton';
import { useTranslation } from '../i18n';
import { useScrollToTop } from '../hooks/useScrollToTop';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const { products, loading, error } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Scroll vers le haut quand le produit change
  useScrollToTop(product?.id);

  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct || null);
    }
  }, [products, id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        }}
      >
        <Card sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
          <Typography variant="h5" color="error" gutterBottom>
            {t('product.notFound')}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {t('product.notFoundDesc')}
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
          >
            {t('product.backToHome')}
          </Button>
        </Card>
      </Box>
    );
  }

  const productName = product.nom;
  const description = productDescriptions[productName] || t('product.defaultDescription');
  const benefits = productBenefits[productName] || [];

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erreur lors du partage:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleDownloadPDF = () => {
    if (product.pdf) {
      window.open(product.pdf, '_blank');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FloatingParticles />
      
      {/* Header avec navigation */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
              sx={{
                background: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              {t('product.back')}
            </Button>
            
            <Typography variant="h6" sx={{ flex: 1 }}>
              {productName}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                onClick={handleFavoriteToggle}
                sx={{
                  color: isFavorite ? theme.palette.error.main : 'inherit',
                }}
              >
                {isFavorite ? t('product.favorite') : t('product.addToFavorites')}
              </Button>
              <Button startIcon={<Share />} onClick={handleShare}>
                {t('product.share')}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Section Image du produit */}
          <Box sx={{ flex: 1 }}>
            <Fade in timeout={800}>
              <Card
                sx={{
                  height: 500,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {product.image ? (
                  <Box
                    component="img"
                    src={getImageUrl(product.image)}
                    alt={productName}
                    sx={{
                      maxWidth: '80%',
                      maxHeight: '80%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))',
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
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    display: product.image ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '4rem',
                  }}
                >
                  <Science />
                </Box>
                
                {/* Badge de qualité */}
                <Chip
                  icon={<Security />}
                  label={t('product.pharmaceuticalQuality')}
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: alpha(theme.palette.primary.main, 0.9),
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              </Card>
            </Fade>
          </Box>

          {/* Section Informations du produit */}
          <Box sx={{ flex: 1 }}>
            <Zoom in timeout={1000}>
              <Box>
                {/* Titre et prix */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontWeight: 700,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2,
                    }}
                  >
                    {productName}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 700,
                      }}
                    >
                      {formatPrice(product.informations?.price_bba || product.price)}
                    </Typography>
                    <Chip
                      label={t('product.bbaPrice')}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                </Box>

                {/* Description */}
                <Card
                  sx={{
                    p: 3,
                    mb: 3,
                    background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {t('product.description')}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {description}
                  </Typography>
                </Card>

                {/* Bénéfices */}
                {benefits.length > 0 && (
                  <Card
                    sx={{
                      p: 3,
                      mb: 3,
                      background: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {t('product.benefits')}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {benefits.map((benefit, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CheckCircle
                            sx={{
                              color: theme.palette.success.main,
                              fontSize: '1.2rem',
                            }}
                          />
                          <Typography variant="body2">{benefit}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Card>
                )}

                {/* Note et certifications */}
                <Card
                  sx={{
                    p: 3,
                    mb: 3,
                    background: alpha(theme.palette.background.paper, 0.8),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        sx={{
                          color: star <= 4 ? theme.palette.warning.main : 'inherit',
                          fontSize: '1.2rem',
                        }}
                      />
                    ))}
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      (4.8/5 - 127 avis)
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<LocalPharmacy />}
                      label={t('product.gmpCertified')}
                      color="success"
                      size="small"
                    />
                    <Chip
                      icon={<CheckCircle />}
                      label={t('product.iso9001')}
                      color="info"
                      size="small"
                    />
                    <Chip
                      label={t('product.glutenFree')}
                      color="secondary"
                      size="small"
                    />
                  </Box>
                </Card>

                {/* Actions */}
                <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <Box sx={{ flex: 1 }}>
                    <AddToCartButton
                      product={product}
                      variant="contained"
                      size="large"
                      fullWidth
                      quantitySelector={true}
                    />
                  </Box>
                  <Button
                    variant="outlined"
                    size="large"
                    fullWidth
                    startIcon={<Download />}
                    onClick={handleDownloadPDF}
                    disabled={!product.pdf}
                    sx={{
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderWidth: 2,
                      borderRadius: 4,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.2)}`,
                      },
                    }}
                  >
                    {t('product.downloadPDF')}
                  </Button>
                </Box>
              </Box>
            </Zoom>
          </Box>
        </Box>

        {/* Section Informations détaillées */}
        <Zoom in timeout={1200}>
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                textAlign: 'center',
                mb: 4,
                fontWeight: 600,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('product.detailedInfo')}
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              <Card
                sx={{
                  flex: 1,
                  p: 3,
                  textAlign: 'center',
                  background: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: 'white',
                  }}
                >
                  <Science sx={{ fontSize: '2rem' }} />
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {t('product.composition')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('product.compositionDesc')}
                </Typography>
              </Card>
              
              <Card
                sx={{
                  flex: 1,
                  p: 3,
                  textAlign: 'center',
                  background: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: 'white',
                  }}
                >
                  <Security sx={{ fontSize: '2rem' }} />
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {t('product.security')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('product.securityDesc')}
                </Typography>
              </Card>
              
              <Card
                sx={{
                  flex: 1,
                  p: 3,
                  textAlign: 'center',
                  background: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    color: 'white',
                  }}
                >
                  <LocalPharmacy sx={{ fontSize: '2rem' }} />
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {t('product.delivery')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('product.deliveryDesc')}
                </Typography>
              </Card>
            </Box>
          </Box>
        </Zoom>
      </Container>
    </Box>
  );
};

export default ProductPage;