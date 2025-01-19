import { IUser } from "app/reducer/auth/auth";
import DashboardEditProfile from "containers/PageDashboard/DashboardEditProfile";
import DashboardPostCategories from "containers/PageDashboard/DashboardPostCategories";
import DashboardPosts from "containers/PageDashboard/DashboardPosts";
import DashboardSubmitPost from "containers/PageDashboard/Posts/DashboardSubmitPost";
import DashboardUsers from "containers/PageDashboard/DashboardUsers";
import DashboardSliders from "containers/PageDashboard/Sliders/DashboardSliders";
import DashboardUserRequest from "containers/PageDashboard/Users/userRequest/DashboardUserRequest";
import { ComponentType } from "react";
import DashboardSettings from "containers/PageDashboard/Settings/DashboardSettings";
import DashboardTestimonial from "containers/PageDashboard/testimonals/DashboardTestimonial";
import DashboardTestimonialPost from "containers/PageDashboard/testimonals/DashboardTestimonialPost";

export interface DashboardLocationState {
	"/posts"?: {};
	"/users"?: {};
	"/edit-profile"?: {};
	"/submit-post"?: {};
	"/account"?: {};
	"/post-categories"?: {};
	"/sliders"?: {};
	"/user-request"?: {};
	"/settings"?: {};
	"/testimonials"?: {};
	"/testimonials/post"?: {};
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
	// {
	// 	sPath: "/testimonials/post",
	// 	component: DashboardTestimonialPost,
	// 	emoij: "  ",
	// 	pageName: "Témoignages",
	// },
	{ pageName: "Autres" },
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
		pageName: "Demandes", //de démenagement
	},
	{
		sPath: "/testimonials",
		component: DashboardTestimonial,
		emoij: "  ",
		pageName: "Témoignages",
	},
	{
		sPath: "/settings",
		component: DashboardSettings,
		emoij: "  ",
		pageName: "Paramètres",
	},
];
