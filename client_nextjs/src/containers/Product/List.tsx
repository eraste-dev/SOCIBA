import React, { useEffect } from "react";
import { DEMO_POSTS } from "data/posts";
import { Helmet } from "react-helmet";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import ListProducts from "containers/PageHome/ListProducts";
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
					{/* TODO : use dynamic image */}
					<NcImage src={img2} />
				</div>

				<div className="mt-3">
					<ListProducts
						postCardName="card11"
						gridClass="sm:grid-cols-2 lg:grid-cols-4"
						className="pb-16 lg:pb-28"
					/>
				</div>
			</div>
		</div>
	);
};

export default ListProduct;
