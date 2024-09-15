import React from "react";
import { motion } from "framer-motion";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import NcImage from "components/NcImage/NcImage";
import ImageOne from "../../images/pages/about/1.jpg";
import ImageTWo from "../../images/pages/about/2.jpg";
import ServiceGrid from "./ServiceGrid";

const SectionFounderStatic = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}
			className="mt-2 mb-12"
		>
			<BgGlassmorphism />
			<div className="grid grid-cols-5">
				<div className="col-span-5 md:col-span-3 px-2">
					<div className="pr-12">
						<h1 className="text-lg font-bold mb-4">A PROPOS DE NOUS</h1>
						<p className="text-base mb-4 text-justify">
							Nous sommes une entreprise de promotion immobilière sise à Abidjan
							Cocody Angré, spécialisée dans la mise en relation immobilière, la
							promotion et la valorisation de biens immobiliers.
						</p>
						<p className="text-base mb-4 text-justify">
							Nous offrons, pour vos besoins de logement, une liste infinie de biens
							immobiliers disponibles en vente ou en location partout en Côte
							d'Ivoire.
						</p>

						<p className="text-base mb-4 text-justify">
							Nous facilitons vos recherches en vous proposant ceux adaptés à vos
							besoins en un clic.
						</p>
						<p className="text-base mb-4 text-justify">
							<strong>Pour les Démarcheurs</strong>,{" "}
							<strong>Propriétaires de biens ou Agences…</strong>
							<span className="ml-2">
								Nous vous favorisons une plus large diffusion de vos annonces de :
							</span>
						</p>

						<ul className="text-base mb-2 pl-8">
							<li>Location</li>
							<li>Réservations</li>
							<li>Et de Vente</li>
						</ul>

						<p className="text-justify">
							Nous faisons la promotion et la valorisation de vos biens immobiliers
							auprès de plusieurs clients potentiels par jour (locataires / acheteurs)
							qui correspondent à vos critères.
						</p>
						<p className="text-base mb-4 text-justify">
							NB : Entreprise ou Particulier, vous avez aussi la possibilité de nous
							contacter pour la mise en location, en réservations ou en vente de vos
							biens immobiliers sur notre site en ligne.
						</p>
						{false && (
							<>
								<h2 className="text-lg font-bold mb-4">Prestation en ligne :</h2>
								<ul className="list-disc pl-8 text-base mb-4 ">
									<li>Création de contenu</li>
									<li>Recherche de nouveaux clients</li>
									<li>Attirer plus de potentiel client et fidélisation</li>
									<li>Gestion du compte et de la base de données clientèles</li>
									<li>Suivi et mise à jour de chaque compte</li>
									<li>Enregistrement et traitement de nouvelles demandes</li>
								</ul>
							</>
						)}
					</div>
				</div>
				<div className="col-span-5 md:col-span-2">
					<div className="p-8">
						{false && <NcImage src={ImageOne} />}
						{true && <NcImage src={ImageTWo} />}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-5">
				<div className="col-span-5">
					<div className="mt-2 mb-4">
						<h2 className="text-base font-bold mb-4">Prestation en ligne :</h2>
						<ServiceGrid />
					</div>
				</div>
			</div>

			<div className="grid grid-cols-5">
				<div className="col-span-5">
					<div className="">
						<p className="text-base text-justify">
							Nous mettrons tous les moyens en œuvre afin de satisfaire nos clients
							dans leurs recherches de bien immobilier. Nous offrons une plus large
							diffusion des biens qui nous sont confiés. N’hésitez pas à nous
							contacter au 07 59 85 55 44 de 08h à 21h pour plus d’informations.
						</p>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default SectionFounderStatic;
