import { FC, useEffect } from "react";
import Heading from "components/Heading/Heading";
import Card11 from "components/Card/Card11/Card11";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { IProperty, PropertyAction } from "app/reducer/products/propertiy";
import { useSelector } from "react-redux";
import { fetchAllProperties } from "app/axios/api.action";
import { useHistory, useLocation } from "react-router-dom";
import { IGetSearchPropertiesParams, searchParamsFromRedux } from "utils/query-builder.utils";
import Loading from "components/UI/Loading";
import ProductFilterSidebar from "components/Widgets/ProductFilterSidebar";
import CardSkeleton from "components/Card/CardSkeleton/CardSkeleton";

// THIS IS DEMO FOR MAIN DEMO
// OTHER DEMO WILL PASS PROPS

//
export interface ListProductsProps {
	gridClass?: string;
	className?: string;
	heading?: string;
	postCardName?: "card3" | "card4" | "card7" | "card9" | "card10" | "card11" | "card14";
}

const ListProducts: FC<ListProductsProps> = ({ heading = "Annonces", gridClass = "", className = "" }) => {
	const dispatch = useAppDispatch();
	const history = useHistory();

	const products = useAppSelector(PropertyAction.data)?.all?.get;
	const filters = useAppSelector(PropertyAction.data)?.filters;
	const loading = useSelector(PropertyAction.data)?.all?.loading;

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const paramLocation = searchParams.get("location_id");

	useEffect(() => {
		if (!products && !loading) {
			const payload: IGetSearchPropertiesParams = {};
			if (paramLocation) {
				payload.location = paramLocation;
			}
			dispatch(fetchAllProperties(payload));
		}
	}, [dispatch, fetchAllProperties, products, loading]);

	const fetchAll = () => {
		if (filters) {
			const params: IGetSearchPropertiesParams = searchParamsFromRedux(filters);
			console.log(params, history.location, "searchParamsFromURL()");
			// return dispatch(fetchAllProperties(searchParamsFromURL()));
			return dispatch(fetchAllProperties(params));
		}
	};

	const renderCard = (post: IProperty) => {
		return <Card11 key={post.id} post={post} />;
	};

	if (loading) {
		<Loading />;
	}

	return (
		<div className={`nc-ListProducts relative ${className}`}>
			<div className="mt-5">
				<Heading>{heading}</Heading>
			</div>
			<div className="flex flex-col lg:flex-row">
				<div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-1/4 lg:pl-10 xl:pl-0 xl:w-1/6 ">
					<ProductFilterSidebar fetchAll={fetchAll} />
				</div>

				<div className="w-full lg:w-3/4 xl:w-5/6 xl:pl-14 lg:pl-7">
					{loading && loading ? (
						<CardSkeleton arrayLength={8} />
					) : (
						<div className={`grid gap-6 md:gap-8 ${gridClass}`}>{products && products.map((post) => renderCard(post))}</div>
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
