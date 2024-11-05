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
import WidgetSearchWithInput from "./WidgetCategories/WidgetSearchWithInput";
import { route } from "routers/route";

export interface ProductFilterSidebarProps {
	fetchAll?: () => void;
	useStateFilter: IPropertyFilter;
	setUseStateFilter: any;
	groupFilter?: boolean;
	linear?: boolean;
	onClose?: () => void;
}

const ProductFilterSidebar: FC<ProductFilterSidebarProps> = ({
	fetchAll,
	setUseStateFilter,
	useStateFilter,
	groupFilter = false,
	linear = false,
	onClose,
}) => {
	const [showFilter, setShowFilter] = useState(true);
	const urlSearchParams = new URLSearchParams(window.location.search);
	const categorySlugSelected = urlSearchParams.get("category_slug_selected");
	const history = useHistory();
	const colSpanItem = "col-span-6 sm:col-span-1 md:col-span-2 2xl:col-span-1";
	// const colSpanItemAlt = "col-span-6";

	const handleShowFilter = () => {
		setShowFilter(!showFilter);
	};

	const removeQueryParams = () => {
		const path = history.location.pathname;
		console.log("path.split", path.split("/"));

		switch (path.split("/")[1]) {
			case "annonces":
				history.replace({
					search: "",
					state: {},
					pathname: "/annonces",
					hash: "#post-list",
				});
				break;

			default:
				history.replace({
					search: "",
					state: {},
					pathname: "/",
					hash: "#post-list",
				});
				break;
		}

		fetchAll?.();
	};

	// const handleChangeType = (): void => {
	// 	WidgetTypeWithSelect;
	// };

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
				<div className={!linear ? "grid grid-cols-1 gap-0" : "grid grid-cols-4 gap-2"}>
					<div className={colSpanItem}>
						<WidgetTypeWithSelect
							handleFetch={fetchAll}
							useStateFilter={useStateFilter}
							setUseStateFilter={setUseStateFilter}
							groupFilter={groupFilter}
						/>
					</div>

					<div className={colSpanItem}>
						<WidgetCategoryBooking handleFetch={fetchAll} groupFilter={groupFilter} />
					</div>

					{categorySlugSelected
						? ["residence", "hotel", "maison", "appartement"].includes(
								categorySlugSelected
						  ) && (
								<div className={colSpanItem}>
									<WidgetCategoryDetailWithSelect
										handleFetch={fetchAll}
										useStateFilter={useStateFilter}
										setUseStateFilter={setUseStateFilter}
										groupFilter={groupFilter}
									/>
								</div>
						  )
						: null}

					<div className={colSpanItem}>
						<WidgetSort handleFetch={fetchAll} groupFilter={groupFilter} />
					</div>

					<div className={colSpanItem}>
						<WidgetLocationWithSelect
							handleFetch={fetchAll}
							useStateFilter={useStateFilter}
							setUseStateFilter={setUseStateFilter}
							groupFilter={groupFilter}
						/>
					</div>

					{/* colSpanItemAlt */}
					<div className={colSpanItem}>
						<WidgetLocationWithInput
							handleFetch={fetchAll}
							useStateFilter={useStateFilter}
							groupFilter={groupFilter}
						/>
					</div>

					{false && (
						<div className={colSpanItem}>
							<WidgetSearchWithInput
								handleFetch={fetchAll}
								useStateFilter={useStateFilter}
								groupFilter={groupFilter}
							/>
						</div>
					)}

					{!linear && (
						<>
							<div className={!linear ? "mr-2 mb-2" : "col-span-6"}>
								<ButtonPrimary
									className="w-full"
									onClick={() => {
										fetchAll && fetchAll();
										onClose && onClose();
									}}
									sizeClass="px-4 py-2 sm:px-5"
								>
									Rechercher
								</ButtonPrimary>
							</div>

							{false && (
								<div className={!linear ? "mr-2 mb-2" : "col-span-1 mr-2"}>
									<ButtonSecondary
										className="w-full"
										onClick={removeQueryParams}
										sizeClass="px-4 py-2 sm:px-5"
									>
										Réinitialiser
									</ButtonSecondary>
								</div>
							)}
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

						{false && (
							<div className={!linear ? "mr-2" : "col-span-1 mr-2"}>
								<ButtonSecondary
									onClick={removeQueryParams}
									sizeClass="px-4 py-2 sm:px-5"
								>
									Réinitialiser
								</ButtonSecondary>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default ProductFilterSidebar;
