import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  useTheme,
  alpha,
  Card,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  ShoppingCart,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Package,
  CheckCircle,
  Truck,
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../services/api';
import { sendOrderEmail, sendConfirmationEmail } from '../services/emailService';
import Toast from './Toast';
import { useTranslation } from '../i18n';

const CartDrawer: React.FC = () => {
  const theme = useTheme();
  const { t, isRTL } = useTranslation();
  const { state, removeFromCart, updateQuantity, clearCart, closeCart } = useCart();

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Algérie',
    message: '',
    acceptPrivacy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = item.product.informations?.price_bba || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.acceptPrivacy) {
      setToastMessage('Veuillez accepter la politique de confidentialité.');
      setShowToast(true);
      return;
    }

    if (state.items.length === 0) {
      setToastMessage('Votre panier est vide.');
      setShowToast(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customer: customerInfo,
        items: state.items.map(item => ({
          productName: item.product.fname,
          productDescription: item.product.nom,
          quantity: item.quantity,
          price: item.product.informations?.price_bba || item.product.price,
          total: (item.product.informations?.price_bba || item.product.price) * item.quantity,
        })),
        total: getTotalPrice(),
        orderDate: new Date().toISOString(),
      };

      const emailSent = await sendOrderEmail(orderData);
      
      if (emailSent) {
        await sendConfirmationEmail(orderData);
        
        setToastMessage('Commande envoyée avec succès ! Nous vous contacterons bientôt.');
        setShowToast(true);
        clearCart();
        closeCart();
        setCustomerInfo({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          postalCode: '',
          country: 'Algérie',
          message: '',
          acceptPrivacy: false,
        });
      } else {
        throw new Error('Erreur lors de l\'envoi de la commande');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setToastMessage('Erreur lors de l\'envoi de la commande. Veuillez réessayer.');
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Drawer
        anchor={isRTL ? "left" : "right"}
        open={state.isOpen}
        onClose={closeCart}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 500, md: 600 },
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
            backdropFilter: 'blur(25px)',
            borderLeft: isRTL ? 'none' : `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
            borderRight: isRTL ? `2px solid ${alpha(theme.palette.primary.main, 0.15)}` : 'none',
            boxShadow: isRTL 
              ? `20px 0 60px ${alpha(theme.palette.common.black, 0.1)}`
              : `-20px 0 60px ${alpha(theme.palette.common.black, 0.1)}`,
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header Ultra Pro */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                p: 4,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 4,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                      color: 'white',
                      boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                      border: `2px solid ${alpha(theme.palette.primary.light, 0.3)}`,
                    }}
                  >
                    <ShoppingCart size={26} />
                  </Box>
                </motion.div>
                <Box>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 800, 
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 0.5,
                    }}
                  >
                    {t('cart.title')}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {state.items.length} {state.items.length === 1 ? 'article' : 'articles'}
                  </Typography>
                </Box>
              </Box>
              
              <IconButton 
                onClick={closeCart}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                  '&:hover': {
                    background: alpha(theme.palette.error.main, 0.2),
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <X size={24} />
              </IconButton>
            </Box>
          </motion.div>

          {/* Contenu principal */}
          <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {state.items.length === 0 ? (
              // Panier vide
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                    p: 6,
                  textAlign: 'center',
                }}
              >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                  <Box
                    sx={{
                        width: 120,
                        height: 120,
                      borderRadius: '50%',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.grey[300], 0.3)} 0%, ${alpha(theme.palette.grey[200], 0.5)} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 4,
                      }}
                    >
                      <ShoppingCart size={48} color={theme.palette.grey[400]} />
                  </Box>
                </motion.div>
                  
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                    Votre panier est vide
                </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 300 }}>
                    Ajoutez des produits à votre panier pour commencer votre commande
                </Typography>
                  
                <Button
                  variant="contained"
                  size="large"
                    onClick={closeCart}
                  sx={{
                      px: 4,
                    py: 2,
                    borderRadius: 4,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                        transform: 'translateY(-2px)',
                    },
                  }}
                >
                    Continuer mes achats
                </Button>
              </Box>
            </motion.div>
          ) : (
              // Panier avec articles
              <Box sx={{ flex: 1, overflow: 'auto' }}>
                {/* Articles du panier */}
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>
                    Articles sélectionnés
                    </Typography>
                  
                  <Stack spacing={3}>
                  {state.items.map((item, index) => (
                    <motion.div
                      key={item.product.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                            p: 3,
                            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                          borderRadius: 4,
                          '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.1)}`,
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <Box sx={{ display: 'flex', gap: 3 }}>
                            {/* Image du produit */}
                            <Box
                              sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 3,
                                background: `linear-gradient(135deg, ${alpha(theme.palette.grey[100], 0.8)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                              }}
                            >
                              <Package size={32} color={theme.palette.primary.main} />
                            </Box>

                            {/* Informations du produit */}
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>
                                {item.product.fname || item.product.nom}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {item.product.nom}
                              </Typography>
                              
                              {/* Prix et quantité */}
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                                  {formatPrice(item.product.informations?.price_bba || item.product.price)}
                                </Typography>
                                
                                {/* Contrôles de quantité */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <IconButton
                                    size="small"
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                sx={{ 
                                      p: 1,
                                      borderRadius: 2,
                                      background: alpha(theme.palette.error.main, 0.1),
                                      color: theme.palette.error.main,
                                  '&:hover': {
                                        background: alpha(theme.palette.error.main, 0.2),
                                  },
                                }}
                              >
                                    <Minus size={16} />
                              </IconButton>
                                  
                                  <Typography variant="h6" sx={{ fontWeight: 700, minWidth: 30, textAlign: 'center' }}>
                                    {item.quantity}
                              </Typography>
                                  
                                  <IconButton
                                    size="small"
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    sx={{
                                      p: 1,
                                      borderRadius: 2,
                                      background: alpha(theme.palette.success.main, 0.1),
                                      color: theme.palette.success.main,
                                      '&:hover': {
                                        background: alpha(theme.palette.success.main, 0.2),
                                      },
                                    }}
                                  >
                                    <Plus size={16} />
                                  </IconButton>
                                  
                                  <IconButton
                                    size="small"
                                    onClick={() => removeFromCart(item.product.id)}
                                    sx={{
                                      p: 1,
                                      borderRadius: 2,
                                      background: alpha(theme.palette.error.main, 0.1),
                                      color: theme.palette.error.main,
                                      ml: 1,
                                      '&:hover': {
                                        background: alpha(theme.palette.error.main, 0.2),
                                      },
                                    }}
                                  >
                                    <Trash2 size={16} />
                                  </IconButton>
                              </Box>
                            </Box>
                            </Box>
                          </Box>
                      </Card>
                    </motion.div>
                  ))}
                  </Stack>
              </Box>

                {/* Formulaire de commande */}
                <Box sx={{ p: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <User size={20} />
                      Informations de livraison
                    </Typography>

                  <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                      {/* Nom et prénom */}
                      <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                          fullWidth
                    label="Prénom *"
                    value={customerInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                  <TextField
                          fullWidth
                    label="Nom *"
                    value={customerInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Box>

                      {/* Email et téléphone */}
                      <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                          fullWidth
                    label="Email *"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    InputProps={{
                            startAdornment: <Mail size={20} style={{ marginRight: 8, color: theme.palette.primary.main }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                  <TextField
                          fullWidth
                    label="Téléphone *"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    InputProps={{
                            startAdornment: <Phone size={20} style={{ marginRight: 8, color: theme.palette.primary.main }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Box>

                      {/* Adresse */}
                <TextField
                        fullWidth
                  label="Adresse *"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                        InputProps={{
                          startAdornment: <MapPin size={20} style={{ marginRight: 8, color: theme.palette.primary.main }} />,
                        }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />

                      {/* Ville et code postal */}
                      <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                          fullWidth
                    label="Ville *"
                    value={customerInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                  <TextField
                          fullWidth
                    label="Code postal"
                    value={customerInfo.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                </Box>

                      {/* Message optionnel */}
                <TextField
                        fullWidth
                  label="Message (optionnel)"
                        multiline
                        rows={3}
                  value={customerInfo.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                        InputProps={{
                          startAdornment: <FileText size={20} style={{ marginRight: 8, color: theme.palette.primary.main, marginTop: 8 }} />,
                        }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                      />
                      
                      {/* Checkbox confidentialité */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={customerInfo.acceptPrivacy}
                        onChange={(e) => handleInputChange('acceptPrivacy', e.target.checked)}
                        sx={{
                              color: theme.palette.primary.main,
                          '&.Mui-checked': {
                                color: theme.palette.primary.main,
                          },
                        }}
                      />
                    }
                        label="J'accepte la politique de confidentialité *"
                        sx={{ alignItems: 'flex-start' }}
                      />
                    </Stack>
                  </form>
                </Box>
              </Box>
            )}
              </Box>

          {/* Footer avec total et bouton de commande */}
          {state.items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              >
              <Box
                    sx={{
                  p: 4,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                  borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                {/* Total */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          Total de la commande:
                        </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 800,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                        {formatPrice(getTotalPrice())}
                      </Typography>
                    </Box>
                
                {/* Informations de livraison */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Truck size={16} color={theme.palette.success.main} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Frais de livraison inclus • Paiement sécurisé
                    </Typography>
                </Box>

                {/* Bouton de commande */}
                  <Button
                  type="submit"
                    fullWidth
                    size="large"
                  variant="contained"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <CheckCircle size={20} />}
                    sx={{
                    py: 2.5,
                    borderRadius: 4,
                      fontSize: '1.1rem',
                    fontWeight: 700,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                        transform: 'translateY(-2px)',
                      boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.4)}`,
                      },
                      '&:disabled': {
                      background: alpha(theme.palette.grey[400], 0.3),
                      color: theme.palette.grey[600],
                      },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                  {isSubmitting ? 'Envoi en cours...' : '✓ Confirmer la commande'}
                  </Button>
                </Box>
              </motion.div>
          )}
        </Box>
      </Drawer>

      {/* Toast de notification */}
      <Toast
        open={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />
    </>
  );
};

export default CartDrawer;