import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "components/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import PageAbout from "containers/PageAbout/PageAbout";
import PageContact from "containers/PageContact/PageContact";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageForgotPass from "containers/PageForgotPass/PageForgotPass";
import PageDashboard from "containers/PageDashboard/layout/PageDashboard";
import HeaderContainer from "containers/HeaderContainer/HeaderContainer";
import MediaRunningContainer from "containers/MediaRunningContainer/MediaRunningContainer";
import MediaRunningContainerForSafari from "containers/MediaRunningContainer/MediaRunningContainerForSafari";
import isSafariBrowser from "utils/isSafariBrowser";
import Home from "containers/PageHome/Home";
import Single from "containers/Product/Single/Single";
import ListProduct from "containers/Product/List";
import FooterLoggedIn from "components/Footer/FooterLoggedIn";
import PageMovingRequest from "containers/PageMovingRequest/PageMovingRequest";
import CguPage from "containers/PageHome/CGI/Cgu";
import PcPage from "containers/PageHome/CGI/Pc";

export const pages: Page[] = [
	// ADMIN OR USERS PAGES
	{ path: "/dashboard", component: PageDashboard },

	// ANNONCE PAGES
	{ path: "/annonce/:slug", component: Single },
	{ path: "/annonces", component: ListProduct },

	{ path: "/condition-generale-d-utilisation", component: CguPage },
	{ path: "/politique-de-confidentialite", component: PcPage },

	// HOME PAGE
	{ path: "/", exact: true, component: Home },

	{ path: "/about", component: PageAbout },
	{ path: "/moving", component: PageMovingRequest },
	{ path: "/contact", component: PageContact },
	{ path: "/page404", component: Page404 },
	{ path: "/login", component: PageLogin },
	{ path: "/signup", component: PageSignUp },
	{ path: "/forgot-pass", component: PageForgotPass },

	// PUBLIC PAGES
	// { path: "/", component: Home },
	// { path: "/search", component: PageSearch },
	// { path: "/search-v2", component: PageSearchV2 },
];

const Routes = () => {
	const [isDashboard, setIsDashboard] = React.useState(false);

	setInterval(function () {
		setIsDashboard(window.location.href.includes("dashboard"));
	}, 1000);

	return (
		<BrowserRouter basename={import.meta.env.VITE_LRT_OR_RTL === "rtl" ? "/rtl" : "/"}>
			<ScrollToTop />
			<HeaderContainer />
			<Switch>
				{pages.map(({ component, path, exact }) => {
					return <Route key={path} component={component} exact={!!exact} path={path} />;
				})}
				<Route component={Page404} />
			</Switch>

			{/* </div> */}
			{isDashboard ? <FooterLoggedIn /> : <Footer />}
			{/* MEDIA */}

			{/* //is Safari on an apple touch-screen device */}
			{isSafariBrowser() ? <MediaRunningContainerForSafari /> : <MediaRunningContainer />}
		</BrowserRouter>
	);
};

export default Routes;
