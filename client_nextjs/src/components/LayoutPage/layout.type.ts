import { IUser } from "app/reducer/auth/auth";
import DashboardEditProfile from "containers/PageDashboard/DashboardEditProfile";
import DashboardPostCategories from "containers/PageDashboard/DashboardPostCategories";
import DashboardPosts from "containers/PageDashboard/DashboardPosts";
import DashboardSubmitPost from "containers/PageDashboard/Posts/DashboardSubmitPost";
import DashboardUsers from "containers/PageDashboard/DashboardUsers";
import DashboardSliders from "containers/PageDashboard/Sliders/DashboardSliders";
import DashboardUserRequest from "containers/PageDashboard/Users/userRequest/DashboardUserRequest";
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
	"/post-categories"?: {};
	"/sliders"?: {};
	"/user-request"?: {};
	"/settings"?: {};
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
	{
		sPath: "/submit-post",
		component: DashboardSubmitPost,
		emoij: "✍",
		pageName: "Publier une annonce",
	},
	{ sPath: "/posts", component: DashboardPosts, emoij: "📕", pageName: "Annonces" },
	{
		sPath: "/edit-profile",
		component: DashboardEditProfile,
		emoij: "🛠",
		pageName: "Modifier Profile",
	},
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

export const ADMIN_SUB_PAGES: DashboardPage[] = [
	{ pageName: "ADMIN" },
	{ sPath: "/users", component: DashboardUsers, emoij: "👤", pageName: "Utilisateurs" },
	{
		sPath: "/post-categories",
		component: DashboardPostCategories,
		emoij: "  ",
		pageName: "Type de biens",
	},
	{
		sPath: "/sliders",
		component: DashboardSliders,
		emoij: "  ",
		pageName: "Banniers",
	},
	{
		sPath: "/user-request",
		component: DashboardUserRequest,
		emoij: "  ",
		pageName: "Demandes de démenagement",
	},
	// {
	// 	sPath: "/settings",
	// 	component: DashboardSetting,
	// 	emoij: "  ",
	// 	pageName: "Paramètres",
	// },
];
