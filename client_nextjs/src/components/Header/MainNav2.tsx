import { AuthAction, IUser } from "app/reducer/auth/auth";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __ } from "utils/translation/translation";
import { route } from "routers/route";
import { useHistory } from "react-router-dom";
import { initProductState, setSingleProduct } from "app/axios/actions/api.action";
import { EMPTY_PRODUCT } from "app/axios/api.type";
import MainNav2Desktop from "./MainNav2Desktop";
import MainNav2Mobile from "./MainNav2Mobile";

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
				Déposer une annonce
			</ButtonPrimary>
		</>
	);
};

export interface MainNav2Props {}

const MainNav2: FC<MainNav2Props> = () => {
	const dispatch = useDispatch();
	const user = useSelector(AuthAction.data)?.user;
	const history = useHistory();
	// const user = useSelector(AuthAction.data)?.token;

	const isDashboard = () => {
		return history.location.pathname.includes("dashboard");
	};

	const handleClickAddPost = () => {
		console.log("handleClickAddPost");
		dispatch(initProductState());
		dispatch(setSingleProduct(EMPTY_PRODUCT));
		history.replace(route("add_post"));
	};

	return (
		<div className="main-header-style-one">
			{/* DESKTOP LG */}
			<div className="hidden sm:block">
				<MainNav2Desktop
					isDashboard={() => isDashboard()}
					user={user}
					handleClickAddPost={handleClickAddPost}
				/>
			</div>

			{/* MOBILE */}
			<div className="block sm:hidden">
				<MainNav2Mobile
					isDashboard={() => isDashboard()}
					user={user}
					handleClickAddPost={handleClickAddPost}
				/>
			</div>
		</div>
	);
};

export default MainNav2;
