import React from 'react';
import {
  Snackbar,
  Alert,
  AlertTitle,
  Box,
  Typography,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import {
  CheckCircle,
  ShoppingCart,
  Favorite,
} from '@mui/icons-material';

interface ProductToastProps {
  open: boolean;
  onClose: () => void;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  autoHideDuration?: number;
}

const ProductToast: React.FC<ProductToastProps> = ({
  open,
  onClose,
  type,
  title,
  message,
  action,
  autoHideDuration = 4000,
}) => {
  const theme = useTheme();

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle />;
      case 'info':
        return <ShoppingCart />;
      case 'warning':
        return <Favorite />;
      case 'error':
        return <CheckCircle />;
      default:
        return <CheckCircle />;
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiSnackbarContent-root': {
          minWidth: 300,
        },
      }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        icon={getIcon()}
        sx={{
          width: '100%',
          borderRadius: 2,
          boxShadow: `0 8px 32px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'}`,
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <AlertTitle sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </AlertTitle>
        
        <Typography variant="body2" sx={{ mb: action ? 2 : 0 }}>
          {message}
        </Typography>
        
        {action && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              size="small"
              variant="outlined"
              startIcon={action.icon}
              onClick={action.onClick}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderColor: theme.palette[type].main,
                color: theme.palette[type].main,
                '&:hover': {
                  borderColor: theme.palette[type].dark,
                  backgroundColor: alpha(theme.palette[type].main, 0.1),
                },
              }}
            >
              {action.label}
            </Button>
          </Box>
        )}
      </Alert>
    </Snackbar>
  );
};

export default ProductToast;
