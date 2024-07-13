import { FC, useState } from "react";
import WidgetSort from "./WidgetSort/WidgetSort";
import WidgetLocations from "./WidgetCategories/WidgetLocation";
import WidgetLocationWithSelect from "./WidgetCategories/WidgetLocationWithSelect";
import { IGetSearchPropertiesParams } from "utils/query-builder.utils";
import { IPropertyFilter } from "app/reducer/products/product";
import WidgetLocationWithInput from "./WidgetCategories/WidgetLocationWithInput";
import { Grid } from "@mui/material";
import Button from "components/Button/Button";
import ButtonPrimary from "components/Button/ButtonPrimary";
import WidgetCategoryBooking from "./WidgetSort/WidgetCategoryBooking";

export interface ProductFilterSidebarProps {
	fetchAll?: () => void;
	useStateFilter: IPropertyFilter;
	setUseStateFilter: any;
	groupFilter?: boolean;
}

const ProductFilterSidebar: FC<ProductFilterSidebarProps> = ({
	fetchAll,
	setUseStateFilter,
	useStateFilter,
	groupFilter = false,
}) => {
	const [showFilter, setShowFilter] = useState(true);
	const handleShowFilter = () => {
		setShowFilter(!showFilter);
	};
	return (
		<>
			{!setShowFilter && (
				<p
					className="text-neutral-700 dark:text-neutral-300 font-medium pb-2"
					onClick={handleShowFilter}
				>
					Filtres
				</p>
			)}

			<div className={showFilter ? "block sm:p-2 max-w-md" : "hidden"}>
				<Grid container spacing={2}>
					<Grid xs={12} lg={12}>
						<WidgetCategoryBooking handleFetch={fetchAll} groupFilter={groupFilter} />
					</Grid>

					<Grid xs={12} lg={12}>
						<WidgetSort handleFetch={fetchAll} groupFilter={groupFilter} />
					</Grid>

					<Grid xs={12} lg={12}>
						<WidgetLocationWithSelect
							handleFetch={fetchAll}
							useStateFilter={useStateFilter}
							setUseStateFilter={setUseStateFilter}
							groupFilter={groupFilter}
						/>
					</Grid>

					<Grid xs={12} lg={12}>
						<WidgetLocationWithInput
							handleFetch={fetchAll}
							useStateFilter={useStateFilter}
							groupFilter={groupFilter}
						/>
					</Grid>

					<Grid xs={12} lg={12}>
						<ButtonPrimary onClick={fetchAll} sizeClass="px-4 py-2 sm:px-5">
							Rechercher
						</ButtonPrimary>
					</Grid>

					{/* <WidgetCategories handleFetch={fetchAll} /> */}
					{/* <WidgetLocations handleFetch={fetchAll} /> */}
					{/* <WidgePrice /> */}
				</Grid>
			</div>
		</>
	);
};

export default ProductFilterSidebar;
