import { FC, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CategoryPropertyBadgeList from "components/CategoryPropertyBadgeList/CategoryPropertyBadgeList";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";
import { IProduct } from "app/reducer/products/product";
import PostPropertyCardMetaV2 from "components/PostPropertyCardMeta/PostCardMetaV2";
import { _f } from "utils/money-format";
import { FaMapMarkerAlt } from "react-icons/fa";
import { setSingleProduct } from "app/axios/actions/api.action";
import { useAppDispatch } from "app/hooks";

export interface Card11Props {
	className?: string;
	post: IProduct; // PostDataType
	ratio?: string;
	hiddenAuthor?: boolean;
}

const Card11: FC<Card11Props> = ({ className = "h-full", post, hiddenAuthor = false, ratio = "aspect-w-4 aspect-h-3" }) => {
	const { title, href, price, category, updated_at, location, location_description } = post;
	const [isHover, setIsHover] = useState(false);
	const dispatch = useAppDispatch();
	const history = useHistory();

	const handleSingleClick = () => {
		dispatch(setSingleProduct(post));
		history.push(post.href);
	};

	return (
		<div
			className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
			data-nc-id="Card11"
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			//
		>
			<div className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}>
				<div>
					<PostFeaturedMedia post={post} isHover={isHover} />
				</div>
			</div>
			{/* to={href} */}
			<Link onClick={handleSingleClick} to={href} className="absolute inset-0"></Link>
			<span className="absolute top-3 inset-x-3 z-10">
				<CategoryPropertyBadgeList category={category} />
			</span>

			<div className="p-4 flex flex-col flex-grow space-y-3">
				{/* <Heading>{_f(price)}</Heading> */}
				<h1 className="nc-card-title block text-xl font-bold text-neutral-900 dark:text-neutral-100 text-primary-900 ">{_f(price)}</h1>
				<h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
					{/* to={href} title={title} */}
					<Link onClick={handleSingleClick} to={href} title={title} className="line-clamp-2">
						{title}
					</Link>
				</h2>
				<div className="flex items-end justify-between mt-auto">
					{/* <PostCardLikeAndComment className="relative" postData={post} /> */}
					{/* <PostCardSaveAction className="relative" postData={post} /> */}
				</div>
				<span className="text-xs text-neutral-500 flex justify-items-center ">
					<FaMapMarkerAlt className="mr-1" />
					{location_description}, {location.name} , {location.city?.name}
				</span>
				<span className="text-xs text-neutral-500">{updated_at}</span>

				<hr className="border-b border-neutral-200 dark:border-neutral-700 my-4" />

				{post && post.author && post.author.href && <PostPropertyCardMetaV2 meta={post} />}
			</div>
		</div>
	);
};

export default Card11;
