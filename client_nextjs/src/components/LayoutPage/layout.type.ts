import DashboardBillingAddress from "containers/PageDashboard/DashboardBillingAddress";
import DashboardEditProfile from "containers/PageDashboard/DashboardEditProfile";
import DashboardPosts from "containers/PageDashboard/DashboardPosts";
import DashboardRoot from "containers/PageDashboard/DashboardRoot";
import DashboardSubcription from "containers/PageDashboard/DashboardSubcription";
import DashboardSubmitPost from "containers/PageDashboard/DashboardSubmitPost";
import { ComponentType } from "react";

export interface DashboardLocationState {
	"/root"?: {};
	"/posts"?: {};
	"/edit-profile"?: {};
	// "/subscription"?: {};
	// "/billing-address"?: {};
	"/submit-post"?: {};
	"/account"?: {};
}

export interface DashboardPage {
	sPath?: keyof DashboardLocationState;
	exact?: boolean;
	component?: ComponentType<Object>;
	emoij?: string;
	pageName: string;
}

export const USER_SUB_PAGES: DashboardPage[] = [
	{ sPath: "/root", exact: true, component: DashboardRoot, emoij: "🕹", pageName: "Dash board" },
	{ pageName: "Annonces" },
	{ sPath: "/submit-post", component: DashboardSubmitPost, emoij: "✍", pageName: "Publier une annonce" },
	{ sPath: "/posts", component: DashboardPosts, emoij: "📕", pageName: "Mes annonces" },
	{ sPath: "/edit-profile", component: DashboardEditProfile, emoij: "🛠", pageName: "Modifier Profile" },
	// {
	// 	sPath: "/subscription",
	// 	component: DashboardSubcription,
	// 	emoij: "📃",
	// 	pageName: "Subscription",
	// },
	// {
	// 	sPath: "/billing-address",
	// 	component: DashboardBillingAddress,
	// 	emoij: "✈",
	// 	pageName: "Billing address",
	// },
];
