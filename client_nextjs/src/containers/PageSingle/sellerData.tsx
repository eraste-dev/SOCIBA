import React, { FC } from "react";
import { Link } from "react-router-dom";

// Données statiques du vendeur
const sellerData = {
	name: "John Doe",
	phone: "+1 (123) 456-7890",
	whatsapp: "+1 (123) 456-7890",
};

export interface ContactSellerProps {
	productLink: string | undefined;
}

const ContactSeller: FC<ContactSellerProps> = ({ productLink }) => {
	const handleCall = () => {
		return `tel:${sellerData.phone}`;
	};

	const handleWhatsApp = () => {
		return `https://wa.me/${sellerData.whatsapp}?text=Votre%20annonce%20publi%C3%A9e%20m'int%C3%A9resse.%20Cliquez%20sur%20l'URL%20ci-dessous%3A%0A%0A${productLink}`;
	};

	const handleSMS = () => {
		return `sms:${sellerData.phone}`;
	};

	return (
		<div className="rounded-lg p-6">
			<h2 className="text-2xl font-bold mb-4">Intéressé(e) ?</h2>
			<div className="flex ">
				<a className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2" href={handleCall()} target="_blank">
					Call
				</a>

				<a href={handleWhatsApp()} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2" target="_blank">
					WhatsApp
				</a>

				<a href={handleSMS()} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2" target="_blank">
					SMS
				</a>
			</div>
		</div>
	);
};

export default ContactSeller;
