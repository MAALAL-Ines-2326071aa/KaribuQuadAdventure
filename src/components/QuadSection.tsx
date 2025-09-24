// src/components/QuadSection.tsx
import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle, Zap, Users } from 'lucide-react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 768) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  return screenSize;
};

const QuadSection: React.FC = () => {
  const { t } = useTranslation();
  const targetRef = useRef<HTMLDivElement>(null);
  const screenSize = useScreenSize();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const getEndPositionX = () => {
    switch (screenSize) {
      case 'mobile': return '25vw';
      case 'tablet': return '22vw';
      case 'desktop': default: return '15vw';
    }
  };
  
  const endPositionX = getEndPositionX();
  const startPosition = screenSize === 'mobile' ? '45vw' : '48vw';
  const animationStart = screenSize === 'mobile' ? 0.2 : 0.3;
  const animationEnd = screenSize === 'mobile' ? 0.5 : 0.6;
  
  const xRight = useTransform(scrollYProgress, [animationStart, animationEnd], [startPosition, endPositionX]);
  const xLeft = useTransform(scrollYProgress, [animationStart, animationEnd], [`-${startPosition}`, `-${endPositionX}`]);
  const shadowScale = useTransform(scrollYProgress, [animationStart, animationEnd], [0.5, 1]);
  const shadowOpacity = useTransform(scrollYProgress, [animationStart, animationEnd], [0.2, 0.5]);

  // ** MODIFICATION : Application de la nouvelle palette de couleurs **
  const features = [
    { icon: <Zap className="w-6 h-6 text-brand-gold" />, title: "Puissance & Fiabilité", text: "Nos quads ATV 450 sont neufs, puissants et entretenus quotidiennement pour votre sécurité." },
    { icon: <CheckCircle className="w-6 h-6 text-brand-green" />, title: "Facile à Piloter", text: "Grâce à leur transmission automatique, la prise en main est simple et intuitive, même pour les débutants." },
    { icon: <Users className="w-6 h-6 text-blue-500" />, title: "Confort pour Deux", text: "Chaque quad est équipé d'une selle biplace confortable pour partager l'aventure en toute sérénité." }
  ];

  const getQuadVerticalPosition = () => {
    switch (screenSize) {
      case 'mobile':
        return 'top-[22%]';
      case 'tablet':
        return 'top-[70%]';
      case 'desktop':
      default:
        return 'top-[62%]';
    }
  };
  const quadVerticalPosition = getQuadVerticalPosition();

  return (
    // ** MODIFICATION : Fond de section 'alabaster' **
    <section 
      ref={targetRef} 
      id="quads" 
      className="relative bg-brand-alabaster py-20 min-h-screen"
    >
      <div className="container mx-auto h-full flex flex-col items-center justify-center overflow-x-hidden">
        
        <div className={`relative z-20 text-center px-4 ${screenSize === 'mobile' ? 'mb-8' : 'mb-16'}`}>
          {/* ** MODIFICATION : Les titres utilisent les polices et couleurs globales ** */}
          <h2 className={`font-bold text-brand-anthracite mb-4 ${screenSize === 'mobile' ? 'text-2xl' : 'text-4xl md:text-5xl'}`}>
            Votre Monture pour l'Aventure
          </h2>
          <p className={`text-gray-600 max-w-3xl mx-auto ${screenSize === 'mobile' ? 'text-base' : 'text-xl'}`}>
            Nous avons choisi des quads modernes et fiables pour une expérience inoubliable en toute sécurité.
          </p>
        </div>
        
        <motion.div 
          style={{ x: xRight }} 
          className={`absolute z-30 ${quadVerticalPosition} ${ screenSize === 'mobile' ? 'w-[28vw] max-w-[100px]' : 'w-[32vw] max-w-sm' }`}
        >
          <img 
            src="/quad1.png" 
            alt="Quad Karibu Adventure - Noir" 
            className="w-[95%] h-auto"
          />
          <motion.div
            className="absolute bottom-0 w-full h-6 bg-black rounded-[50%] blur-md opacity-30"
            style={{ scale: shadowScale, opacity: shadowOpacity }}
          ></motion.div>
        </motion.div>
        
        <motion.div 
          style={{ x: xLeft }} 
          className={`absolute z-30 ${quadVerticalPosition} ${ screenSize === 'mobile' ? 'w-[28vw] max-w-[100px]' : 'w-[32vw] max-w-sm' }`}
        >
          <img src="/quad2.png" alt="Quad Karibu Adventure - Beige" className="w-full h-auto" />
          <motion.div
            className="absolute bottom-0 w-full h-6 bg-black rounded-[50%] blur-md opacity-30"
            style={{ scale: shadowScale, opacity: shadowOpacity }}
          ></motion.div>
        </motion.div>
        
        {/* ** MODIFICATION : Le sol est maintenant de la même couleur que le fond ** */}
        <div className={`absolute bottom-0 left-0 w-full bg-brand-alabaster ${screenSize === 'mobile' ? 'h-[25%]' : 'h-1/3'}`}></div>
        
        <div className={`relative z-20 grid gap-4 mt-auto px-4 ${
          screenSize === 'mobile' 
            ? 'grid-cols-1 mb-8 max-w-xs'
            : 'md:grid-cols-3 gap-8 max-w-5xl'
        }`}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.4 + (index * 0.15),
                ease: "easeOut"
              }}
              // ** MODIFICATION : Style des cartes unifié **
              className={`bg-white rounded-lg shadow-md text-center border border-gray-200 ${
                screenSize === 'mobile' ? 'p-4' : 'p-6'
              }`}
            >
              <div className={`inline-block bg-gray-100 rounded-md mb-3 shadow-inner ${
                screenSize === 'mobile' ? 'p-2' : 'p-3'
              }`}>
                {feature.icon}
              </div>
              <h3 className={`font-bold text-brand-anthracite mb-2 ${
                screenSize === 'mobile' ? 'text-lg' : 'text-xl'
              }`}>
                {feature.title}
              </h3>
              <p className={`text-gray-600 ${
                screenSize === 'mobile' ? 'text-sm' : ''
              }`}>
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuadSection;