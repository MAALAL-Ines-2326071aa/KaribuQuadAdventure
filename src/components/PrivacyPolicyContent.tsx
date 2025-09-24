// src/components/PrivacyPolicyContent.tsx
import React from 'react';

const PrivacyPolicyContent: React.FC = () => (
  <div className="space-y-4 text-gray-700 text-left text-sm md:text-base">
    <p><strong>Dernière mise à jour :</strong> 5 septembre 2025</p>
    
    {/* ** PHRASE D'INTRODUCTION AJOUTÉE ICI ** */}
    <p className="pt-2">
      Chez Karibu Quad Adventure, nous respectons votre vie privée et nous engageons à protéger vos informations personnelles. Voici comment nous collectons, utilisons et sécurisons vos données.
    </p>
    
    <h3 className="text-xl font-bold pt-4">1. Collecte des informations</h3>
    <p>Nous collectons des informations lorsque vous remplissez notre formulaire de réservation ou de contact. Les informations collectées incluent votre nom, votre adresse e-mail, votre numéro de téléphone et toute demande personnalisée que vous pourriez soumettre.</p>

    <h3 className="text-xl font-bold pt-4">2. Utilisation des informations</h3>
    <p>Toutes les informations que nous recueillons auprès de vous sont utilisées exclusivement pour :</p>
    <ul className="list-disc list-inside ml-4 space-y-1">
      <li>Gérer et confirmer votre réservation.</li>
      <li>Vous contacter par e-mail ou WhatsApp pour les détails de votre excursion.</li>
      <li>Personnaliser votre expérience et répondre à vos besoins spécifiques.</li>
      <li>Améliorer le service client et le support.</li>
    </ul>

    <h3 className="text-xl font-bold pt-4">3. Partage avec des tiers</h3>
    <p>Vos informations personnelles ne seront ni vendues, ni échangées, ni transférées à une autre société sans votre consentement. Nous utilisons un service tiers (Make.com) uniquement pour automatiser la transmission de votre demande de réservation vers notre système interne et vers notre compte Google Sheets à des fins de gestion.</p>

    <h3 className="text-xl font-bold pt-4">4. Protection des informations</h3>
    <p>Nous mettons en œuvre une variété de mesures de sécurité pour préserver la sécurité de vos informations personnelles. L'accès à ces informations est limité à notre équipe qui en a besoin pour effectuer un travail spécifique (par exemple, la gestion des réservations).</p>

    <h3 className="text-xl font-bold pt-4">5. Vos droits</h3>
    <p>Conformément au RGPD et aux lois applicables, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles. Pour exercer ces droits, veuillez nous contacter à l'adresse <strong className="text-blue-600">contact@karibuquadadventure.com</strong>.</p>
  </div>
);

export default PrivacyPolicyContent;