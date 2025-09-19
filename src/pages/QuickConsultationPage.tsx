import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  alpha,
  Chip,
  LinearProgress,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Star,
  Heart,
  Brain,
  Shield,
  Zap,
  Target,
  Users,
  Award,
  ShoppingCart,
  RotateCcw,
  MessageCircle
} from 'lucide-react';
import { useTranslation } from '../i18n';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../hooks/useProducts';
import { productDescriptions } from '../data/productDescriptions';
import { formatPrice, getImageUrl } from '../services/api';
import Layout from '../components/Layout';

interface ConsultationAnswer {
  questionId: string;
  answer: string;
}

interface RecommendedProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  matchScore: number;
  benefits: string[];
  category: string;
  recommendationReasons: string[];
}

const QuickConsultationPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<ConsultationAnswer[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'q1',
      title: t('consultation.q1.title'),
      options: [
        { value: 'cardiovascular', label: t('consultation.q1.option1'), icon: Heart },
        { value: 'immune', label: t('consultation.q1.option2'), icon: Shield },
        { value: 'cognitive', label: t('consultation.q1.option3'), icon: Brain },
        { value: 'bone', label: t('consultation.q1.option4'), icon: Target },
        { value: 'vision', label: t('consultation.q1.option5'), icon: Star },
        { value: 'detox', label: t('consultation.q1.option6'), icon: Zap },
        { value: 'fertility-female', label: t('consultation.q1.option7'), icon: Heart },
        { value: 'fertility-male', label: t('consultation.q1.option8'), icon: Users },
      ]
    },
    {
      id: 'q2',
      title: t('consultation.q2.title'),
      options: [
        { value: 'fatigue', label: t('consultation.q2.option1'), icon: Zap },
        { value: 'stress', label: t('consultation.q2.option2'), icon: Brain },
        { value: 'sleep', label: t('consultation.q2.option3'), icon: Star },
        { value: 'joints', label: t('consultation.q2.option4'), icon: Target },
        { value: 'digestive', label: t('consultation.q2.option5'), icon: Heart },
        { value: 'none', label: t('consultation.q2.option6'), icon: CheckCircle },
      ]
    },
    {
      id: 'q3',
      title: t('consultation.q3.title'),
      options: [
        { value: '18-30', label: t('consultation.q3.option1'), icon: Users },
        { value: '31-45', label: t('consultation.q3.option2'), icon: Users },
        { value: '46-60', label: t('consultation.q3.option3'), icon: Users },
        { value: '60+', label: t('consultation.q3.option4'), icon: Users },
      ]
    },
    {
      id: 'q4',
      title: t('consultation.q4.title'),
      options: [
        { value: 'active', label: t('consultation.q4.option1'), icon: Zap },
        { value: 'moderate', label: t('consultation.q4.option2'), icon: Target },
        { value: 'sedentary', label: t('consultation.q4.option3'), icon: Users },
        { value: 'stressed', label: t('consultation.q4.option4'), icon: Brain },
      ]
    },
    {
      id: 'q5',
      title: t('consultation.q5.title'),
      options: [
        { value: 'vegetarian', label: t('consultation.q5.option1'), icon: Heart },
        { value: 'gluten-free', label: t('consultation.q5.option2'), icon: Shield },
        { value: 'lactose-free', label: t('consultation.q5.option3'), icon: Heart },
        { value: 'none', label: t('consultation.q5.option4'), icon: CheckCircle },
      ]
    },
  ];

  const getCurrentAnswer = (questionId: string) => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer?.answer || '';
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== questionId);
      return [...filtered, { questionId, answer }];
    });
  };

  const generateRecommendationReason = (productName: string, answers: ConsultationAnswer[]) => {
    const reasons: string[] = [];
    
    answers.forEach(answer => {
      switch (answer.questionId) {
        case 'q1':
          if (answer.answer === 'cardiovascular' && (productName.includes('FERTIFIT') || productName.includes('DHEA') || productName.includes('ADVAGEN'))) {
            reasons.push(`• ${t('consultation.reasons.cardiovascular')}`);
          }
          if (answer.answer === 'immune' && (productName.includes('YES VIT') || productName.includes('ADVAGEN') || productName.includes('SUB 12'))) {
            reasons.push(`• ${t('consultation.reasons.immune')}`);
          }
          if (answer.answer === 'cognitive' && (productName.includes('SUB 12') || productName.includes('THYROLIB') || productName.includes('YES VIT'))) {
            reasons.push(`• ${t('consultation.reasons.cognitive')}`);
          }
          if (answer.answer === 'bone' && (productName.includes('YES CAL') || productName.includes('MENOLIB') || productName.includes('DHEA'))) {
            reasons.push(`• ${t('consultation.reasons.bone')}`);
          }
          if (answer.answer === 'vision' && (productName.includes('YES VIT') || productName.includes('ADVAGEN'))) {
            reasons.push(`• ${t('consultation.reasons.vision')}`);
          }
          if (answer.answer === 'detox' && (productName.includes('HEPALIB') || productName.includes('DIGEST PLUS') || productName.includes('ADVAGEN'))) {
            reasons.push(`• ${t('consultation.reasons.detox')}`);
          }
          if (answer.answer === 'fertility-female' && (productName.includes('FERTIFIT FEMININ') || productName.includes('SOPK FREE'))) {
            reasons.push(`• ${t('consultation.reasons.fertility-female')}`);
          }
          if (answer.answer === 'fertility-male' && productName.includes('FERTIFIT MASCULIN')) {
            reasons.push(`• ${t('consultation.reasons.fertility-male')}`);
          }
          break;
        case 'q2':
          if (answer.answer === 'fatigue' && (productName.includes('SUB 12') || productName.includes('LILIUM IRON') || productName.includes('YES VIT') || productName.includes('DHEA'))) {
            reasons.push(`• ${t('consultation.reasons.fatigue')}`);
          }
          if (answer.answer === 'stress' && (productName.includes('THYROLIB') || productName.includes('DHEA') || productName.includes('YES VIT'))) {
            reasons.push(`• ${t('consultation.reasons.stress')}`);
          }
          if (answer.answer === 'sleep' && (productName.includes('THYROLIB') || productName.includes('DHEA') || productName.includes('YES VIT'))) {
            reasons.push(`• ${t('consultation.reasons.sleep')}`);
          }
          if (answer.answer === 'joints' && (productName.includes('ANAFLAM') || productName.includes('YES CAL') || productName.includes('DHEA'))) {
            reasons.push(`• ${t('consultation.reasons.joints')}`);
          }
          if (answer.answer === 'digestive' && (productName.includes('DIGEST PLUS') || productName.includes('HEPALIB'))) {
            reasons.push(`• ${t('consultation.reasons.digestive')}`);
          }
          break;
        case 'q3':
          if (answer.answer === '60+' && (productName.includes('YES CAL') || productName.includes('MENOLIB') || productName.includes('ADVAGEN') || productName.includes('DHEA'))) {
            reasons.push(`• ${t('consultation.reasons.age-60+')}`);
          }
          if (answer.answer === '18-30' && (productName.includes('YES VIT') || productName.includes('FERTIFIT') || productName.includes('SUB 12'))) {
            reasons.push(`• ${t('consultation.reasons.age-18-30')}`);
          }
          if (answer.answer === '31-45' && (productName.includes('FERTIFIT') || productName.includes('DHEA') || productName.includes('YES VIT'))) {
            reasons.push(`• ${t('consultation.reasons.age-31-45')}`);
          }
          if (answer.answer === '46-60' && (productName.includes('THYROLIB') || productName.includes('ADVAGEN') || productName.includes('YES VIT'))) {
            reasons.push(`• ${t('consultation.reasons.age-46-60')}`);
          }
          break;
      }
    });
    
    return reasons;
  };

  const calculateRecommendations = () => {
    if (!products || products.length === 0) return [];

    const productScores = products.map(product => {
      let score = 0;
      let benefits: string[] = [];
      const productName = product.fname || product.nom;

      // Logique de scoring basée sur les réponses et les vrais produits
      answers.forEach(answer => {
        switch (answer.questionId) {
          case 'q1':
            // Objectif principal - mapping avec les vrais produits
            if (answer.answer === 'cardiovascular') {
              if (productName.includes('FERTIFIT') || productName.includes('DHEA') || productName.includes('ADVAGEN')) {
                score += 50;
              benefits.push('Soutien cardiovasculaire');
            }
            }
            if (answer.answer === 'immune') {
              if (productName.includes('YES VIT') || productName.includes('ADVAGEN') || productName.includes('SUB 12')) {
                score += 50;
              benefits.push('Renforcement immunitaire');
            }
            }
            if (answer.answer === 'cognitive') {
              if (productName.includes('SUB 12') || productName.includes('THYROLIB') || productName.includes('YES VIT')) {
                score += 50;
              benefits.push('Amélioration cognitive');
            }
            }
            if (answer.answer === 'bone') {
              if (productName.includes('YES CAL') || productName.includes('MENOLIB') || productName.includes('DHEA')) {
                score += 50;
              benefits.push('Renforcement osseux');
            }
            }
            if (answer.answer === 'vision') {
              if (productName.includes('YES VIT') || productName.includes('ADVAGEN')) {
                score += 50;
              benefits.push('Protection oculaire');
            }
            }
            if (answer.answer === 'detox') {
              if (productName.includes('HEPALIB') || productName.includes('DIGEST PLUS') || productName.includes('ADVAGEN')) {
                score += 50;
              benefits.push('Détoxification');
              }
            }
            if (answer.answer === 'fertility-female') {
              if (productName.includes('FERTIFIT FEMININ') || productName.includes('SOPK FREE')) {
                score += 60;
                benefits.push('Optimisation de la fertilité féminine');
              }
            }
            if (answer.answer === 'fertility-male') {
              if (productName.includes('FERTIFIT MASCULIN')) {
                score += 60;
                benefits.push('Optimisation de la fertilité masculine');
              }
            }
            break;
          case 'q2':
            // Problèmes spécifiques - matching plus précis
            if (answer.answer === 'fatigue') {
              if (productName.includes('SUB 12') || productName.includes('LILIUM IRON') || productName.includes('YES VIT') || productName.includes('DHEA')) {
                score += 35;
              benefits.push('Réduction de la fatigue');
            }
            }
            if (answer.answer === 'stress') {
              if (productName.includes('THYROLIB') || productName.includes('DHEA') || productName.includes('YES VIT')) {
                score += 35;
              benefits.push('Gestion du stress');
            }
            }
            if (answer.answer === 'sleep') {
              if (productName.includes('THYROLIB') || productName.includes('DHEA') || productName.includes('YES VIT')) {
                score += 35;
              benefits.push('Amélioration du sommeil');
            }
            }
            if (answer.answer === 'joints') {
              if (productName.includes('ANAFLAM') || productName.includes('YES CAL') || productName.includes('DHEA')) {
                score += 35;
              benefits.push('Soutien articulaire');
            }
            }
            if (answer.answer === 'digestive') {
              if (productName.includes('DIGEST PLUS') || productName.includes('HEPALIB')) {
                score += 35;
              benefits.push('Soutien digestif');
              }
            }
            break;
          case 'q3':
            // Âge - matching plus précis
            if (answer.answer === '60+') {
              if (productName.includes('YES CAL') || productName.includes('MENOLIB') || productName.includes('ADVAGEN') || productName.includes('DHEA')) {
                score += 25;
              benefits.push('Formule adaptée aux seniors');
              }
              // MENOLIB spécifiquement pour les femmes 60+ ou en ménopause
              if (productName.includes('MENOLIB')) {
                score += 10; // Bonus pour les femmes seniors
                benefits.push('Spécialement formulé pour les femmes');
              }
            }
            if (answer.answer === '18-30') {
              if (productName.includes('YES VIT') || productName.includes('FERTIFIT') || productName.includes('SUB 12')) {
                score += 25;
                benefits.push('Formule pour jeunes adultes');
              }
            }
            if (answer.answer === '31-45') {
              if (productName.includes('FERTIFIT') || productName.includes('DHEA') || productName.includes('YES VIT')) {
                score += 25;
                benefits.push('Formule pour adultes actifs');
              }
            }
            if (answer.answer === '46-60') {
              if (productName.includes('THYROLIB') || productName.includes('ADVAGEN') || productName.includes('YES VIT')) {
                score += 25;
                benefits.push('Formule pour prévention');
              }
            }
            break;
          case 'q4':
            // Style de vie
            if (answer.answer === 'active') {
              if (productName.includes('YES VIT') || productName.includes('SUB 12') || productName.includes('DHEA') || productName.includes('FERTIFIT')) {
                score += 20;
                benefits.push('Formule pour personnes actives');
              }
            }
            if (answer.answer === 'stressed') {
              if (productName.includes('MENOLIB') || productName.includes('THYROLIB') || productName.includes('DHEA')) {
                score += 20;
                benefits.push('Gestion du stress');
              }
            }
            if (answer.answer === 'moderate') {
              if (productName.includes('YES VIT') || productName.includes('YES CAL') || productName.includes('ADVAGEN')) {
                score += 20;
                benefits.push('Formule équilibrée');
              }
            }
            if (answer.answer === 'sedentary') {
              if (productName.includes('YES VIT') || productName.includes('DIGEST PLUS') || productName.includes('HEPALIB')) {
                score += 20;
                benefits.push('Formule pour mode de vie sédentaire');
              }
            }
            break;
          case 'q5':
            // Restrictions alimentaires
            if (answer.answer === 'vegetarian') {
              if (productName.includes('YES VIT') || productName.includes('SUB 12') || productName.includes('YES CAL')) {
                score += 15;
                benefits.push('Adapté aux végétariens');
              }
            }
            if (answer.answer === 'gluten-free') {
              if (productName.includes('SUB 12') || productName.includes('YES VIT')) {
                score += 15;
                benefits.push('Sans gluten');
              }
            }
            if (answer.answer === 'lactose-free') {
              if (productName.includes('YES VIT') || productName.includes('SUB 12') || productName.includes('YES CAL')) {
                score += 15;
                benefits.push('Sans lactose');
              }
            }
            break;
        }
      });

      // Logique de pénalité pour éviter les mauvaises recommandations
      // MENOLIB ne devrait pas être recommandé pour les jeunes hommes
      if (productName.includes('MENOLIB')) {
        const hasYoungAge = answers.some(a => a.questionId === 'q3' && (a.answer === '18-30' || a.answer === '31-45'));
        const hasMaleFertility = answers.some(a => a.questionId === 'q1' && a.answer === 'fertility-male');
        if (hasYoungAge || hasMaleFertility) {
          score = Math.max(0, score - 50); // Pénalité importante
        }
      }

      // THYROLIB est mieux pour le sommeil et le stress que MENOLIB
      if (productName.includes('THYROLIB')) {
        const hasSleepIssues = answers.some(a => a.questionId === 'q2' && a.answer === 'sleep');
        const hasStressIssues = answers.some(a => a.questionId === 'q2' && a.answer === 'stress');
        if (hasSleepIssues || hasStressIssues) {
          score += 15; // Bonus pour THYROLIB
        }
      }

      return {
          id: product.id.toString(),
          name: productName,
          description: productDescriptions[productName] || product.nom,
          image: getImageUrl(product.image),
        price: product.price,
        matchScore: score,
        benefits: [...new Set(benefits)],
          category: 'Complément alimentaire',
          recommendationReasons: generateRecommendationReason(productName, answers)
      };
    });

    const scoredProducts = productScores
      .filter(p => p.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    // Si aucun produit n'a de score, on recommande les produits les plus populaires
    if (scoredProducts.length === 0) {
      const fallbackProducts = products
        .slice(0, 3)
        .map(product => ({
          id: product.id.toString(),
          name: product.fname || product.nom,
          description: productDescriptions[product.fname] || product.nom,
          image: getImageUrl(product.image),
          price: product.price,
          matchScore: 10,
          benefits: ['Produit populaire'],
          category: 'Complément alimentaire',
          recommendationReasons: [`• ${t('consultation.reasons.popular')}`]
        }));
      return fallbackProducts;
    }

    return scoredProducts.slice(0, 6);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const recs = calculateRecommendations();
      setRecommendations(recs);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setRecommendations([]);
    setShowResults(false);
  };

  const handleAddToCart = (productId: string) => {
    const product = products?.find(p => p.id.toString() === productId);
    if (product) {
      addToCart(product, 1);
    }
  };

  const handleReadMore = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <Layout>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
          <Container maxWidth="lg">
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Chip
                  label={t('consultation.recommended')}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 3,
                    px: 2,
                    py: 1,
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: 'text.primary',
                  }}
                >
                  {t('consultation.results')}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    mb: 4,
                  }}
                >
                  {t('consultation.resultsDesc')}
                </Typography>
              </Box>
            </motion.div>

            {/* Medical Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card
                sx={{
                  mb: 6,
                  p: 3,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.1)} 0%, ${alpha(theme.palette.warning.main, 0.05)} 100%)`,
                  border: `2px solid ${alpha(theme.palette.warning.main, 0.3)}`,
                  borderRadius: 3,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: '50%',
                      backgroundColor: alpha(theme.palette.warning.main, 0.2),
                      color: theme.palette.warning.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: 40,
                      height: 40,
                    }}
                  >
                    <Shield size={20} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: theme.palette.warning.dark,
                      }}
                    >
                      {t('consultation.disclaimer')}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.6,
                        color: 'text.primary',
                        fontWeight: 500,
                      }}
                    >
                      {t('consultation.disclaimerText')}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </motion.div>

            {/* Recommendations */}
            <Box sx={{ mb: 6 }}>
              {recommendations.map((product, index) => (
                  <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card
                      sx={{
                      mb: 4,
                      overflow: 'hidden',
                      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      borderRadius: 6,
                      boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.08)}`,
                      position: 'relative',
                        '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 24px 64px ${alpha(theme.palette.primary.main, 0.15)}`,
                        borderColor: theme.palette.primary.main,
                      },
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {/* Score de correspondance - Position absolue */}
                    <Box
                              sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          background: `linear-gradient(135deg, ${
                            product.matchScore >= 60 ? theme.palette.success.main : 
                            product.matchScore >= 40 ? theme.palette.warning.main : 
                            theme.palette.info.main
                          } 0%, ${
                            product.matchScore >= 60 ? theme.palette.success.dark : 
                            product.matchScore >= 40 ? theme.palette.warning.dark : 
                            theme.palette.info.dark
                          } 100%)`,
                          color: 'white',
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                          fontWeight: 800,
                          fontSize: '0.9rem',
                          boxShadow: `0 6px 20px ${alpha(
                            product.matchScore >= 60 ? theme.palette.success.main : 
                            product.matchScore >= 40 ? theme.palette.warning.main : 
                            theme.palette.info.main, 0.3
                          )}`,
                          border: '2px solid white',
                          minWidth: 50,
                          textAlign: 'center',
                        }}
                      >
                        {product.matchScore}%
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'white',
                                fontWeight: 600,
                          fontSize: '0.65rem',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                          backgroundColor: alpha(theme.palette.common.black, 0.5),
                          px: 1,
                          py: 0.3,
                          borderRadius: 1.5,
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {t('consultation.match')}
                      </Typography>
                    </Box>

                    {/* Contenu principal */}
                    <Box sx={{ p: 4, pr: { xs: 4, sm: 8 } }}>
                      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
                        {/* Section Image */}
                        <Box sx={{ flex: { xs: '1', lg: '0 0 280px' } }}>
                          <Box
                              sx={{
                              position: 'relative',
                              height: { xs: 250, sm: 300, lg: 280 },
                              borderRadius: 4,
                              overflow: 'hidden',
                              background: `linear-gradient(135deg, ${alpha(theme.palette.grey[50], 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                              border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              p: 3,
                            }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{
                                maxHeight: '100%',
                                maxWidth: '100%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.1))',
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </Box>
                        </Box>

                        {/* Section Contenu */}
                        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                          {/* En-tête du produit */}
                          <Box sx={{ mb: 3 }}>
                        <Typography
                              variant="h4"
                              sx={{
                                fontWeight: 800,
                                mb: 1.5,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                                lineHeight: 1.2,
                              }}
                            >
                              {product.name}
                            </Typography>
                            <Typography
                              variant="body1"
                          color="text.secondary"
                              sx={{ 
                                lineHeight: 1.7, 
                                fontSize: '1rem',
                                mb: 2,
                              }}
                        >
                          {product.description}
                        </Typography>
                          </Box>

                          {/* Pourquoi recommandé */}
                        <Box sx={{ mb: 3 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: theme.palette.primary.main,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                fontSize: '1.1rem',
                              }}
                            >
                              <Target size={22} />
                              {t('consultation.whyRecommended')}
                          </Typography>
                            <Box
                              sx={{
                                p: 3,
                                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                                borderRadius: 3,
                                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                                backdropFilter: 'blur(10px)',
                              }}
                            >
                              {product.recommendationReasons.map((reason, idx) => (
                                <Typography
                                  key={idx}
                                  variant="body2"
                                  sx={{
                                    mb: 1,
                                    lineHeight: 1.6,
                                    color: 'text.primary',
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                  }}
                                >
                                  {reason}
                              </Typography>
                              ))}
                            </Box>
                          </Box>

                          {/* Bénéfices */}
                          <Box sx={{ mb: 4 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                mb: 2,
                                color: 'text.primary',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                fontSize: '1.1rem',
                              }}
                            >
                              <Award size={22} />
                              {t('consultation.benefits')}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                              {product.benefits.map((benefit, idx) => (
                                <Chip
                                  key={idx}
                                  label={benefit}
                                  size="medium"
                                  sx={{
                                    background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.15)} 0%, ${alpha(theme.palette.success.main, 0.08)} 100%)`,
                                    color: theme.palette.success.dark,
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    height: 32,
                                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                                    '&:hover': {
                                      background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.2)} 0%, ${alpha(theme.palette.success.main, 0.12)} 100%)`,
                                    },
                                  }}
                                />
                              ))}
                            </Box>
                        </Box>

                          {/* Prix et Actions */}
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between', 
                            alignItems: { xs: 'stretch', sm: 'center' },
                            gap: 3,
                            mt: 'auto',
                            pt: 3,
                            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          }}>
                            <Box>
                              <Typography
                                variant="h3"
                                sx={{
                                  fontWeight: 800,
                                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                  backgroundClip: 'text',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                  fontSize: { xs: '1.8rem', sm: '2.2rem' },
                                  mb: 0.5,
                                }}
                              >
                                {formatPrice(product.price)}
                          </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ 
                                  fontSize: '0.9rem',
                                  fontWeight: 500,
                                }}
                              >
                                {t('consultation.priceIncluded')}
                              </Typography>
                            </Box>
                            <Box sx={{ 
                              display: 'flex', 
                              flexDirection: { xs: 'column', sm: 'row' },
                              gap: 2,
                              minWidth: { xs: '100%', sm: 'auto' },
                            }}>
                              <Button
                                variant="outlined"
                                size="large"
                                startIcon={<MessageCircle size={20} />}
                                onClick={() => handleReadMore(product.id)}
                                sx={{
                                  borderRadius: 4,
                                  textTransform: 'none',
                                  fontWeight: 700,
                                  px: 4,
                                  py: 2,
                                  fontSize: '1rem',
                                  borderWidth: 2,
                                  borderColor: theme.palette.primary.main,
                                  color: theme.palette.primary.main,
                                  '&:hover': {
                                    borderWidth: 2,
                                    borderColor: theme.palette.primary.dark,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                    transform: 'translateY(-2px)',
                                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                                  },
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                              >
                                {t('consultation.readMore')}
                              </Button>
                          <Button
                            variant="contained"
                                size="large"
                                startIcon={<ShoppingCart size={20} />}
                            onClick={() => handleAddToCart(product.id)}
                            sx={{
                                  borderRadius: 4,
                              textTransform: 'none',
                                  fontWeight: 700,
                                  px: 5,
                                  py: 2,
                                  fontSize: '1rem',
                                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                                  '&:hover': {
                                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                                    transform: 'translateY(-2px)',
                                    boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                                  },
                                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                          >
                            {t('consultation.addToCart')}
                          </Button>
                        </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    </Card>
                  </motion.div>
              ))}
            </Box>

            {/* Actions */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  startIcon={<RotateCcw size={16} />}
                  onClick={handleRestart}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  {t('consultation.restart')}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<MessageCircle size={16} />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  }}
                >
                  {t('consultation.contactCta')}
                </Button>
              </Stack>
            </Box>

            {/* Contact Section */}
            <Card
              sx={{
                p: 4,
                textAlign: 'center',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  {t('consultation.contact')}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {t('consultation.contactDesc')}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight />}
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  }}
                >
                  {t('consultation.contactCta')}
                </Button>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Hero Section */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
            py: { xs: 6, md: 8 },
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Chip
                  label={t('consultation.subtitle')}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 3,
                    px: 2,
                    py: 1,
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 800,
                    mb: 3,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.2,
                  }}
                >
                  {t('consultation.title')}
                </Typography>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    maxWidth: '800px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    mb: 4,
                  }}
                >
                  {t('consultation.hero')}
                </Typography>
              </Box>
            </motion.div>
          </Container>
        </Box>

        {/* Question Section */}
        <Container maxWidth="md" sx={{ py: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Progress */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {t('consultation.progress')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentStep + 1} / {questions.length}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  },
                }}
              />
            </Box>

            {/* Question Card */}
            <Card
              sx={{
                p: 4,
                mb: 4,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    mb: 4,
                    textAlign: 'center',
                    color: 'text.primary',
                  }}
                >
                  {questions[currentStep].title}
                </Typography>

                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <RadioGroup
                    value={getCurrentAnswer(questions[currentStep].id)}
                    onChange={(e) => handleAnswerChange(questions[currentStep].id, e.target.value)}
                    sx={{ gap: 2 }}
                  >
                    {questions[currentStep].options.map((option, index) => (
                      <motion.div
                        key={option.value}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            border: `2px solid ${
                              getCurrentAnswer(questions[currentStep].id) === option.value
                                ? theme.palette.primary.main
                                : alpha(theme.palette.primary.main, 0.2)
                            }`,
                            bgcolor: getCurrentAnswer(questions[currentStep].id) === option.value
                              ? alpha(theme.palette.primary.main, 0.05)
                              : 'transparent',
                            '&:hover': {
                              borderColor: theme.palette.primary.main,
                              bgcolor: alpha(theme.palette.primary.main, 0.05),
                            },
                            transition: 'all 0.3s ease',
                          }}
                          onClick={() => handleAnswerChange(questions[currentStep].id, option.value)}
                        >
                          <FormControlLabel
                            value={option.value}
                            control={<Radio />}
                            label={
                              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                <option.icon size={24} color={theme.palette.primary.main} />
                                <Typography variant="body1" sx={{ ml: 2, fontWeight: 500 }}>
                                  {option.label}
                                </Typography>
                              </Box>
                            }
                            sx={{ width: '100%', m: 0 }}
                          />
                        </Card>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>

            {/* Navigation */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowLeft size={16} />}
                onClick={handlePrevious}
                disabled={currentStep === 0}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                {t('consultation.previous')}
              </Button>

              <Button
                variant="contained"
                endIcon={currentStep === questions.length - 1 ? <CheckCircle size={16} /> : <ArrowRight size={16} />}
                onClick={handleNext}
                disabled={!getCurrentAnswer(questions[currentStep].id)}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                }}
              >
                {currentStep === questions.length - 1 ? t('consultation.finish') : t('consultation.next')}
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Layout>
  );
};

export default QuickConsultationPage;

