// src/components/HeroSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, Users } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  const scrollToReservation = () => {
    const element = document.getElementById('reservation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* On assombrit un peu plus la vidéo pour la lisibilité */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 pt-20 pb-10">
        
        <AnimatedSection variant="zoomIn" duration={1.2}>
          <div className="text-center max-w-4xl text-white">
            <div className="mb-8">
              
              {/* Le h1 utilise maintenant la police 'font-serif' (Playfair Display) définie globalement */}
              <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                {t('hero.title')}
              </h1>
              
              {/* Le paragraphe utilise la police 'font-sans' (Inter) définie globalement */}
              <p className="text-xl md:text-2xl text-white/80 mb-12">
                {t('hero.subtitle')}
              </p>

              {/* Les informations sont simplifiées et espacées */}
              <div className="flex items-center justify-center gap-x-6 text-sm text-white/70 mb-12">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>Hotel Riu Jambo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{t('hero.open247')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>{t('hero.multilingualGuides')}</span>
                </div>
              </div>

              {/* Le bouton utilise les nouvelles couleurs de la marque */}
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
          </div>
        </AnimatedSection>
      </div>
      
    </section>
  );
};

export default HeroSection;