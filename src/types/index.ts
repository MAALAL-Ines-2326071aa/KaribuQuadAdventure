export interface Reservation {
  id: string;
  numberOfQuads: number;
  timeSlot: 'morning' | 'afternoon';
  name: string;
  email: string;
  phone: string;
  language: string;
  customRequest?: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

export interface TimeSlotAvailability {
  morning: number;
  afternoon: number;
}

export type Language = 'français' | 'anglais' | 'italien' | 'russe';