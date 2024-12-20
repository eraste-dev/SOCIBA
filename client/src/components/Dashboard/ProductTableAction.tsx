import { FC } from "react";
import { IProduct, PropertyAction } from "app/reducer/products/product";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { route } from "routers/route";
import { useDispatch, useSelector } from "react-redux";
import { setSingleProduct } from "app/axios/actions/api.action";

export interface ProductTableActionProps {
	row: IProduct;
	// openDelete: boolean;
	handleOpenDelete: () => void;
}

const ProductTableAction: FC<ProductTableActionProps> = ({ row, handleOpenDelete }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const products = useSelector(PropertyAction.data)?.user;

	/**
	 * This function handles the editing of a product.
	 * It retrieves the product information based on the provided row ID,
	 * sets the single product, and redirects to the add post page for editing.
	 */
	const handleEdit = () => {
		if (!products || !products.get || products.get.length === 0) {
			console.error("Error: products or products.get is null or undefined");
			return;
		}

		const product: IProduct | undefined = products.get.find((item) => item.id === row.id);
		if (!product) {
			console.error("Error: product not found with id:", row.id);
			return;
		}

		try {
			dispatch(setSingleProduct(product));
			history.push(`${route("add_post")}?id=${product.id}`);
		} catch (error) {
			console.error("Error: encountered error while setting single product", error);
		}
	};

	return (
		<ul className="flex space-x-1 list-none">
			<li className="mr-2 ">
				<button onClick={handleEdit}>
					<FaEdit size={16} className="text-blue-500 dark:text-blue-300" />
				</button>
			</li>

			<li className="mr-2">
				<button onClick={handleOpenDelete}>
					<FaTrashAlt size={16} className="text-red-500" />
				</button>
			</li>
		</ul>
	);
};

export default ProductTableAction;
