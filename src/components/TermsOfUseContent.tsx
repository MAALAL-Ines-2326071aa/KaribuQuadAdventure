// src/components/TermsOfUseContent.tsx
import React from 'react';

const TermsOfUseContent: React.FC = () => (
  <div className="space-y-6 text-gray-700 text-left text-sm md:text-base">
    
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-800">Bienvenue chez Karibu Quad Adventure</h2>
      <p className="mt-2">
        Préparez-vous pour des balades en quad inoubliables à Zanzibar ! Avant de partir à l’aventure, voici tout ce que vous devez savoir pour profiter pleinement et en toute sécurité.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-bold pt-4 mb-2">Réservation & Paiement</h3>
      <p><strong>Réservez facilement :</strong> Réservez en ligne ou directement dans nos bureaux. Les places sont limitées, alors assurez-vous de confirmer votre créneau.</p>
      <p className="mt-2"><strong>Paiement sur place :</strong> Payez avant le départ, en carte bancaire ou en espèces.</p>
    </div>

    <div>
      <h3 className="text-xl font-bold pt-4 mb-2">Annulation ou report</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li><strong>Annulation &gt; 24h avant :</strong> remboursement intégral.</li>
        <li><strong>Annulation &lt; 24h :</strong> pas de remboursement, mais possibilité de reprogrammer selon disponibilité (frais supplémentaires possibles).</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-bold pt-4 mb-2">Sécurité avant tout</h3>
      <p>Pour votre sécurité et celle des autres, nous vous demandons de :</p>
      <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
        <li>Être en bonne santé et apte à conduire un quad.</li>
        <li>Porter le casque et tout l’équipement fourni.</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-bold pt-4 mb-2">Comportement & Consignes</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Soyez responsable et respectez le matériel.</li>
        <li>Écoutez les guides pour votre sécurité et celle des autres.</li>
        <li>Tout comportement dangereux peut entraîner l’arrêt immédiat de la balade sans remboursement.</li>
      </ul>
    </div>

    <div>
      <h3 className="text-xl font-bold pt-4 mb-2">Responsabilité</h3>
      <p>Nos balades comportent certains risques. En participant, vous acceptez ces risques et dégagez Karibu Quad Adventure et son personnel de toute responsabilité en cas de blessure ou de dommages.</p>
    </div>
    
    <div>
      <h3 className="text-xl font-bold pt-4 mb-2">Données personnelles</h3>
      <p>Vos informations sont utilisées uniquement pour votre réservation et selon notre Politique de confidentialité.</p>
    </div>
    
    <div>
      <h3 className="text-xl font-bold pt-4 mb-2">Modifications & Mises à jour</h3>
      <p>Nous pouvons mettre à jour ces conditions à tout moment. Les changements seront publiés sur notre site et s’appliqueront aux nouvelles réservations.</p>
    </div>
    
    <div>
      <h3 className="text-xl font-bold pt-4 mb-2">Loi applicable</h3>
      <p>Ces conditions sont régies par la législation en vigueur à Zanzibar. Tout litige sera traité par les tribunaux compétents de Zanzibar.</p>
    </div>

    <div className="text-center pt-6">
      <h3 className="text-xl font-bold mb-2">Contactez-nous</h3>
      <p>Des questions ou besoin d’aide pour réserver ?</p>
      <a href="mailto:contact@karibuquadadventure.com" className="text-blue-600 font-semibold hover:underline">
        contact@karibuquadadventure.com
      </a>
    </div>

  </div>
);

export default TermsOfUseContent;