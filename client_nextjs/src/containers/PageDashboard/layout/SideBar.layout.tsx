import { isAdmin, logout } from "app/axios/actions/api.action";
import { initializeUserProduct } from "app/axios/actions/api.products.action";
import { AuthAction } from "app/reducer/auth/auth";
import HeadBackgroundCommon from "components/HeadBackgroundCommon/HeadBackgroundCommon";
import Heading2 from "components/Heading/Heading2";
import { ADMIN_SUB_PAGES, USER_SUB_PAGES } from "components/LayoutPage/layout.type";
import Logo from "components/Logo/Logo";
import React, { FC } from "react";
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
		"flex items-center py-2.5 font-medium hover:text-neutral-800 hover:bg-neutral-100 rounded-md";

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
		<div>
			<ul className=" list-none flex flex-col text-sm text-neutral-6000 dark:text-neutral-400">
				{USER_SUB_PAGES.map(({ sPath, pageName, emoij }, index) => {
					return (
						<li key={index}>
							{sPath && emoij ? (
								<NavLink
									className={defaultClassName}
									to={`${url}${sPath}`}
									activeClassName={activeClassName}
								>
									<span className="w-8 mr-1">{emoij}</span>
									{pageName}
								</NavLink>
							) : (
								<>
									<span className="flex items-center py-1">{pageName}</span>
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
	);
};

export default SideBarDashbord;
