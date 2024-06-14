import { FC, useEffect } from "react";
import { FaRedoAlt, FaTimes } from "react-icons/fa";
import { IUser } from "app/reducer/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { PropertyAction } from "app/reducer/products/product";
import { fetchUserProduct, initializeUserProduct } from "app/axios/actions/api.products.action";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ProductTable from "../ProductTable";
import { VIEW_ADMIN_USER } from "containers/PageDashboard/DashboardUsers";
import { Tooltip } from "@mui/material";

export interface UserProductListProps {
	user: IUser;
	handleChangeView: (value: VIEW_ADMIN_USER, user: IUser | null) => void;
}

const UserProductList: FC<UserProductListProps> = ({ user, handleChangeView }) => {
	const dispatch = useDispatch();
	const products = useSelector(PropertyAction.data)?.user;

	useEffect(() => {
		if (user && !products?.loading && (!products || !products?.get) && !products?.error) {
			dispatch(fetchUserProduct({ created_by: user?.id, orderBy: "desc" }));
		}
	}, [dispatch, fetchUserProduct, products, user]);

	const handleRefresh = () => {
		dispatch(initializeUserProduct());
		dispatch(fetchUserProduct({ created_by: user?.id, orderBy: "desc" }));
	};

	const handleClose = () => {
		return handleChangeView("LIST_USER", null);
	};

	return (
		<div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
			<div className="flex justify-between">
				<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
					Annonce(s) publiée(s) par <span className="underline">{`${user.name} ${user.last_name}`} </span>{" "}
				</h3>

				<Tooltip title="Retour à la liste des d'utilisateurs">
					<button className="text-red-900 hover:bg-red-800 hover:text-white rounded-full h-6 w-6 p-1" onClick={handleClose}>
						<FaTimes className="mb-1 mr-2" />
					</button>
				</Tooltip>
			</div>

			<div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
				<div className="mt-1 mb-5">
					<div className="flex flex-row-reverse">
						<ButtonPrimary onClick={handleRefresh}>
							<FaRedoAlt className="mb-1 mr-2" />
							Actualiser
						</ButtonPrimary>
					</div>
					<div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg mt-3 mb-5">
						{products && <ProductTable rows={products!.get ?? []} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProductList;
