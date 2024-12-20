import Heading from "components/Heading/Heading";
import NcImage from "components/NcImage/NcImage";
import React, { useEffect } from "react";
import { ABOUT_TEXT } from "./PageAbout";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/hooks";
import { SettingsAction } from "app/reducer/settings/settings.";
import Loading from "components/UI/Loading";
import { fetchDefaultSettings } from "app/axios/actions/api.settings.action";
import SectionFounderStatic from "./SectionFounderStatic";

export interface People {
	id: string;
	name: string;
	job: string;
	avatar: string;
}

const FOUNDER_DEMO: People[] = [
	{
		id: "1",
		name: `Niamh O'Shea`,
		job: "Co-founder and Chief Executive",
		avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "4",
		name: `Danien Jame`,
		job: "Co-founder and Chief Executive",
		avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "3",
		name: `Orla Dwyer`,
		job: "Co-founder, Chairman",
		avatar: "https://images.unsplash.com/photo-1560365163-3e8d64e762ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
	},
	{
		id: "2",
		name: `Dara Frazier`,
		job: "Co-Founder, Chief Strategy Officer",
		avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
	},
];

const SectionFounder = () => {
	const dispatch = useDispatch();
	const setting = useAppSelector(SettingsAction.data)?.default?.get;
	const loading = useAppSelector(SettingsAction.data)?.default?.loading;
	const error = useAppSelector(SettingsAction.data)?.default?.error;

	useEffect(() => {
		if (!loading && !setting && !error) {
			dispatch(fetchDefaultSettings());
		}
	}, [dispatch, fetchDefaultSettings, loading, setting]);

	if (loading) {
		return (
			<>
				<Loading />
			</>
		);
	}

	return (
		<div className="nc-SectionFounder relative">
			{/* <Heading descHtml={setting?.about_us}>Qui somme nous ?</Heading> */}

			{/* className="text-neutral-700 dark:text-neutral-300 mb-12" */}
			{false && <div dangerouslySetInnerHTML={{ __html: setting?.about_us ?? "" }}></div>}

			<SectionFounderStatic />

			<div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
				{false &&
					FOUNDER_DEMO.map((item) => (
						<div key={item.id} className="max-w-sm">
							<NcImage
								containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
								className="absolute inset-0 object-cover"
								src={item.avatar}
							/>
							<h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
								{item.name}
							</h3>
							<span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
								{item.job}
							</span>
						</div>
					))}
			</div>
		</div>
	);
};

export default SectionFounder;
