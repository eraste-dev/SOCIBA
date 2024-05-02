import React, { useEffect } from "react";
import SectionVideos from "./SectionVideos";
import SectionSliderPosts from "./SectionSliderPosts";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { DEMO_POSTS, DEMO_POSTS_AUDIO } from "data/posts";
import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/hero/CoinAfrique_Voiture_credit_autochek.png";
import rightImgTwo from "images/hero/CoinAfrique_banner_1000x185.png";
import Vector1 from "images/Vector1.png";
import BecomeAnAuthorImg from "images/BecomeAnAuthorImg.png";
import { Helmet } from "react-helmet";
import SectionAds from "./SectionAds";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "data/authors";
import SectionMagazine5 from "./SectionMagazine5";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionLatestPosts from "./SectionLatestPosts";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionMagazine8 from "./SectionMagazine8";
import SectionMagazine9 from "./SectionMagazine9";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroSlider from "components/SectionHero/SectionHeroSlider";

// DEMO DATA
const POSTS = DEMO_POSTS;

// DEMO POST FOR MAGAZINE SECTION
const MAGAZINE1_TABS = ["all", "Garden", "Fitness", "Design"];
const MAGAZINE1_POSTS = POSTS.filter((_, i) => i >= 0 && i < 8);
//

const Home: React.FC = () => {
	useEffect(() => {
		const $body = document.querySelector("body");
		if ($body) {
			$body.className = "theme-fuchsia-blueGrey";
		}
		return () => {
			if ($body) {
				$body.className = "";
			}
		};
	}, []);

	return (
		<div className="nc-PageHomeDemo3 overflow-hidden relative">
			<Helmet>
				<title>SOCIBA || Annonces gratuites en Côte d'Ivoire</title>
			</Helmet>

			{/* ======== BG GLASS ======== */}
			<BgGlassmorphism />
			{/* ======== ALL SECTIONS ======== */}

			{/* ======= START CONTAINER ============= */}
			<div className="container relative">
				{/* === SECTION HERO === */}
				{/* className="pt-10 pb-16 md:py-16 lg:py-28" */}
				<SectionHeroSlider className="pb-16 " />

				<SectionGridCategoryBox headingCenter={false} categoryCardType="card2" className="pb-8 lg:pb-10" />

				{/* === SECTION 8 === */}
				<SectionSliderPosts className="py-16 lg:py-28" postCardName="card11" heading="Top annonce" subHeading="" posts={POSTS.filter((_, i) => i < 8)} uniqueSliderClass="PageHomeDemo3" />

				{/* === SECTION 1 === */}
				{/* <SectionAds className="py-16 lg:py-28" /> */}

				{/* === SECTION 8 === */}
				<SectionLatestPosts
					posts={DEMO_POSTS.filter((_, i) => i > 7 && i < 18)}
					widgetPosts={DEMO_POSTS.filter((_, i) => i > 2 && i < 7)}
					categories={DEMO_CATEGORIES.filter((_, i) => i > 2 && i < 8)}
					tags={DEMO_CATEGORIES}
					postCardName="card11"
					gridClass="sm:grid-cols-2 lg:grid-cols-3"
					className="pb-16 lg:pb-28"
				/>
			</div>
		</div>
	);
};

export default Home;
