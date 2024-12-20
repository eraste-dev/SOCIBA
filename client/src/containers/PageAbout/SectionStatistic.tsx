import React, { FC } from "react";
import Heading from "components/Heading/Heading";

export interface Statistic {
	id: string;
	heading: string;
	subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
	{
		id: "1",
		heading: "1k",
		subHeading: "Annonces publiées",
	},
	{
		id: "2",
		heading: "100,000",
		subHeading: "Compte d'utilisateurs enregistrés",
	},
	{
		id: "3",
		heading: "220+",
		subHeading: "Toutes les communes d'Abidjan",
	},
];

export interface SectionStatisticProps {
	className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
	return (
		<div className={`nc-SectionStatistic relative ${className}`}>
			<Heading desc="BAJORAH vous permet de trouver facilement ce dont vous chercher en quelque click !">BAJORAH</Heading>
			<div className="grid md:grid-cols-2 gap-5 lg:grid-cols-3 xl:gap-8">
				{FOUNDER_DEMO.map((item) => (
					<div key={item.id} className="p-6 bg-white dark:bg-black/20 rounded-2xl dark:border-neutral-800">
						<h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-4xl dark:text-neutral-200">{item.heading}</h3>
						<span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">{item.subHeading}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default SectionStatistic;
