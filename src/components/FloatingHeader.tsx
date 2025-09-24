import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Home, Map, Tag, Mail, Sailboat } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

const FloatingHeader: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('header.xl\\:hidden')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: t('nav.home'), icon: <Home size={20} /> },
    { id: 'circuit', label: t('nav.circuit'), icon: <Map size={20} /> },
    { id: 'tarifs', label: t('nav.pricing'), icon: <Tag size={20} /> },
    { id: 'partners', label: t('nav.excursions', 'Excursions'), icon: <Sailboat size={20} /> },
    { id: 'contact', label: t('nav.contact'), icon: <Mail size={20} /> },
  ];

  return (
    <>
      {/* HEADER VERSION ORDINATEUR */}
      <header className="hidden xl:block relative z-50">
        <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${isScrolled ? 'scale-95' : 'scale-100'}`}>
          {/* ** MODIFICATION : Style visuel mis à jour ** */}
          <div className="w-[90vw] max-w-7xl bg-white/80 backdrop-blur-md rounded-md shadow-lg border border-gray-200 mx-auto px-8 py-4">
            <nav className="flex items-center justify-between">
              <div className="flex-1 flex justify-start space-x-8">
                <button onClick={() => scrollToSection('home')} className="text-brand-anthracite hover:text-brand-gold transition-colors font-medium text-lg">{t('nav.home')}</button>
                <button onClick={() => scrollToSection('circuit')} className="text-brand-anthracite hover:text-brand-gold transition-colors font-medium text-lg">{t('nav.circuit')}</button>
                <button onClick={() => scrollToSection('tarifs')} className="text-brand-anthracite hover:text-brand-gold transition-colors font-medium text-lg">{t('nav.pricing')}</button>
                <button onClick={() => scrollToSection('partners')} className="text-brand-anthracite hover:text-brand-gold transition-colors font-medium text-lg">{t('nav.excursions', 'Excursions')}</button>
              </div>
              <div className="w-36"></div>
              <div className="flex-1 flex items-center justify-end space-x-8">
                <button onClick={() => scrollToSection('contact')} className="text-brand-anthracite hover:text-brand-gold transition-colors font-medium text-lg">{t('nav.contact')}</button>
                <LanguageSelector />
                <button 
                  onClick={() => scrollToSection('reservation')} 
                  className="bg-brand-gold text-brand-anthracite px-6 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-all duration-200 shadow"
                >
                  {t('nav.reserve')}
                </button>
              </div>
            </nav>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="block h-28 w-28 rounded-full bg-white p-1 shadow-lg transition-transform duration-300 hover:scale-110">
              <img src="/logo.svg" alt="Logo Karibu Quad Adventure" className="h-full w-full object-cover rounded-full" />
            </a>
          </div>
        </div>
      </header>

      {/* HEADER VERSION MOBILE */}
      <header className="xl:hidden fixed top-4 left-1/2 -translate-x-1/2 w-[95vw] z-50">
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-2 bg-white/80 backdrop-blur-xl shadow-lg rounded-md border border-gray-200">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="flex items-center space-x-2">
              <img src="/logo.svg" alt="Logo" className="h-10 w-10 object-cover rounded-full" />
              <span className="font-bold text-lg text-brand-anthracite">Karibu Quad</span>
            </a>
            <div className="flex items-center space-x-2">
              <LanguageSelector />
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-brand-anthracite">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          <div className={`absolute top-full mt-2 w-full origin-top transition-all duration-300 ease-in-out ${isMenuOpen ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0 pointer-events-none'}`}>
            <div className="bg-white/80 backdrop-blur-xl rounded-lg shadow-lg p-4 border border-gray-200">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link, index) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="group flex items-center space-x-4 w-full text-brand-anthracite hover:bg-brand-alabaster hover:text-brand-gold font-semibold text-lg p-3 rounded-md transition-all duration-200 active:scale-95"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <span className="text-brand-green">{link.icon}</span>
                    <span>{link.label}</span>
                  </button>
                ))}
                <div className="pt-2" style={{ transitionDelay: `${navLinks.length * 50}ms` }}>
                  <button
                    onClick={() => scrollToSection('reservation')}
                    className="w-full bg-brand-gold text-brand-anthracite px-8 py-3 rounded-md font-bold text-lg hover:bg-opacity-90 transition-all duration-200 active:scale-95 shadow-md"
                  >
                    {t('nav.reserve')}
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default FloatingHeader;