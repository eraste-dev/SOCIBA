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
import NcImage from "components/NcImage/NcImage";
import Image from "images/pages/moving.png";

export interface Statistic {
	id: string;
	heading: string;
	subHeading: string;
}

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

const SectionContact: FC<SectionContactProps> = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const snackbar = useSnackbar();
	const error = useSelector(userRequestAction.error);
	const success = useSelector(userRequestAction.success);
	const loading = useSelector(userRequestAction.loading);
	const [initialize, setInitialize] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { isSubmitSuccessful },
	} = useForm<MovingRequestInputs>();

	const onSubmit: SubmitHandler<MovingRequestInputs> = (data) => {
		console.log(data);
		if (!loading && !success) {
			dispatch(sendUserRequest(data));
		}
	};

	useEffect(() => {
		if (error && isSubmitSuccessful && !loading) {
			snackbar.enqueueSnackbar(error, { variant: "error" });
		}
		if (success && isSubmitSuccessful && !loading) {
			snackbar.enqueueSnackbar("Votre demande a bien été envoyée", { variant: "success" });
		}
	}, [error, success]);

	return (
		<div className="mb-12" >
			<div>
				<NcImage src={Image} />
			</div>
			<div className=" flex justify-center">
				{loading && <Loading />}

				{isSubmitSuccessful && success && (
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

				{!isSubmitSuccessful && !success && (
					<div className="w-2/3">
						<div className="fe">
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
		</div>
	);
};

export default SectionContact;
