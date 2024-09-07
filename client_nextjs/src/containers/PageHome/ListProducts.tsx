import { FC, useEffect, useState } from "react";
import Heading from "components/Heading/Heading";
import Card11 from "components/Cards/Card11/Card11";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { IProduct, IPropertyFilter, PropertyAction } from "app/reducer/products/product";
import { useSelector } from "react-redux";
import { fetchAllProperties } from "app/axios/actions/api.action";
import { useHistory, useLocation } from "react-router-dom";
import { IGetSearchPropertiesParams } from "utils/query-builder.utils";
import Loading from "components/UI/Loading";
import CardSkeleton from "components/Cards/CardSkeleton/CardSkeleton";
import FloatFilter from "components/Widgets/FloatFilter";
import { CategoryAction } from "app/reducer/products/propertiy-category";

export const getParams = (): IGetSearchPropertiesParams => {
	const params: IGetSearchPropertiesParams = {};
	// const params: IGetSearchPropertiesParams = searchParamsFromRedux(useStateFilter);
	const urlSearchParams = new URLSearchParams(window.location.search);
	const price_sort = urlSearchParams.get("price_sort");
	const location = urlSearchParams.get("location");
	const neighborhood = urlSearchParams.get("neighborhood");
	const category_slug = urlSearchParams.get("category_slug");
	const type = urlSearchParams.get("type");

	console.log("urlSearchParams", {
		price_sort: price_sort,
		location: location,
		searchText: neighborhood,
		category_slug: category_slug,
		type: type,
	});

	if (price_sort) {
		params.price_sort = price_sort as "asc" | "desc";
	}

	if (location) {
		params.location = location;
	}

	if (neighborhood) {
		params.searchText = neighborhood;
	}

	if (category_slug) {
		params.category_slug = category_slug;
	}

	if (type) {
		params.type = type;
	}

	return params;
};

export interface ListProductsProps {
	gridClass?: string;
	className?: string;
	heading?: string;
	postCardName?: "card3" | "card4" | "card7" | "card9" | "card10" | "card11" | "card14";
}

const ListProducts: FC<ListProductsProps> = ({
	heading = "Annonces",
	gridClass = "",
	className = "",
}) => {
	const dispatch = useAppDispatch();
	const history = useHistory();

	const products = useAppSelector(PropertyAction.data)?.all?.get;
	const categories = useAppSelector(CategoryAction.data);
	const filters = useAppSelector(PropertyAction.data)?.filters;
	const loading = useSelector(PropertyAction.data)?.all?.loading;

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const paramLocation = searchParams.get("location_id");

	const [useStateFilter, setUseStateFilter] = useState<IPropertyFilter>({});
	const [isFetched, setIsFetched] = useState<IPropertyFilter>({});
	const [showFilter, setShowFilter] = useState(false);
	const toggleFilter = () => setShowFilter(!showFilter);

	const fetchAll = () => {
		return dispatch(fetchAllProperties(getParams()));
	};

	const renderCard = (post: IProduct) => {
		return <Card11 key={post.id} post={post} />;
	};

	useEffect(() => {
		if (!products && !loading) {
			dispatch(fetchAllProperties(getParams()));
		}
	}, [dispatch, fetchAllProperties, getParams, products, loading]);

	if (loading) {
		<Loading />;
	}

	return (
		<div className={`nc-ListProducts relative ${className}`}>
			<div className="mt-5">
				<Heading>{heading}</Heading>
			</div>

			{/* <FloatFilter
				useStateFilter={useStateFilter}
				setUseStateFilter={setUseStateFilter}
				showFilter={showFilter}
				toggleFilter={toggleFilter}
				fetchAll={fetchAll}
			/> */}

			<div className="flex flex-col lg:flex-row">
				<div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-1/4 lg:pl-10 xl:pl-0 xl:w-1/6 ">
					<FloatFilter
						useStateFilter={useStateFilter}
						setUseStateFilter={setUseStateFilter}
						showFilter={showFilter}
						toggleFilter={toggleFilter}
						fetchAll={fetchAll}
						noFloating={true}
					/>
				</div>

				{/*  xl:pl-14 lg:pl-7 */}
				<div className="w-full lg:w-4/4 xl:w-6/6 ">
					{loading && loading ? (
						<CardSkeleton arrayLength={8} />
					) : (
						<div className={`grid gap-6 md:gap-8 ${gridClass}`}>
							{products && products.map((post) => renderCard(post))}
						</div>
					)}
					<div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-center sm:items-center">
						{/* <Pagination /> */}
						{/* <ButtonPrimary>Show me more</ButtonPrimary> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListProducts;
