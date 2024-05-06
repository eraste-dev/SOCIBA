import React, { useEffect } from "react";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { DEMO_POSTS } from "data/posts";
import { Helmet } from "react-helmet";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionLatestPosts from "containers/PageHome/SectionLatestPosts";

// DEMO DATA
const POSTS = DEMO_POSTS;

const Properties: React.FC = () => {
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

export default Properties;
