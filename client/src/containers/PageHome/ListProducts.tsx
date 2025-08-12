import { FC, useEffect, useState } from "react";
import Heading from "components/Heading/Heading";
import Card11 from "components/Cards/Card11/Card11";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { IProduct, IPropertyFilter, PropertyAction } from "app/reducer/products/product";
import { useSelector } from "react-redux";
import { fetchAllProperties } from "app/axios/actions/api.action";
import { IGetSearchPropertiesParams, TypeSearch } from "utils/query-builder.utils";
import Loading from "components/UI/Loading";
import CardSkeleton from "components/Cards/CardSkeleton/CardSkeleton";
import AdvancedSearch from 'components/Header/AdvancedSearch';
import NoDataMessage from "components/NoDataMessage";
import { useLocation } from 'react-router-dom';
import { Dialog } from '@headlessui/react';

export const getParams = (): IGetSearchPropertiesParams => {
	const params: IGetSearchPropertiesParams = {};

	// const params: IGetSearchPropertiesParams = searchParamsFromRedux(useStateFilter);
	const urlSearchParams = new URLSearchParams(window.location.search);
	const price_sort = urlSearchParams.get("price_sort");
	const location = urlSearchParams.get("location");
	const unlisted_location = urlSearchParams.get("unlisted_location");
	const searchText = urlSearchParams.get("searchText");
	const locationDescription = urlSearchParams.get("location_description");
	const category_slug = urlSearchParams.get("category_slug");
	const type = urlSearchParams.get("type");
	const category_uuid = urlSearchParams.get("category_uuid");
	const home_type = urlSearchParams.get("home_type");
	const category_slug_selected = urlSearchParams.get("category_slug_selected");
	const other_location = urlSearchParams.get("other_location");

	console.log("urlSearchParams", {
		price_sort: price_sort,
		location: location,
		searchText: searchText,
		locationDescription: locationDescription,
		category_slug: category_slug,
		type: type,
		category_uuid: category_uuid,
		home_type: home_type,
		category_slug_selected: category_slug_selected,
		unlisted_location: unlisted_location,
		other_location: other_location,
	});

	if (price_sort) {
		params.price_sort = price_sort as "asc" | "desc";
	}

	if (location) {
		params.location = location;
	}

	if (unlisted_location && !params.location) {
		params.unlisted_location = true;
		// params.location = undefined;
	}

	if (searchText) {
		params.searchText = searchText;
	}

	if (locationDescription) {
		params.location_description = locationDescription;
	}

	if (category_slug) {
		params.category_slug = category_slug;
	}

	if (type) {
		params.type = type as TypeSearch;
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

	if (other_location) {
		params.other_location = other_location;
	}

	return params;
};

export const getParamsCount = (): number => {
	let output: number = 0;
	const params: IGetSearchPropertiesParams = getParams();

	return Object.keys(params).length ?? output;
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
	const location = useLocation();

	const products = useAppSelector(PropertyAction.data)?.all?.get;
	const loading = useSelector(PropertyAction.data)?.all?.loading;
	const error = useSelector(PropertyAction.data)?.all?.error;

	const [useStateFilter, setUseStateFilter] = useState<IPropertyFilter>({});
	const [showFilter, setShowFilter] = useState(false);
	const toggleFilter = () => setShowFilter(!showFilter);
	const [showAdvancedMobile, setShowAdvancedMobile] = useState(false);

	const fetchAll = () => {
		if (!loading && !error) {
			return dispatch(fetchAllProperties(getParams()));
		}
	};

	const renderCard = (post: IProduct) => {
		return <Card11 key={post.id} post={post} />;
	};

	useEffect(() => {
		dispatch(fetchAllProperties(getParams()));
	}, [dispatch, location.search]);

	if (loading) {
		<Loading />;
	}

	return (
		<div className={`nc-ListProducts relative ${className}`} id="post-list">
			<div className="mt-5">
				<Heading>{heading}</Heading>
			</div>

			{/* flex flex-row xl:flex-row */}
			<div className="grid sm:grid-cols-12 grid-cols-1">
				{/* hidden md:block w-1/5 sm:w-1/8 lg:w-1/4 xl:w-1/5 */}
				<div className="col-span-1 sm:col-span-2">
					<div className="hidden sm:block">
						<AdvancedSearch />
					</div>
				</div>

				{/*  xl:pl-14 lg:pl-7 */}
				{/* w-full sm:w-6/8 md:w-4/5 lg:w-3/4 xl:w-4/5 lg:pl-7 */}
				<div className="col-span-1 sm:col-span-10 px-4 ">
					{loading && loading ? (
						<CardSkeleton arrayLength={8} />
					) : (
						<div className={`grid gap-3 md:gap-4 ${gridClass}`}>
							{products && products.map((post) => renderCard(post))}
						</div>
					)}

					{products?.length === 0 && <NoDataMessage />}

					{false && (
						<div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-center sm:items-center">
							{/* <Pagination /> */}
							{/* <ButtonPrimary>Show me more</ButtonPrimary> */}
						</div>
					)}
				</div>
			</div>
			{/* Bouton flottant mobile */}
			<div className="block sm:hidden">
				<button
					className="fixed left-4 bottom-4 z-50 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full flex items-center shadow-lg"
					onClick={() => setShowAdvancedMobile(true)}
				>
					<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					Rechercher
				</button>
				<Dialog open={showAdvancedMobile} onClose={() => setShowAdvancedMobile(false)} className="fixed z-50 inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen p-4">
						<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
						<div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-4 z-10">
							<button
								onClick={() => setShowAdvancedMobile(false)}
								className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
								aria-label="Fermer"
							>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
							<AdvancedSearch onClose={() => setShowAdvancedMobile(false)} />
						</div>
					</div>
				</Dialog>
			</div>
		</div>
	);
};

export default ListProducts;
