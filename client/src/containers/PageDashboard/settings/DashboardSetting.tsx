import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin } from "app/axios/actions/api.action";
import { AuthAction, IUser } from "app/reducer/auth/auth";
import UserManagementTable from "components/Dashboard/Users/UserManagementTable";
import { UserManagementAction } from "app/reducer/users/users";
import { fetchAllUser } from "app/axios/actions/api.users.action";
import { initializeUserProduct } from "app/axios/actions/api.products.action";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { FaRedo, FaRedoAlt } from "react-icons/fa";
import UserProductList from "components/Dashboard/Users/UserProductList";
import { Tooltip } from "@mui/material";

export type VIEW_ADMIN_USER = "LIST_USER" | "USER_PRODUCT";
const DashboardSetting = () => {
	const dispatch = useDispatch();
	const auth = useSelector(AuthAction.data);
	const users = useSelector(UserManagementAction.data)?.users;
	const loading = useSelector(UserManagementAction.loading);
	const [view, setView] = useState<VIEW_ADMIN_USER>("LIST_USER");
	const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

	useEffect(() => {
		if (!loading && !users && auth && auth.user && isAdmin(auth.user)) {
			dispatch(fetchAllUser());
		}
	}, [dispatch, fetchAllUser, users, loading, auth, isAdmin]);

	const handleChangeView = (view: VIEW_ADMIN_USER, user: IUser | null) => {
		dispatch(initializeUserProduct());
		setSelectedUser(user);
		setView(view);
	};

	const handleRefreshUser = () => {
		return dispatch(fetchAllUser());
	};

	if (!auth?.user) {
		return <div className="text-red-900">Vous devez vous connecter pour voir cette page</div>;
	}

	return (
		<div className="flex flex-col space-y-8">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				{view === "LIST_USER" && (
					<div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
						<div className="flex justify-between">
							<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-5">
								Gestion des utilisateurs
							</h3>

							<ButtonPrimary onClick={handleRefreshUser}>
								<FaRedo className="mr-2" />
								Actualiser
							</ButtonPrimary>
						</div>

						<div className="my-2">
							<div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
								{users && (
									<UserManagementTable
										rows={users}
										handleChangeView={handleChangeView}
									/>
								)}
							</div>
						</div>
					</div>
				)}

				{view === "USER_PRODUCT" && selectedUser && (
					<div className="mx-3 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8 bg-gray-100 dark:bg-neutral-900 rounded-tl-lg rounded-tr-lg ">
						<UserProductList user={selectedUser} handleChangeView={handleChangeView} />
					</div>
				)}
			</div>
		</div>
	);
};

export default DashboardSetting;
