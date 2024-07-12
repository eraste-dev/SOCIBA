import React, { useEffect } from "react";
import SectionSliderPosts from "./SectionSliderPosts";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { DEMO_POSTS } from "data/posts";
import { Helmet } from "react-helmet";
import SectionLatestPosts from "./SectionLatestPosts";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroSlider from "components/SectionHero/SectionHeroSlider";
import SectionGridCitiesBox from "components/SectionGridCitiesBox/SectionGridCitiesBox";
import SectionSliderCities from "./SectionSliderCities";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionGridCitiesBoxTwo from "components/SectionGridCitiesBox/SectionGridCitiesBoxTwo";

// DEMO DATA
const POSTS = DEMO_POSTS;

const Home: React.FC = () => {
	useEffect(() => {
		const $body = document.querySelector("body");
		if ($body) {
			$body.className = "theme-cyan-blueGrey";
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
				{/* === SECTION HERO === */}

				{/* === SECTION CITIES === */}
				{/* <SectionGridCitiesBox
					headingCenter={false}
					categoryCardType="card1"
					className="pb-8 lg:pb-10"
				/> */}

				<SectionSliderCities
					className=""
					categoryCardType="card1"
					heading=" "
					subHeading="Ou souhaitez-vous trouver votre logement ?"
					uniqueSliderClass="slider-top"
				/>

				{/* <SectionGridCitiesBoxTwo
					className="pb-16 lg:pb-28"
					categoryCardType="card5"
					itemPerRow={4}
					uniqueSliderClass="PageHomeDemo2"
				/> */}

				{/* === SECTION CITIES === */}

				{/* === SECTION TOP POSTS === */}
				<SectionSliderPosts
					className="py-16 lg:py-28"
					postCardName="card11"
					heading="Les meilleures publisations actuellement"
					subHeading=""
					uniqueSliderClass="slider-top"
				/>
				{/* === SECTION TOP POSTS === */}

				{/* === SECTION LATEST POSTS === */}
				<SectionLatestPosts
					posts={DEMO_POSTS.filter((_, i) => i > 7 && i < 18)}
					widgetPosts={DEMO_POSTS.filter((_, i) => i > 2 && i < 7)}
					categories={DEMO_CATEGORIES.filter((_, i) => i > 2 && i < 8)}
					tags={DEMO_CATEGORIES}
					postCardName="card11"
					gridClass="grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
					className="pb-16 lg:pb-28"
				/>
				{/* === SECTION LATEST POSTS === */}
			</div>
		</div>
	);
};

export default Home;
