import { AuthAction } from "app/reducer/auth/auth";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import Input from "components/Form/Input/Input";
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
import Logi from "./LoginDropdown";
import { route } from "routers/route";
import { useHistory } from "react-router-dom";
import LoginDropdown from "./LoginDropdown";
import SearchHeader from "./SearchHeader";

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
			<div
				className={`pt-5 pb-2 relative flex justify-between items-center space-x-4 xl:space-x-8 ${classNameContainer}`}
			>
				<div className="flex justify-between flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10">
					{!isDashboard() && (
						<>
							<Logo />

							<div className="hidden sm:block flex-grow max-w-md">
								<SearchHeader />
							</div>
						</>
					)}
				</div>

				<div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
					<div className="hidden items-center xl:flex space-x-2">
						{!isDashboard() && false && (
							<Navigation navigations={NAVIGATION_SHORT_DEMO} />
						)}

						<div className="hidden sm:block h-10 border-l border-neutral-300 dark:border-neutral-6000">
							{user && (
								<div className="flex items-center">
									<ButtonPrimary
										href={route("add_post")}
										sizeClass="px-4 py-2 sm:px-5"
										className="mx-2"
									>
										{__(t.rs_publish)}
									</ButtonPrimary>

									{/* <NotifyDropdown />	 */}
									<AvatarDropdown />
								</div>
							)}

							{!user && (
								<>
									<ButtonSecondary
										href={"/login"}
										sizeClass="px-4 py-2 sm:px-5 mx-2"
									>
										Se connecter
									</ButtonSecondary>

									<ButtonPrimary href={"/signup"} sizeClass="px-4 py-2 sm:px-5">
										Déposer une annonce
									</ButtonPrimary>
								</>
							)}
						</div>

						<DarkModeContainer />
					</div>

					<div className="flex items-center space-x-1.5 xl:hidden">
						{user && (
							<>
								<NotifyDropdown />
								<AvatarDropdown />
							</>
						)}

						{!user && (
							<>
								{/* <ButtonPrimary
									href={route("add_post")}
									sizeClass="px-4 py-2 sm:px-5"
								>
									{__(t.rs_publish)}
								</ButtonPrimary> */}

								<LoginDropdown />
							</>
						)}
						<DarkModeContainer />
						<MenuBar />
					</div>
				</div>
			</div>
			
			<div className="lg:hidden md:hidden p-3" >
				<SearchHeader  />
			</div>

			{!isDashboard() && (
				<div className="container pb-2 relative flex justify-between items-center mt-5 ">
					<div className="hidden sm:flex justify-between">
						<Navigation navigations={NAVIGATION_SHORT_DEMO} />
					</div>
				</div>
			)}
		</div>
	);
};

export default MainNav2;
