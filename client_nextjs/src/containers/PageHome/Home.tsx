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

				{/* <SectionGridCategoryBox headingCenter={false} categoryCardType="card2" className="pb-8 lg:pb-10" /> */}
				<SectionGridCitiesBox headingCenter={false} categoryCardType="card1" className="pb-8 lg:pb-10" />

				{/* === SECTION 8 === */}
				<SectionSliderPosts
					className="py-16 lg:py-28"
					postCardName="card11"
					heading="Top annonce"
					subHeading=""
					uniqueSliderClass="slider-top"
				/>

				{/* === SECTION 1 === */}
				{/* <SectionAds className="py-16 lg:py-28" /> */}

				{/* === SECTION 8 === */}
				<SectionLatestPosts
					posts={DEMO_POSTS.filter((_, i) => i > 7 && i < 18)}
					widgetPosts={DEMO_POSTS.filter((_, i) => i > 2 && i < 7)}
					categories={DEMO_CATEGORIES.filter((_, i) => i > 2 && i < 8)}
					tags={DEMO_CATEGORIES}
					postCardName="card11"
					gridClass="grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
					className="pb-16 lg:pb-28"
				/>
			</div>
		</div>
	);
};

export default Home;
