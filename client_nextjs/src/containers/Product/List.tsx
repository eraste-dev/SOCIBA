import React, { useEffect } from "react";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { DEMO_POSTS } from "data/posts";
import { Helmet } from "react-helmet";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionLatestPosts from "containers/PageHome/SectionLatestPosts";
import ListProducts from "containers/PageHome/ListProducts";
import img1 from "images/hero/CoinAfrique_Voiture_credit_autochek.png";
import img2 from "images/hero/CoinAfrique_banner_1000x185.png";
import NcImage from "components/NcImage/NcImage";

// DEMO DATA
const POSTS = DEMO_POSTS;

const ListProduct: React.FC = () => {
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
				<title>SOCIBA || Annonces</title>
			</Helmet>

			{/* ======== BG GLASS ======== */}
			<BgGlassmorphism />
			{/* ======== ALL SECTIONS ======== */}

			{/* ======= START CONTAINER ============= */}
			<div className="container relative">
				<div className="my-4" style={{ height: 200, overflow: "hidden" }}>
					<NcImage src={img2} />
				</div>

				<div className="mt-3">
					<ListProducts
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
		</div>
	);
};

export default ListProduct;
