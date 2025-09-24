import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const ContactSection: React.FC = () => {
  const whatsappMessage = encodeURIComponent("Bonjour Karibu Quad Adventure, je souhaite plus d'informations ! 😊");
  const whatsappLink = `https://wa.me/255719924652?text=${whatsappMessage}`;

  return (
    // ** MODIFICATION : Fond de section 'alabaster' **
    <section id="contact" className="py-24 md:py-32 bg-brand-alabaster overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <AnimatedSection className="text-center mb-16">
          {/* ** MODIFICATION : Titres et textes avec les nouvelles polices/couleurs ** */}
          <h2 className="text-4xl md:text-6xl font-bold text-brand-anthracite mb-4">
            Contactez-<span className="text-brand-green">nous</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Une question ? Besoin d'informations ? Nous sommes là pour vous !
          </p>
        </AnimatedSection>

        <div className="flex justify-center">
          
          <AnimatedSection variant="zoomIn" delay={0.2}>
            {/* ** MODIFICATION : Style de la carte unifié ** */}
            <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full border border-gray-200">
              <h3 className="text-3xl font-bold text-brand-anthracite mb-8">Informations de contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <div className="p-3 bg-brand-green text-white rounded-md">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-anthracite">Localisation GPS</h4>
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=774V%2BR3%2C+Kendwa%2C+Tanzanie"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-brand-gold transition-colors"
                    >
                      Karibu Quad Adventure (proche de Hotel Riu Jambo)
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <div className="p-3 bg-brand-green text-white rounded-md">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-anthracite">WhatsApp</h4>
                    <a 
                      href="tel:+255719924652"
                      className="text-gray-600 text-lg font-semibold"
                    >
                      +255 719 924 652
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                  <div className="p-3 bg-brand-green text-white rounded-md">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-anthracite">Email</h4>
                    <a 
                      href="mailto:contact@karibuquadadventure.com"
                      className="text-gray-600"
                    >
                      contact@karibuquadadventure.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-200">
                {/* ** MODIFICATION : Bouton principal avec la couleur 'gold' ** */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-brand-gold text-brand-anthracite py-3 rounded-md font-bold text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Contacter via WhatsApp</span>
                </a>
              </div>
            </div>
          </AnimatedSection>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;