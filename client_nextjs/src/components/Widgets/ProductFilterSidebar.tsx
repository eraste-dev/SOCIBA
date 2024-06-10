import { FC } from "react";
import WidgetSort from "./WidgetSort/WidgetSort";
import WidgetCategories from "./WidgetCategories/WidgetCategories";
import WidgePrice from "./WidgePrice/WidgePrice";

export interface ProductFilterSidebarProps {}

const ProductFilterSidebar: FC<ProductFilterSidebarProps> = ({}) => {
	return (
		<>
			<WidgetSort />
			<WidgetCategories />
			<WidgePrice />
		</>
	);
};

export default ProductFilterSidebar;
