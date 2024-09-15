import React, { FC } from "react";
import ProductFilterSidebar from "./ProductFilterSidebar";
import { IPropertyFilter } from "app/reducer/products/product";

export interface FloatFilterProps {
	open: boolean;
	onClose: () => void;
	fetchAll: any;
	useStateFilter: any;
	setUseStateFilter: any;
	linear: boolean;
}

const MobileFilterDialog: FC<FloatFilterProps> = ({
	open,
	onClose,
	fetchAll,
	useStateFilter,
	setUseStateFilter,
	linear,
}) => {
	return (
		<div
			className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 ${
				open ? "" : "hidden"
			}`}
			onBlur={open ? onClose : undefined}
		>
			<div className="bg-white w-full mx-8 px-4 py-0 rounded-lg shadow-lg">
				<div className="flex justify-end">
					<button className="text-3xl text-red-600" onClick={onClose}>
						×
					</button>
				</div>
				<div className="">
					{open && (
						<>
							<ProductFilterSidebar
								groupFilter={true}
								fetchAll={fetchAll}
								useStateFilter={useStateFilter as IPropertyFilter}
								setUseStateFilter={setUseStateFilter}
								linear={linear}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default MobileFilterDialog;
