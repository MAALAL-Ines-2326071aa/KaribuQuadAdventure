import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, MapPin, Phone, Mail, Instagram } from 'lucide-react';

import LegalModal from './LegalModal';
import PrivacyPolicyContent from './PrivacyPolicyContent';
import TermsOfUseContent from './TermsOfUseContent';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}> <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.85-.38-6.75-1.9-1.42-1.14-2.2-2.85-2.4-4.64-.25-2.42.4-4.84 1.8-6.86 1.28-1.85 3.23-3.01 5.37-3.15 1.05-.07 2.1-.05 3.15-.02v4.27c-1.09.04-2.18.06-3.27.05-.01.96-.02 1.92-.01 2.88.03.86-.19 1.71-.82 2.29-.62.58-1.54.74-2.34.46-.77-.28-1.25-.9-1.43-1.71-.14-.62-.15-1.25-.15-1.87 0-2.6.01-5.2-.01-7.8-.03-1.52-.16-3.04-.32-4.55-.08-.8-.24-1.59-.49-2.35-.3-.9-.79-1.74-1.42-2.48C.92 1.77 0 1.77 0 1.77v4.02c.2-.11.39-.23.59-.33.2-.1.4-.2.6-.31.6-.3 1.2-.6 1.8-.88 1.13-.53 2.33-.89 3.53-1.09.28-.05.57-.08.85-.12.35-.04.7-.08 1.05-.1v.01c.9-.09 1.79-.15 2.69-.18 1.18-.04 2.35-.05 3.53-.04Z"/> </svg> );

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null);

  // ** MODIFICATION : Couleurs des réseaux sociaux restaurées **
  const socialLinks = [
    { href: "https://www.instagram.com/karibuquad_adventure", icon: <Instagram className="w-5 h-5" />, color: "bg-pink-600" },
    { href: "https://www.tiktok.com/@karibuquad_adventure", icon: <img src="/tiktok-logo.png" alt="TikTok" className="w-5 h-5" />, color: "bg-black" },
    { href: `https://wa.me/255719924652?text=${encodeURIComponent(t('footer.whatsappDefaultMessage'))}`, icon: <Phone className="w-5 h-5" />, color: "bg-green-600" }
  ];

  const navLinks = [
    { id: 'home', label: t('nav.home') },
    { id: 'circuit', label: t('nav.circuit') },
    { id: 'tarifs', label: t('nav.pricing') },
    { id: 'reservation', label: t('nav.reservation') },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-brand-anthracite text-gray-400">        
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            
            <div className="space-y-6">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="flex items-center space-x-4">
                <div 
                  className="block h-20 w-20 rounded-full bg-white shadow-lg flex-shrink-0"
                  style={{ backgroundImage: `url(/logo.svg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                ></div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{t('footer.title')}</h3>
                  <p className="text-sm text-gray-400">{t('footer.subtitle')}</p>
                </div>
              </a>
              <p className="leading-relaxed">{t('footer.description')}</p>
              <div className="flex space-x-4">
                {/* On restaure l'ancien style des boutons réseaux sociaux */}
                {socialLinks.map((link, index) => (
                  <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className={`p-3 ${link.color} text-white rounded-full hover:opacity-80 transition-opacity flex items-center justify-center`}>
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 items-start">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">{t('footer.exploreTitle')}</h4>
                <ul className="space-y-3">
                  {navLinks.map(link => (
                    <li key={link.id}>
                      <button onClick={() => scrollToSection(link.id)} className="hover:text-brand-gold transition-colors">{link.label}</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">{t('footer.legalTitle')}</h4>
                <ul className="space-y-3">
                  <li>
                    <button onClick={() => setModalContent('privacy')} className="hover:text-brand-gold transition-colors text-left">{t('footer.privacy')}</button>
                  </li>
                  <li>
                    <button onClick={() => setModalContent('terms')} className="hover:text-brand-gold transition-colors text-left">{t('footer.terms')}</button>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t('footer.contactTitle')}</h4>
              <div className="space-y-5">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                  <span>{t('footer.address')}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                  <a href="tel:+255719924652" className="hover:text-white transition-colors">{t('footer.phone')}</a>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-brand-gold mt-1 flex-shrink-0" />
                  <a href={`mailto:${t('footer.email')}`} className="hover:text-white transition-colors">{t('footer.email')}</a>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p className="mb-4 md:mb-0">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
            <div className="flex items-center space-x-2">
              <span>{t('footer.madeWith')}</span>
              <Heart className="w-4 h-4 text-brand-gold" />
              <span>{t('footer.inZanzibar')}</span>
            </div>
          </div>
        </div>
      </footer>

      {modalContent === 'privacy' && (
        <LegalModal title={t('footer.privacy')} onClose={() => setModalContent(null)}>
          <PrivacyPolicyContent />
        </LegalModal>
      )}
      {modalContent === 'terms' && (
        <LegalModal title={t('footer.terms')} onClose={() => setModalContent(null)}>
          <TermsOfUseContent />
        </LegalModal>
      )}
    </>
  );
};

export default Footer;