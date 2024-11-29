import React, { FC } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Form/Input/Input";
import Label from "components/Form/Label/Label";
import LayoutPage from "components/LayoutPage/UserLayout";
import SocialsList from "components/SocialsList/SocialsList";
import Textarea from "components/Textarea/Textarea";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";

export interface PageContactProps {
	className?: string;
}

export const INFO_CONTACT = [
	{
		title: "EMAIL",
		desc: "bajorahimmobilier@gmail.com",
	},
	{
		title: "TÉLÉPHONE",
		desc: "+225 05 74 93 29 33",
	},
];

const PageContact: FC<PageContactProps> = ({ className = "" }) => {
	return (
		<div className={`nc-PageContact ${className}`} data-nc-id="PageContact">
			<Helmet>
				<title>Contact || Blog Magazine React Template</title>
			</Helmet>
			<LayoutPage subHeading="Drop us message and we will get back for you." headingEmoji="" heading="Contact us">
				<div className="grid gap-8 lg:grid-cols-2 mt-0">
					<div className="max-w-sm space-y-6">
						{INFO_CONTACT.map((item, index) => (
							<div key={index}>
								<h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">{item.title}</h3>
								<span className="block mt-2 text-neutral-500 dark:text-neutral-400">{item.desc}</span>
							</div>
						))}
						<div>
							<h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">🌏 SOCIALS</h3>
							<SocialsList className="mt-2" />
						</div>
					</div>
					<div className="border border-neutral-100 dark:border-neutral-700 lg:hidden"></div>
					<div>
						<form className="grid grid-cols-1 gap-6" action="#" method="post">
							<label className="block">
								<Label>Full name</Label>

								<Input placeholder="Example Doe" type="text" className="mt-1" />
							</label>
							<label className="block">
								<Label>Email address</Label>

								<Input type="email" placeholder="example@example.com" className="mt-1" />
							</label>
							<label className="block">
								<Label>Message</Label>

								<Textarea className="mt-1" rows={6} />
							</label>
							<ButtonPrimary type="submit">Send Message</ButtonPrimary>
						</form>
					</div>
				</div>
			</LayoutPage>

			{/* OTHER SECTIONS */}
			<div className="container pb-16 lg:pb-28">
				<SectionSubscribe2 />
			</div>
		</div>
	);
};

export default PageContact;
