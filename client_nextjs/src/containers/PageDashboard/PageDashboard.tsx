import { FC } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { AuthAction } from "app/reducer/auth/auth";
import { ADMIN_SUB_PAGES, USER_SUB_PAGES } from "components/LayoutPage/layout.type";
import AdminLayout from "./layout/Admin.layout";
import SideBarDashbord from "./layout/SideBar.layout";

export interface PageDashboardProps {
	className?: string;
}

const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
	let { path } = useRouteMatch();
	const user = useSelector(AuthAction.data)?.user;

	if (!user) {
		return <></>;
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
