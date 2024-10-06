import { FC, useEffect } from "react";
import { INFO_CONTACT } from "containers/PageContact/PageContact";
import SocialsList from "components/SocialsList/SocialsList";
import Label from "components/Form/Label/Label";
import Input from "components/Form/Input/Input";
import Textarea from "components/Textarea/Textarea";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { sendUserRequest } from "app/axios/actions/api.users.action";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { userRequestAction } from "app/reducer/userRequest/userRequest";

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
	const success = useSelector(userRequestAction.success);
	const error = useSelector(userRequestAction.error);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		setValue,
		getValues,
		formState: { errors, isSubmitted },
	} = useForm<ContactUsForm>();

	const onSubmit = (data: ContactUsForm) => {
		console.log("SubmitHandler", data);
		console.log("getValues", getValues());
		dispatch(
			sendUserRequest({
				name: data.name,
				message: data.message,
				email: data.email,
				type: "CONTACT_US",
			})
		);
	};

	const handleClickReset = () => {
		reset();
	};

	useEffect(() => {
		if (success && isSubmitted) {
			snackbar.enqueueSnackbar("Votre message a bien été envoyé", {
				variant: "success",
				autoHideDuration: 1500,
			});
		}
	}, [success, isSubmitted]);

	useEffect(() => {
		if (error && isSubmitted) {
			snackbar.enqueueSnackbar(error, { variant: "error", autoHideDuration: 1500 });
		}
	}, [error, isSubmitted]);

	return (
		<>
			{isSubmitted && success ? (
				<div className="flex justify-center">
					<div className="w-2/3 flex flex-col items-center justify-center  ">
						<h1 className="text-3xl font-bold text-primary-800 text-center mb-5">
							Votre message a bien été envoyé
						</h1>
						<ButtonPrimary onClick={handleClickReset}>
							Contacter nous à nouveau
						</ButtonPrimary>
					</div>
				</div>
			) : null}

			{!isSubmitted || !success ? (
				<div
					className="grid gap-2 grid-cols-3 mt-0 "
					style={{ marginTop: "10px !important" }}
				>
					<div className="col-span-1">
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

					{/* <div className="border border-neutral-100 dark:border-neutral-700 lg:hidden"></div> */}

					<div className="col-span-2	" >
						<h3 className="font-semibold text-xl dark:text-neutral-200 tracking-wider mb-5">
							Nous contacter
						</h3>

						<div className="w-full" >
							{error ? <p className="text-red-500">{error}</p> : null}
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="grid grid-cols-1 gap-6"
							>
								<label className="block">
									<Label>Nom & Prénoms</Label>
									<Input
										placeholder="Exemple Franck"
										autoComplete="on"
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
										autoComplete="on"
										className="mt-1"
										{...register("email")}
									/>
								</label>

								<label className="block">
									<Label>Message</Label>
									<Textarea
										className="mt-1"
										rows={6}
										{...register("message")}
										autoComplete="on"
									/>
								</label>

								<ButtonPrimary type="submit">Envoyer</ButtonPrimary>
							</form>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default SectionContact;
