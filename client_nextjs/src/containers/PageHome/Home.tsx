import React, { useEffect } from "react";
import SectionSliderPosts from "./SectionSliderPosts";
import { DEMO_POSTS } from "data/posts";
import { Helmet } from "react-helmet";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroSlider from "components/SectionHero/SectionHeroSlider";
import SectionSliderCities from "./SectionSliderCities";
import ListProducts from "./ListProducts";
import SectionSliderCitiesTwo from "./SectionSliderCitiesTwo";

// DEMO DATA
const POSTS = DEMO_POSTS;

export const LIST_GRID_CLASS: string =
	"grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4";
export const LIST_RELATED_GRID_CLASS: string =
	"grid-cols-6";

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
				<title>BAJORAH || Annonces gratuites en Côte d'Ivoire</title>
			</Helmet>

			{/* ======== BG GLASS ======== */}
			<BgGlassmorphism />
			{/* ======== ALL SECTIONS ======== */}

			{/* === SECTION HERO === */}
			{/* className="pt-10 pb-16 md:py-16 lg:py-28" */}
			<SectionHeroSlider className="pb-0" />
			{/* === SECTION HERO === */}

			{/* ======= START CONTAINER ============= */}
			<div className="container relative">
				{/* === SECTION CITIES === */}
				{/* <SectionGridCitiesBox
					headingCenter={false}
					categoryCardType="card1"
					className="pb-8 lg:pb-10"
				/> */}

				{true ? (
					<SectionSliderCitiesTwo
						className="mb-3"
						categoryCardType="card1"
						sliderStype="style1"
						heading=" "
						subHeading="Ou souhaitez-vous trouver votre logement ?"
					/>
				) : (
					<SectionSliderCities
						className="mb-3"
						categoryCardType="card1"
						sliderStype="style1"
						heading=" "
						subHeading="Ou souhaitez-vous trouver votre logement ?"
						uniqueSliderClass="slider-top"
					/>
				)}

				{/* <SectionGridCitiesBoxTwo
					className="pb-16 lg:pb-28"
					categoryCardType="card5"
					itemPerRow={4}
					uniqueSliderClass="PageHomeDemo2"
				/> */}

				{/* === SECTION CITIES === */}

				{/* === SECTION TOP POSTS === */}
				<SectionSliderPosts
					className="pt-1 pb-3 my-0"
					postCardName="card11"
					heading="Les plus récentes"
					subHeading=""
					uniqueSliderClass="slider-top"
				/>
				{/* === SECTION TOP POSTS === */}

				{/* === SECTION LATEST POSTS === */}
				{/* <SectionLatestPosts
					posts={DEMO_POSTS.filter((_, i) => i > 7 && i < 18)}
					widgetPosts={DEMO_POSTS.filter((_, i) => i > 2 && i < 7)}
					categories={DEMO_CATEGORIES.filter((_, i) => i > 2 && i < 8)}
					tags={DEMO_CATEGORIES}
					postCardName="card11"
					gridClass="grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3"
					className="pb-16 lg:pb-28"
				/> */}

				<ListProducts
					postCardName="card11"
					// gridClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
					gridClass={LIST_GRID_CLASS}
					className="pb-16 lg:pb-28"
				/>
				{/* === SECTION LATEST POSTS === */}
			</div>
		</div>
	);
};

export default Home;
