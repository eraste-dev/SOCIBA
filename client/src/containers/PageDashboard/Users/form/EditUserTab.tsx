import { Slider } from "app/reducer/sliders/sliders";
import { FC } from "react";
import Tabs from "containers/PageDashboard/Settings/Tabs";
import UpdatePassword from "./UpdatePassword";
import UpdateProfileForm from "./UpdateProfileForm";

export interface EditUserTabProps {
}

const EditUserTab: FC<EditUserTabProps> = ({ }) => {
	const tabs = [
		{
			title: "Modifier profil",
			content: (
				<UpdateProfileForm />
			),
		},
		{
			title: "Modifier mot de passe",
			content: (
				<UpdatePassword />
			),
		}
	];


	return (
		<div className="">
			<Tabs tabs={tabs} />
		</div>
	);
};

export default EditUserTab;
