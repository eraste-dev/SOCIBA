import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategories, isAdmin } from "app/axios/actions/api.action";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { FaRedo } from "react-icons/fa";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import { useAppSelector } from "app/hooks";
import { userRequestAction } from "app/reducer/userRequest/userRequest";
import { fetchAllUserRequest } from "app/axios/actions/api.users.action";
import UserRequestTable from "./UserRequestTable";

export type VIEW_ADMIN_POST_CATEGORY = "LIST" | "EDIT";

const DashboardUserRequest = () => {
	const dispatch = useDispatch();
	// const auth = useSelector(AuthAction.data);
	const data = useAppSelector(userRequestAction.data);
	const loading = useAppSelector(userRequestAction.loading);
	const [selected, setSelected] = useState<IPropertyCategory | null>(null);

	useEffect(() => {
		if (!loading && !data) {
			dispatch(fetchAllUserRequest());
		}
	}, [dispatch, fetchCategories, loading, data, isAdmin]);

	const handleRefresh = () => {
		return dispatch(fetchAllUserRequest());
	};

	const handleAdd = () => {};

	return (
		<div className="flex flex-col space-y-8">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
					<div className="flex justify-between">
						<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
							Demande de démenagement
						</h3>
						<div className="flex">
							<ButtonPrimary onClick={handleRefresh}>
								<FaRedo className="mr-2" />
								Actualiser
							</ButtonPrimary>
						</div>
					</div>

					<div className="my-2">
						<div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
							{data && <UserRequestTable rows={data} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardUserRequest;
