import React, { useState } from 'react';
import { Button, IconButton, useTheme, Box, Typography, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from '../i18n';
import type { Product } from '../types';

interface AddToCartButtonProps {
  product: Product;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  showQuantity?: boolean;
  fullWidth?: boolean;
  quantitySelector?: boolean;
  onQuantityChange?: (quantity: number) => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  variant = 'contained',
  size = 'medium',
  showQuantity = false,
  fullWidth = false,
  quantitySelector = false,
  onQuantityChange,
}) => {
  const theme = useTheme();
  const { addToCart, state, updateQuantity } = useCart();
  const { t, isRTL } = useTranslation();
  const [isAdded, setIsAdded] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(1);

  const cartItem = state.items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    const qty = quantitySelector ? localQuantity : 1;
    addToCart(product, qty);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    if (onQuantityChange) {
      onQuantityChange(qty);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      // Remove from cart
      updateQuantity(product.id, 0);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleLocalQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setLocalQuantity(newQuantity);
    }
  };

  // Quantity selector for product page
  if (quantitySelector) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}
      >
        {/* Quantity Selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {t('products.quantity')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={() => handleLocalQuantityChange(localQuantity - 1)}
              size="small"
              sx={{
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                width: 40,
                height: 40,
                color: 'primary.main',
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.1),
                  border: `2px solid ${theme.palette.primary.dark}`,
                },
              }}
            >
              <Minus size={18} />
            </IconButton>
            
            <Box
              sx={{
                minWidth: 60,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                borderRadius: 2,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {localQuantity}
              </Typography>
            </Box>
            
            <IconButton
              onClick={() => handleLocalQuantityChange(localQuantity + 1)}
              size="small"
              sx={{
                border: `2px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                width: 40,
                height: 40,
                color: 'primary.main',
                '&:hover': {
                  background: alpha(theme.palette.primary.main, 0.1),
                  border: `2px solid ${theme.palette.primary.dark}`,
                },
              }}
            >
              <Plus size={18} />
            </IconButton>
          </Box>
        </Box>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleAddToCart}
          startIcon={
            isAdded ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Check size={20} />
              </motion.div>
            ) : (
              <ShoppingCart size={20} />
            )
          }
          sx={{
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 700,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #10b981 100%)`,
            boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.3)}`,
            '&:hover': {
              background: `linear-gradient(135deg, #10b981 0%, ${theme.palette.primary.main} 100%)`,
              boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.4)}`,
              transform: 'translateY(-2px)',
            },
            ...(isAdded && {
              backgroundColor: theme.palette.success.main,
              '&:hover': {
                backgroundColor: theme.palette.success.dark,
              },
            }),
          }}
        >
          {isAdded ? t('product.addedToCart') : t('product.addQuantity', { quantity: localQuantity })}
        </Button>
      </motion.div>
    );
  }

  if (showQuantity && quantity > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8 }}
      >
        <IconButton
          onClick={() => handleQuantityChange(quantity - 1)}
          size="small"
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            width: 32,
            height: 32,
          }}
        >
          <Minus size={14} />
        </IconButton>
        
        <motion.div
          key={quantity}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              minWidth: 40,
              height: 32,
              border: `1px solid ${theme.palette.primary.main}`,
              color: 'primary.main',
              fontWeight: 600,
            }}
          >
            {quantity}
          </Button>
        </motion.div>
        
        <IconButton
          onClick={() => handleQuantityChange(quantity + 1)}
          size="small"
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            width: 32,
            height: 32,
          }}
        >
          <Plus size={14} />
        </IconButton>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        onClick={handleAddToCart}
        startIcon={
          isAdded ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Check size={size === 'small' ? 16 : 20} />
            </motion.div>
          ) : (
            <ShoppingCart size={size === 'small' ? 16 : 20} />
          )
        }
        sx={{
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 2,
          ...(isAdded && {
            backgroundColor: theme.palette.success.main,
            '&:hover': {
              backgroundColor: theme.palette.success.dark,
            },
          }),
        }}
      >
        {isAdded ? t('product.addedToCart') : t('common.order')}
      </Button>
    </motion.div>
  );
};

export default AddToCartButton;
