import { FC } from "react";
import WidgetSort from "./WidgetSort/WidgetSort";
import WidgetLocations from "./WidgetCategories/WidgetLocation";

export interface ProductFilterSidebarProps {
	fetchAll: () => void;
}

const ProductFilterSidebar: FC<ProductFilterSidebarProps> = ({ fetchAll }) => {
	return (
		<>
			<WidgetSort handleFetch={fetchAll} />
			{/* <WidgetLocations handleFetch={fetchAll} /> */}
			{/* <WidgetCategories handleFetch={fetchAll} /> */}
			{/* <WidgePrice /> */}
		</>
	);
};

export default ProductFilterSidebar;
