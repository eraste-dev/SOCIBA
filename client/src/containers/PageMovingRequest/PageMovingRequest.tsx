import { FC } from "react";
import { Helmet } from "react-helmet";
import MovingFormContact from "./MovingFormContact";
import Image from "images/pages/moving.png";
import SectionHeroSlider from "components/SectionHero/SectionHeroSlider";

export interface PageMovingRequestProps {
	className?: string;
}

export const ABOUT_TEXT: { TITLE: string; DESCRIPTION: string } = {
	TITLE: "",
	DESCRIPTION:
		"Notre vision avec est de permettre à toute personne de trouver en quelques clics son futur logement ou réservation de son choix à un prix adapté à son budget et en toute sécurité. Nous sommes déterminés à offrir un site web d'annonces et de promotion immobilières qui offre une liste infinie de choix pour la population. Grâce à notre plateforme, vous pouvez facilement trouver votre logement idéal, sans vous soucier des formalités et des coûts associés à la recherche traditionnelle.",
};

const PageMovingRequest: FC<PageMovingRequestProps> = ({ className = "" }) => {
	return (
		<div
			className={`nc-PageMovingRequest overflow-hidden relative ${className}`}
			data-nc-id="PageMovingRequest"
		>
			<Helmet>
				<title>Demenagement || BAJORAH</title>
			</Helmet>

			{/* ======== BG GLASS ======== */}
			{/* <BgGlassmorphism /> */}

			<SectionHeroSlider target="MOVING" defaultImage={Image} />

			<div className="container space-y-5">
				{/* <SectionSubscribe2 /> */}
				{/* <SectionFounder /> */}

				<MovingFormContact />
			</div>
		</div>
	);
};

export default PageMovingRequest;
