import { FC } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { IUser } from "app/reducer/auth/auth";
import { VIEW_ADMIN_USER } from "containers/PageDashboard/DashboardUsers";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import { Slider } from "app/reducer/sliders/sliders";
import { VIEW_ADMIN_SLDIERS } from "./DashboardSliders";

export interface SlidersTableActionProps {
	row: Slider;
	// openDelete: boolean;
	handleOpenDelete: () => void;
	handleOpenUpdate: () => void;
}

const SlidersTableAction: FC<SlidersTableActionProps> = ({
	row,
	handleOpenDelete,
	handleOpenUpdate,
}) => {
	return (
		<ul className="flex space-x-1">
			{false && (
				<li className="mr-2 ">
					<button onClick={handleOpenUpdate}>
						<FaEdit size={25} className="text-blue-500 dark:text-blue-300" />
					</button>
				</li>
			)}

			<li className="mr-2">
				<button onClick={handleOpenDelete}>
					<FaTrashAlt size={25} className="text-red-500" />
				</button>
			</li>
		</ul>
	);
};

export default SlidersTableAction;
