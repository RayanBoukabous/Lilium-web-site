import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Rating,
  Avatar,
  Chip,
  Button,
  TextField,
  Grid,
  Divider,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ThumbUp,
  ThumbDown,
  Reply,
  MoreVert,
  Star,
  Verified,
  CalendarToday,
} from '@mui/icons-material';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  replies?: Reply[];
}

interface Reply {
  id: number;
  author: string;
  date: string;
  comment: string;
  isOfficial: boolean;
}

interface ProductReviewsProps {
  productName: string;
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productName,
  reviews = [],
  averageRating = 4.8,
  totalReviews = 127,
}) => {
  const theme = useTheme();
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    author: '',
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Données d'exemple si aucune review n'est fournie
  const defaultReviews: Review[] = [
    {
      id: 1,
      author: 'Marie L.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent produit ! J\'ai remarqué une amélioration significative de mon bien-être après seulement 2 semaines d\'utilisation. La qualité est au rendez-vous.',
      verified: true,
      helpful: 12,
      notHelpful: 1,
      replies: [
        {
          id: 1,
          author: 'Lilium Pharma',
          date: '2024-01-16',
          comment: 'Merci pour votre retour positif ! Nous sommes ravis que notre produit vous apporte satisfaction.',
          isOfficial: true,
        },
      ],
    },
    {
      id: 2,
      author: 'Jean-Pierre M.',
      rating: 4,
      date: '2024-01-10',
      comment: 'Très bon complément alimentaire. L\'absorption est optimale et je ne ressens aucun effet secondaire. Je recommande !',
      verified: true,
      helpful: 8,
      notHelpful: 0,
    },
    {
      id: 3,
      author: 'Sophie D.',
      rating: 5,
      date: '2024-01-08',
      comment: 'Produit de qualité pharmaceutique comme promis. L\'emballage est soigné et les gélules sont faciles à avaler. Résultats visibles rapidement.',
      verified: false,
      helpful: 15,
      notHelpful: 2,
    },
    {
      id: 4,
      author: 'Pierre R.',
      rating: 4,
      date: '2024-01-05',
      comment: 'Bon rapport qualité-prix. Le produit correspond à mes attentes et la livraison a été rapide. Je vais probablement recommander.',
      verified: true,
      helpful: 6,
      notHelpful: 1,
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 2, percentage: 2 },
  ];

  const handleSubmitReview = () => {
    if (newReview.comment.trim() && newReview.author.trim()) {
      // Ici, vous pourriez envoyer la review à votre API
      console.log('Nouvelle review:', newReview);
      setNewReview({ rating: 5, comment: '', author: '' });
      setShowReviewForm(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card
      sx={{
        background: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* En-tête des avis */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Avis Clients
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                  {averageRating}
                </Typography>
                <Rating
                  value={averageRating}
                  precision={0.1}
                  readOnly
                  size="large"
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Basé sur {totalReviews} avis
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Box>
                {ratingDistribution.map((rating) => (
                  <Box key={rating.stars} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: 20 }}>
                      {rating.stars}
                    </Typography>
                    <Star sx={{ color: theme.palette.warning.main, fontSize: '1rem', mx: 1 }} />
                    <Box
                      sx={{
                        flex: 1,
                        height: 8,
                        background: alpha(theme.palette.divider, 0.2),
                        borderRadius: 4,
                        mx: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          width: `${rating.percentage}%`,
                          height: '100%',
                          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                          borderRadius: 4,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 30 }}>
                      {rating.count}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Formulaire d'avis */}
        {!showReviewForm ? (
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Button
              variant="contained"
              onClick={() => setShowReviewForm(true)}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Laisser un avis
            </Button>
          </Box>
        ) : (
          <Card sx={{ p: 3, mb: 4, background: alpha(theme.palette.primary.main, 0.05) }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Votre avis sur {productName}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Note
              </Typography>
              <Rating
                value={newReview.rating}
                onChange={(_, value) => setNewReview({ ...newReview, rating: value || 5 })}
                size="large"
              />
            </Box>
            
            <TextField
              fullWidth
              label="Votre nom"
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Votre commentaire"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              sx={{ mb: 2 }}
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                onClick={handleSubmitReview}
                disabled={!newReview.comment.trim() || !newReview.author.trim()}
              >
                Publier l'avis
              </Button>
              <Button
                variant="outlined"
                onClick={() => setShowReviewForm(false)}
              >
                Annuler
              </Button>
            </Box>
          </Card>
        )}

        {/* Liste des avis */}
        <Box>
          {displayReviews.map((review, index) => (
            <Box key={review.id} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    color: 'white',
                    fontWeight: 600,
                  }}
                >
                  {review.author.charAt(0).toUpperCase()}
                </Avatar>
                
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {review.author}
                    </Typography>
                    {review.verified && (
                      <Tooltip title="Achat vérifié">
                        <Verified sx={{ color: theme.palette.success.main, fontSize: '1rem' }} />
                      </Tooltip>
                    )}
                    <Chip
                      label={formatDate(review.date)}
                      size="small"
                      icon={<CalendarToday sx={{ fontSize: '0.8rem' }} />}
                      sx={{ ml: 'auto' }}
                    />
                  </Box>
                  
                  <Rating value={review.rating} readOnly size="small" sx={{ mb: 1 }} />
                  
                  <Typography variant="body1" paragraph>
                    {review.comment}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton size="small">
                        <ThumbUp sx={{ fontSize: '1rem' }} />
                      </IconButton>
                      <Typography variant="body2" color="text.secondary">
                        {review.helpful}
                      </Typography>
                    </Box>
                    
                    <IconButton size="small">
                      <ThumbDown sx={{ fontSize: '1rem' }} />
                    </IconButton>
                    
                    <IconButton size="small">
                      <Reply sx={{ fontSize: '1rem' }} />
                    </IconButton>
                    
                    <IconButton size="small" sx={{ ml: 'auto' }}>
                      <MoreVert sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Box>
                  
                  {/* Réponses */}
                  {review.replies && review.replies.length > 0 && (
                    <Box sx={{ mt: 2, pl: 2, borderLeft: `2px solid ${alpha(theme.palette.primary.main, 0.2)}` }}>
                      {review.replies.map((reply) => (
                        <Box key={reply.id} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {reply.author}
                            </Typography>
                            {reply.isOfficial && (
                              <Chip
                                label="Réponse officielle"
                                size="small"
                                color="primary"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            )}
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(reply.date)}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {reply.comment}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
              
              {index < displayReviews.length - 1 && <Divider sx={{ mt: 3 }} />}
            </Box>
          ))}
        </Box>

        {/* Bouton pour voir plus d'avis */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="outlined" size="large">
            Voir tous les avis ({totalReviews})
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductReviews;
