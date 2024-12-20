import { Slider } from "app/reducer/sliders/sliders";
import { FC } from "react";
import SliderManagementTable from "../SliderManagementTable";
import Tabs from "containers/PageDashboard/Settings/Tabs";

export interface SliderTabsProps {
	data: Slider[];
}

const SliderTabs: FC<SliderTabsProps> = ({ data }) => {
	const tabs = [
		{
			title: "Page d'acceuil",
			content: (
				<SliderManagementTable rows={data.filter((slider) => slider.place === "HOME")} />
			),
		},
		{
			title: "Liste produits",
			content: (
				<SliderManagementTable rows={data.filter((slider) => slider.place === "PRODUCT")} />
			),
		},
		{
			title: "Page déménagement",
			content: (
				<SliderManagementTable rows={data.filter((slider) => slider.place === "MOVING")} />
			),
		},
	];


	return (
		<div className="">
			<Tabs tabs={tabs} />
		</div>
	);
};

export default SliderTabs;
