import { FC } from "react";
import { INFO_CONTACT } from "containers/PageContact/PageContact";
import SocialsList from "components/SocialsList/SocialsList";
import Label from "components/Form/Label/Label";
import Input from "components/Form/Input/Input";
import Textarea from "components/Textarea/Textarea";
import ButtonPrimary from "components/Button/ButtonPrimary";
export interface Statistic {
	id: string;
	heading: string;
	subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
	{
		id: "1",
		heading: "10 million",
		subHeading: "Articles have been public around the world (as of Sept. 30, 2021)",
	},
	{
		id: "2",
		heading: "100,000",
		subHeading: "Registered users account (as of Sept. 30, 2021)",
	},
	{
		id: "3",
		heading: "220+",
		subHeading: "Countries and regions have our presence (as of Sept. 30, 2021)",
	},
];

export interface SectionContactProps {
	className?: string;
}

const SectionContact: FC<SectionContactProps> = ({ className = "" }) => {
	return (
		<div className="grid gap-8 lg:grid-cols-2 mt-0" style={{ marginTop: "10px !important" }}>
			<div className="max-w-sm ">
				{INFO_CONTACT.map((item, index) => (
					<div key={index}>
						<h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
							{item.title}
						</h3>
						<span className="block mt-2 text-neutral-500 dark:text-neutral-400">
							{item.desc}
						</span>
					</div>
				))}
				<div>
					<h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
						🌏 SOCIALS
					</h3>
					<SocialsList className="mt-2" />
				</div>
			</div>

			<div className="border border-neutral-100 dark:border-neutral-700 lg:hidden"></div>

			<div>
				<h3 className="font-semibold text-xl dark:text-neutral-200 tracking-wider mb-5">
					Nous contacter
				</h3>
				<form className="grid grid-cols-1 gap-6" action="#" method="post">
					<label className="block">
						<Label>Nom & Prénoms</Label>
						<Input placeholder="Exemple Doe" type="text" className="mt-1" />
					</label>

					<label className="block">
						<Label>Email</Label>
						<Input type="email" placeholder="example@example.com" className="mt-1" />
					</label>

					<label className="block">
						<Label>Message</Label>
						<Textarea className="mt-1" rows={6} />
					</label>

					<ButtonPrimary type="submit">Envoyer</ButtonPrimary>
				</form>
			</div>
		</div>
	);
};

export default SectionContact;
