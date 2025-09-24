import React, { useState, useMemo } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageCircle, Send, AlertCircle } from 'lucide-react';
import { useReservations } from '../hooks/useReservations';
import { Language } from '../types';
import AnimatedSection from './AnimatedSection';

const ReservationSection: React.FC = () => {
  const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/btc8fx88qtbt6duadtrhig75nv6ukklu';
  const today = new Date().toISOString().split('T')[0];
  
  const { addReservation, getAvailabilityForDate, totalQuads } = useReservations();

  const [formData, setFormData] = useState({
    date: today,
    numberOfQuads: 1,
    timeSlot: 'morning' as 'morning' | 'afternoon',
    name: '',
    email: '',
    phone: '',
    customRequest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const availability = useMemo(() => getAvailabilityForDate(formData.date), [formData.date, getAvailabilityForDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const quadsAvailableForSlot = formData.timeSlot === 'morning' ? availability.morning : availability.afternoon;
    
    if (formData.numberOfQuads > quadsAvailableForSlot) {
      setSubmitMessage(`Désolé, seulement ${quadsAvailableForSlot} quads disponibles pour ce créneau.`);
      setIsSubmitting(false);
      return;
    }

    const formattedDateForDisplay = new Date(formData.date).toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const timeSlotLabel = formData.timeSlot === 'morning' ? 'Matin (09h-13h)' : 'Après-midi (14h-18h)';
    const totalPrice = formData.numberOfQuads === 1 ? 60 : formData.numberOfQuads === 2 ? 115 : (formData.numberOfQuads * 60);

    const reservationData = {
        ...formData,
        date: formattedDateForDisplay,
        totalPrice: totalPrice,
        timeSlotLabel: timeSlotLabel,
        language: 'non spécifié'
    };

    const whatsappMessage = encodeURIComponent(
`Bonjour ! Nouvelle réservation Karibu Quad :

*Nom complet :* ${formData.name}
*Téléphone :* ${formData.phone}
*Email :* ${formData.email}
*Date de réservation :* ${reservationData.date}
*Créneau :* ${reservationData.timeSlotLabel}
*Nombre de quads :* ${formData.numberOfQuads}
*Prix total estimé :* ${reservationData.totalPrice} $
*Demande spéciale :* ${formData.customRequest || 'Aucune'}
`
    );
      
    const whatsappLink = `https://wa.me/255719924652?text=${whatsappMessage}`;
    window.open(whatsappLink, '_blank');

    try {
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });

      if (!response.ok) {
        throw new Error('La soumission au webhook a échoué');
      }

      addReservation({
        ...formData,
        language: 'non spécifié',
        date: formData.date,
        status: 'confirmed'
      });
      
      setSubmitMessage('✅ Demande envoyée ! Pour finaliser, envoyez-nous le message qui s\'affiche sur WhatsApp.');
      setFormData({
        date: today,
        numberOfQuads: 1,
        timeSlot: 'morning',
        name: '',
        email: '',
        phone: '',
        customRequest: ''
      });

    } catch (error) {
      console.error("Erreur lors de la soumission de la réservation :", error);
      setSubmitMessage('❌ Une erreur est survenue en arrière-plan. Veuillez finaliser votre demande sur WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimatedPrice = formData.numberOfQuads === 1 ? 60 :
                         formData.numberOfQuads === 2 ? 115 :
                         (formData.numberOfQuads * 60);

  return (
    // ** MODIFICATION : Fond de section 'alabaster' **
    <section id="reservation" className="py-24 md:py-32 bg-brand-alabaster overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        
        <AnimatedSection className="text-center mb-12">
          {/* ** MODIFICATION : Titres et textes avec les nouvelles polices/couleurs ** */}
          <h2 className="text-4xl md:text-6xl font-bold text-brand-anthracite mb-4">
            Réservez votre <span className="text-brand-green">Aventure</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Sélectionnez vos préférences et réservez en quelques clics
          </p>
        </AnimatedSection>

        <AnimatedSection variant="zoomIn" delay={0.2}>
          {/* ** MODIFICATION : Style du conteneur de formulaire unifié ** */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* ** MODIFICATION : Style des cartes de disponibilité unifié ** */}
              <div className="bg-gray-50 rounded-md p-4 text-center border border-gray-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-brand-gold" />
                  <span className="font-bold text-brand-anthracite">Tour Matin</span>
                </div>
                <p className="text-2xl font-bold text-brand-anthracite">
                  {availability.morning}/{totalQuads} quads disponibles
                </p>
              </div>
              <div className="bg-gray-50 rounded-md p-4 text-center border border-gray-200">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-brand-gold" />
                  <span className="font-bold text-brand-anthracite">Tour Après-midi</span>
                </div>
                <p className="text-2xl font-bold text-brand-anthracite">
                  {availability.afternoon}/{totalQuads} quads disponibles
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Le style des champs de formulaire est aussi mis à jour pour être plus sobre */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                    <Calendar size={18} className="text-brand-green" />
                    <span>Date de la réservation</span>
                  </label>
                  <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} min={today} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none transition-colors" required />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                    <User size={18} className="text-brand-green" />
                    <span>Nombre de quads</span>
                  </label>
                  <select value={formData.numberOfQuads} onChange={(e) => setFormData({ ...formData, numberOfQuads: parseInt(e.target.value) })} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none transition-colors" required>
                    {[...Array(Math.min(10, Math.max(availability.morning, availability.afternoon)))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} quad{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                    <Clock size={18} className="text-brand-green" />
                    <span>Horaire</span>
                  </label>
                  <select value={formData.timeSlot} onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value as 'morning' | 'afternoon' })} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none transition-colors" required>
                    <option value="morning">Matin (09h-13h) - {availability.morning} disponibles</option>
                    <option value="afternoon">Après-midi (14h-18h) - {availability.afternoon} disponibles</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                    <User size={18} className="text-brand-green" />
                    <span>Nom complet</span>
                  </label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none transition-colors" placeholder="Votre nom complet" required />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                    <Mail size={18} className="text-brand-green" />
                    <span>Email</span>
                  </label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none transition-colors" placeholder="votre@email.com" required />
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                    <Phone size={18} className="text-brand-green" />
                    <span>Téléphone (WhatsApp)</span>
                  </label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none transition-colors" placeholder="+255 719 924 652" required />
                </div>
              </div>
              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                  <MessageCircle size={18} className="text-brand-green" />
                  <span>Demande personnalisée (optionnel)</span>
                </label>
                <textarea value={formData.customRequest} onChange={(e) => setFormData({ ...formData, customRequest: e.target.value })} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-gold focus:outline-none transition-colors resize-none" rows={3} placeholder="Ex: Célébration d'anniversaire, besoins spécifiques..." />
              </div>
              <p className="text-center text-gray-600">
                  Prix total estimé : <span className="font-bold text-brand-green">{estimatedPrice} $</span>
              </p>
              {/* ** MODIFICATION : Bouton principal avec la couleur 'gold' ** */}
              <button
                type="submit"
                disabled={isSubmitting || (formData.timeSlot === 'morning' ? availability.morning : availability.afternoon) < formData.numberOfQuads}
                className="w-full bg-brand-gold text-brand-anthracite py-3 rounded-md font-bold text-lg hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>{isSubmitting ? 'Envoi en cours...' : 'Envoyer et ouvrir WhatsApp'}</span>
                </span>
              </button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ReservationSection;