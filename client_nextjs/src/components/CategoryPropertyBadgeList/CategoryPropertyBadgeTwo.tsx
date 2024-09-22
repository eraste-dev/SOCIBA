import { FC } from "react";
import { IProduct } from "app/reducer/products/product";

export interface CategoryPropertyBadgeTwoProps {
	className?: string;
	itemClass?: string;
	item: IProduct;
}

const CategoryPropertyBadgeTwo: FC<CategoryPropertyBadgeTwoProps> = ({
	className = "flex flex-wrap space-x-2",
	itemClass,
	item,
}) => {
	return (
		<div
			className={`nc-CategoryPropertyBadgeTwo font-bold ${className}`}
			data-nc-id="CategoryPropertyBadgeTwo"
		>
			{/* Todo check if used */}
			{/* {item.category &&
				item.category.name &&
				item.category.uuid != ProductcategoryUUID.BIEN_EN_VENTE.children.TERRAIN &&
				item.type === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] &&
				item.area_count && <span> {item.area_count} </span>} */}

			{!item.home_type ? (item.category ? item.category.name : "") : item.home_type}

			{/* {item.type === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] &&
				item.area_count &&
				item.area_count > 1 && <span>s</span>} */}
		</div>
	);
};

export default CategoryPropertyBadgeTwo;
