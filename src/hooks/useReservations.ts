import { useState, useEffect } from 'react';
import { Reservation, TimeSlotAvailability } from '../types';

const TOTAL_QUADS = 10;

export const useReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    // Charger les réservations depuis le localStorage au démarrage
    const saved = localStorage.getItem('karibu-reservations');
    if (saved) {
      const parsedReservations = JSON.parse(saved).map((r: any) => ({
        ...r,
        createdAt: new Date(r.createdAt)
      }));
      setReservations(parsedReservations);
    }
  }, []);

  const addReservation = (reservation: Omit<Reservation, 'id' | 'createdAt'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };

    const updatedReservations = [...reservations, newReservation];
    setReservations(updatedReservations);
    localStorage.setItem('karibu-reservations', JSON.stringify(updatedReservations));

    return newReservation;
  };

  // CETTE FONCTION EST LA CLÉ : ELLE CALCULE LA DISPO POUR UNE DATE SPÉCIFIQUE
  const getAvailabilityForDate = (date: string): TimeSlotAvailability => {
    // On filtre les réservations pour la date demandée
    const reservationsForDate = reservations.filter(r => 
      r.date === date && r.status !== 'cancelled'
    );

    const morningQuadsTaken = reservationsForDate
      .filter(r => r.timeSlot === 'morning')
      .reduce((sum, r) => sum + r.numberOfQuads, 0);
    
    const afternoonQuadsTaken = reservationsForDate
      .filter(r => r.timeSlot === 'afternoon')
      .reduce((sum, r) => sum + r.numberOfQuads, 0);

    return {
      morning: TOTAL_QUADS - morningQuadsTaken,
      afternoon: TOTAL_QUADS - afternoonQuadsTaken
    };
  };

  return {
    reservations,
    addReservation,
    getAvailabilityForDate, // On exporte la nouvelle fonction
    totalQuads: TOTAL_QUADS
  };
};