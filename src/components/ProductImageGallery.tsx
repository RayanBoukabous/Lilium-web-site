import React, { useState } from 'react';
import {
  Box,
  Card,
  IconButton,
  useTheme,
  alpha,
  Zoom,
  Fade,
} from '@mui/material';
import {
  ZoomIn,
  ZoomOut,
  Fullscreen,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName,
}) => {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (images.length === 0) {
    return (
      <Card
        sx={{
          height: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '4rem',
          }}
        >
          🧬
        </Box>
      </Card>
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Image principale */}
      <Card
        sx={{
          height: 500,
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderRadius: 4,
          cursor: isZoomed ? 'zoom-out' : 'zoom-in',
        }}
        onClick={handleZoom}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Zoom in timeout={300}>
            <Box
              component="img"
              src={images[currentImageIndex]}
              alt={`${productName} - Image ${currentImageIndex + 1}`}
              sx={{
                maxWidth: isZoomed ? '120%' : '80%',
                maxHeight: isZoomed ? '120%' : '80%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))',
                transition: 'all 0.3s ease',
                transform: isZoomed ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          </Zoom>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    background: alpha(theme.palette.background.paper, 1),
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ChevronLeft />
              </IconButton>
              
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    background: alpha(theme.palette.background.paper, 1),
                    transform: 'translateY(-50%) scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ChevronRight />
              </IconButton>
            </>
          )}

          {/* Contrôles */}
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              display: 'flex',
              gap: 1,
            }}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleZoom();
              }}
              sx={{
                background: alpha(theme.palette.background.paper, 0.9),
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: alpha(theme.palette.background.paper, 1),
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {isZoomed ? <ZoomOut /> : <ZoomIn />}
            </IconButton>
            
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleFullscreen();
              }}
              sx={{
                background: alpha(theme.palette.background.paper, 0.9),
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: alpha(theme.palette.background.paper, 1),
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Fullscreen />
            </IconButton>
          </Box>

          {/* Indicateur d'image */}
          {images.length > 1 && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1,
                background: alpha(theme.palette.background.paper, 0.9),
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                p: 1,
              }}
            >
              {images.map((_, index) => (
                <Box
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: index === currentImageIndex 
                      ? theme.palette.primary.main 
                      : alpha(theme.palette.primary.main, 0.3),
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: theme.palette.primary.main,
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Card>

      {/* Miniatures */}
      {images.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mt: 2,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 4,
            },
            '&::-webkit-scrollbar-track': {
              background: alpha(theme.palette.divider, 0.1),
              borderRadius: 2,
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.primary.main,
              borderRadius: 2,
            },
          }}
        >
          {images.map((image, index) => (
            <Fade in timeout={300} key={index}>
              <Box
                onClick={() => setCurrentImageIndex(index)}
                sx={{
                  minWidth: 80,
                  height: 80,
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: `2px solid ${
                    index === currentImageIndex 
                      ? theme.palette.primary.main 
                      : 'transparent'
                  }`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt={`${productName} - Miniature ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Fade>
          ))}
        </Box>
      )}

      {/* Mode plein écran */}
      {isFullscreen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: alpha(theme.palette.background.default, 0.95),
            backdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
          onClick={handleFullscreen}
        >
          <Box
            component="img"
            src={images[currentImageIndex]}
            alt={`${productName} - Plein écran`}
            onClick={(e) => e.stopPropagation()}
            sx={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: 2,
              boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.3)}`,
            }}
          />
          
          <IconButton
            onClick={handleFullscreen}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: alpha(theme.palette.background.paper, 0.9),
              backdropFilter: 'blur(10px)',
            }}
          >
            <Fullscreen />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default ProductImageGallery;
