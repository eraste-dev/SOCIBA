import { IUser } from "app/reducer/auth/auth";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import Logo from "components/Logo/Logo";
import MenuBar from "components/MenuBar/MenuBar";
import DarkModeContainer from "containers/DarkModeContainer/DarkModeContainer";
import { FC } from "react";
import { t } from "utils/translation/fr";
import { __ } from "utils/translation/translation";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import LoginDropdown from "./LoginDropdown";
import SearchHeader from "./SearchHeader";

export const NavAuthAction: FC<{ user?: IUser }> = ({ user }) => {
	if (user) {
		return null;
	}

	return (
		<>
			<ButtonSecondary href={"/login"} sizeClass="px-4 py-2 sm:px-5 mx-2">
				Se connecter
			</ButtonSecondary>

			<ButtonPrimary href={"/signup"} sizeClass="px-4 py-2 sm:px-5">
				Publier une annonce
			</ButtonPrimary>
		</>
	);
};

export interface MainNav2MobileProps {
	isDashboard: () => boolean;
	user?: IUser;
	handleClickAddPost?: () => void;
}

const MainNav2Mobile: FC<MainNav2MobileProps> = ({ isDashboard, user, handleClickAddPost }) => {
	const classNameContainer = isDashboard() ? "px-0" : "container";

	return (
		<div className={`nc-MainNav nc-MainNav2 relative z-10 ${"notOnTop backdrop-filter "}`}>
			<div
				className={`pt-2 pb-1 relative flex flex-col justify-between items-center space-x-0 ${classNameContainer}`}
			>
				{/* COL 1 */}
				<div
					className={`w-full flex justify-${
						isDashboard() ? "end" : "between"
					} flex-grow items-center space-x-3`}
				>
					{!isDashboard() && (
						<>
							<Logo width="auto" height="40px" />
						</>
					)}

					<div className="flex items-center space-x-1.5 xl:hidden">
						{user ? (
							<>
								<NotifyDropdown />
								<AvatarDropdown />
							</>
						) : (
							<LoginDropdown />
						)}

						<DarkModeContainer />

						{isDashboard() ? null : <MenuBar isDashboard={isDashboard()} />}
					</div>
				</div>

				<div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
					<div className="hidden items-center xl:flex space-x-2">
						<div className="hidden sm:block h-10 border-l border-neutral-300 dark:border-neutral-6000">
							{user && (
								<div className="flex items-center">
									<ButtonPrimary
										onClick={handleClickAddPost}
										sizeClass="px-4 py-2 sm:px-5"
										className="mx-2"
									>
										Publier une annonce
									</ButtonPrimary>

									<NotifyDropdown />
									<AvatarDropdown />
								</div>
							)}

							{!user && <NavAuthAction user={user} />}
						</div>

						<DarkModeContainer />
					</div>
				</div>

				{/* COL 2 */}
				{!isDashboard() ? (
					<div className="w-full flex justify-center flex-grow items-center">
						<SearchHeader />
					</div>
				) : null}
			</div>
		</div>
	);
};

export default MainNav2Mobile;
