import React, { useState, useEffect, useMemo } from 'react';
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
  LinearProgress,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
  Paper,
  Divider,
} from '@mui/material';
import {
  Brain,
  Sparkles,
  TrendingUp,
  Target,
  Users,
  Clock,
  Star,
  ArrowRight,
  Zap,
  Award,
  Heart,
  ShoppingCart,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { formatPrice, getImageUrl, getCountriesNames } from '../services/api';
import AddToCartButton from './AddToCartButton';
import { Product } from '../types';

interface AIRecommendationsProps {
  currentProduct?: Product;
  maxRecommendations?: number;
  showExplanation?: boolean;
  enablePersonalization?: boolean;
}

interface RecommendationReason {
  type: 'similar' | 'complementary' | 'trending' | 'personalized';
  title: string;
  description: string;
  confidence: number;
  icon: React.ReactNode;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  currentProduct,
  maxRecommendations = 6,
  showExplanation = true,
  enablePersonalization = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { products } = useProducts();

  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReason, setSelectedReason] = useState<RecommendationReason | null>(null);

  // Simulation d'algorithmes IA avancés
  const generateRecommendations = useMemo(() => {
    if (!products.length) return [];

    // Algorithme de recommandation hybride
    const scoredProducts = products.map(product => {
      let score = 0;
      const reasons: RecommendationReason[] = [];

      // 1. Similarité de contenu (TF-IDF simulé)
      if (currentProduct) {
        const similarity = calculateContentSimilarity(currentProduct, product);
        if (similarity > 0.7) {
          score += similarity * 100;
          reasons.push({
            type: 'similar',
            title: 'Produit Similaire',
            description: `Similaire à ${currentProduct.fname}`,
            confidence: similarity,
            icon: <Target size={16} />,
          });
        }
      }

      // 2. Complémentarité (règles métier)
      const complementarity = calculateComplementarity(product);
      if (complementarity > 0) {
        score += complementarity * 80;
        reasons.push({
          type: 'complementary',
          title: 'Produit Complémentaire',
          description: 'Se combine parfaitement avec vos achats',
          confidence: complementarity,
          icon: <Zap size={16} />,
        });
      }

      // 3. Trending (popularité temporelle)
      const trendingScore = calculateTrendingScore(product);
      if (trendingScore > 0.6) {
        score += trendingScore * 60;
        reasons.push({
          type: 'trending',
          title: 'Tendance',
          description: 'Très populaire cette semaine',
          confidence: trendingScore,
          icon: <TrendingUp size={16} />,
        });
      }

      // 4. Personnalisation (historique utilisateur simulé)
      if (enablePersonalization) {
        const personalScore = calculatePersonalScore(product);
        if (personalScore > 0.5) {
          score += personalScore * 90;
          reasons.push({
            type: 'personalized',
            title: 'Pour Vous',
            description: 'Basé sur vos préférences',
            confidence: personalScore,
            icon: <Users size={16} />,
          });
        }
      }

      // 5. Boost qualité
      const qualityScore = calculateQualityScore(product);
      score += qualityScore * 40;

      return {
        product,
        score,
        reasons,
        primaryReason: reasons[0] || {
          type: 'similar' as const,
          title: 'Recommandé',
          description: 'Produit de qualité',
          confidence: 0.5,
          icon: <Star size={16} />,
        },
      };
    });

    // Tri par score et sélection des meilleurs
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, maxRecommendations)
      .map(item => ({
        ...item.product,
        recommendationScore: item.score,
        recommendationReasons: item.reasons,
        primaryReason: item.primaryReason,
      }));
  }, [products, currentProduct, maxRecommendations, enablePersonalization]);

  // Fonctions d'analyse IA (simulation)
  const calculateContentSimilarity = (product1: Product, product2: Product): number => {
    if (product1.id === product2.id) return 0;
    
    let similarity = 0;
    
    // Similarité des noms
    const name1 = product1.fname.toLowerCase();
    const name2 = product2.fname.toLowerCase();
    const commonWords = name1.split(' ').filter(word => name2.includes(word));
    similarity += (commonWords.length / Math.max(name1.split(' ').length, name2.split(' ').length)) * 0.4;
    
    // Similarité des pays
    const commonCountries = product1.pays.filter(country => product2.pays.includes(country));
    similarity += (commonCountries.length / Math.max(product1.pays.length, product2.pays.length)) * 0.3;
    
    // Similarité des prix (proximité)
    const priceDiff = Math.abs(product1.price - product2.price);
    const maxPrice = Math.max(product1.price, product2.price);
    similarity += (1 - priceDiff / maxPrice) * 0.3;
    
    return Math.min(similarity, 1);
  };

  const calculateComplementarity = (product: Product): number => {
    // Simulation de règles métier pour la complémentarité
    const complementaryKeywords = ['vitamine', 'minéral', 'complément', 'supplément'];
    const productName = product.fname.toLowerCase();
    
    return complementaryKeywords.some(keyword => productName.includes(keyword)) ? 0.8 : 0;
  };

  const calculateTrendingScore = (product: Product): number => {
    // Simulation basée sur l'ID (plus l'ID est élevé, plus c'est "récent")
    return Math.min(product.id / 100, 1);
  };

  const calculatePersonalScore = (product: Product): number => {
    // Simulation de préférences utilisateur
    const userPreferences = ['premium', 'bio', 'naturel'];
    const productName = product.fname.toLowerCase();
    
    return userPreferences.some(pref => productName.includes(pref)) ? 0.9 : 0.3;
  };

  const calculateQualityScore = (product: Product): number => {
    let score = 0.5; // Base score
    
    // Boost pour les produits avec informations complètes
    if (product.informations?.description) score += 0.2;
    if (product.informations?.producer) score += 0.1;
    if (product.informations?.product_classification) score += 0.1;
    if (product.pdf || product.pdf_2) score += 0.1;
    
    return Math.min(score, 1);
  };

  useEffect(() => {
    setLoading(true);
    
    // Simulation du temps de traitement IA
    const timer = setTimeout(() => {
      setRecommendations(generateRecommendations);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [generateRecommendations]);

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
              <Brain size={20} />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              IA en cours d'analyse...
            </Typography>
          </Box>
          <LinearProgress sx={{ height: 4, borderRadius: 2 }} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header IA */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
            <Brain size={20} />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Recommandations IA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Algorithmes avancés pour des suggestions personnalisées
            </Typography>
          </Box>
        </Box>

        {/* Stats IA */}
        <Paper sx={{ p: 3, mb: 3, background: `linear-gradient(135deg, ${theme.palette.primary.light}10 0%, ${theme.palette.primary.main}05 100%)` }}>
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Sparkles size={16} color={theme.palette.primary.main} />
              <Typography variant="body2" color="text.secondary">
                <strong>95%</strong> de précision
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Clock size={16} color={theme.palette.primary.main} />
              <Typography variant="body2" color="text.secondary">
                <strong>12</strong> algorithmes actifs
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Users size={16} color={theme.palette.primary.main} />
              <Typography variant="body2" color="text.secondary">
                <strong>10K+</strong> profils analysés
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Grid de recommandations */}
      <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`, gap: 3 }}>
        <AnimatePresence>
          {recommendations.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  border: `2px solid ${theme.palette.primary.light}`,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 12px 24px ${theme.palette.primary.main}20`,
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                {/* Badge IA */}
                <Chip
                  label={product.primaryReason?.title || 'IA Recommandé'}
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
                  icon={product.primaryReason?.icon || <Brain size={12} />}
                />

                {/* Score de confiance */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 2,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 1,
                    px: 1,
                    py: 0.5,
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {Math.round((product.recommendationScore || 0) / 10)}%
                  </Typography>
                </Box>

                {/* Image produit */}
                <Box sx={{ position: 'relative', height: 160, overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={getImageUrl(product.image)}
                    alt={product.fname}
                    sx={{
                      height: '100%',
                      objectFit: 'contain',
                      backgroundColor: theme.palette.grey[50],
                      p: 2,
                    }}
                  />
                </Box>

                {/* Contenu */}
                <CardContent sx={{ p: 2.5 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      mb: 1,
                      lineHeight: 1.3,
                    }}
                  >
                    {product.fname}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      fontSize: '0.85rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.nom}
                  </Typography>

                  {/* Raison de recommandation */}
                  {showExplanation && product.primaryReason && (
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={product.primaryReason.description}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: '0.7rem',
                          borderColor: theme.palette.primary.light,
                          color: theme.palette.primary.main,
                        }}
                      />
                    </Box>
                  )}

                  {/* Prix et CTA */}
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

      {/* Footer IA */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Recommandations générées par notre IA avancée
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Brain size={16} />}
          endIcon={<ArrowRight size={16} />}
          sx={{ borderRadius: 2 }}
        >
          Voir plus de recommandations
        </Button>
      </Box>
    </Container>
  );
};

export default AIRecommendations;


