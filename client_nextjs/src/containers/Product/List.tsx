import React, { useEffect } from "react";
import { DEMO_POSTS } from "data/posts";
import { Helmet } from "react-helmet";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import ListProducts from "containers/PageHome/ListProducts";
import img2 from "images/hero/CoinAfrique_banner_1000x185.png";
import NcImage from "components/NcImage/NcImage";
import { BG_BACKGROUND, LIST_GRID_CLASS } from "containers/PageHome/Home";
import SectionHeroSlider from "components/SectionHero/SectionHeroSlider";

// DEMO DATA
const POSTS = DEMO_POSTS;

const ListProduct: React.FC = () => {
	useEffect(() => {
		const $body = document.querySelector("body");
		if ($body) {
			// $body.className = "theme-fuchsia-blueGrey";
			$body.className = "theme-cyan-blueGrey";
		}
		return () => {
			if ($body) {
				$body.className = "";
			}
		};
	}, []);

	return (
		<div className={`nc-PageHomeDemo3 overflow-hidden relative ` + BG_BACKGROUND}>
			<Helmet>
				<title>BAJORAH || Annonces</title>
			</Helmet>

			{/* ======== BG GLASS ======== */}
			<BgGlassmorphism />
			{/* ======== ALL SECTIONS ======== */}

			<div className="my-4">
				<SectionHeroSlider target="PRODUCT" defaultImage={img2} />
			</div>

			{/* ======= START CONTAINER ============= */}
			<div className="container relative " style={{ minHeight: "70vh" }}>
				<div className="mt-3">
					<ListProducts
						postCardName="card11"
						// gridClass="grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
						gridClass={LIST_GRID_CLASS}
						className="pb-16 lg:pb-28"
					/>
				</div>
			</div>
		</div >
	);
};

export default ListProduct;
