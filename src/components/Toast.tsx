import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  open,
  onClose,
  message,
  type = 'info',
  title,
  duration = 4000,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{
              '& .MuiSnackbarContent-root': {
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              },
            }}
          >
            <Alert
              onClose={onClose}
              severity={type}
              variant="filled"
              sx={{
                borderRadius: 3,
                minWidth: 300,
                '& .MuiAlert-message': {
                  width: '100%',
                },
              }}
            >
              {title && <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>}
              {message}
            </Alert>
          </Snackbar>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

