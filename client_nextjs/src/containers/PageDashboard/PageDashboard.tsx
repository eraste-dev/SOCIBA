import { FC } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "app/auth/auth";
import UserLayout from "components/LayoutPage/UserLayout";
import { USER_SUB_PAGES } from "components/LayoutPage/layout.type";
import { logout } from "app/axios/api.action";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { route } from "routers/route";

export interface PageDashboardProps {
	className?: string;
}

const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
	let { path, url } = useRouteMatch();
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector(AuthAction.data)?.user;
	const token = useSelector(AuthAction.data)?.token;

	const handleLogout = () => {
		if (token) {
			dispatch(logout(token));
			history.push(route("home"));
		}
	};

	const handleHomePage = () => {
		history.push(route("home"));
	};

	if (!user) {
		return <></>;
	}

	return (
		<div className={`nc-PageDashboard ${className} min-h-full`} data-nc-id="PageDashboard">
			<Helmet>
				<title>Compte</title>
			</Helmet>

			{/* subHeading="" headingEmoji="⚙" */}
			<UserLayout subHeading={user.email} headingEmoji="⚙" heading={`${user?.name} ${user.last_name}`}>
				<div className="pb-5 bg-white h-full w-1/6 fixed top-0 left-0 overflow-y-auto shadow-lg z-20 dark:bg-neutral-900	 ">
					<ul className="flex flex-col text-base space-y-1 text-neutral-6000 mt-5 dark:text-neutral-400">
						<li className="px-6 py-2.5 font-medium">LOGO</li>
						{USER_SUB_PAGES.map(({ sPath, pageName, emoij }, index) => {
							return (
								<li key={index}>
									{sPath && emoij ? (
										<NavLink
											className="flex items-center px-8 py-2.5 font-medium hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
											to={`${url}${sPath}`}
											activeClassName="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
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
						<li className="px-6 py-2.5 font-medium cursor-pointer " onClick={handleHomePage}>
							<span className="flex">
								<FaHome className="w-8 mr-2" />
								Page d'accueil
							</span>
						</li>
						<li className="px-6 py-2.5 font-medium cursor-pointer " onClick={handleLogout}>
							<span className="flex">
								<FaSignOutAlt className="w-8 transform rotate-180 mr-2" />
								Se déconnecter
							</span>
						</li>
					</ul>
				</div>

				<div className="h-full w-5/6 ml-auto">
					<div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
						{/* SIDEBAR */}

						<div className="border border-neutral-100 dark:border-neutral-800 md:hidden"></div>
						<div className="flex-grow">
							<Switch>
								{USER_SUB_PAGES.filter((item) => item.component != undefined).map(({ component, sPath, exact }, index) => {
									return <Route key={index} exact={exact} component={component} path={!!sPath ? `${path}${sPath}` : path} />;
								})}
								<Redirect to={path + "/root"} />
							</Switch>
						</div>
					</div>
				</div>
			</UserLayout>
		</div>
	);
};

export default PageDashboard;
