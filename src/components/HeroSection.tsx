// src/components/HeroSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, Users } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  const scrollToReservation = () => {
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center justify-center">
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source 
          src="https://res.cloudinary.com/dezkc2gko/video/upload/v1746868299/QuadSite_axrckg.mp4" 
          type="video/mp4" 
        />
        Votre navigateur ne supporte pas les vidéos.
      </video>

      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        
        <AnimatedSection variant="zoomIn" duration={1.2}>
          <div className="text-center max-w-4xl text-white">
            
            {/* ** MODIFICATION 1 : Taille du titre responsive ** */}
            <h1 className="text-4xl leading-tight sm:text-5xl md:text-7xl font-bold mb-4">
              {t('hero.title')}
            </h1>
            
            {/* ** MODIFICATION 2 : Taille du sous-titre responsive ** */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10">
              {t('hero.subtitle')}
            </p>

            {/* ** MODIFICATION 3 : Les infos clés passent en colonne sur mobile ** */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-y-3 gap-x-6 text-sm text-white/70 mb-10">
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Hotel Riu Jambo</span>
              </div>
              {/* Le séparateur n'apparaît que sur les grands écrans */}
              <div className="hidden sm:block">|</div>
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>{t('hero.open247')}</span>
              </div>
              <div className="hidden sm:block">|</div>
              <div className="flex items-center space-x-2">
                <Users size={16} />
                <span>{t('hero.multilingualGuides')}</span>
              </div>
            </div>

            <button
              onClick={scrollToReservation}
              className="group bg-brand-gold text-brand-anthracite px-10 py-4 rounded-md font-bold text-lg hover:bg-opacity-90 transition-all duration-300 shadow-2xl"
            >
              <span className="flex items-center space-x-2">
                <span>{t('hero.reserveNow')}</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
            
          </div>
        </AnimatedSection>
      </div>
      
    </section>
  );
};

export default HeroSection;