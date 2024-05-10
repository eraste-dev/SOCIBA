import { FC } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "app/auth/auth";
import UserLayout from "components/LayoutPage/UserLayout";
import { USER_SUB_PAGES } from "components/LayoutPage/layout.type";

export interface PageDashboardProps {
	className?: string;
}

const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
	let { path, url } = useRouteMatch();
	const dispatch = useDispatch();
	const user = useSelector(AuthAction.data)?.user;

	return (
		<div className={`nc-PageDashboard ${className}`} data-nc-id="PageDashboard">
			<Helmet>
				<title>Compte</title>
			</Helmet>
			<UserLayout subHeading="" headingEmoji="⚙" heading="Dash board">
        {/* */}
				<div className="pb-5 bg-white">
					<ul className="flex text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
						{USER_SUB_PAGES.map(({ sPath, pageName, emoij }, index) => {
							return (
								<li key={index}>
									<NavLink
										className="flex px-6 py-2.5 font-medium rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
										to={`${url}${sPath}`}
										activeClassName="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
									>
										<span className="w-8 mr-1">{emoij}</span>
										{pageName}
									</NavLink>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="flex flex-col space-y-8 xl:space-y-0 xl:flex-row">
					{/* SIDEBAR */}

					<div className="border border-neutral-100 dark:border-neutral-800 md:hidden"></div>
					<div className="flex-grow">
						<Switch>
							{USER_SUB_PAGES.map(({ component, sPath, exact }, index) => {
								return <Route key={index} exact={exact} component={component} path={!!sPath ? `${path}${sPath}` : path} />;
							})}
							<Redirect to={path + "/root"} />
						</Switch>
					</div>
				</div>
			</UserLayout>
		</div>
	);
};

export default PageDashboard;
