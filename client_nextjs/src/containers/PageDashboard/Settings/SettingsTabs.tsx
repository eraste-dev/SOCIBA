import { ISettings } from "app/reducer/settings/settings.";
import { FC } from "react";
import Tabs from "./Tabs";
import SettingsTabsAboutus from "./SettingsTabsAboutUs";

export interface SettingsTabsProps {
	settings: ISettings;
}

const SettingsTabs: FC<SettingsTabsProps> = ({ settings }) => {
	const tabs = [
		{
			title: "A propos de nous",
			content: <SettingsTabsAboutus />,
		},
	];

	return (
		<div className="">
			<Tabs tabs={tabs} />
		</div>
	);
};

export default SettingsTabs;
