// src/components/CircuitSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Waves, Trees, Users, Heart, Camera } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const CircuitSection: React.FC = () => {
  const { t } = useTranslation();

  // On harmonise les couleurs des icônes avec la nouvelle DA
  const highlights = [
    { icon: <Waves className="w-8 h-8 text-blue-500" />, title: t('circuit.highlights.beach'), description: t('circuit.highlights.beachDesc'), image: '/circuit/etape-1.jpg' },
    { icon: <Trees className="w-8 h-8 text-brand-green" />, title: t('circuit.highlights.forest'), description: t('circuit.highlights.forestDesc'), image: '/circuit/etape-2.jpg' },
    { icon: <Users className="w-8 h-8 text-brand-gold" />, title: t('circuit.highlights.village'), description: t('circuit.highlights.villageDesc'), image: '/circuit/etape-3.jpg' },
    { icon: <Heart className="w-8 h-8 text-red-500" />, title: t('circuit.highlights.kendwa'), description: t('circuit.highlights.kendwaDesc'), image: '/circuit/etape-4.jpg' },
    { icon: <Camera className="w-8 h-8 text-gray-500" />, title: t('circuit.highlights.private'), description: t('circuit.highlights.privateDesc'), image: '/circuit/etape-5.jpg' }
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advanceToNextCard = () => {
    setActiveIndex(prevIndex => (prevIndex >= highlights.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    if (hoveredIndex !== null) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(advanceToNextCard, 3000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, hoveredIndex, highlights.length]);

  const handleFrontClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleBackClick = () => {
    advanceToNextCard();
  };

  return (
    // On utilise le fond 'alabaster' et on ajoute un padding plus généreux
    <section id="circuit" className="py-24 md:py-32 bg-brand-alabaster overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <AnimatedSection className="text-center mb-20">
          {/* Les titres utilisent maintenant la police 'font-serif' automatiquement */}
          <h2 className="text-4xl md:text-6xl font-bold text-brand-anthracite mb-4">
            {t('circuit.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('circuit.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 [perspective:1000px]">
          {highlights.map((highlight, index) => {
            const isFlipped = index === activeIndex;
            const isScaled = hoveredIndex === index;

            return (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative w-full h-64 cursor-pointer [transform-style:preserve-3d]"
                  style={{ zIndex: isScaled ? 10 : 1 }}
                >
                  <motion.div
                    className="relative w-full h-full [transform-style:preserve-3d]"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    {/* Face AVANT : Style mis à jour */}
                    <div
                      onClick={() => handleFrontClick(index)}
                      className="absolute inset-0 bg-white rounded-lg p-6 shadow-md border border-gray-200 [backface-visibility:hidden]"
                      style={{ transform: 'translateZ(0)' }} 
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-gray-100 rounded-md">
                          {highlight.icon}
                        </div>
                        <div className="bg-brand-green text-white text-sm font-bold px-3 py-1 rounded-md">
                          Étape {index + 1}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-brand-anthracite mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-600">
                        {highlight.description}
                      </p>
                    </div>

                    {/* Face ARRIÈRE */}
                    <div
                      onClick={handleBackClick}
                      className="absolute inset-0 bg-black rounded-lg overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]"
                    >
                      <img src={highlight.image} alt={highlight.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4 w-full">
                        <h4 className="text-white font-bold text-lg">{highlight.title}</h4>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CircuitSection;