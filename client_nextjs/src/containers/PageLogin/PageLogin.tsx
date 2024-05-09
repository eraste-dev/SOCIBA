import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { FC, useEffect, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import Button from "components/Button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { initAuth, login } from "app/axios/api.action";
import { AuthAction } from "app/auth/auth";
import { Console } from "console";
import { Loading } from "components/Loading/Loading";

export interface PageLoginProps {
	className?: string;
}

// const loginSocials = [
//   {
//     name: "Continue with Facebook",
//     href: "#",
//     icon: facebookSvg,
//   },
//   {
//     name: "Continue with Twitter",
//     href: "#",
//     icon: twitterSvg,
//   },
//   {
//     name: "Continue with Google",
//     href: "#",
//     icon: googleSvg,
//   },
// ];

const loginSocials: { name: string; href: string; icon: string }[] = [];

type Inputs = {
	email: string;
	password: string;
};

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
	const dispatch = useDispatch();
	const query = useSelector(AuthAction.data);
	const error = useSelector(AuthAction.error);
	const loading = useSelector(AuthAction.loading);
	const [initialize, setInitialize] = useState(false);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		console.log(data);
		if (data && data.email && data.password && !loading) {
			dispatch(login(data));
		}
	};

	useEffect(() => {
		if (!initialize) {
			setInitialize(true);
			dispatch(initAuth());
		}
	}, [initialize, dispatch, initAuth]);

	return (
		<div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
			<Helmet>
				<title>Se connecter</title>
			</Helmet>
			<LayoutPage subHeading="En deux clics, c'est gratuit!" headingEmoji="🔑" heading="Se connecter">
				<div className="max-w-md mx-auto space-y-6">
					{loginSocials && loginSocials.length > 0 && (
						<>
							<div className="grid gap-3">
								{loginSocials.map((item, index) => (
									<a
										key={index}
										href={item.href}
										className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
									>
										<img className="flex-shrink-0" src={item.icon} alt={item.name} />
										<h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
											{item.name}
										</h3>
									</a>
								))}
							</div>
							{/* OR */}
							<div className="relative text-center">
								<span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
									OR
								</span>
								<div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
							</div>
						</>
					)}
					{/* FORM */}
					<form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
						<label className="block">
							<span className="text-neutral-800 dark:text-neutral-200">Email</span>
							<Input
								type="email"
								placeholder="example@example.com"
								className="mt-1"
								defaultValue={""}
								{...register("email", { required: true })}
							/>
						</label>

						<label className="block">
							<span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
								Mot de passe
								<NcLink to="/forgot-pass" className="text-sm">
									Mot de passe oublié?
								</NcLink>
							</span>
							<Input type="password" className="mt-1" {...register("password", { required: true })} />
						</label>

						{!loading ? <ButtonPrimary type="submit">Se connecter</ButtonPrimary> : <Loading />}
					</form>

					<div>{error && !loading && <p className="text-red-500 text-center">{error}</p>}</div>

					<div>
						<span className="block text-center text-neutral-700 dark:text-neutral-300">
							Nouveau compte? {` `}
							<NcLink to="/signup">Creer un compte</NcLink>
						</span>
					</div>
				</div>
			</LayoutPage>
		</div>
	);
};

export default PageLogin;
