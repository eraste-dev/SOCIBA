import React from "react";
import { useHistory } from "react-router-dom";
// import logoImg from "images/logo.png";
// import logoLightImg from "images/logo-light.png";
import LOGO_IMG from "images/logo/logo.png";
import LOGO_IMG_DARK from "images/logo/logo-dark.png";
import NcImage from "components/NcImage/NcImage";
import { route } from "routers/route";
import { useDispatch } from "react-redux";
import { initCitiesList, inittPropertyList } from "app/axios/actions/api.action";
import { useAppSelector } from "app/hooks";
import { selectDarkmodeState } from "app/reducer/darkmode/darkmode";

export interface LogoProps {
	height?: string;
	width?: string;
}

const Logo: React.FC<LogoProps> = ({ height = "65px", width = "auto" }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const darkmodeState = useAppSelector(selectDarkmodeState);
	// const filters = useSelector(PropertyAction.data)?.filters;

	const onClickItem = () => {
		dispatch(initCitiesList());
		dispatch(inittPropertyList());
		history.push(route("home"));
	};

	return (
		<a
			onClick={onClickItem}
			className="ttnc-logo inline-block text-primary-6000 cursor-pointer "
		>
			{/* href="/" */}
			<span className="flex items-center">
				{darkmodeState === true ? (
					<>
						<NcImage
							src={LOGO_IMG_DARK}
							className="hidden md:blockhidden"
							style={{ height, width }}
							alt="logo"
						/>

						<NcImage
							src={LOGO_IMG_DARK}
							className="block md:block"
							style={{ height, width }}
							alt="logo"
						/>
					</>
				) : (
					<>
						<NcImage
							src={LOGO_IMG}
							className="hidden md:blockhidden"
							style={{ height, width }}
							alt="logo"
						/>

						<NcImage
							src={LOGO_IMG}
							className="block md:block"
							style={{ height, width }}
							alt="logo"
						/>
					</>
				)}
			</span>

			{/* {imgLight && !img && <NcImage src={imgLight} alt="logo" />} */}

			{/* {!img && !imgLight && <LogoSvg />} */}
		</a>
	);
};

export default Logo;
