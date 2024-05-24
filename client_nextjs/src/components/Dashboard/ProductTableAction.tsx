import { FC } from "react";
import { IProperty } from "app/reducer/products/propertiy";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { route } from "routers/route";
import { useDispatch } from "react-redux";
import { setSingleProduct } from "app/axios/api.action";

export interface ProductTableActionProps {
	row: IProperty;
	// openDelete: boolean;
	handleOpenDelete: () => void;
}

const ProductTableAction: FC<ProductTableActionProps> = ({ row, handleOpenDelete }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const handleEdit = () => {
		dispatch(setSingleProduct(row));
		history.push(`${route("add_post")}?id=${row.id}`);
	};

	return (
		<ul className="flex space-x-1">
			<li className="mr-2 ">
				<button onClick={handleEdit}>
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

export default ProductTableAction;
