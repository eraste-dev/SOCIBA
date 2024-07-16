import { FC } from "react";
import { FaSortAlphaDown, FaTimesCircle } from "react-icons/fa";
import ProductFilterSidebar from "./ProductFilterSidebar";
import { IPropertyFilter } from "app/reducer/products/product";
import LoadingLinear from "components/UI/Loading/LoadingLinear";

export interface FloatFilterProps {
	className?: string;
	showFilter?: boolean;
	toggleFilter?: () => void;
	fetchAll?: () => void;
	useStateFilter?: IPropertyFilter;
	setUseStateFilter: any;
}

const FloatFilter: FC<FloatFilterProps> = ({
	className = "flex flex-wrap space-x-2",
	showFilter,
	toggleFilter,
	fetchAll,
	useStateFilter,
	setUseStateFilter,
}) => {
	if (!useStateFilter)
		return (
			<div className="flex justify-end">
				<LoadingLinear />
			</div>
		);

	return (
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
				<div className="bg-white p-8 absolute z-50 top-0 right-0 ">
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
	);
};

export default FloatFilter;
