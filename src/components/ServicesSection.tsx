import React from 'react';
import { Shield, Camera, Utensils, Video, Star } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const ServicesSection: React.FC = () => {

  // ** MODIFICATION : Mise à jour des couleurs des icônes **
  const services = [
    {
      icon: <Shield className="w-8 h-8 text-brand-green" />,
      title: "Assurance & Équipement",
      description: "Sécurité maximale garantie"
    },
    {
      icon: <Camera className="w-8 h-8 text-brand-gold" />,
      title: "Photos & Vidéos HD",
      description: "Souvenirs immortalisés et envoyés via WhatsApp"
    },
    {
      icon: <Video className="w-8 h-8 text-blue-500" />,
      title: "Vidéos drone",
      description: "Prises de vue aériennes spectaculaires (option)"
    },
    {
      icon: <Utensils className="w-8 h-8 text-red-500" />,
      title: "Fruits & Boissons",
      description: "Rafraîchissements locaux inclus"
    },
    {
      icon: <Star className="w-8 h-8 text-indigo-600" />,
      title: "Expérience authentique",
      description: "Immersion culturelle avec les locaux"
    }
  ];

  return (
    // ** MODIFICATION : Fond de section 'alabaster' **
    <section className="py-24 md:py-32 bg-brand-alabaster overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <AnimatedSection className="text-center mb-20">
          {/* ** MODIFICATION : Titres et textes avec les nouvelles polices/couleurs ** */}
          <h2 className="text-4xl md:text-6xl font-bold text-brand-anthracite mb-4">
            Nos <span className="text-brand-green">Services Inclus</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Une expérience personnalisée avec des services de qualité premium
          </p>
        </AnimatedSection>

        {/* Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {services.map((service, index) => (
            <AnimatedSection key={index} variant="zoomIn" delay={index * 0.1}>
              {/* ** MODIFICATION : Style des cartes unifié ** */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 h-full">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gray-100 rounded-md">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-anthracite">{service.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;