import Logo from "components/Logo/Logo";
import SocialsList1 from "components/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React from "react";

export interface WidgetFooterMenu {
	id: string;
	title: string;
	menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
	{
		id: "5",
		title: "Annonce de location",
		menus: [
			{ href: "#", label: "Maison à louer" },
			{ href: "#", label: "Espace à louer" },
			{ href: "#", label: "Magasin à louer" },
			{ href: "#", label: "Entrepôt à louer etc…" },
		],
	},
	{
		id: "1",
		title: "Annonce de réservation",
		menus: [
			{ href: "#", label: "Résidence disponible" },
			{ href: "#", label: "Hôtel disponible etc…" },
		],
	},
	{
		id: "2",
		title: "Annonce de vente",
		menus: [
			{ href: "#", label: "Maison" },
			{ href: "#", label: "Terrain" },
			{ href: "#", label: "Entrepôt, de meubles etc" },
		],
	},
	{
		id: "4",
		title: "Annonce évènementiels",
		menus: [
			{ href: "#", label: "Restaurant / maquis/ Point Chaud" },
			{ href: "#", label: "Concert/ plein air" },
		],
	},
];

const Footer: React.FC = () => {
	const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
		return (
			<div key={index} className="text-sm">
				<h2 className="font-semibold text-neutral-700 dark:text-neutral-200">{menu.title}</h2>
				<ul className="mt-5 space-y-4">
					{menu.menus.map((item, index) => (
						<li key={index}>
							<a key={index} className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white" href={item.href}>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<div className="nc-Footer relative py-16 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
			<div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
				<div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
					<div className="col-span-2 md:col-span-1">
						<Logo />
					</div>
					<div className="col-span-2 flex items-center md:col-span-3">
						<SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
					</div>
				</div>
				{widgetMenus.map(renderWidgetMenuItem)}
			</div>
		</div>
	);
};

export default Footer;
