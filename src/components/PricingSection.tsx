import React from 'react';
import { useTranslation } from 'react-i18next';
// ** MODIFICATION : Ajout des nouvelles icônes **
import { Check, Clock, MapPin, DollarSign, CalendarDays, Sunrise, Sunset } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const PricingSection: React.FC = () => {
  const { t } = useTranslation();

  const pricingOptions = [
    { title: t('pricing.options.single'), price: t('pricing.prices.single'), duration: t('pricing.duration'), features: [ t('pricing.features.transfer'), t('pricing.features.guide'), t('pricing.features.refreshments'), t('pricing.features.media'), t('pricing.features.insurance'), '' ], popular: false },
    { title: t('pricing.options.double'), price: t('pricing.prices.double'), duration: t('pricing.duration'), features: [ t('pricing.features.transfer'), t('pricing.features.guide'), t('pricing.features.refreshments'), t('pricing.features.media'), t('pricing.features.insurance'), t('pricing.features.discount') ], popular: true },
    { title: t('pricing.options.group'), price: t('pricing.prices.group'), duration: t('pricing.duration'), features: [ t('pricing.features.transfer'), t('pricing.features.guide'), t('pricing.features.refreshments'), t('pricing.features.media'), t('pricing.features.insurance'), t('pricing.features.discount') ], popular: false }
  ];

  // ** MODIFICATION : Remplacement des emojis par des icônes Lucide **
  const schedules = [
    { time: t('pricing.morning'), pickup: t('pricing.pickup'), departure: t('pricing.departure'), return: t('pricing.return'), icon: <Sunrise size={32} className="text-brand-gold" /> },
    { time: t('pricing.afternoon'), pickup: t('pricing.pickupAfternoon'), departure: t('pricing.departureAfternoon'), return: t('pricing.returnAfternoon'), icon: <Sunset size={32} className="text-brand-gold" /> }
  ];

  const scrollToReservation = () => {
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="tarifs" className="py-24 md:py-32 bg-brand-alabaster overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <AnimatedSection>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-brand-anthracite mb-6">{t('pricing.title')}</h2>
            <div className="bg-brand-gold text-brand-anthracite rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <DollarSign size={20} />
                <span className="font-semibold">{t('pricing.paymentOnSite')}</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pricingOptions.map((option, index) => (
            <AnimatedSection key={index} variant="zoomIn" delay={index * 0.1}>
              <div className={`relative bg-white rounded-lg p-8 shadow-md flex flex-col h-full border ${ option.popular ? 'border-brand-gold border-2' : 'border-gray-200' }`}>
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-brand-gold text-brand-anthracite px-4 py-1.5 rounded-md text-sm font-semibold shadow-lg">
                      ⭐ {t('common.popular') || 'Populaire'}
                    </span>
                  </div>
                )}
                <div className="flex-grow">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-brand-anthracite mb-2">{option.title}</h3>
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-5xl font-extrabold text-brand-green">{option.price}</span>
                      <span className="text-gray-500">/ {option.duration}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3 min-h-[2.5rem]">
                        {feature && <Check className="w-5 h-5 text-brand-green flex-shrink-0 mt-1" />}
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <button onClick={scrollToReservation} className={`w-full py-3 rounded-md font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${ 
                    option.popular 
                      ? 'bg-brand-gold text-brand-anthracite hover:bg-opacity-90' 
                      : 'bg-brand-green text-white hover:bg-opacity-90' 
                  }`}>
                    {option.price === t('pricing.prices.group') ? t('pricing.requestQuote') : t('pricing.reserveNow')}
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection variant="fadeInUp">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <div className="text-center mb-8">
              {/* ** MODIFICATION : Remplacement de l'emoji par une icône ** */}
              <h3 className="text-3xl font-bold text-brand-anthracite mb-4 flex items-center justify-center gap-x-3">
                <CalendarDays size={28} /> 
                {t('pricing.schedules')}
              </h3>
              <p className="text-gray-600">{t('pricing.schedulesDesc')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {schedules.map((schedule, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="text-center">
                    {/* ** MODIFICATION : Remplacement de l'emoji par une icône ** */}
                    <div className="inline-block p-3 bg-white rounded-md mb-4 shadow-inner">
                      {schedule.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-brand-anthracite mb-4">{schedule.time}</h4>
                    <div className="space-y-2 text-gray-700">
                      <div className="flex items-center justify-center space-x-2"> <Clock size={16} /> <span>{schedule.pickup}</span> </div>
                      <div className="flex items-center justify-center space-x-2"> <MapPin size={16} /> <span>{schedule.departure}</span> </div>
                      <div className="flex items-center justify-center space-x-2"> <Clock size={16} /> <span>{schedule.return}</span> </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PricingSection;