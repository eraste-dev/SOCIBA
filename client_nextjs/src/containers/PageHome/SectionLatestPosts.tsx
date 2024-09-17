import { FC, useEffect, useRef, useState } from "react";
import Heading from "components/Heading/Heading";
import { PostAuthorType, PostDataType, TaxonomyType } from "data/types";
import Card11 from "components/Cards/Card11/Card11";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { IProduct, IPropertyFilter, PropertyAction } from "app/reducer/products/product";
import { useSelector } from "react-redux";
import { fetchAllProperties } from "app/axios/actions/api.action";
import CardSkeleton from "components/Cards/CardSkeleton/CardSkeleton";
import { IGetSearchPropertiesParams, searchParamsFromRedux } from "utils/query-builder.utils";
import { useHistory } from "react-router-dom";
import NoDataMessage from "components/NoDataMessage";
import FloatFilter from "components/Widgets/FloatFilter";
import ListProducts, { getParams } from "./ListProducts";

// THIS IS DEMO FOR MAIN DEMO
// OTHER DEMO WILL PASS PROPS

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
	heading = "Publiées récements",
	gridClass = "",
	className = "",
}) => {
	const dispatch = useAppDispatch();
	const history = useHistory();

	const data = useAppSelector(PropertyAction.data)?.all?.get;
	const filters = useAppSelector(PropertyAction.data)?.filters;
	const [useStateFilter, setUseStateFilter] = useState<IPropertyFilter>({});
	const [isFetched, setIsFetched] = useState<IPropertyFilter>({});
	const previousFilterRef = useRef(useStateFilter);
	const loading = useSelector(PropertyAction.data)?.all?.loading;
	const error = useSelector(PropertyAction.data)?.all?.error;

	const [showFilter, setShowFilter] = useState(false);

	const toggleFilter = () => setShowFilter(!showFilter);

	useEffect(() => {
		if (!data && !loading && !error && filters) {
			const params: IGetSearchPropertiesParams = searchParamsFromRedux(filters);
			// TODO : fetch all properties
			// dispatch(fetchAllProperties(params));
		}
	}, [dispatch, fetchAllProperties, data, loading, error]);

	useEffect(() => {
		const fetchData = async () => {
			if (
				!loading &&
				data &&
				useStateFilter &&
				previousFilterRef &&
				previousFilterRef.current !== useStateFilter &&
				isFetched !== useStateFilter
			) {
				const params: IGetSearchPropertiesParams = searchParamsFromRedux(useStateFilter);
				console.log(params, "update searchParamsFromURL()");
				setIsFetched(useStateFilter);
				previousFilterRef.current = useStateFilter;
				// TODO : fetch all properties
				// await dispatch(fetchAllProperties(params));
			}
		};

		fetchData();

		return () => {
			// Function cleanup or unsubscribe logic here
		};
	}, [dispatch, data, useStateFilter, previousFilterRef, searchParamsFromRedux]);

	const fetchAll = () => {
		if (useStateFilter) {
			const params: IGetSearchPropertiesParams = getParams();
			// TODO : fetch all properties
			return dispatch(fetchAllProperties(params));
		}
	};

	const renderCard = (post: IProduct) => {
		return <Card11 key={post.id} post={post} />;
	};

	return (
		<div className={`nc-SectionLatestPosts relative ${className}`}>
			<div className="nc-SectionLatestPosts__grid">
				<ListProducts
					postCardName="card11"
					gridClass="grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
					className="pb-16 lg:pb-28"
				/>
			</div>
		</div>
	);
};

export default SectionLatestPosts;
