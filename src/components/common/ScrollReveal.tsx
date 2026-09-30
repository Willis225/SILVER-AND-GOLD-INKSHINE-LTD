import React from 'react';
import { motion, MotionProps } from 'motion/react';

export const SCROLL_REVEAL_EASE = [0.16, 1, 0.3, 1] as const;
export const SCROLL_REVEAL_DURATION = 0.6;
export const SCROLL_REVEAL_STAGGER = 0.08;

export interface ScrollRevealProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
  viewportMargin?: string;
  as?: keyof typeof motion;
}

/**
 * Standardized Staggered Scroll Reveal Component
 * - Flow: translateY(30px) -> 0 + opacity: 0 -> 1
 * - Duration: 600ms
 * - Easing: cubic-bezier(0.16, 1, 0.3, 1)
 * - Performance: Animates ONLY transform + opacity (zero layout shift)
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  className = '',
  yOffset = 30,
  viewportMargin = '-40px',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: viewportMargin }}
      transition={{
        duration: SCROLL_REVEAL_DURATION,
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
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
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
  viewportMargin = '-50px',
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
}> = ({ children, className = '', yOffset = 30 }) => {
  return (
    <motion.div variants={itemVariants(yOffset)} className={className}>
      {children}
    </motion.div>
  );
};
