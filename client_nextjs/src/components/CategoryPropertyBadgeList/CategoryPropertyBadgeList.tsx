import { FC } from "react";
import Badge from "components/Badge/Badge";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import { FaAngleRight, FaArrowRight } from "react-icons/fa";

export interface CategoryPropertyBadgeListProps {
	className?: string;
	itemClass?: string;
	category: IPropertyCategory;
}

const CategoryPropertyBadgeList: FC<CategoryPropertyBadgeListProps> = ({ className = "flex flex-wrap space-x-2", itemClass, category }) => {
	return (
		<div className={`nc-CategoryPropertyBadgeList ${className}`} data-nc-id="CategoryPropertyBadgeList">
			{category && category.parent && (
				<Badge className={itemClass} name={category.parent.name} href={category.parent.href} color="gray" />
			)}
			{category && category.parent && <FaAngleRight className="mt-1" />}
			{category && <Badge className={itemClass} name={category.name} href={category.href} color={category.color as any} />}
		</div>
	);
};

export default CategoryPropertyBadgeList;
