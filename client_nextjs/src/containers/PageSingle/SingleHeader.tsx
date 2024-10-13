import { FC } from "react";
import SingleTitle from "./SingleTitle";
import PostMeta2 from "components/PostCard/PostMeta2/PostMeta2";
import { Helmet } from "react-helmet";
import { IProduct } from "app/reducer/products/product";
import CategoryPropertyBadgeThree from "components/CategoryPropertyBadgeList/CategoryPropertyBadgeThree";
import SingleAuthor from "./SingleAuthor";

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
	const {
		category,
		home_type,
		description,
		title,
		location,
		location_description,
		price,
		deposit_price,
		created_at,
	} = pageData as IProduct;

	return (
		<>
			<Helmet>
				<title>
					{`BAJORAH : ${home_type ? home_type : ''}  ${category ? category.name : ''}`}
				</title>
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

					<CategoryPropertyBadgeThree
						itemClass="text-base"
						category={category}
						rightText={created_at.toString() ?? ""}
					/>

					<SingleAuthor author={pageData.author} />
					{/* {category && <CategoryPropertyBadgeList category={category} />} */}

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
