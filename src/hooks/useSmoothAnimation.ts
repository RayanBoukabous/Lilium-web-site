import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export interface AnimationConfig {
    duration?: number;
    delay?: number;
    ease?: string;
    stagger?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
    trigger?: boolean;
}

export const useSmoothAnimation = (config: AnimationConfig = {}) => {
    const elementRef = useRef<HTMLElement>(null);
    const {
        duration = 0.8,
        delay = 0,
        ease = 'power2.out',
        stagger = 0,
        direction = 'fade',
        trigger = true
    } = config;

    useEffect(() => {
        if (!elementRef.current) return;

        const element = elementRef.current;

        // Configuration initiale selon la direction
        const initialProps = getInitialProps(direction);

        // Appliquer les propriétés initiales
        gsap.set(element, initialProps);

        // Animation d'entrée
        const animation = gsap.to(element, {
            ...getTargetProps(direction),
            duration,
            delay,
            ease,
            stagger,
            immediateRender: false,
            force3D: true,
            willChange: 'transform, opacity'
        });

        // Nettoyage
        return () => {
            animation.kill();
        };
    }, [duration, delay, ease, stagger, direction, trigger]);

    return elementRef;
};

const getInitialProps = (direction: string) => {
    switch (direction) {
        case 'up':
            return { opacity: 0, y: 60, scale: 0.95 };
        case 'down':
            return { opacity: 0, y: -60, scale: 0.95 };
        case 'left':
            return { opacity: 0, x: 60, scale: 0.95 };
        case 'right':
            return { opacity: 0, x: -60, scale: 0.95 };
        case 'scale':
            return { opacity: 0, scale: 0.7, y: 30 };
        case 'fade':
        default:
            return { opacity: 0, scale: 0.98 };
    }
};

const getTargetProps = (direction: string) => {
    switch (direction) {
        case 'up':
        case 'down':
        case 'left':
        case 'right':
            return { opacity: 1, x: 0, y: 0, scale: 1 };
        case 'scale':
            return { opacity: 1, scale: 1, y: 0 };
        case 'fade':
        default:
            return { opacity: 1, scale: 1 };
    }
};

// Hook pour les animations de scroll
export const useScrollAnimation = (config: AnimationConfig = {}) => {
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const element = elementRef.current;
        const {
            duration = 0.8,
            delay = 0,
            ease = 'power2.out',
            direction = 'fade'
        } = config;

        const initialProps = getInitialProps(direction);
        gsap.set(element, initialProps);

        const animation = gsap.to(element, {
            ...getTargetProps(direction),
            duration,
            delay,
            ease,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
                once: true
            },
            immediateRender: false,
            force3D: true
        });

        return () => {
            animation.kill();
        };
    }, [config]);

    return elementRef;
};

// Hook pour les animations de timeline
export const useTimelineAnimation = () => {
    const timelineRef = useRef<gsap.core.Timeline>();

    useEffect(() => {
        timelineRef.current = gsap.timeline({
            defaults: {
                ease: 'power2.out',
                force3D: true
            }
        });

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill();
            }
        };
    }, []);

    return timelineRef;
};


