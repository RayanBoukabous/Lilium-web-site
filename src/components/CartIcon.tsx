import React from 'react';
import { IconButton, Badge, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartIcon: React.FC = () => {
  const theme = useTheme();
  const { openCart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <IconButton
        onClick={openCart}
        sx={{
          color: 'inherit',
          position: 'relative',
        }}
      >
        <Badge
          badgeContent={totalItems}
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              fontSize: '0.75rem',
              fontWeight: 600,
              minWidth: 18,
              height: 18,
            },
          }}
        >
          <ShoppingCart size={24} />
        </Badge>
        
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              backgroundColor: theme.palette.error.main,
              borderRadius: '50%',
            }}
          />
        )}
      </IconButton>
    </motion.div>
  );
};

export default CartIcon;

