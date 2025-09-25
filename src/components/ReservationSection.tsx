import React, { useState, useMemo } from 'react';
import { Calendar, Clock, User, Phone, Mail, Send, ArrowRight, MessageCircle } from 'lucide-react';
import { useReservations } from '../hooks/useReservations';
import AnimatedSection from './AnimatedSection';

interface FormData {
  date: string;
  numberOfQuads: number;
  timeSlot: 'morning' | 'afternoon';
  name: string;
  email: string;
  phone: string;
  customRequest: string;
}

const ReservationSection: React.FC = () => {
  const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/btc8fx88qtbt6duadtrhig75nv6ukklu';
  const today = new Date().toISOString().split('T')[0];
  
  const { addReservation, getAvailabilityForDate } = useReservations();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    date: today,
    numberOfQuads: 1,
    timeSlot: 'morning',
    name: '',
    email: '',
    phone: '',
    customRequest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [transitioning, setTransitioning] = useState<boolean>(false);

  const availability = useMemo(() => 
    getAvailabilityForDate(formData.date), 
    [formData.date, getAvailabilityForDate]
  );
  
  const nextStep = (): void => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(step => step + 1);
      setTransitioning(false);
    }, 220);
  };
  
  const prevStep = (): void => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(step => step - 1);
      setTransitioning(false);
    }, 220);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const quadsAvailableForSlot = formData.timeSlot === 'morning' ? availability.morning : availability.afternoon;
    
    if (formData.numberOfQuads > quadsAvailableForSlot) {
      setSubmitMessage(`Désolé, seulement ${quadsAvailableForSlot} quads disponibles.`);
      setIsSubmitting(false);
      setStep(2);
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
      totalPrice, 
      timeSlotLabel, 
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
*Demande spéciale :* ${formData.customRequest || 'Aucune'}`
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
      
      setSubmitMessage('✅ Demande envoyée ! Pour finaliser, envoyez-nous le message sur WhatsApp.');
      setFormData({ 
        date: today, 
        numberOfQuads: 1, 
        timeSlot: 'morning', 
        name: '', 
        email: '', 
        phone: '', 
        customRequest: '' 
      });
      setStep(1);
    } catch (error) {
      console.error("Erreur :", error);
      setSubmitMessage('❌ Une erreur est survenue. Veuillez finaliser sur WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const estimatedPrice: number = formData.numberOfQuads === 1 ? 60 : 
                                formData.numberOfQuads === 2 ? 115 : 
                                (formData.numberOfQuads * 60);

  const stepItems = [
    { num: 1, label: "Date" }, 
    { num: 2, label: "Créneau" }, 
    { num: 3, label: "Contact" }
  ];

  return (
    <section id="reservation" className="py-24 md:py-32 bg-brand-alabaster overflow-hidden">
      <div className="max-w-xl mx-auto px-4">
        
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-anthracite mb-4">
            Réservez votre <span className="text-brand-green">Aventure</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            En quelques étapes simples • Réservation via WhatsApp
          </p>
        </AnimatedSection>

        <AnimatedSection variant="zoomIn" delay={0.2}>
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200">
            
            {/* BARRE DE PROGRESSION */}
            <div className="flex items-center justify-center mb-8">
              {stepItems.map((item, index) => (
                <React.Fragment key={item.num}>
                  {/* Cercle numéro */}
                  <div className="flex flex-col items-center z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${
                      step >= item.num 
                        ? 'bg-brand-gold border-brand-gold text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {item.num}
                    </div>
                    <p className={`mt-2 text-sm font-semibold ${
                      step >= item.num ? 'text-brand-anthracite' : 'text-gray-400'
                    }`}>
                      {item.label}
                    </p>
                  </div>
                  
                  {/* Barre de progression entre les cercles */}
                  {index < stepItems.length - 1 && (
                    <div className="flex-1 mx-2 relative">
                      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-brand-gold transition-all duration-500 ${
                            step > item.num ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* CONTENEUR DES ÉTAPES AVEC TRANSITION LÉGÈRE */}
            <div className="min-h-[500px] relative overflow-hidden">
              <div className={`transition-all duration-200 ease-in-out ${
                transitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}>
                
                {/* ÉTAPE 1 */}
                {step === 1 && (
                  <div className="h-full flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-center text-brand-anthracite mb-6">
                        Quand & Combien ?
                      </h3>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                            <Calendar size={18} />
                            <span>Date de réservation</span>
                          </label>
                          <input 
                            type="date" 
                            value={formData.date} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                              setFormData({ ...formData, date: e.target.value })
                            } 
                            min={today} 
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 transition-all outline-none" 
                            required 
                          />
                        </div>
                        
                        <div>
                          <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                            <User size={18} />
                            <span>Nombre de quads</span>
                          </label>
                          <select 
                            value={formData.numberOfQuads} 
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                              setFormData({ ...formData, numberOfQuads: parseInt(e.target.value) })
                            } 
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 transition-all outline-none" 
                            required
                          >
                            {[...Array(10)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1} quad{i > 0 ? 's' : ''}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* BOUTON EN BAS À DROITE */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <div className="flex justify-end">
                        <button 
                          type="button" 
                          onClick={nextStep} 
                          className="bg-brand-green text-white py-4 px-8 rounded-md font-bold text-lg flex items-center justify-center gap-2 hover:bg-opacity-90 transition-opacity h-14"
                        >
                          <span>Suivant</span>
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ÉTAPE 2 */}
                {step === 2 && (
                  <div className="h-full flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-center text-brand-anthracite mb-2">
                        Choisissez votre créneau
                      </h3>
                      <p className="text-center text-sm text-gray-500 mb-6">
                        Disponibilité pour le {new Date(formData.date).toLocaleDateString('fr-FR', { 
                          weekday: 'long',
                          day: 'numeric', 
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      
                      <div className="space-y-4">
                        <button 
                          type="button" 
                          onClick={() => setFormData({ ...formData, timeSlot: 'morning' })} 
                          className={`w-full p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                            formData.timeSlot === 'morning' 
                              ? 'border-brand-gold bg-yellow-50 shadow-md' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <strong className="text-lg">Tour Matin</strong>
                              <p className="text-sm text-gray-600">09h00 - 13h00</p>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                                availability.morning > 0 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {availability.morning} disponible{availability.morning !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </button>
                        
                        <button 
                          type="button" 
                          onClick={() => setFormData({ ...formData, timeSlot: 'afternoon' })} 
                          className={`w-full p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                            formData.timeSlot === 'afternoon' 
                              ? 'border-brand-gold bg-yellow-50 shadow-md' 
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <strong className="text-lg">Tour Après-midi</strong>
                              <p className="text-sm text-gray-600">14h00 - 18h00</p>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                                availability.afternoon > 0 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {availability.afternoon} disponible{availability.afternoon !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                    
                    {/* BOUTONS EN BAS */}
                    <div className="mt-8 pt-8 border-t border-gray-200 flex gap-4">
                      <button 
                        type="button" 
                        onClick={prevStep} 
                        className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-md font-bold hover:bg-gray-200 transition-colors h-14 flex items-center justify-center"
                      >
                        ← Retour
                      </button>
                      <button 
                        type="button" 
                        onClick={nextStep} 
                        className="flex-1 bg-brand-green text-white py-4 rounded-md font-bold hover:bg-opacity-90 transition-opacity h-14 flex items-center justify-center gap-2"
                      >
                        Suivant <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* ÉTAPE 3 */}
                {step === 3 && (
                  <form onSubmit={handleSubmit} className="h-full flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-center text-brand-anthracite mb-6">
                        Vos coordonnées
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            <User size={16} className="inline-block mr-2" />
                            Nom complet
                          </label>
                          <input 
                            type="text" 
                            value={formData.name} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                              setFormData({ ...formData, name: e.target.value })
                            } 
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 transition-all outline-none" 
                            required 
                            placeholder="Votre nom complet"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            <Mail size={16} className="inline-block mr-2" />
                            Adresse email
                          </label>
                          <input 
                            type="email" 
                            value={formData.email} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                              setFormData({ ...formData, email: e.target.value })
                            } 
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 transition-all outline-none" 
                            required 
                            placeholder="votre@email.com"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            <Phone size={16} className="inline-block mr-2" />
                            Téléphone (WhatsApp)
                          </label>
                          <input 
                            type="tel" 
                            value={formData.phone} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                              setFormData({ ...formData, phone: e.target.value })
                            } 
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 transition-all outline-none" 
                            required 
                            placeholder="+33 6 12 34 56 78"
                          />
                        </div>

                        {/* CHAMP DEMANDE SPÉCIALE */}
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            <MessageCircle size={16} className="inline-block mr-2" />
                            Demande spéciale (optionnel)
                          </label>
                          <textarea 
                            value={formData.customRequest} 
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                              setFormData({ ...formData, customRequest: e.target.value })
                            } 
                            className="w-full p-3 border border-gray-300 rounded-md focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 transition-all outline-none" 
                            placeholder="Avez-vous des demandes particulières ? Allergies, préférences, etc."
                            rows={3}
                          />
                        </div>
                      </div>
                      
                      {/* PRIX FINAL - STYLE SIMPLIFIÉ */}
                      <div className="mt-6 text-center">
                        <p className="text-gray-800 font-bold text-xl">
                          Total : <span className="text-brand-green text-2xl">{estimatedPrice} $</span>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Pour {formData.numberOfQuads} quad{formData.numberOfQuads > 1 ? 's' : ''} • Créneau {formData.timeSlot === 'morning' ? 'Matin' : 'Après-midi'}
                        </p>
                      </div>
                    </div>
                    
                    {/* BOUTONS EN BAS */}
                    <div className="mt-8 pt-8 border-t border-gray-200 flex gap-4">
                      <button 
                        type="button" 
                        onClick={prevStep} 
                        className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-md font-bold hover:bg-gray-200 transition-colors h-14 flex items-center justify-center"
                      >
                        ← Retour
                      </button>
                      <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="flex-1 bg-brand-gold text-brand-anthracite py-4 rounded-md font-bold text-lg hover:bg-opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed h-14 flex items-center justify-center gap-2"
                      >
                        <Send size={18} /> 
                        {isSubmitting ? 'Envoi...' : 'Envoyer'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            
            {/* NOTE WHATSAPP */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                <Phone size={14} />
                Toutes les réservations sont confirmées via WhatsApp
              </p>
            </div>
            
            {/* MESSAGE DE STATUT */}
            {submitMessage && (
              <div className={`mt-4 p-4 text-center rounded-lg border-2 ${
                submitMessage.includes('✅') 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <span className="font-semibold">{submitMessage}</span>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ReservationSection;