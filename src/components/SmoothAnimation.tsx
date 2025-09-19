import React from 'react';
import { ProAnimation } from './ProAnimation';

interface SmoothAnimationProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  className?: string;
  immediate?: boolean;
}

const SmoothAnimation: React.FC<SmoothAnimationProps> = ({
  children,
  delay = 0,
  duration = 800,
  direction = 'up',
  className,
  immediate = false,
}) => {
  return (
    <ProAnimation
      direction={direction}
      delay={immediate ? 0 : delay * 1000}
      duration={duration}
      once={!immediate}
      className={className}
    >
      {children}
    </ProAnimation>
  );
};

export default SmoothAnimation;
