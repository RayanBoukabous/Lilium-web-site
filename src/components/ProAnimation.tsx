import React, { useRef, useEffect } from 'react';
import { useSpring, animated, useTrail, useTransition } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

interface ProAnimationProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

export const ProAnimation: React.FC<ProAnimationProps> = ({
  children,
  direction = 'fade',
  delay = 0,
  duration = 800,
  once = true,
  className
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: once,
    rootMargin: '-50px 0px'
  });

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, transform: 'translateY(60px) scale(0.95)' };
      case 'down':
        return { opacity: 0, transform: 'translateY(-60px) scale(0.95)' };
      case 'left':
        return { opacity: 0, transform: 'translateX(60px) scale(0.95)' };
      case 'right':
        return { opacity: 0, transform: 'translateX(-60px) scale(0.95)' };
      case 'scale':
        return { opacity: 0, transform: 'translateY(30px) scale(0.7)' };
      case 'fade':
      default:
        return { opacity: 0, transform: 'scale(0.98)' };
    }
  };

  const getFinalTransform = () => {
    switch (direction) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        return { opacity: 1, transform: 'translateY(0px) translateX(0px) scale(1)' };
      case 'scale':
        return { opacity: 1, transform: 'translateY(0px) scale(1)' };
      case 'fade':
      default:
        return { opacity: 1, transform: 'scale(1)' };
    }
  };

  const springProps = useSpring({
    from: getInitialTransform(),
    to: inView ? getFinalTransform() : getInitialTransform(),
    config: {
      tension: 300,
      friction: 30,
      mass: 1
    },
    delay: delay
  });

  return (
    <animated.div
      ref={ref}
      style={{
        ...springProps,
        willChange: 'transform, opacity'
      }}
      className={className}
    >
      {children}
    </animated.div>
  );
};

// Composant pour les animations en cascade
interface TrailAnimationProps {
  children: React.ReactNode[];
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  once?: boolean;
  className?: string;
}

export const TrailAnimation: React.FC<TrailAnimationProps> = ({
  children,
  direction = 'up',
  delay = 0,
  once = true,
  className
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: once,
    rootMargin: '-50px 0px'
  });

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, transform: 'translateY(40px) scale(0.95)' };
      case 'down':
        return { opacity: 0, transform: 'translateY(-40px) scale(0.95)' };
      case 'left':
        return { opacity: 0, transform: 'translateX(40px) scale(0.95)' };
      case 'right':
        return { opacity: 0, transform: 'translateX(-40px) scale(0.95)' };
      case 'scale':
        return { opacity: 0, transform: 'translateY(20px) scale(0.8)' };
      case 'fade':
      default:
        return { opacity: 0, transform: 'scale(0.95)' };
    }
  };

  const getFinalTransform = () => {
    switch (direction) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        return { opacity: 1, transform: 'translateY(0px) translateX(0px) scale(1)' };
      case 'scale':
        return { opacity: 1, transform: 'translateY(0px) scale(1)' };
      case 'fade':
      default:
        return { opacity: 1, transform: 'scale(1)' };
    }
  };

  const trail = useTrail(children.length, {
    from: getInitialTransform(),
    to: inView ? getFinalTransform() : getInitialTransform(),
    config: {
      tension: 300,
      friction: 30,
      mass: 1
    },
    delay: delay
  });

  return (
    <div ref={ref} className={className}>
      {trail.map((style, index) => (
        <animated.div
          key={index}
          style={{
            ...style,
            willChange: 'transform, opacity'
          }}
        >
          {children[index]}
        </animated.div>
      ))}
    </div>
  );
};

// Composant pour les animations de transition
interface TransitionAnimationProps {
  children: React.ReactNode;
  show: boolean;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  duration?: number;
  className?: string;
}

export const TransitionAnimation: React.FC<TransitionAnimationProps> = ({
  children,
  show,
  direction = 'fade',
  duration = 300,
  className
}) => {
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, transform: 'translateY(30px) scale(0.95)' };
      case 'down':
        return { opacity: 0, transform: 'translateY(-30px) scale(0.95)' };
      case 'left':
        return { opacity: 0, transform: 'translateX(30px) scale(0.95)' };
      case 'right':
        return { opacity: 0, transform: 'translateX(-30px) scale(0.95)' };
      case 'scale':
        return { opacity: 0, transform: 'scale(0.8)' };
      case 'fade':
      default:
        return { opacity: 0, transform: 'scale(0.98)' };
    }
  };

  const getFinalTransform = () => {
    switch (direction) {
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        return { opacity: 1, transform: 'translateY(0px) translateX(0px) scale(1)' };
      case 'scale':
        return { opacity: 1, transform: 'scale(1)' };
      case 'fade':
      default:
        return { opacity: 1, transform: 'scale(1)' };
    }
  };

  const transitions = useTransition(show, {
    from: getInitialTransform(),
    enter: getFinalTransform(),
    leave: getInitialTransform(),
    config: {
      tension: 300,
      friction: 30,
      mass: 1
    }
  });

  return (
    <>
      {transitions((style, item) =>
        item ? (
          <animated.div
            style={{
              ...style,
              willChange: 'transform, opacity'
            }}
            className={className}
          >
            {children}
          </animated.div>
        ) : null
      )}
    </>
  );
};


