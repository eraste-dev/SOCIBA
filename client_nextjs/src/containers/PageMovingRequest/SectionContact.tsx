import { FC, useEffect, useState } from "react";
import { INFO_CONTACT } from "containers/PageContact/PageContact";
import SocialsList from "components/SocialsList/SocialsList";
import Label from "components/Form/Label/Label";
import Input from "components/Form/Input/Input";
import Textarea from "components/Textarea/Textarea";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { initUserRequest, sendUserRequest } from "app/axios/actions/api.users.action";
import { userRequestAction } from "app/reducer/userRequest/userRequest";
import Loading from "components/UI/Loading";
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

export type MovingRequestInputs = {
	name: string;
	phone: string;
	area: string;
	location: string;
	message: string;
	others: string;
	date: string;
};

const SectionContact: FC<SectionContactProps> = ({ className = "" }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const snackbar = useSnackbar();
	const user = useSelector(userRequestAction.data);
	const error = useSelector(userRequestAction.error);
	const success = useSelector(userRequestAction.success);
	const loading = useSelector(userRequestAction.loading);
	const [initialize, setInitialize] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitted },
	} = useForm<MovingRequestInputs>();

	const onSubmit: SubmitHandler<MovingRequestInputs> = (data) => {
		console.log(data);
		if (!loading && !success) {
			dispatch(sendUserRequest(data));
		}
	};

	useEffect(() => {
		if (error && isSubmitted && !loading) {
			snackbar.enqueueSnackbar(error, { variant: "error" });
		}
		if (success && isSubmitted && !loading) {
			snackbar.enqueueSnackbar("Votre demande a bien été envoyée", { variant: "success" });
		}
	}, [error, success]);

	return (
		<div className=" flex justify-center">
			{loading && <Loading />}

			{isSubmitted && success && (
				<div className="w-2/3 flex flex-col items-center justify-center  ">
					<h1 className="text-3xl font-bold text-primary-800 text-center mb-12">
						Votre demande a bien été envoyée
					</h1>
					<ButtonPrimary
						onClick={() => {
							dispatch(initUserRequest());
							history.push("/");
						}}
					>
						Retourner à la page d'accueil
					</ButtonPrimary>
				</div>
			)}

			{!isSubmitted && !success && (
				<div className="w-2/3">
					<div className="fe" >
						<p className="text-3xl font-bold text-primary-800 text-center mb-5">
							Formulaire de démenagement
						</p>

						<p className="text-base font-bold text-primary-800 text-center mb-12">
							Veuillez remplir le formulaire ci-dessous pour nous contacter
						</p>
					</div>


					<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
						<label className="block">
							<Label>Nom & Prénoms</Label>
							<Input
								type="text"
								className="mt-1"
								{...register("name", { required: true })}
								autoComplete="on"
							/>
						</label>

						<label className="block">
							<Label>Contact</Label>
							<Input
								type="text"
								className="mt-1"
								{...register("phone", { required: true })}
							/>
						</label>

						<label className="block">
							<Label>Surface à demenager</Label>
							<Input type="text" className="mt-1" {...register("area")} />
						</label>

						<label className="block">
							<Label>Lieu</Label>
							<Input
								type="text"
								className="mt-1"
								{...register("location", { required: true })}
							/>
						</label>

						<label className="block">
							<Label>Date de demenagement</Label>
							<Input type="date" className="mt-1" {...register("date")} />
						</label>

						<label className="block">
							<Label>Message</Label>
							<Textarea
								className="mt-1"
								rows={6}
								{...register("message", { required: true })}
							/>
						</label>

						<label className="block">
							<Label>Autres informagtions supplémentaires</Label>
							<Textarea className="mt-1" {...register("others")} />
						</label>

						<ButtonPrimary type="submit">Envoyer</ButtonPrimary>
					</form>
				</div>
			)}
		</div>
	);
};

export default SectionContact;
