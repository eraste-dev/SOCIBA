import { FC } from "react";
import Badge from "components/Badge/Badge";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import { FaAngleRight, FaArrowRight } from "react-icons/fa";
import { ProductcategoryUUID } from "data/categories_uuid";
import { route } from "routers/route";

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
				{/* {category &&
					category.uuid !== ProductcategoryUUID.RESERVATION.children.RESIDENCE &&
					!category.parent && <span></span>} */}

				{category &&
				category.uuid === ProductcategoryUUID.RESERVATION.children.RESIDENCE ? (
					<Badge
						className={itemClass}
						name={category.name}
						href={route("annonces") + "?category_uuid=" + category.uuid}
						color="purple"
					/>
				) : (
					category && (
						<Badge
							className={itemClass}
							name={category.name}
							href={route("annonces") + "?category_uuid=" + category.uuid}
							color="gray"
						/>
					)
				)}

				{/* <Badge className={itemClass} name={"BAJORA"} color="indigo" /> */}
			</div>
		</div>
	);
};

export default CategoryPropertyBadgeOne;
