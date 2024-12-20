import { FC, useState } from "react";
import { FaSortAlphaDown, FaTimesCircle } from "react-icons/fa";
import ProductFilterSidebar from "./ProductFilterSidebar";
import { IPropertyFilter } from "app/reducer/products/product";
import LoadingLinear from "components/UI/Loading/LoadingLinear";
import { Sort } from "@mui/icons-material";
import MobileFilterDialog from "./MobileFilterDialog";
import { getParamsCount } from "containers/PageHome/ListProducts";
import { useHistory } from "react-router-dom";

export interface FloatFilterProps {
	className?: string;
	showFilter?: boolean;
	noFloating?: boolean;
	toggleFilter?: () => void;
	fetchAll?: () => void;
	useStateFilter?: IPropertyFilter;
	setUseStateFilter: any;
	linear: boolean;
}

const FloatFilter: FC<FloatFilterProps> = ({
	className = "flex flex-wrap space-x-2",
	showFilter,
	toggleFilter,
	fetchAll,
	useStateFilter,
	setUseStateFilter,
	noFloating,
	linear = false,
}) => {
	const [openMobile, setOpenMobile] = useState(false);
	const history = useHistory();

	const isDashboard = () => {
		return history.location.pathname.includes("dashboard");
	};

	if (!useStateFilter)
		return (
			<div className="flex justify-end">
				<LoadingLinear />
			</div>
		);

	const boxWidth = "150px";

	if (noFloating) {
		return (
			<>
				{!isDashboard() ? (
					<div className="block sm:hidden">
						<span
							className="cursor-pointer z-50 block sm:hidden bg-primary-800 dark:bg-primary-800 text-white rounded-full p-1.5 hover:bg-primary-600 dark:hover:bg-primary-700"
							onClick={() => setOpenMobile(!openMobile)}
							style={{
								position: "fixed",
								color: "white",
								top: `calc(100% + 50px - ${boxWidth})`,
								width: boxWidth,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Sort />
							Rechercher
							{getParamsCount() > 0 ? (
								<span className="relative">
									<span>({getParamsCount()})</span>
									<span className="absolute top-0 left-5 h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
									<span className="absolute top-0 left-5 h-2 w-2 bg-green-500 rounded-full"></span>
								</span>
							) : null}
						</span>

						<MobileFilterDialog
							open={openMobile}
							onClose={() => setOpenMobile(false)}
							fetchAll={fetchAll}
							useStateFilter={useStateFilter as IPropertyFilter}
							setUseStateFilter={setUseStateFilter}
							linear={linear}
						/>
					</div>
				) : null}

				<div className={`${!isDashboard() ? "hidden" : "block"} sm:block`}>
					<ProductFilterSidebar
						groupFilter={true}
						fetchAll={fetchAll}
						useStateFilter={useStateFilter as IPropertyFilter}
						setUseStateFilter={setUseStateFilter}
						linear={linear}
					/>
				</div>
			</>
		);
	}

	return (
		<>
			<div>
				<span>@@</span>
			</div>
			<div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-1/4 lg:pl-10 xl:pl-0 xl:w-1/6">
				{toggleFilter && (
					<button
						className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 absolute flex "
						style={{ top: 0, right: 0 }}
						onClick={toggleFilter}
					>
						<FaSortAlphaDown className="mr-1" />
						<span>Filter</span>
					</button>
				)}

				{showFilter && (
					<div className={!linear ? "bg-white p-8 absolute z-50 top-0 right-0 " : ""}>
						{toggleFilter && (
							<div className="mb-5 flex justify-end">
								<button onClick={toggleFilter}>
									<FaTimesCircle className="mr-1 text-2xl text-red-900 " />
								</button>
							</div>
						)}

						{useStateFilter && useStateFilter && fetchAll && (
							<ProductFilterSidebar
								groupFilter={true}
								fetchAll={fetchAll}
								useStateFilter={useStateFilter as IPropertyFilter}
								setUseStateFilter={setUseStateFilter}
							/>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default FloatFilter;
