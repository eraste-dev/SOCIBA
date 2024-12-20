import { FC, useEffect } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { AuthAction } from "app/reducer/auth/auth";
import { ADMIN_SUB_PAGES, USER_SUB_PAGES } from "components/LayoutPage/layout.type";
import AdminLayout from "./Admin.layout";
import { route } from "routers/route";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";

export interface PageDashboardProps {
	className?: string;
}

const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
	let { path } = useRouteMatch();
	const history = useHistory();
	const user = useSelector(AuthAction.data)?.user;
	const loading = useSelector(AuthAction.loading);
	const error = useSelector(AuthAction.error);
	const token = useSelector(AuthAction.data)?.token;
	const expire = useSelector(AuthAction.data)?.expire;

	const checkExpireDate = () => {
		if (token && expire) {
			return new Date(expire*1000) > new Date();
		}
		return false;
	};

	useEffect(() => {
		if (!loading && !error) {
			console.log(">>> check if user is expire", {
				user,
				expire,
				token,
				isExpired: checkExpireDate(),
			});

			if (!checkExpireDate() || !user) {
				history.push(route("home"));
			}
		}
	}, [loading, error, history, user, checkExpireDate]);

	if (loading) {
		return <LoadingSpinner></LoadingSpinner>;
	}

	return (
		<div className={`nc-PageDashboard ${className} min-h-full`} data-nc-id="PageDashboard">
			<Helmet>
				<title>Compte</title>
			</Helmet>

			{/* subHeading="" headingEmoji="⚙" */}
			<AdminLayout>
				<div className="h-full w-full">
					<div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
						{/* SIDEBAR */}
						<div className="border border-neutral-100 dark:border-neutral-800 md:hidden"></div>
						<div className="flex-grow">
							<Switch>
								{USER_SUB_PAGES.filter((item) => item.component != undefined).map(
									({ component, sPath, exact }, index) => {
										return (
											<Route
												key={index}
												exact={exact}
												component={component}
												path={!!sPath ? `${path}${sPath}` : path}
											/>
										);
									}
								)}

								{ADMIN_SUB_PAGES.filter((item) => item.component != undefined).map(
									({ component, sPath, exact }, index) => {
										return (
											<Route
												key={index}
												exact={exact}
												component={component}
												path={!!sPath ? `${path}${sPath}` : path}
											/>
										);
									}
								)}
								<Redirect to={path + "/root"} />
							</Switch>
						</div>
					</div>
				</div>
			</AdminLayout>
		</div>
	);
};

export default PageDashboard;
