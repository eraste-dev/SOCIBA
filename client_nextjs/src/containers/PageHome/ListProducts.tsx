import { FC, useEffect } from "react";
import Heading from "components/Heading/Heading";
import { DEMO_POSTS } from "data/posts";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
import { PostAuthorType, PostDataType, TaxonomyType } from "data/types";
import WidgetCategories from "components/Widgets/WidgetCategories/WidgetCategories";
import { DEMO_AUTHORS } from "data/authors";
import Pagination from "components/Pagination/Pagination";
import Card11 from "components/Card/Card11/Card11";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { IProperty, PropertyAction } from "app/reducer/products/propertiy";
import { useSelector } from "react-redux";
import { fetchAllProperties } from "app/axios/api.action";
import WidgetSort from "components/Widgets/WidgetSort/WidgetSort";
import WidgePrice from "components/Widgets/WidgePrice/WidgePrice";
import { useParams, useLocation } from "react-router-dom";
import { IGetSearchPropertiesParams } from "utils/query-builder.utils";

// THIS IS DEMO FOR MAIN DEMO
// OTHER DEMO WILL PASS PROPS
const postsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 7 && i < 17);
const widgetPostsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 2 && i < 7);
const tagsDemo = DEMO_TAGS.filter((_, i) => i > 5);
const categoriesDemo: TaxonomyType[] = DEMO_CATEGORIES.filter((_, i) => i > 7 && i < 13);
const authorsDemo: PostAuthorType[] = DEMO_AUTHORS.filter((_, i) => i < 5);

//
export interface ListProductsProps {
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

const ListProducts: FC<ListProductsProps> = ({
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
	const products = useAppSelector(PropertyAction.data)?.all;
	const loading = useSelector(PropertyAction.loading);

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const paramLocation = searchParams.get("location_id");
	console.log(paramLocation, "debug params");

	useEffect(() => {
		if (!products && !loading) {
			const payload: IGetSearchPropertiesParams = {};
			if (paramLocation) {
				payload.location = paramLocation;
			}
			dispatch(fetchAllProperties(payload));
		}
	}, [dispatch, fetchAllProperties, products, loading]);

	const renderCard = (post: IProperty) => {
		return <Card11 key={post.id} post={post} />;
	};

	return (
		<div className={`nc-ListProducts relative ${className}`}>
			<div className="mt-5">
				<Heading>{heading}</Heading>
			</div>
			<div className="flex flex-col lg:flex-row">
				<div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-1/4 lg:pl-10 xl:pl-0 xl:w-1/6 ">
					<WidgetSort />
					<WidgetCategories />
					<WidgePrice />
				</div>
				<div className="w-full lg:w-3/4 xl:w-5/6 xl:pl-14 lg:pl-7">
					<div className={`grid gap-6 md:gap-8 ${gridClass}`}>{products && products.map((post) => renderCard(post))}</div>
					<div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-center sm:items-center">
						<Pagination />
						{/* <ButtonPrimary>Show me more</ButtonPrimary> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListProducts;
