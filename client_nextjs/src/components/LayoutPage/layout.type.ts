import { IUser } from "app/auth/auth";
import DashboardBillingAddress from "containers/PageDashboard/DashboardBillingAddress";
import DashboardEditProfile from "containers/PageDashboard/DashboardEditProfile";
import DashboardPosts from "containers/PageDashboard/DashboardPosts";
import DashboardRoot from "containers/PageDashboard/DashboardRoot";
import DashboardSubcription from "containers/PageDashboard/DashboardSubcription";
import DashboardSubmitPost from "containers/PageDashboard/DashboardSubmitPost";
import DashboardUsers from "containers/PageDashboard/DashboardUsers";
import { ComponentType } from "react";

export interface DashboardLocationState {
	// "/root"?: {};
	"/posts"?: {};
	"/users"?: {};
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
	isAdmin?: (user: IUser) => boolean;
}

export const USER_SUB_PAGES: DashboardPage[] = [
	// { sPath: "/root", exact: true, component: DashboardRoot, emoij: "🕹", pageName: "Dash board" },
	{ pageName: "Annonces" },
	{ sPath: "/submit-post", component: DashboardSubmitPost, emoij: "✍", pageName: "Publier une annonce" },
	{ sPath: "/posts", component: DashboardPosts, emoij: "📕", pageName: "Mes annonces" },
	{ sPath: "/edit-profile", component: DashboardEditProfile, emoij: "🛠", pageName: "Modifier Profile" },
	{ pageName: "Autres" },
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

export const ADMIN_SUB_PAGES: DashboardPage[] = [{ pageName: "ADMIN" }, { sPath: "/users", component: DashboardUsers, emoij: "👤", pageName: "Utilisateurs" }];
