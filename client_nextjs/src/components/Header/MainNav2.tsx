import { AuthAction } from "app/auth/auth";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import Input from "components/Input/Input";
import Logo from "components/Logo/Logo";
import MenuBar from "components/MenuBar/MenuBar";
import Navigation from "components/Navigation/Navigation";
import DarkModeContainer from "containers/DarkModeContainer/DarkModeContainer";
import { NAVIGATION_SHORT_DEMO } from "data/navigation";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { t } from "utils/translation/fr";
import { __ } from "utils/translation/translation";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import { route } from "routers/route";
import { useHistory } from "react-router-dom";

export interface MainNav2Props {}

const MainNav2: FC<MainNav2Props> = () => {
	const dispatch = useDispatch();
	const user = useSelector(AuthAction.data)?.user;
	const history = useHistory();
	// const user = useSelector(AuthAction.data)?.token;

	const isDashboard = () => {
		return history.location.pathname.includes("dashboard");
	};

	const classNameContainer = isDashboard() ? "px-10" : "container";

	return (
		<div className={`nc-MainNav nc-MainNav2 relative z-10 ${"notOnTop backdrop-filter "}`}>
			<div className={`pt-5 pb-2 relative flex justify-between items-center space-x-4 xl:space-x-8 ${classNameContainer}`}>
				<div className="flex justify-start flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
					{!isDashboard() && (
						<>
							<Logo />
							<div className="hidden sm:block flex-grow max-w-xs">
								<form action="" method="POST" className="relative">
									<Input type="search" placeholder="Chercher sur SOCIBA" className="pr-10 w-full" sizeClass="h-[42px] pl-4 py-3" />
									<span className="absolute top-1/2 -translate-y-1/2 right-3 text-neutral-500">
										<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
												stroke="currentColor"
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path d="M22 22L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</span>
									<input type="submit" hidden value="" />
								</form>
							</div>{" "}
						</>
					)}
				</div>

				<div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
					<div className="hidden items-center xl:flex space-x-2">
						{!isDashboard() && <Navigation navigations={NAVIGATION_SHORT_DEMO} />}

						<div className="hidden sm:block h-10 border-l border-neutral-300 dark:border-neutral-6000"></div>
						<DarkModeContainer />

						{user && (
							<>
								<ButtonPrimary href={route("add_post")} sizeClass="px-4 py-2 sm:px-5">
									{__(t.rs_publish)}
								</ButtonPrimary>
								<NotifyDropdown />
								<AvatarDropdown />
							</>
						)}

						{!user && (
							<>
								<ButtonSecondary href={"/login"} sizeClass="px-4 py-2 sm:px-5">
									Se connecter
								</ButtonSecondary>

								<ButtonPrimary href={"/signup"} sizeClass="px-4 py-2 sm:px-5">
									Créer un compte
								</ButtonPrimary>
							</>
						)}
					</div>

					<div className="flex items-center space-x-1.5 xl:hidden">
						{user && (
							<ButtonPrimary href={"/signup"} sizeClass="px-4 py-2 sm:px-5">
								{__(t.rs_publish)}
							</ButtonPrimary>
						)}
						<MenuBar />
					</div>
				</div>
			</div>

			{false && (
				<div className="container pb-2 relative flex justify-between items-center ">
					<div className="hidden sm:flex flex-shrink-0 items-center space-x-1.5">
						<Navigation navigations={NAVIGATION_SHORT_DEMO} />
					</div>
				</div>
			)}
		</div>
	);
};

export default MainNav2;
