import React from 'react';
import { motion, MotionProps } from 'motion/react';

export const SCROLL_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
export const SCROLL_REVEAL_DURATION = 0.65;
export const SCROLL_REVEAL_STAGGER = 0.08;

export type ScrollAnimationVariant = 
  | 'fade-up' 
  | 'scale-up' 
  | 'slide-left' 
  | 'slide-right' 
  | 'blur-reveal'
  | 'zoom-in';

export interface ScrollRevealProps extends Omit<MotionProps, 'variant' | 'initial' | 'whileInView' | 'transition'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  variant?: ScrollAnimationVariant;
  yOffset?: number;
  viewportMargin?: string;
  once?: boolean;
}

const getVariantInitial = (variant: string = 'fade-up', yOffset: number = 30) => {
  switch (variant) {
    case 'scale-up':
      return { opacity: 0, scale: 0.94, y: 24 };
    case 'zoom-in':
      return { opacity: 0, scale: 0.92 };
    case 'slide-left':
      return { opacity: 0, x: 40 };
    case 'slide-right':
      return { opacity: 0, x: -40 };
    case 'blur-reveal':
      return { opacity: 0, filter: 'blur(10px)', y: 28 };
    case 'fade-up':
    default:
      return { opacity: 0, y: yOffset };
  }
};

const getVariantTarget = (variant: string = 'fade-up') => {
  switch (variant) {
    case 'scale-up':
    case 'zoom-in':
      return { opacity: 1, scale: 1, y: 0 };
    case 'slide-left':
    case 'slide-right':
      return { opacity: 1, x: 0 };
    case 'blur-reveal':
      return { opacity: 1, filter: 'blur(0px)', y: 0 };
    case 'fade-up':
    default:
      return { opacity: 1, y: 0 };
  }
};

/**
 * Standardized Staggered Scroll Reveal Component with Luxury Animation Styles
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = SCROLL_REVEAL_DURATION,
  className = '',
  variant = 'fade-up',
  yOffset = 30,
  viewportMargin = '-40px',
  once = true,
  ...props
}) => {
  return (
    <motion.div
      initial={getVariantInitial(variant, yOffset)}
      whileInView={getVariantTarget(variant)}
      viewport={{ once, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: SCROLL_REVEAL_EASE,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface ScrollRevealGroupProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  viewportMargin?: string;
}

const containerVariants = (stagger: number) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.05,
    },
  },
});

const itemVariants = (yOffset: number) => ({
  hidden: { opacity: 0, y: yOffset, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: SCROLL_REVEAL_DURATION,
      ease: SCROLL_REVEAL_EASE,
    },
  },
});

export const ScrollRevealGroup: React.FC<ScrollRevealGroupProps> = ({
  children,
  staggerDelay = SCROLL_REVEAL_STAGGER,
  className = '',
  viewportMargin = '-40px',
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={containerVariants(staggerDelay)}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}> = ({ children, className = '', yOffset = 25 }) => {
  return (
    <motion.div variants={itemVariants(yOffset)} className={className}>
      {children}
    </motion.div>
  );
};
