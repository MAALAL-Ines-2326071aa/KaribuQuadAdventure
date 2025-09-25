// src/components/CircuitSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Trees, Users, Heart, Camera, ArrowLeft, ArrowRight, MousePointerClick } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  return isDesktop;
};

const CircuitSection: React.FC = () => {
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  const highlights = [
    { icon: <Waves className="w-8 h-8 text-blue-500" />, title: t('circuit.highlights.beach'), description: t('circuit.highlights.beachDesc'), image: '/circuit/etape-1.jpg' },
    { icon: <Trees className="w-8 h-8 text-brand-green" />, title: t('circuit.highlights.forest'), description: t('circuit.highlights.forestDesc'), image: '/circuit/etape-2.jpg' },
    { icon: <Users className="w-8 h-8 text-brand-gold" />, title: t('circuit.highlights.village'), description: t('circuit.highlights.villageDesc'), image: '/circuit/etape-3.jpg' },
    { icon: <Heart className="w-8 h-8 text-red-500" />, title: t('circuit.highlights.kendwa'), description: t('circuit.highlights.kendwaDesc'), image: '/circuit/etape-4.jpg' },
    { icon: <Camera className="w-8 h-8 text-gray-500" />, title: t('circuit.highlights.private'), description: t('circuit.highlights.privateDesc'), image: '/circuit/etape-5.jpg' }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advanceToNext = () => {
    setDirection(1);
    setFlippedIndex(null);
    setActiveIndex((prev) => (prev === highlights.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setFlippedIndex(null);
    setActiveIndex((prev) => (prev === 0 ? highlights.length - 1 : prev - 1));
  };
  
  const handleCardClick = (index: number) => {
    setFlippedIndex(prev => (prev === index ? null : index));
    setActiveIndex(index); 
  };

  const handleStepClick = (index: number) => {
    if (index > activeIndex) setDirection(1); else setDirection(-1);
    setFlippedIndex(null);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setTimeout(advanceToNext, 4000);
    return () => { if(timerRef.current) clearTimeout(timerRef.current) };
  }, [activeIndex, isHovered]);

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
  };

  return (
    <section id="circuit" className="py-24 md:py-32 bg-brand-alabaster overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <AnimatedSection className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-anthracite mb-4">{t('circuit.title')}</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{t('circuit.subtitle')}</p>
        </AnimatedSection>
        
        {isDesktop ? (
          // --- VUE ORDINATEUR (GRILLE) ---
          <div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 [perspective:1000px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {highlights.map((highlight, index) => {
              const isFlipped = flippedIndex === index || (flippedIndex === null && activeIndex === index);
              
              return (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <div className="relative w-full h-64 cursor-pointer [transform-style:preserve-3d]">
                    <motion.div
                      className="relative w-full h-full [transform-style:preserve-3d]"
                      initial={false}
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                      {/* Face AVANT (clic pour retourner) */}
                      <div className="absolute inset-0 [backface-visibility:hidden]" onClick={() => handleCardClick(index)}>
                        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 w-full h-full">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="p-3 bg-gray-100 rounded-md">{highlight.icon}</div>
                            <div className="bg-brand-green text-white text-sm font-bold px-3 py-1 rounded-md">Étape {index + 1}</div>
                          </div>
                          <h3 className="text-2xl font-bold text-brand-anthracite mb-2">{highlight.title}</h3>
                          <p className="text-gray-600">{highlight.description}</p>
                        </div>
                      </div>
                      {/* Face ARRIÈRE (clic pour passer à la suivante) */}
                      <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]" onClick={advanceToNext}>
                        <div className="bg-black rounded-lg overflow-hidden w-full h-full">
                          <img src={highlight.image} alt={highlight.title} className="w-full h-full object-cover" />
                          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4 w-full"><h4 className="text-white font-bold text-lg">{highlight.title}</h4></div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        ) : (
          // --- VUE MOBILE & TABLETTE (CARROUSEL) ---
          <>
            <div 
              className="relative max-w-xl mx-auto h-72 [perspective:1000px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  className="absolute w-full h-full"
                >
                  <motion.div
                    className="relative w-full h-full [transform-style:preserve-3d] cursor-pointer"
                    initial={false}
                    animate={{ rotateY: flippedIndex === activeIndex ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 [backface-visibility:hidden]" onClick={() => handleCardClick(activeIndex)}>
                      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 w-full h-full">
                        <motion.div 
                          className="absolute bottom-4 right-4 flex items-center space-x-2 text-gray-400 text-xs"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                        >
                          <MousePointerClick size={16} />
                          <span>Cliquez pour voir</span>
                        </motion.div>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="p-3 bg-gray-100 rounded-md">{highlights[activeIndex].icon}</div>
                          <div className="bg-brand-green text-white text-sm font-bold px-3 py-1 rounded-md">Étape {activeIndex + 1}</div>
                        </div>
                        <h3 className="text-2xl font-bold text-brand-anthracite mb-2">{highlights[activeIndex].title}</h3>
                        <p className="text-gray-600">{highlights[activeIndex].description}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]" onClick={advanceToNext}>
                      <div className="bg-black rounded-lg overflow-hidden w-full h-full">
                        <img src={highlights[activeIndex].image} alt={highlights[activeIndex].title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4 w-full">
                          <h4 className="text-white font-bold text-lg">{highlights[activeIndex].title}</h4>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <button onClick={handlePrev} className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 bg-white p-2 rounded-full shadow-md text-brand-anthracite hover:bg-brand-gold hover:text-white transition-all duration-300 z-10"><ArrowLeft size={24} /></button>
              <button onClick={advanceToNext} className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 bg-white p-2 rounded-full shadow-md text-brand-anthracite hover:bg-brand-gold hover:text-white transition-all duration-300 z-10"><ArrowRight size={24} /></button>
            </div>
            
            <div className="flex justify-center flex-wrap gap-3 mt-8">
              {highlights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`px-4 py-2 rounded-md font-semibold text-sm transition-all duration-300 border-2 ${activeIndex === index ? 'bg-brand-green text-white border-brand-green' : 'bg-transparent text-brand-green border-brand-green hover:bg-brand-green hover:text-white'}`}
                >
                  Étape {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CircuitSection;