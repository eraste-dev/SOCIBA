import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPropertyFilter, PropertyAction } from "app/reducer/products/product";
import { AuthAction } from "app/reducer/auth/auth";
import ProductTable, { LIST_STATUS } from "components/Dashboard/ProductTable";
import { fetchUserProduct } from "app/axios/actions/api.products.action";
import { isLogged } from "utils/user.util";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { FaRedoAlt } from "react-icons/fa";
import {
	STATUS_LABEL,
	getStatusColor,
	getStatuslabel,
} from "components/Dashboard/Products/ChangeProductType";
import { Tooltip } from "@mui/material";
import FloatFilter from "components/Widgets/FloatFilter";
import { getParams } from "containers/PageHome/ListProducts";
import { IGetSearchPropertiesParams } from "utils/query-builder.utils";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";
import NoDataMessage from "components/NoDataMessage";

const DashboardPosts = () => {
	const dispatch = useDispatch();
	const products = useSelector(PropertyAction.data)?.user;
	const loading = useSelector(PropertyAction.data)?.user?.loading;
	const rootLoading = useSelector(PropertyAction.loading);
	const auth = useSelector(AuthAction.data);

	const [useStateFilter, setUseStateFilter] = useState<IPropertyFilter>({});
	const [showFilter, setShowFilter] = useState(false);
	const toggleFilter = () => setShowFilter(!showFilter);

	useEffect(() => {
		if (!loading && isLogged(auth) && (!products || !products?.get) && !products?.error) {
			dispatch(fetchUserProduct({ ...getParams(), created_by: auth?.user?.id, status: "*" }));
		}
	}, [dispatch, fetchUserProduct, products, loading, auth, isLogged]);

	if (!auth?.user) {
		return <div className="text-red-900">Vous devez vous connecter pour voir cette page</div>;
	}

	const handleRefresh = () => {
		dispatch(fetchUserProduct({ ...getParams(), created_by: auth?.user?.id, status: "*" }));
	};

	const fetchAll = () => {
		let param: IGetSearchPropertiesParams = getParams();
		if (param.type && param.category_slug) {
			param.type = undefined;
		}
		return dispatch(fetchUserProduct(getParams()));
	};

	const CountByStatue = () => {
		return (
			<div className="flex justify-start">
				<div
					className={`mb-1 mr-2 rounded-tl-lg rounded-lg p-3 text-center bg-gray-200 dark:bg-neutral-800`}
				>
					<div> TOTAL </div>
					<div className="text-2xl"> {products?.get?.length ?? 0} </div>
				</div>

				{LIST_STATUS.filter((item) => item.name !== "REJECTED").map((item) => {
					return (
						<div
							className={`mb-1 mr-2 rounded-tl-lg rounded-lg p-3 text-center ${getStatusColor(
								item.name as STATUS_LABEL
							)}`}
						>
							<div> {getStatuslabel(item.name as STATUS_LABEL)} </div>
							<div className="text-2xl">
								{products?.get?.filter((product) => product.status === item.name)
									.length ?? 0}
							</div>
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
					<div className="flex justify-between">
						<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
							Annonce(s)
						</h3>
						<Tooltip title="Actualiser">
							<ButtonPrimary className="rounded-sm" onClick={handleRefresh}>
								<FaRedoAlt className="mr-2" />
								{/* Actualiser */}
							</ButtonPrimary>
						</Tooltip>
					</div>

					{loading && <LoadingSpinner />}

					{!loading && (
						<div className="my-2">
							<div className="w-full">
								<CountByStatue />
							</div>

							<div className="bg-white dark:bg-neutral-800 my-5">
								{false && <FloatFilter
									useStateFilter={useStateFilter}
									setUseStateFilter={setUseStateFilter}
									showFilter={showFilter}
									toggleFilter={toggleFilter}
									fetchAll={fetchAll}
									noFloating={true}
									linear={true}
								/>}
							</div>

							{loading || rootLoading ? <LoadingSpinner /> : null}

							{products && products.get && products.get.length === 0 && (
								<div className="mt-12 bg-white dark:bg-neutral-800 overflow-hidden sm:rounded-lg h-52">
									<NoDataMessage />
								</div>
							)}

							{products && products.get && products.get.length > 0 && (
								<div className="mt-12 border border-neutral-200 dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
									<ProductTable rows={products!.get} />
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default DashboardPosts;
