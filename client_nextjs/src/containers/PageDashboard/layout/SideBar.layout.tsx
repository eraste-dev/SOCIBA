import { isAdmin, logout } from "app/axios/actions/api.action";
import { initializeUserProduct } from "app/axios/actions/api.products.action";
import { AuthAction } from "app/reducer/auth/auth";
import { toggleSidebar } from "app/reducer/darkmode/darkmode";
import { ADMIN_SUB_PAGES, USER_SUB_PAGES } from "components/LayoutPage/layout.type";
import { FC } from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { route } from "routers/route";

export interface SideBarDashbordProps {
	className?: string;
}

const SideBarDashbord: FC<SideBarDashbordProps> = ({ className = "", children }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	let { path, url } = useRouteMatch();
	const user = useSelector(AuthAction.data)?.user;
	const token = useSelector(AuthAction.data)?.token;

	const activeClassName = "bg-neutral-100 text-neutral-900 rounded-md";
	const defaultClassName =
		"flex items-center py-2.5 font-medium hover:text-neutral-800 hover:bg-neutral-100 rounded-md w-full overflow-hidden";

	const handleHomePage = () => {
		history.push(route("home"));
	};

	const handleLogout = () => {
		if (token) {
			dispatch(logout(token));
			dispatch(initializeUserProduct());
			history.push(route("home"));
		}
	};

	return (
		<div className="h-full fixed sm:left-0 top-0 bottom-0  ">
			<div className="flex flex-col justify-between h-full py-4 px-2">
				<div className="overflow-y-scroll">
					<ul className=" list-none flex flex-col text-sm text-neutral-6000 dark:text-neutral-400">
						{USER_SUB_PAGES.map(({ sPath, pageName, emoij }, index) => {
							return (
								<li key={index}>
									{sPath && emoij ? (
										<NavLink
											className={defaultClassName}
											to={`${url}${sPath}`}
											activeClassName={activeClassName}
											onClick={() => dispatch(toggleSidebar())}
										>
											<span className="w-8 mr-1">{emoij}</span>
											{pageName}
										</NavLink>
									) : (
										<>
											<span className="flex items-center py-1">
												{pageName}
											</span>
											<hr className="w-full border-t border-neutral-200 dark:border-neutral-700" />
										</>
									)}
								</li>
							);
						})}

						{user && isAdmin(user) && (
							<>
								{ADMIN_SUB_PAGES.map(({ sPath, pageName, emoij }, index) => {
									return (
										<li key={index}>
											{sPath && emoij ? (
												<NavLink
													className={defaultClassName}
													to={`${url}${sPath}`}
													activeClassName={activeClassName}
													onClick={() => dispatch(toggleSidebar())}
												>
													<span className="w-8 mr-1">{emoij}</span>
													{pageName}
												</NavLink>
											) : (
												<>
													<span className="flex items-center px-6 py-2.5 font-medium hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100">
														{pageName}
													</span>
													<hr className="w-full border-t border-neutral-200 dark:border-neutral-700" />
												</>
											)}
										</li>
									);
								})}
							</>
						)}
					</ul>
				</div>

				<div>
					<ul className="list-none flex flex-col text-sm text-neutral-6000 dark:text-neutral-400">
						<li className="py-2.5 font-medium cursor-pointer" onClick={handleHomePage}>
							<span className="flex">
								<FaHome className="w-6 mr-2" />
								Page d'accueil
							</span>
						</li>

						<li className="py-2.5 font-medium cursor-pointer " onClick={handleLogout}>
							<span className="flex">
								<FaSignOutAlt className="w-6 transform rotate-180 mr-2" />
								Se déconnecter
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default SideBarDashbord;
