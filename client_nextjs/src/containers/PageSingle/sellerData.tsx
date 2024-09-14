import React, { FC } from "react";
import { FaPhone, FaPhoneAlt, FaSms, FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

// Données statiques du vendeur
const sellerData = {
	name: "SOCIBA",
	phone: "+1 (123) 456-7890",
	whatsapp: "+1 (123) 456-7890",
};

export interface ContactSellerProps {
	productLink: string | undefined;
}

const ContactSeller: FC<ContactSellerProps> = ({ productLink }) => {
	const classNameItem: string =
		"text-white font-bold py-2 px-4 rounded-lg mr-2 flex items-center justify-center text-center";
	const iconSize = 35;

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
		<div className="p-6">
			{/* <h2 className="text-2xl font-bold mb-4">Intéressé(e) ?</h2> */}

			<div className="grid grid-cols-3 gap-6 ">
				<a
					className={`bg-green-500 hover:bg-green-600 ${classNameItem}`}
					href={handleCall()}
					target="_blank"
				>
					<FaPhoneAlt size={iconSize} />
					<span className="ml-2">Appel</span>
				</a>

				<a
					href={handleSMS()}
					className={`bg-blue-500 hover:bg-blue-600 ${classNameItem}`}
					target="_blank"
				>
					<FaSms size={iconSize} />
					<span className="ml-2">SMS</span>
				</a>

				<a
					href={handleWhatsApp()}
					className={`bg-blue-500 hover:bg-blue-6000 ${classNameItem}`}
					target="_blank"
				>
					<FaWhatsapp size={iconSize} />
					<span className="ml-2">WhatsApp</span>
				</a>
			</div>
		</div>
	);
};

export default ContactSeller;
