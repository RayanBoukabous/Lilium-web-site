import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Tooltip,
  Fade,
  useTheme,
  useMediaQuery,
  Paper,
  Rating,
  Skeleton,
  Fab,
  alpha,
  Button,
} from '@mui/material';
import {
  Heart,
  HeartOff,
  Eye,
  ShoppingCart,
  MapPin,
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { formatPrice, getImageUrl, getCountriesNames } from '../services/api';
import AddToCartButton from './AddToCartButton';
import type { Product } from '../types';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const ProductCarousel: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const { products, loading, error } = useProducts();

  // États du carrousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [swipeStartX, setSwipeStartX] = useState<number | null>(null);
  const [swipeDeltaX, setSwipeDeltaX] = useState(0);

  // Refs
  const carouselRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<number | null>(null);

  // Configuration du carrousel
  const itemsPerView = isMobile ? 1 : isTablet ? 2 : 3;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  // Animation de transition ultra smooth sans clignotement
  const animateTransition = useCallback((newIndex: number, direction: 'next' | 'prev') => {
    if (isTransitioning || !productsRef.current.length) return;
    
    setIsTransitioning(true);
    
    // Animation ultra smooth avec GSAP
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      }
    });

    // Phase 1: Sortie ultra smooth
    productsRef.current.forEach((productRef, index) => {
      if (productRef) {
        tl.to(productRef, {
          x: direction === 'next' ? -50 : 50,
          opacity: 0.3,
          scale: 0.95,
          duration: 0.3,
          ease: 'power2.out',
          force3D: true,
          willChange: 'transform, opacity'
        }, index * 0.02);
      }
    });

    // Phase 2: Changement d'index (invisible)
    tl.call(() => {
      setCurrentIndex(newIndex);
    });

    // Phase 3: Préparation des nouveaux éléments
    tl.call(() => {
      productsRef.current.forEach((productRef) => {
        if (productRef) {
          gsap.set(productRef, {
            x: direction === 'next' ? 50 : -50,
            opacity: 0.3,
            scale: 0.95,
            willChange: 'transform, opacity'
          });
        }
      });
    });

    // Phase 4: Entrée ultra smooth
    tl.call(() => {
      productsRef.current.forEach((productRef, index) => {
        if (productRef) {
          gsap.to(productRef, {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            force3D: true,
            willChange: 'auto',
            delay: index * 0.05
          });
        }
      });
    });
  }, [isTransitioning]);

  // Handlers swipe tactile (mobile) – fluide sans clignotement
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    const x = e.touches[0].clientX;
    setSwipeStartX(x);
    setSwipeDeltaX(0);
    // petit pulse des cartes
    productsRef.current.forEach((ref) => {
      if (ref) gsap.to(ref, { boxShadow: `0 12px 24px ${theme.palette.primary.main}22`, duration: 0.2 });
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (swipeStartX === null) return;
    const currentX = e.touches[0].clientX;
    const delta = currentX - swipeStartX;
    setSwipeDeltaX(delta);
    productsRef.current.forEach((ref) => {
      if (ref) gsap.set(ref, { x: delta * 0.15, opacity: 1, force3D: true });
    });
  };

  const handleTouchEnd = () => {
    if (swipeStartX === null) return;
    const delta = swipeDeltaX;
    setSwipeStartX(null);
    setSwipeDeltaX(0);
    if (Math.abs(delta) > 50) {
      if (delta < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      // revenir en place
      productsRef.current.forEach((ref) => {
        if (ref) gsap.to(ref, { x: 0, duration: 0.25, ease: 'power2.out' });
      });
    }
  };

  // Navigation
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    animateTransition(newIndex, 'next');
  }, [currentIndex, maxIndex, animateTransition, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    const newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    animateTransition(newIndex, 'prev');
  }, [currentIndex, maxIndex, animateTransition, isTransitioning]);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return;

    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide, products.length]);

  // Animation d'entrée initiale ultra smooth
  useEffect(() => {
    if (!products.length || !productsRef.current.length) return;

    const tl = gsap.timeline();
    
    productsRef.current.forEach((productRef, index) => {
      if (productRef) {
        gsap.set(productRef, {
          opacity: 0,
          y: 30,
          scale: 0.9,
          willChange: 'transform, opacity'
        });

        tl.to(productRef, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          force3D: true,
          willChange: 'auto'
        }, index * 0.08);
      }
    });

    return () => {
      tl.kill();
    };
  }, [products.length]);

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

  // Quick View
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Produits à afficher
  const displayProducts = products.slice(currentIndex, currentIndex + itemsPerView);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
          {[...Array(itemsPerView)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={isMobile ? '100%' : isTablet ? '48%' : '32%'}
              height={400}
              sx={{ borderRadius: 3 }}
            />
          ))}
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
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
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: `
          radial-gradient(circle at 20% 80%, ${alpha(theme.palette.primary.main, 0.10)} 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 50%),
          linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)
        `,
        py: { xs: 6, md: 10 },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, ${alpha(theme.palette.primary.main, 0.8)} 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, ${alpha(theme.palette.primary.main, 0.5)} 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px, 150px 150px',
          animation: 'float 20s ease-in-out infinite',
        }}
      />
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Nos Produits
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Découvrez nos produits premium
          </Typography>
        </motion.div>
      </Box>

      {/* Carrousel Container */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          p: 4,
        }}
      >
        {/* Navigation Buttons */}
        <IconButton
          onClick={prevSlide}
          disabled={isTransitioning}
          sx={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: `${alpha(theme.palette.background.paper, 0.9)}`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            '&:hover': {
              backgroundColor: theme.palette.background.paper,
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <ChevronLeft size={24} />
        </IconButton>

        <IconButton
          onClick={nextSlide}
          disabled={isTransitioning}
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: `${alpha(theme.palette.background.paper, 0.9)}`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            '&:hover': {
              backgroundColor: theme.palette.background.paper,
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <ChevronRight size={24} />
        </IconButton>

        {/* Auto-play Control */}
        <Fab
          size="small"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            backgroundColor: isAutoPlaying ? theme.palette.primary.main : theme.palette.grey[500],
            '&:hover': {
              backgroundColor: isAutoPlaying ? theme.palette.primary.dark : theme.palette.grey[600],
            },
          }}
        >
          {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
        </Fab>

        {/* Products Grid */}
        <Box
          ref={carouselRef}
          sx={{
            display: 'flex',
            gap: 3,
            justifyContent: 'center',
            alignItems: 'stretch',
            minHeight: 450,
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
            touchAction: 'pan-y',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {displayProducts.map((product, index) => (
            <Box
              key={`${product.id}-${currentIndex}-${index}`}
              ref={(el: HTMLDivElement | null) => {
                if (el) productsRef.current[index] = el;
              }}
              sx={{
                flex: `0 0 ${isMobile ? '100%' : isTablet ? '48%' : '32%'}`,
                maxWidth: isMobile ? '100%' : isTablet ? '48%' : '32%',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                willChange: 'transform, opacity',
              }}
            >
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    border: `2px solid ${alpha(theme.palette.primary.main, 0.25)}`,
                    borderRadius: 4,
                    background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.04)} 100%)`,
                    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
                    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform, box-shadow',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.01)',
                      boxShadow: `0 16px 32px ${alpha(theme.palette.primary.main, 0.25)}`,
                      borderColor: alpha(theme.palette.primary.main, 0.7),
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
                      top: 16,
                      left: 16,
                      zIndex: 2,
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                    icon={<Award size={12} />}
                  />

                  {/* Wishlist Button */}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 2,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        backgroundColor: 'white',
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                  >
                    {wishlist.has(product.id) ? (
                      <Heart size={18} fill={theme.palette.error.main} color={theme.palette.error.main} />
                    ) : (
                      <HeartOff size={18} />
                    )}
                  </IconButton>

                  {/* Product Image */}
                  <Box sx={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      image={getImageUrl(product.image)}
                      alt={product.fname}
                      sx={{
                        height: '100%',
                        objectFit: 'contain',
                        backgroundColor: alpha(theme.palette.text.primary, 0.05),
                        p: 2,
                        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        willChange: 'transform',
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
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                          p: 2,
                          display: 'flex',
                          gap: 1,
                          justifyContent: 'center',
                        }}
                      >
                        <Tooltip title="Aperçu rapide">
                          <IconButton
                            size="small"
                            sx={{ backgroundColor: `${alpha(theme.palette.background.paper, 0.9)}` }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openQuickView(product);
                            }}
                          >
                            <Eye size={16} />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Ajouter au panier">
                          <IconButton
                            size="small"
                            sx={{ backgroundColor: `${alpha(theme.palette.background.paper, 0.9)}` }}
                          >
                            <ShoppingCart size={16} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Fade>
                  </Box>

                  {/* Product Info */}
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.1rem',
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
                          fontSize: '0.7rem',
                          height: 22,
                          backgroundColor: theme.palette.grey[100],
                        }}
                        icon={<MapPin size={12} />}
                      />
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        fontSize: '0.9rem',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {product.nom}
                    </Typography>

                    {/* Rating */}
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
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                          fontSize: '1.3rem',
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

                    {/* Voir plus */}
                    <Box sx={{ mt: 2, textAlign: 'right' }}>
                      <Button
                        component={Link}
                        to={`/product/${product.id}`}
                        variant="text"
                        size="small"
                        sx={{ fontWeight: 600, color: theme.palette.primary.main, textTransform: 'none' }}
                      >
                        Voir plus
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
            </Box>
          ))}
        </Box>

        {/* Dots Indicator */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                if (index !== currentIndex && !isTransitioning) {
                  const direction = index > currentIndex ? 'next' : 'prev';
                  animateTransition(index, direction);
                }
              }}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? theme.palette.primary.main : theme.palette.grey[300],
                cursor: isTransitioning ? 'default' : 'pointer',
                transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform, background-color',
                '&:hover': {
                  backgroundColor: index === currentIndex ? theme.palette.primary.dark : theme.palette.grey[400],
                  transform: 'scale(1.1)',
                },
              }}
            />
          ))}
        </Box>
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
              padding: 16,
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
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Box>
  );
};

export default ProductCarousel;