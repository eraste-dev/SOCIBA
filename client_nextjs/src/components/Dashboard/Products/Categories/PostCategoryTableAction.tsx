import { FC } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { IUser } from "app/reducer/auth/auth";
import { VIEW_ADMIN_USER } from "containers/PageDashboard/DashboardUsers";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";

export interface PostCategoryTableActionProps {
	row: IPropertyCategory;
	// openDelete: boolean;
	handleOpenDelete: () => void;
	handleOpenUpdate: () => void;
	// handleChangeView: (view: VIEW_ADMIN_USER) => void;
}

const PostCategoryTableAction: FC<PostCategoryTableActionProps> = ({
	row,
	handleOpenDelete,
	handleOpenUpdate,
	// handleChangeView,
}) => {
	return (
		<ul className="flex space-x-1 list-none">
			{false && <li className="mr-2 ">
				<button onClick={handleOpenUpdate}>
					<FaEdit size={25} className="text-blue-500 dark:text-blue-300" />
				</button>
			</li>}

			{false && row && row.count <= 0 && row.children.length <= 0 && (
				<li className="mr-2">
					<button onClick={handleOpenDelete}>
						<FaTrashAlt size={25} className="text-red-500" />
					</button>
				</li>
			)}
		</ul>
	);
};

export default PostCategoryTableAction;
