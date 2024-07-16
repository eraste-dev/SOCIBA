import { FC } from "react";
import Badge from "components/Badge/Badge";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import { FaAngleRight, FaArrowRight } from "react-icons/fa";

export interface CategoryPropertyBadgeOneProps {
	className?: string;
	itemClass?: string;
	category: IPropertyCategory;
}

const CategoryPropertyBadgeOne: FC<CategoryPropertyBadgeOneProps> = ({
	className = "flex flex-wrap space-x-2",
	itemClass,
	category,
}) => {
	return (
		<div
			className={`nc-CategoryPropertyBadgeOne ${className}`}
			data-nc-id="CategoryPropertyBadgeOne"
		>
			<div className="flex justify-between w-full">
				{category && category.parent && (
					<Badge
						className={itemClass}
						name={category.parent.name}
						href={category.parent.href}
						color="gray"
					/>
				)}

				<Badge
					className={itemClass}
					name={"SOCIBA"}
					color="red"
				/>
			</div>
		</div>
	);
};

export default CategoryPropertyBadgeOne;
