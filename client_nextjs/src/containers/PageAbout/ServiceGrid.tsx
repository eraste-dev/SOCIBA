import NcImage from "components/NcImage/NcImage";
import React from "react";
import S1 from "../../images/pages/about/s1.png";
import S2 from "../../images/pages/about/s2.jpeg";
import S3 from "../../images/pages/about/s3.jpg";
import S4 from "../../images/pages/about/s4.jpg";
import S5 from "../../images/pages/about/s5.png";
import S6 from "../../images/pages/about/s6.jpeg";

const ServiceGrid = () => {
	const services = [
		{
			title: "Création de contenu",
			imageUrl: S1,
		},
		{
			title: "Recherche de nouveaux clients",
			imageUrl: S2,
		},
		{
			title: "Attirer plus de potentiel client et fidélisation",
			imageUrl: S3,
		},
		{
			title: "Gestion du compte et de la base de données clientèles",
			imageUrl: S4,
		},
		{
			title: "Suivi et mise à jour de chaque compte",
			imageUrl: S5,
		},
		{
			title: "Enregistrement et traitement de nouvelles demandes",
			imageUrl: S6,
		},
	];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
			{services.map((service, index) => (
				<div
					key={index}
					className="bg-white dark:bg-neutral-900 p-4 rounded-md hover:shadow-lg border border-primary-100 "
				>
					<div className="flex justify-center" style={{ height: 100 }}>
						{/* <img
						src={service.imageUrl}
						alt={service.title}
						className="w-full h-48 object-cover rounded-md mb-2"
					/> */}
						<NcImage
							src={service.imageUrl}
							alt={service.title}
							className="w-auto h-full object-cover rounded-md mb-2"
						/>
					</div>
					<span className="w-ful flex justify-center font-semibold text-primary-900 dark:text-white text-base text-center mb-2">
						{service.title}
					</span>
					{/* <p className="text-base">Description du service ici...</p> */}
				</div>
			))}
		</div>
	);
};

export default ServiceGrid;
