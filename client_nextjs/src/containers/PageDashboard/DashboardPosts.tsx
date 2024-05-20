import React, { useEffect } from "react";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { PropertyAction } from "app/reducer/products/propertiy";
import { fetchAllProperties } from "app/axios/api.action";
import { AuthAction } from "app/auth/auth";
import ProductTable from "components/Dashboard/ProductTable";

const DashboardPosts = () => {
	const dispatch = useDispatch();
	const products = useSelector(PropertyAction.data)?.all;
	const auth = useSelector(AuthAction.data);
	const loading = useSelector(PropertyAction.loading);

	useEffect(() => {
		if (!products && !loading && auth && auth.user && auth.user.id) {
			dispatch(fetchAllProperties({ created_by: auth.user.id }));
		}
	}, [dispatch, fetchAllProperties, products, loading, auth]);

	if (!auth?.user) {
		return <div className="text-red-900">Vous devez vous connecter pour voir cette page</div>;
	}

	return (
		<div className="flex flex-col space-y-8">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
					<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-5">Mes annonces</h3>

					<div className="my-2">
						<div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
							{products && <ProductTable rows={products} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPosts;
