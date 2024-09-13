import { FC, useEffect, useState } from "react";
import Heading from "components/Heading/Heading";
import Card11 from "components/Cards/Card11/Card11";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { IProduct, IPropertyFilter, PropertyAction } from "app/reducer/products/product";
import { useSelector } from "react-redux";
import { fetchAllProperties } from "app/axios/actions/api.action";
import { useLocation } from "react-router-dom";
import { IGetSearchPropertiesParams } from "utils/query-builder.utils";
import Loading from "components/UI/Loading";
import CardSkeleton from "components/Cards/CardSkeleton/CardSkeleton";
import FloatFilter from "components/Widgets/FloatFilter";
import NoDataMessage from "components/NoDataMessage";

export const getParams = (): IGetSearchPropertiesParams => {
	const params: IGetSearchPropertiesParams = {};

	// const params: IGetSearchPropertiesParams = searchParamsFromRedux(useStateFilter);
	const urlSearchParams = new URLSearchParams(window.location.search);
	const price_sort = urlSearchParams.get("price_sort");
	const location = urlSearchParams.get("location");
	const neighborhood = urlSearchParams.get("neighborhood");
	const category_slug = urlSearchParams.get("category_slug");
	const type = urlSearchParams.get("type");
	const category_uuid = urlSearchParams.get("category_uuid");
	const home_type = urlSearchParams.get("home_type");
	const category_slug_selected = urlSearchParams.get("category_slug_selected");

	console.log("urlSearchParams", {
		price_sort: price_sort,
		location: location,
		searchText: neighborhood,
		category_slug: category_slug,
		type: type,
		category_uuid: category_uuid,
		home_type: home_type,
		category_slug_selected: category_slug_selected,
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

	if (category_uuid) {
		params.category_uuid = category_uuid;
	}

	if (home_type) {
		params.home_type = home_type;
	}

	if (category_slug_selected) {
		params.category_slug_selected = category_slug_selected;
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

	const products = useAppSelector(PropertyAction.data)?.all?.get;
	const loading = useSelector(PropertyAction.data)?.all?.loading;

	const [useStateFilter, setUseStateFilter] = useState<IPropertyFilter>({});
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
			// TODO : fetch all properties
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

			<div className="flex flex-row xl:flex-row">
				<div className="hidden md:block w-1/5 sm:w-1/8 lg:w-1/4 xl:w-1/5">
					<FloatFilter
						useStateFilter={useStateFilter}
						setUseStateFilter={setUseStateFilter}
						showFilter={showFilter}
						toggleFilter={toggleFilter}
						fetchAll={fetchAll}
						noFloating={true}
						linear={false}
					/>
				</div>

				{/*  xl:pl-14 lg:pl-7 */}
				<div className="w-full sm:w-6/8 md:w-4/5 lg:w-3/4 xl:w-4/5 lg:pl-7">
					{loading && loading ? (
						<CardSkeleton arrayLength={8} />
					) : (
						<div className={`grid gap-6 md:gap-8 ${gridClass}`}>
							{products && products.map((post) => renderCard(post))}
						</div>
					)}

					{products?.length === 0 && <NoDataMessage />}

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
