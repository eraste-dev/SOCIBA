import { IUser } from "app/reducer/auth/auth";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import Logo from "components/Logo/Logo";
import Navigation from "components/Navigation/Navigation";
import DarkModeContainer from "containers/DarkModeContainer/DarkModeContainer";
import { NAVIGATION_SHORT_DEMO } from "data/navigation";
import { FC } from "react";
import { t } from "utils/translation/fr";
import { __ } from "utils/translation/translation";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import SearchHeader from "./SearchHeader";
import { FaArrowCircleDown, FaArrowCircleLeft, FaUserShield } from "react-icons/fa";

export const NavAuthAction: FC<{ user?: IUser }> = ({ user }) => {
	if (user) {
		return null;
	}

	const spanClassName: string = "text-base sm:text-xs";
	// const spanClassName: string = "hidden sm:hidden md:block";

	return (
		<div className="flex items-center space-x-1 text-center">
			<ButtonSecondary href={"/login"} sizeClass="py-2 sm:px-1">
				{/* <FaUserShield className="hidden sm:block md:hidden" /> */}
				<span className={spanClassName}>Se connecter</span>
			</ButtonSecondary>

			<ButtonPrimary href={"/signup"} sizeClass="py-2 sm:px-1">
				{/* <FaUserShield className="hidden sm:block md:hidden" /> */}
				<span className={spanClassName}>Déposer une annonce</span>
			</ButtonPrimary>
		</div>
	);
};

export interface MainNav2DesktopProps {
	user?: IUser;
	isDashboard: () => boolean;
	handleClickAddPost?: () => void;
}

const MainNav2Desktop: FC<MainNav2DesktopProps> = ({ user, isDashboard, handleClickAddPost }) => {
	if (!isDashboard() && !handleClickAddPost) {
		return null;
	}

	const classNameContainer = isDashboard() ? "px-0" : "container";

	return (
		<div className={`nc-MainNav nc-MainNav2 relative z-10 ${"notOnTop backdrop-filter "}`}>
			<div
				className={`pt-5 pb-2 relative flex flex-col justify-between items-center ${classNameContainer}`}
			>
				{/* #1 */}
				<div className="flex justify-between w-full space-x-2 xl:space-x-4">
					{/* #1'1 */}
					<div className="flex justify-between flex-grow items-center space-x-3 sm:space-x-8 lg:space-x-10 ">
						{!isDashboard() && <Logo />}
					</div>

					{/* #1'2 */}
					<div className="hidden sm:block flex-grow">
						<SearchHeader />
					</div>

					{/* #1'3 */}
					<div className="flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
						{user && (
							<div className="flex items-center">
								<ButtonPrimary
									onClick={handleClickAddPost}
									// href={route("add_post")}
									sizeClass="px-4 py-2 sm:px-5"
									className="mx-2"
								>
									{__(t.rs_publish)}
								</ButtonPrimary>

								<NotifyDropdown />
								<AvatarDropdown />
							</div>
						)}

						{!user && <NavAuthAction user={user} />}

						<DarkModeContainer />
					</div>
				</div>

				{/* #2 */}
				<div className="flex justify-between w-full">
					<Navigation navigations={NAVIGATION_SHORT_DEMO} />
				</div>
			</div>
		</div>
	);
};

export default MainNav2Desktop;