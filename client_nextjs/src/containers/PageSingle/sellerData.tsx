import React, { FC } from "react";
import { FaPhone, FaPhoneAlt, FaSms, FaWhatsapp, FaWhatsappSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

// Données statiques du vendeur
const sellerData = {
	name: "BAJORAH",
	phone: "+1 (123) 456-7890",
	whatsapp: "+1 (123) 456-7890",
};

export interface ContactSellerProps {
	productLink: string | undefined;
	phone?: string;
	whatsapp?: string;
	sms?: string;
}

const ContactSeller: FC<ContactSellerProps> = ({ productLink, phone, whatsapp, sms }) => {
	const classNameItem: string =
		"text-white font-bold py-2 pr-1 pl-0 sm:px-4 rounded-lg mr-2 flex items-center justify-center text-center";
	const iconSize = 24;

	const handleCall = () => {
		const phone_call = phone ? phone : sellerData.phone;
		return `tel:${phone_call}`;
	};

	const handleWhatsApp = () => {
		// https://wa.me/447838522154
		let _wh = whatsapp ? whatsapp : sellerData.whatsapp;
		if (!_wh.includes("225")) {
			_wh = "225" + _wh;
		}
		return `https://wa.me/${_wh}?text=Votre%20annonce%20publi%C3%A9e%20m'int%C3%A9resse.%20Cliquez%20sur%20l'URL%20ci-dessous%3A%0A%0A${productLink}`;
	};

	const handleSMS = () => {
		const _sms = sms ? sms : sellerData.phone;
		return `sms:${_sms}`;
	};

	return (
		<div className="mt-8">
			{/* <h2 className="text-2xl font-bold mb-4">Intéressé(e) ?</h2> */}

			<div className="grid grid-cols-3 gap-1 sm:gap-6 ">
				{/* bg-green-500 hover:bg-green-600  */}
				<a
					className={`bg-primary-700 hover:bg-primary ${classNameItem}`}
					href={handleCall()}
					target="_blank"
				>
					<FaPhoneAlt size={iconSize} />
					<span className="ml-2">Appeler</span>
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
					className={`bg-green-500 hover:bg-green-6000 ${classNameItem}`}
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
