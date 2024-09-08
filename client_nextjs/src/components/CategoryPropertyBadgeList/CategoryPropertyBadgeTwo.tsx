import { FC } from "react";
import Badge from "components/Badge/Badge";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import { FaAngleRight, FaArrowRight } from "react-icons/fa";

export interface CategoryPropertyBadgeTwoProps {
	className?: string;
	itemClass?: string;
	category: IPropertyCategory;
	reservationDetail: string | undefined | null;
}

const CategoryPropertyBadgeTwo: FC<CategoryPropertyBadgeTwoProps> = ({
	className = "flex flex-wrap space-x-2",
	itemClass,
	category,
	reservationDetail,
}) => {
	return (
		<div
			className={`nc-CategoryPropertyBadgeTwo font-bold ${className}`}
			data-nc-id="CategoryPropertyBadgeTwo"
		>
			{!reservationDetail ? category && category.name : reservationDetail}
		</div>
	);
};

export default CategoryPropertyBadgeTwo;
