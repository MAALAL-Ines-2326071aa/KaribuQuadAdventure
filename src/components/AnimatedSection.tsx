// src/components/AnimatedSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

// On définit les types d'animations possibles
type AnimationVariant = 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'zoomIn';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number; // <-- On ajoute la propriété pour la durée
  variant?: AnimationVariant;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, delay = 0, duration = 0.6, variant = 'fadeInUp' }) => {
  
  // On définit les propriétés de chaque animation
  const variants = {
    fadeInUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
    },
    fadeInRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
    },
    zoomIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
    }
  };
  
  const selectedVariant = variants[variant];

  return (
    <motion.div
      initial={selectedVariant.initial}
      whileInView={selectedVariant.animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay }} // <-- On utilise la propriété 'duration' ici
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;