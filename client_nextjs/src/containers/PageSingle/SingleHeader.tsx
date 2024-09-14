import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import React, { FC } from "react";
import SingleTitle from "./SingleTitle";
import { SinglePageType } from "./PageSingleTemp3Sidebar";
import PostMeta2 from "components/PostCard/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { Helmet } from "react-helmet";
import { IProduct } from "app/reducer/products/product";
import CategoryPropertyBadgeList from "components/CategoryPropertyBadgeList/CategoryPropertyBadgeList";
import { FaMapMarkerAlt } from "react-icons/fa";

export interface SingleHeaderProps {
	pageData: IProduct;
	hiddenDesc?: boolean;
	metaActionStyle?: "style1" | "style2";
	titleMainClass?: string;
	className?: string;
}

const SingleHeader: FC<SingleHeaderProps> = ({
	pageData,
	titleMainClass,
	hiddenDesc = false,
	className = "",
	metaActionStyle = "style1",
}) => {
	const { category, description, title, location, location_description, price, deposit_price } =
		pageData as IProduct;

	return (
		<>
			<Helmet>
				<title>{title ? title : `${category.name} | ${location}`}</title>
			</Helmet>

			<div className={`nc-SingleHeader ${className}`}>
				<div className="space-y-5">
					{false && (
						<>
							<SingleTitle
								mainClass={titleMainClass}
								title={title}
								price={{ price, deposit_price }}
							/>
							<div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
						</>
					)}

					{category && <CategoryPropertyBadgeList category={category} />}

					{pageData && false && (
						<div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
							<PostMeta2
								size="large"
								className="leading-none flex-shrink-0"
								meta={pageData}
								hiddenCategories
								avatarRounded="rounded-full shadow-inner"
							/>

							{/* <SingleMetaAction2 meta={pageData} /> */}
						</div>
					)}

					<div className="flex flex-col justify-start items-start space-x-3">
						<FaMapMarkerAlt />

						<span className="text-5xl text-primary-700 md:text-lg dark:text-neutral-400">
							{/* | ${location.city?.name} */}
							{`Quatier: ${location_description} `}
						</span>

						<span className="text-5xl text-primary-700 md:text-lg dark:text-neutral-400">
							{`Commune :  ${location.name}`}
						</span>
					</div>

					{!!description && !hiddenDesc && (
						<span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
							{description}
						</span>
					)}
				</div>
			</div>
		</>
	);
};

export default SingleHeader;
