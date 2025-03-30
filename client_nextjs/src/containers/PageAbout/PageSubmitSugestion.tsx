import { FC } from 'react';
import SectionFounder from './SectionFounder';
import SectionStatistic from './SectionStatistic';
import { Helmet } from 'react-helmet';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import BackgroundSection from 'components/BackgroundSection/BackgroundSection';
import SectionFormSugestion from './SectionFormSugestion';

export interface PageSubmitSugestionProps {
  className?: string;
}

export const ABOUT_TEXT: { TITLE: string; DESCRIPTION: string } = {
  TITLE: '',
  DESCRIPTION:
    "Notre vision avec est de permettre à toute personne de trouver en quelques clics son futur logement ou réservation de son choix à un prix adapté à son budget et en toute sécurité. Nous sommes déterminés à offrir un site web d'annonces et de promotion immobilières qui offre une liste infinie de choix pour la population. Grâce à notre plateforme, vous pouvez facilement trouver votre logement idéal, sans vous soucier des formalités et des coûts associés à la recherche traditionnelle.",
};

const PageSubmitSugestion: FC<PageSubmitSugestionProps> = ({ className = '' }) => {
  return (
    <div className={`nc-PageSubmitSugestion overflow-hidden relative ${className}`} data-nc-id="PageSubmitSugestion">
      <Helmet>
        <title>A propos || BAJORAH</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism className="my-0" />

      {/* py-16 lg:py-28 */}
      <div className="container py-5 ">
        {/* <SectionHero rightImg={rightImg} heading={ABOUT_TEXT.TITLE} btnText="" subHeading={ABOUT_TEXT.DESCRIPTION} /> */}

        <SectionFormSugestion />
      </div>
    </div>
  );
};

export default PageSubmitSugestion;
