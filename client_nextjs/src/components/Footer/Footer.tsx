import Logo from "components/Logo/Logo";
import SocialsList1 from "components/SocialsList1/SocialsList1";
import TestimonialSlider from "containers/PageHome/TestimonialSlider";
import { CustomLink } from "data/types";
import React from "react";
import { route } from "routers/route";

export interface WidgetFooterMenu {
	id: string;
	title: string;
	menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
	{
		id: "1",
		title: "A propos",
		menus: [
			{ href: route("about"), label: "Qui nous sommes ?" },
			{ href: "#", label: "Nous rejoindre" },
			{ href: "#", label: "Alerte e-mail" },
		],
	},
	{
		id: "2",
		title: "Informations légales",
		menus: [
			{ href: route('cgu'), label: "Condition générale d'utilisation" },
			{ href: "#", label: "Politique generale de vente" },
			{ href: route('pc'), label: "Politique de confidentialité" },
			{ href: "#", label: "Règle de diffusion" },
		],
	},
];

const Footer: React.FC = () => {
	const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
		return (
			<div key={index} className="col-span-1 text-sm">
				<h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
					{menu.title}
				</h2>

				<ul className="mt-5 space-y-1 list-none">
					{menu.menus.map((item, index) => (
						<li key={index}>
							<a
								key={index}
								className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
								href={item.href}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<div className="nc-Footer border-t border-neutral-200 dark:border-neutral-700">
			<div className="container py-2">
				{/* gap-y-10 gap-x-5 sm:gap-x-8 lg:gap-x-10 */}
				<div className="grid grid-cols-3 gap-y-6 gap-x-8">
					<div className="col-span-1">
						<div className="grid grid-cols-3">
							<div className="col-span-3">
								<Logo />
							</div>

							<div className="col-span-3">
								<div className=" ">
									<SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-1 lg:items-start" />
								</div>
							</div>
						</div>
					</div>

					<div className="col-span-3 md:col-span-2">
						<div className="grid grid-cols-2">
							{widgetMenus.map(renderWidgetMenuItem)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
