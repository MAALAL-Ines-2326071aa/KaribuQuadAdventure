import React from 'react';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Users, Leaf, Heart } from 'lucide-react';
import AnimatedSection from './AnimatedSection'; 

const EthicsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    // ** MODIFICATION : Fond de section 'vert jungle' **
    <section 
      id="ethics" 
      className="py-24 md:py-32 bg-brand-green text-white relative overflow-hidden"
    >
      {/* Éléments décoratifs adoucis */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl opacity-50"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <Leaf className="inline-block w-10 h-10 mr-3 text-brand-gold" />
            {t('ethics.title')}
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {t('ethics.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            
            {/* Carte 1: École */}
            <AnimatedSection variant="fadeInLeft">
              {/* ** MODIFICATION : Style des cartes unifié ** */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-brand-gold/20 rounded-md">
                    <GraduationCap className="w-8 h-8 text-brand-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('ethics.school')}</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  {t('ethics.schoolDesc')}
                </p>
              </div>
            </AnimatedSection>

            {/* Carte 2: Emploi */}
            <AnimatedSection variant="fadeInLeft" delay={0.2}>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-md">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('ethics.employment')}</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  {t('ethics.employmentDesc')}
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Carte principale: Tourisme Responsable */}
          <AnimatedSection variant="fadeInRight">
            <div className="text-center bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <Leaf className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">
                {t('ethics.responsible')}
              </h3>
              <p className="text-white/80 leading-relaxed mb-6">
                {t('ethics.responsibleDesc')}
              </p>
              <div className="bg-brand-gold text-brand-anthracite rounded-md p-4 font-bold text-lg">
                👉 {t('ethics.ethical')}
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="text-center mt-16" variant="zoomIn">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
            <Heart className="w-6 h-6 text-red-400" />
            <span className="text-white font-semibold text-lg">
              {t('ethics.impact')}
            </span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default EthicsSection;