import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react'; // 1. On importe l'icône de flèche
import FloatingHeader from './components/FloatingHeader';
import HeroSection from './components/HeroSection';
import CircuitSection from './components/CircuitSection';
import PricingSection from './components/PricingSection';
import ReservationSection from './components/ReservationSection';
import EthicsSection from './components/EthicsSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import PartnersSection from './components/PartnersSection';
import Footer from './components/Footer';
import QuadSection from './components/QuadSection';

function App() {
  // 2. DÉBUT DE LA LOGIQUE POUR LE BOUTON "REMONTER EN HAUT"
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) { // Si on a défilé de plus de 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Cette fonction remonte la page en haut de manière fluide
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    // On ajoute un "écouteur" qui appelle toggleVisibility à chaque fois que l'utilisateur fait défiler la page
    window.addEventListener('scroll', toggleVisibility);

    // C'est une bonne pratique de "nettoyer" l'écouteur quand le composant n'est plus affiché
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);
  // FIN DE LA LOGIQUE

  return (
    <div className="relative">
      <FloatingHeader />
      <HeroSection />
      <CircuitSection />
      <QuadSection />
      <PricingSection />
      <ReservationSection />
      <EthicsSection />
      <ServicesSection />
      <ContactSection />
      <PartnersSection />
      <Footer />

      {/* 3. AJOUT DU BOUTON LUI-MÊME */}
      {/* Il ne s'affiche que si 'isVisible' est vrai */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-yellow-400 text-gray-900 p-3 rounded-full shadow-lg hover:bg-yellow-500 transform hover:scale-110 transition-all duration-300 z-50"
          aria-label="Remonter en haut"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default App;