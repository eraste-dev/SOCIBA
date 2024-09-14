import { FC, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PostFeaturedMedia from "components/PostCard/PostFeaturedMedia/PostFeaturedMedia";
import { IProduct } from "app/reducer/products/product";
import PostPropertyCardMetaV2 from "components/PostCard/PostPropertyCardMeta/PostCardMetaV2";
import { _f } from "utils/money-format";
import { FaMapMarkerAlt } from "react-icons/fa";
import { setSingleProduct } from "app/axios/actions/api.action";
import { useAppDispatch } from "app/hooks";
import CategoryPropertyBadgeOne from "components/CategoryPropertyBadgeList/CategoryPropertyBadgeOne";
import CategoryPropertyBadgeTwo from "components/CategoryPropertyBadgeList/CategoryPropertyBadgeTwo";
import {
	IPRODUCT_PERIODICITY,
	PERIODICITY_LIST,
	PERIODICITY_RESERVATION_LIST,
	PRODUCT_TYPE,
} from "containers/PageDashboard/Posts/DashboardSubmitPost";
import PostCardDetailMeta from "components/PostCard/PostPropertyCardMeta/PostCardDetailMeta";
import Card11Price from "./Card11Price";

export interface Card11Props {
	className?: string;
	post: IProduct; // PostDataType
	ratio?: string;
	hiddenAuthor?: boolean;
}

const Card11: FC<Card11Props> = ({
	className = "h-full",
	post,
	hiddenAuthor = false,
	ratio = "aspect-w-4 aspect-h-3",
}) => {
	const {
		title,
		href,
		price,
		deposit_price,
		category,
		updated_at,
		location,
		location_description,
		periodicity,
		count_advance,
		count_monthly,
		type,
		home_type,
	} = post;
	const [isHover, setIsHover] = useState(false);
	const dispatch = useAppDispatch();
	const history = useHistory();

	const handleSingleClick = () => {
		dispatch(setSingleProduct(post));
		history.push(post.href);
	};

	const GET_PERIODICITY = (): IPRODUCT_PERIODICITY[] => {
		let data: IPRODUCT_PERIODICITY[] = [];
		data = [...PERIODICITY_LIST, ...PERIODICITY_RESERVATION_LIST];

		return data;
	};

	return (
		<div
			className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
			data-nc-id="Card11"
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			//
		>
			<div
				className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
			>
				<div>
					<PostFeaturedMedia post={post} isHover={isHover} />
				</div>
			</div>

			<Link onClick={handleSingleClick} to={href} className="absolute inset-0"></Link>

			<span className="absolute top-3 inset-x-3 z-10">
				{/* <CategoryPropertyBadgeList category={category} /> */}
				<CategoryPropertyBadgeOne category={category} />
			</span>

			<div className="p-4 flex flex-col flex-grow space-y-3">
				<span className="text-xs text-neutral-500">{updated_at}</span>

				<div className="grid grid-cols-6">
					<div className="grid grid-cols-subgrid lg:col-span-2 col-span-6">
						<CategoryPropertyBadgeTwo className="text-xs md:text-md" item={post} />
						<p className="mt-2 text-xs font-semibold text-secondary-900 dark:text-neutral-100 ">
							{false && (
								<span className="text-xs text-neutral-500 flex justify-items-center ">
									<FaMapMarkerAlt className="mr-1" />
								</span>
							)}
							{location.name} <br />
							{location_description}
							{/* , {location.city?.name} */}
						</p>
					</div>

					<Card11Price item={post} />
				</div>

				{false && (
					<p className="nc-card-title block text-md sm:text-xs font-semibold text-neutral-900 dark:text-neutral-100 ">
						<Link
							onClick={handleSingleClick}
							to={href}
							title={title}
							className="line-clamp-2 text-xs md:text-md"
						>
							{title}
						</Link>
					</p>
				)}

				{false && (
					<div className="flex items-end justify-between mt-auto">
						{/* <PostCardLikeAndComment className="relative" postData={post} /> */}
						{/* <PostCardSaveAction className="relative" postData={post} /> */}
					</div>
				)}

				{post && <PostCardDetailMeta meta={post} />}

				{post && post.author && post.author.href && <PostPropertyCardMetaV2 meta={post} />}
			</div>
		</div>
	);
};

export default Card11;
