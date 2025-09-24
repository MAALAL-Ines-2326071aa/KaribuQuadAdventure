import React, { useState } from 'react';
import { useReservations } from '../hooks/useReservations';
import { Reservation } from '../types';
import { Calendar, Clock, User, Phone, Mail, X } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { reservations, availability, totalQuads } = useReservations();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'today' | 'pending'>('all');

  const today = new Date().toISOString().split('T')[0];
  
  const filteredReservations = reservations.filter(reservation => {
    if (filter === 'today') return reservation.date === today;
    if (filter === 'pending') return reservation.status === 'pending';
    return true;
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <>
      {/* Admin Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-40"
        title="Panel Admin"
      >
        <User className="w-6 h-6" />
      </button>

      {/* Admin Panel Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Panel Administration</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 rounded-2xl p-4 text-center">
                  <h3 className="text-sm font-semibold text-blue-600 mb-1">Matin Disponible</h3>
                  <p className="text-2xl font-bold text-blue-800">{availability.morning}/{totalQuads}</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 text-center">
                  <h3 className="text-sm font-semibold text-green-600 mb-1">Après-midi Disponible</h3>
                  <p className="text-2xl font-bold text-green-800">{availability.afternoon}/{totalQuads}</p>
                </div>
                <div className="bg-yellow-50 rounded-2xl p-4 text-center">
                  <h3 className="text-sm font-semibold text-yellow-600 mb-1">Total Réservations</h3>
                  <p className="text-2xl font-bold text-yellow-800">{reservations.length}</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                  <h3 className="text-sm font-semibold text-purple-600 mb-1">Aujourd'hui</h3>
                  <p className="text-2xl font-bold text-purple-800">
                    {reservations.filter(r => r.date === today).length}
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Toutes
                </button>
                <button
                  onClick={() => setFilter('today')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    filter === 'today' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Aujourd'hui
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  En attente
                </button>
              </div>

              {/* Reservations List */}
              <div className="overflow-y-auto max-h-96 space-y-4">
                {filteredReservations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Aucune réservation trouvée
                  </div>
                ) : (
                  filteredReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-lg font-bold text-gray-800">{reservation.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(reservation.status)}`}>
                              {reservation.status === 'pending' ? 'En attente' : 
                               reservation.status === 'confirmed' ? 'Confirmé' : 'Annulé'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-blue-600" />
                              <span>{reservation.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-green-600" />
                              <span>{reservation.timeSlot === 'morning' ? 'Matin' : 'Après-midi'}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-yellow-600" />
                              <span>{reservation.numberOfQuads} quad{reservation.numberOfQuads > 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-purple-600" />
                              <span>{reservation.phone}</span>
                            </div>
                          </div>

                          <div className="mt-3 text-sm text-gray-600">
                            <div className="flex items-center space-x-2 mb-1">
                              <Mail className="w-4 h-4" />
                              <span>{reservation.email}</span>
                            </div>
                            <div>
                              <strong>Langue:</strong> {reservation.language}
                            </div>
                            {reservation.customRequest && (
                              <div className="mt-2">
                                <strong>Demande:</strong> {reservation.customRequest}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-right text-sm text-gray-500">
                          <div>Créé le</div>
                          <div>{formatDate(reservation.createdAt)}</div>
                          <div className="mt-2 font-bold text-green-600">
                            {reservation.numberOfQuads * 65} $
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;