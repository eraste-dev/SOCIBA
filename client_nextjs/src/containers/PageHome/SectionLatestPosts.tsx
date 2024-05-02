import React, { FC, useEffect } from "react";
import Card3 from "components/Card3/Card3";
import Heading from "components/Heading/Heading";
import WidgetTags from "components/WidgetTags/WidgetTags";
import { DEMO_POSTS } from "data/posts";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
import { PostAuthorType, PostDataType, TaxonomyType } from "data/types";
import WidgetCategories from "components/WidgetCategories/WidgetCategories";
import { DEMO_AUTHORS } from "data/authors";
import WidgetAuthors from "components/WidgetAuthors/WidgetAuthors";
import WidgetPosts from "components/WidgetPosts/WidgetPosts";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Card4 from "components/Card4/Card4";
import Card7 from "components/Card7/Card7";
import Card9 from "components/Card9/Card9";
import Card10 from "components/Card10/Card10";
import Card11 from "components/Card11/Card11";
import Card14 from "components/Card14/Card14";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { IProperty, PropertyAction } from "app/properties/propertiy";
import { useSelector } from "react-redux";
import { fetchAllProperties, fetchFeatureProperties } from "app/axios/api.action";

// THIS IS DEMO FOR MAIN DEMO
// OTHER DEMO WILL PASS PROPS
const postsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 7 && i < 17);
const widgetPostsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 2 && i < 7);
const tagsDemo = DEMO_TAGS.filter((_, i) => i > 5);
const categoriesDemo: TaxonomyType[] = DEMO_CATEGORIES.filter((_, i) => i > 7 && i < 13);
const authorsDemo: PostAuthorType[] = DEMO_AUTHORS.filter((_, i) => i < 5);

//
export interface SectionLatestPostsProps {
	posts?: PostDataType[];
	widgetPosts?: PostDataType[];
	categories?: TaxonomyType[];
	tags?: TaxonomyType[];
	authors?: PostAuthorType[];
	gridClass?: string;
	className?: string;
	heading?: string;
	postCardName?: "card3" | "card4" | "card7" | "card9" | "card10" | "card11" | "card14";
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
	posts = postsDemo,
	widgetPosts = widgetPostsDemo,
	categories = categoriesDemo,
	tags = tagsDemo,
	authors = authorsDemo,
	postCardName = "card3",
	heading = "Dernières Annonces",
	gridClass = "",
	className = "",
}) => {
	const dispatch = useAppDispatch();
	const data = useAppSelector(PropertyAction.data);
	const loading = useSelector(PropertyAction.loading);
	// const error = useSelector(PropertyAction.error);
	// const success = useSelector(PropertyAction.success);

	useEffect(() => {
		if (data && !data.all && !loading) {
			dispatch(fetchAllProperties({ limit: 33, orderBy: "desc" }));
		}
	}, [dispatch, fetchAllProperties, data, loading]);

	const renderCard = (post: IProperty) => {
    return <Card11 key={post.id} post={post} />;

		// switch (postCardName) {
		// 	case "card3":
		// 		return <Card3 key={post.id} className="p-3 sm:p-5 2xl:p-6 [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]" post={post} />;
		// 	case "card4":
		// 		return <Card4 key={post.id} post={post} />;
		// 	case "card7":
		// 		return <Card7 key={post.id} post={post} ratio="aspect-w-5 aspect-h-5" />;
		// 	case "card9":
		// 		return <Card9 key={post.id} post={post} />;
		// 	case "card10":
		// 		return <Card10 key={post.id} post={post} />;
		// 	case "card11":
		// 		return <Card11 key={post.id} post={post} />;
		// 	case "card14":
		// 		return <Card14 key={post.id} post={post} />;
		// 	default:
		// 		return null;
		// }
	};

	return (
		<div className={`nc-SectionLatestPosts relative ${className}`}>
			<div className="flex flex-col lg:flex-row">
				<div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/4 ">
					<WidgetTags tags={tags} />
					<WidgetCategories categories={categories} />
					<WidgetAuthors authors={authors} />
					<WidgetPosts posts={widgetPosts} />
				</div>
				<div className="w-full lg:w-3/5 xl:w-3/4 xl:pl-14">
					<Heading>{heading}</Heading>
					<div className={`grid gap-6 md:gap-8 ${gridClass}`}>{data && data?.all && data?.all.map((post) => renderCard(post))}</div>
					<div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-center sm:items-center">
						<Pagination />
						{/* <ButtonPrimary>Show me more</ButtonPrimary> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SectionLatestPosts;
