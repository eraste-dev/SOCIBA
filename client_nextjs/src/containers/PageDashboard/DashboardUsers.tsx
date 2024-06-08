import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin } from "app/axios/api.action";
import { AuthAction } from "app/auth/auth";
import UserManagementTable from "components/Dashboard/Users/UserManagementTable";
import { UserManagementAction } from "app/reducer/users/users";
import { fetchAllUser } from "app/axios/actions/api.users.action";

const DashboardUsers = () => {
	const dispatch = useDispatch();
	const auth = useSelector(AuthAction.data);
	const users = useSelector(UserManagementAction.data)?.users;
	const loading = useSelector(UserManagementAction.loading);

	useEffect(() => {
		if (!loading && !users && auth && auth.user && isAdmin(auth.user)) {
			dispatch(fetchAllUser());
		}
	}, [dispatch, fetchAllUser, users, loading, auth, isAdmin]);

	if (!auth?.user) {
		return <div className="text-red-900">Vous devez vous connecter pour voir cette page</div>;
	}

	return (
		<div className="flex flex-col space-y-8">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
					<h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-5">Gestion des utilisateurs</h3>

					<div className="my-2">
						<div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
							{users && <UserManagementTable rows={users} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardUsers;
