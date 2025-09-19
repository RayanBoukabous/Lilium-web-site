import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

interface PremiumAnimationsProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  type?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideIn' | 'bounceIn' | 'rotateIn';
  className?: string;
}

const PremiumAnimations: React.FC<PremiumAnimationsProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  type = 'fadeInUp',
  className,
}) => {
  const getVariants = () => {
    const baseTransition = {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1], // Premium easing
    };

    switch (type) {
      case 'fadeInUp':
        return {
          hidden: { 
            opacity: 0, 
            y: 60,
            scale: 0.95,
            filter: 'blur(10px)'
          },
          visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: baseTransition
          }
        };
      case 'fadeInLeft':
        return {
          hidden: { 
            opacity: 0, 
            x: -80,
            scale: 0.9,
            rotateY: -15
          },
          visible: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            rotateY: 0,
            transition: baseTransition
          }
        };
      case 'fadeInRight':
        return {
          hidden: { 
            opacity: 0, 
            x: 80,
            scale: 0.9,
            rotateY: 15
          },
          visible: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            rotateY: 0,
            transition: baseTransition
          }
        };
      case 'scaleIn':
        return {
          hidden: { 
            opacity: 0, 
            scale: 0.3,
            rotateZ: -10,
            filter: 'blur(20px)'
          },
          visible: { 
            opacity: 1, 
            scale: 1,
            rotateZ: 0,
            filter: 'blur(0px)',
            transition: {
              ...baseTransition,
              type: "spring",
              stiffness: 100,
              damping: 15
            }
          }
        };
      case 'slideIn':
        return {
          hidden: { 
            opacity: 0, 
            y: 100,
            rotateX: -30
          },
          visible: { 
            opacity: 1, 
            y: 0,
            rotateX: 0,
            transition: {
              ...baseTransition,
              type: "spring",
              stiffness: 80,
              damping: 20
            }
          }
        };
      case 'bounceIn':
        return {
          hidden: { 
            opacity: 0, 
            scale: 0.1,
            rotateZ: -180
          },
          visible: { 
            opacity: 1, 
            scale: 1,
            rotateZ: 0,
            transition: {
              ...baseTransition,
              type: "spring",
              stiffness: 200,
              damping: 10
            }
          }
        };
      case 'rotateIn':
        return {
          hidden: { 
            opacity: 0, 
            scale: 0.5,
            rotateZ: -90,
            y: 50
          },
          visible: { 
            opacity: 1, 
            scale: 1,
            rotateZ: 0,
            y: 0,
            transition: {
              ...baseTransition,
              type: "spring",
              stiffness: 120,
              damping: 15
            }
          }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: baseTransition
          }
        };
    }
  };

  return (
    <motion.div
      className={className}
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      {children}
    </motion.div>
  );
};

export default PremiumAnimations;
