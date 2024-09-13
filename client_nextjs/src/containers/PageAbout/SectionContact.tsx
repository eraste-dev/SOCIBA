import { FC } from "react";
import { INFO_CONTACT } from "containers/PageContact/PageContact";
import SocialsList from "components/SocialsList/SocialsList";
import Label from "components/Form/Label/Label";
import Input from "components/Form/Input/Input";
import Textarea from "components/Textarea/Textarea";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { sendUserRequest } from "app/axios/actions/api.users.action";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

export interface ContactUsForm {
	name: string;
	email: string;
	message: string;
}

export interface Statistic {
	id: string;
	heading: string;
	subHeading: string;
}

export interface SectionContactProps {
	className?: string;
}

const SectionContact: FC<SectionContactProps> = ({ className = "" }) => {
	const dispatch = useDispatch();
	const snackbar = useSnackbar();

	const { register, handleSubmit, watch, setValue, getValues } = useForm<ContactUsForm>();

	const onSubmit = (data: ContactUsForm) => {
		console.log("SubmitHandler", data);
		console.log("getValues", getValues());
		// dispatch(sendUserRequest(data));
	};

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
				<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
					<label className="block">
						<Label>Nom & Prénoms</Label>
						<Input
							placeholder="Exemple Franck"
							type="text"
							className="mt-1"
							{...register("name")}
						/>
					</label>

					<label className="block">
						<Label>Email</Label>
						<Input
							type="email"
							placeholder="franck@gmail.com"
							className="mt-1"
							{...register("email")}
						/>
					</label>

					<label className="block">
						<Label>Message</Label>
						<Textarea className="mt-1" rows={6} {...register("message")} />
					</label>

					<ButtonPrimary type="submit">Envoyer</ButtonPrimary>
				</form>
			</div>
		</div>
	);
};

export default SectionContact;
