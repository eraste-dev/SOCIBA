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
import WidgetTypeWithSelect from "./WidgetTypeWithSelect/WidgetTypeWithSelect";
import WidgetCategoryDetailWithSelect from "./WidgetCategories/WidgetCategoryDetailWithSelect";
import { useHistory } from "react-router-dom";
import ButtonSecondary from "components/Button/ButtonSecondary";

export interface ProductFilterSidebarProps {
	fetchAll?: () => void;
	useStateFilter: IPropertyFilter;
	setUseStateFilter: any;
	groupFilter?: boolean;
	linear?: boolean;
}

const ProductFilterSidebar: FC<ProductFilterSidebarProps> = ({
	fetchAll,
	setUseStateFilter,
	useStateFilter,
	groupFilter = false,
	linear = false,
}) => {
	const [showFilter, setShowFilter] = useState(true);
	const urlSearchParams = new URLSearchParams(window.location.search);
	const categorySlugSelected = urlSearchParams.get("category_slug_selected");
	const history = useHistory();

	const handleShowFilter = () => {
		setShowFilter(!showFilter);
	};

	const removeQueryParams = () => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		urlSearchParams.delete("category_slug_selected");

		console.log("history.location ::: ", history.location);

		const { pathname } = history.location;
		if (window.location.search) {
			window.history.replaceState({}, document.title, pathname);
		}
		fetchAll && fetchAll();
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

			<div
				className={
					showFilter ? (!linear ? "block sm:p-2 max-w-md" : "block sm:p-2") : "hidden"
				}
			>
				{/* bgcolor: "background.paper", */}
				<div className={!linear ? "grid grid-cols-1 gap-6" : "grid grid-cols-5"}>
					<div className="mr-2">
						<WidgetCategoryBooking handleFetch={fetchAll} groupFilter={groupFilter} />
					</div>

					{categorySlugSelected &&
						["residence", "hotel", "maison"].includes(categorySlugSelected) && (
							<div className="mr-2">
								<WidgetCategoryDetailWithSelect
									handleFetch={fetchAll}
									useStateFilter={useStateFilter}
									setUseStateFilter={setUseStateFilter}
									groupFilter={groupFilter}
								/>
							</div>
						)}

					<div className="mr-2">
						<WidgetSort handleFetch={fetchAll} groupFilter={groupFilter} />
					</div>

					<div className="mr-2">
						<WidgetLocationWithSelect
							handleFetch={fetchAll}
							useStateFilter={useStateFilter}
							setUseStateFilter={setUseStateFilter}
							groupFilter={groupFilter}
						/>
					</div>

					{true && (
						<div className="mr-2">
							<WidgetTypeWithSelect
								handleFetch={fetchAll}
								useStateFilter={useStateFilter}
								setUseStateFilter={setUseStateFilter}
								groupFilter={groupFilter}
							/>
						</div>
					)}

					<div className="mr-2">
						<WidgetLocationWithInput
							handleFetch={fetchAll}
							useStateFilter={useStateFilter}
							groupFilter={groupFilter}
						/>
					</div>

					{!linear && (
						<>
							<div className={!linear ? "mr-2" : "col-span-1"}>
								<ButtonPrimary onClick={fetchAll} sizeClass="px-4 py-2 sm:px-5">
									Rechercher
								</ButtonPrimary>
							</div>

							<div className={!linear ? "mr-2" : "col-span-1 mr-2"}>
								<ButtonSecondary
									onClick={removeQueryParams}
									sizeClass="px-4 py-2 sm:px-5"
								>
									Réinitialiser
								</ButtonSecondary>
							</div>
						</>
					)}

					{/* <WidgetCategories handleFetch={fetchAll} /> */}
					{/* <WidgetLocations handleFetch={fetchAll} /> */}
					{/* <WidgePrice /> */}
				</div>
				{linear && (
					<div className="flex">
						<div className={!linear ? "mr-2" : "col-span-1 mr-2"}>
							<ButtonPrimary onClick={fetchAll} sizeClass="px-4 py-2 sm:px-5">
								Rechercher
							</ButtonPrimary>
						</div>

						<div className={!linear ? "mr-2" : "col-span-1 mr-2"}>
							<ButtonSecondary
								onClick={removeQueryParams}
								sizeClass="px-4 py-2 sm:px-5"
							>
								Réinitialiser
							</ButtonSecondary>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ProductFilterSidebar;
