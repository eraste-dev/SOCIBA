import { FC } from "react";
import ProductFilterSidebar from "./ProductFilterSidebar";
import { IPropertyFilter } from "app/reducer/products/product";
import { CloseSharp } from "@mui/icons-material";

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
		>
			{/* onBlur={open ? onClose : undefined} */}
			<div className="bg-white dark:bg-neutral-800 w-full mx-8 px-4 py-0 rounded-lg shadow-lg">
				<div className="flex justify-end pt-2">
					<button
						className="text-base text-red-800 rounded-full"
						onClick={onClose}
					>
						<CloseSharp />
					</button>
				</div>
				<div className="py-5">
					{open && (
						<ProductFilterSidebar
							groupFilter={true}
							fetchAll={fetchAll}
							useStateFilter={useStateFilter as IPropertyFilter}
							setUseStateFilter={setUseStateFilter}
							linear={linear}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default MobileFilterDialog;
