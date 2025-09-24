// src/components/LegalModal.tsx
import React from 'react';
import { X } from 'lucide-react';

interface LegalModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const LegalModal: React.FC<LegalModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col transform transition-transform duration-300 animate-slide-up"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant à l'intérieur de la modale
      >
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white rounded-t-lg">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LegalModal;