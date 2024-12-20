import { FC } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { IUser } from "app/reducer/auth/auth";
import { VIEW_ADMIN_USER } from "containers/PageDashboard/DashboardUsers";

export interface UserTableActionProps {
	row: IUser;
	// openDelete: boolean;
	handleOpenDelete: () => void;
	handleOpenUpdate: () => void;
	handleChangeView: (view: VIEW_ADMIN_USER) => void;
}

const UserTableAction: FC<UserTableActionProps> = ({ row, handleOpenDelete, handleOpenUpdate, handleChangeView }) => {
	return (
		<ul className="flex space-x-1 list-none">
			<li className="mr-2 ">
				<button onClick={() => handleChangeView("USER_PRODUCT")}>
					<FaEye size={25} className="text-green-500 dark:text-green-300" />
				</button>
			</li>

			<li className="mr-2 ">
				<button onClick={handleOpenUpdate}>
					<FaEdit size={25} className="text-blue-500 dark:text-blue-300" />
				</button>
			</li>

			<li className="mr-2">
				<button onClick={handleOpenDelete}>
					<FaTrashAlt size={25} className="text-red-500" />
				</button>
			</li>
		</ul>
	);
};

export default UserTableAction;
