import React from 'react'

interface AlerteSecurityMessageProps {
    category?: {
        slug: string;
        name: string;
    };
}

function AlerteSecurityMessage({ category }: AlerteSecurityMessageProps) {
    // Masquer les conseils pour les résidences et hôtels
    const shouldHideSecurityTips = category && (
        category.slug === 'residence' || 
        category.slug === 'hotel'
    );

    if (shouldHideSecurityTips) {
        return null;
    }

    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-900 p-4 my-3 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-500" role="alert">
            <p className="font-bold">Conseils de sécurités :</p>
            <ul className="list-disc pl-5 mt-2">
                <li>Ne pas faire de paiement avant de visiter le bien.</li>
                <li>Sur les lieux renseignez-vous auprès du voisinage sur l'authenticité du bien.</li>
                <li>
                    Exigé la présence de l'huissier ou du mandater qui gère le bien, avant tout paiement si le bien vous convient.
                </li>
                <li>Ne pas faire de paiement, ni d'achat de bien à distance.</li>
            </ul>
        </div>
    );
}

export default AlerteSecurityMessage