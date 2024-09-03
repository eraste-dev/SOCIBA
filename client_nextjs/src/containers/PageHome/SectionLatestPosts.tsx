import { FC, useEffect, useRef, useState } from "react";
import Heading from "components/Heading/Heading";
import { PostAuthorType, PostDataType, TaxonomyType } from "data/types";
import Card11 from "components/Cards/Card11/Card11";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { IProduct, IPropertyFilter, PropertyAction } from "app/reducer/products/product";
import { useSelector } from "react-redux";
import { fetchAllProperties, inittializePropertyList } from "app/axios/actions/api.action";
import ProductFilterSidebar from "components/Widgets/ProductFilterSidebar";
import CardSkeleton from "components/Cards/CardSkeleton/CardSkeleton";
import { IGetSearchPropertiesParams, searchParamsFromRedux } from "utils/query-builder.utils";
import { useHistory } from "react-router-dom";
import NoDataMessage from "components/NoDataMessage";
import { FaArrowAltCircleRight, FaSortAlphaDown, FaSortDown, FaTimesCircle } from "react-icons/fa";
import FloatFilter from "components/Widgets/FloatFilter";

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
			dispatch(fetchAllProperties(params));
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
				await dispatch(fetchAllProperties(params));
			}
		};

		fetchData();

		return () => {
			// Function cleanup or unsubscribe logic here
		};
	}, [dispatch, data, useStateFilter, previousFilterRef, searchParamsFromRedux]);

	const fetchAll = () => {
		if (useStateFilter) {
			// const params: IGetSearchPropertiesParams = searchParamsFromRedux(useStateFilter);
			const params: IGetSearchPropertiesParams = searchParamsFromRedux(useStateFilter);
			console.log(params, "searchParamsFromURL()");
			return dispatch(fetchAllProperties(params));
		}
	};

	const renderCard = (post: IProduct) => {
		return <Card11 key={post.id} post={post} />;
	};

	return (
		<div className={`nc-SectionLatestPosts relative ${className}`}>
			<div className="">
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
				<div className="w-full lg:w-1/4 xl:w-1/5">
					<FloatFilter
						useStateFilter={useStateFilter}
						setUseStateFilter={setUseStateFilter}
						showFilter={showFilter}
						toggleFilter={toggleFilter}
						fetchAll={fetchAll}
						noFloating={true}
					/>
				</div>
				<div className="w-full lg:w-3/4 xl:w-4/5 lg:pl-7">
					{loading && loading ? (
						<CardSkeleton arrayLength={8} />
					) : (
						<div className={`grid gap-6 md:gap-8 ${gridClass}`}>
							{data && data && data.map((post) => renderCard(post))}
						</div>
					)}

					{data && data.length === 0 && <NoDataMessage />}
					<div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-center sm:items-center">
						{/* <Pagination /> */}
						{/* <ButtonPrimary>Show me more</ButtonPrimary> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SectionLatestPosts;
