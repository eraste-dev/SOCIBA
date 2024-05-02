import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { TaxonomyType, TwMainColor } from "data/types";
import { Link } from "react-router-dom";
import Badge from "components/Badge/Badge";
import { IPropertyCategory } from "app/properties/propertiy-category";

export interface CardCategory2Props {
	className?: string;
	taxonomy?: TaxonomyType;
	category: IPropertyCategory;
	index?: string;
}

const CardCategory2: FC<CardCategory2Props> = ({ className = "", taxonomy, category, index }) => {
	// const { count, name, href = "/", thumbnail, color } = taxonomy;
	const { id, name, slug, href = "/", color = "indigo", description, thumbnail, parent_id, count, children } = category;
	const defaultSrc = "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
	// const defaultSrc = "./src/images/icons/real-estate.png";
	return (
		<Link to={href} className={`nc-CardCategory2 relative flex flex-col items-center justify-center text-center px-3 py-3 sm:p-4  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`} data-nc-id="CardCategory2">
			{index && <Badge color={color as TwMainColor} name={""} className="absolute -top-2 sm:top-3 left-3" />}
			<NcImage containerClassName={`flex-shrink-0 w-20 h-20 rounded-full overflow-hidden`} src={thumbnail ?? defaultSrc} />
			<div className="mt-2">
				<h2 className={`text-base sm:text-lg font-semibold `}>
					<span className="line-clamp-1">{name}</span>
				</h2>
				<span className={`block mt-[2px] text-sm text-neutral-500 dark:text-neutral-400`}>{count} Articles</span>
			</div>
		</Link>
	);
};

export default CardCategory2;
