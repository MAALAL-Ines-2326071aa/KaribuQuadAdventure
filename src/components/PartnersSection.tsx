import React from 'react';
import { useTranslation } from 'react-i18next';
import { Waves, Fish, Sailboat, Camera, MessageCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const PartnersSection: React.FC = () => {
  const { t } = useTranslation();

  // ** MODIFICATION : Couleurs des icônes unifiées **
  const activities = [
    { icon: <Waves className="w-10 h-10 text-brand-green" />, title: "Snorkeling avec les tortues", description: "Nagez aux côtés des tortues marines dans les récifs coralliens" },
    { icon: <Fish className="w-10 h-10 text-brand-green" />, title: "Nager avec les dauphins", description: "Rencontre magique avec les dauphins sauvages" },
    { icon: <Sailboat className="w-10 h-10 text-brand-green" />, title: "Sunset cruise", description: "Croisière romantique au coucher du soleil" },
    { icon: <Camera className="w-10 h-10 text-brand-green" />, title: "Jet ski & pêche traditionnelle", description: "Sensations fortes et découverte des techniques locales" }
  ];

  const scrollToReservation = () => {
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent("Bonjour ! Je souhaite en savoir plus sur vos excursions partenaires 🌊");
  const whatsappLink = `https://wa.me/255719924652?text=${whatsappMessage}`;

  return (
    // ** MODIFICATION : Fond de section 'alabaster' **
    <section id="partners" className="relative pt-20 bg-brand-alabaster overflow-hidden">

      {/* La vague utilise maintenant la couleur de fond 'alabaster' */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ transform: 'rotate(180deg)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="relative block w-full h-24">
          <path fill="#F8F7F4" fillOpacity="1" d="M0,192L80,176C160,160,320,128,480,133.3C640,139,800,181,960,186.7C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pb-24 md:pb-32">
        
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-anthracite mb-4">
            Partenaires Excursions
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Envie de plus ? Découvrez nos activités en partenariat pour une expérience complète à Zanzibar
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {activities.map((activity, index) => (
            <AnimatedSection key={index} variant="zoomIn" delay={index * 0.1}>
              {/* ** MODIFICATION : Style des cartes unifié ** */}
              <div className="group bg-white rounded-lg p-8 text-center shadow-md border border-gray-200 h-full">
                <div className="inline-block p-4 bg-gray-100 rounded-md mb-6">
                  {activity.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-anthracite mb-3">{activity.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {activity.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center" variant="fadeInUp">
          <div className="bg-white rounded-lg p-8 max-w-3xl mx-auto border border-gray-200 shadow-md">
            <h3 className="text-3xl font-bold text-brand-anthracite mb-4">
              Combinez vos aventures !
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              Créez votre package personnalisé en combinant plusieurs activités pour une expérience inoubliable
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* ** MODIFICATION : Boutons avec les nouvelles couleurs ** */}
              <button
                onClick={scrollToReservation}
                className="bg-brand-gold text-brand-anthracite px-8 py-3 rounded-md font-bold hover:bg-opacity-90 transition-opacity transform hover:scale-105 duration-300 shadow-lg"
              >
                Demande dans le formulaire
              </button>
              
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-green text-white px-8 py-3 rounded-md font-bold hover:bg-opacity-90 transition-opacity transform hover:scale-105 duration-300 shadow-lg flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Via WhatsApp</span>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PartnersSection;