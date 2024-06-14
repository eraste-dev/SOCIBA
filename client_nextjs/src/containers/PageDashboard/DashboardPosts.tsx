import React, { useEffect } from "react";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { PropertyAction } from "app/reducer/products/product";
import { fetchAllProperties } from "app/axios/actions/api.action";
import { AuthAction } from "app/reducer/auth/auth";
import ProductTable, { LIST_STATUS } from "components/Dashboard/ProductTable";
import { fetchUserProduct } from "app/axios/actions/api.products.action";
import { isLogged } from "utils/user.util";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { FaRedoAlt, FaReply } from "react-icons/fa";
import { STATUS_LABEL, getStatusColor, getStatuslabel } from "components/Dashboard/Products/ChangeProductType";

const DashboardPosts = () => {
	const dispatch = useDispatch();
	const products = useSelector(PropertyAction.data)?.user;
	const auth = useSelector(AuthAction.data);

	useEffect(() => {
		if (!products?.loading && isLogged(auth) && (!products || !products?.get) && !products?.error) {
			dispatch(fetchUserProduct({ created_by: auth?.user?.id, orderBy: "desc" }));
		}
	}, [dispatch, fetchUserProduct, products, auth, isLogged]);

	if (!auth?.user) {
		return <div className="text-red-900">Vous devez vous connecter pour voir cette page</div>;
	}

	const handleRefresh = () => {
		dispatch(fetchUserProduct({ created_by: auth?.user?.id }));
	};

	const CountByStatue = () => {
		return (
			<div className="grid grid-cols-6 gap-2">
				<div className={`mb-1 mr-2 rounded-tl-lg rounded-lg p-3 text-center bg-gray-200`}>
					<div> TOTAL </div>
					<div className="text-2xl"> {products?.get?.length ?? 0} </div>
				</div>

				{LIST_STATUS.filter((item) => item.name !== "REJECTED" && item.name !== ("BLOCKED" as STATUS_LABEL)).map((item) => {
					return (
						<div className={`mb-1 mr-2 rounded-tl-lg rounded-lg p-3 text-center ${getStatusColor(item.name as STATUS_LABEL)}`}>
							<div> {getStatuslabel(item.name as STATUS_LABEL)} </div>
							<div className="text-2xl"> {products?.get?.filter((product) => product.status === item.name).length ?? 0} </div>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div className="flex flex-col space-y-8">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
					<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-5">Mes annonces</h3>

					<div className="my-2">
						<div className="flex justify-between">
							<CountByStatue />

							<ButtonPrimary className="rounded-lg" onClick={handleRefresh}>
								<FaRedoAlt className="mb-1 mr-2" />
								Actualiser
							</ButtonPrimary>
						</div>
						<div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
							{products && <ProductTable rows={products!.get ?? []} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPosts;
