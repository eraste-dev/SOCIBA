import React from "react";
import { Link, useHistory } from "react-router-dom";
// import logoImg from "images/logo.png";
// import logoLightImg from "images/logo-light.png";
import logoImg from "images/logo/logo-alt.png";
import logoImgTwo from "images/logo/logo-alt-2.png";
import LogoSvg from "./LogoSvg";
import NcImage from "components/NcImage/NcImage";
import { route } from "routers/route";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProperties, initProductState } from "app/axios/api.action";
import { searchParamsFromRedux } from "utils/query-builder.utils";
import { PropertyAction } from "app/reducer/products/propertiy";

export interface LogoProps {}

const Logo: React.FC<LogoProps> = ({}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const filters = useSelector(PropertyAction.data)?.filters;

	const handleClick = () => {
		// dispatch(initProductState());
		// if (filters) {
		// 	dispatch(fetchAllProperties(searchParamsFromRedux(filters)));
		// }
		history.push(route("home"));
	};

	return (
		<a href="/" className="ttnc-logo inline-block text-primary-6000">
			<span className="flex items-center">
				<NcImage src={logoImgTwo} className="hidden md:blockhidden" style={{ height: 85, width: "auto" }} alt="logo" />
				<NcImage src={logoImg} className="block md:block" style={{ height: 55, width: "auto" }} alt="logo" />
			</span>

			{/* {imgLight && !img && <NcImage src={imgLight} alt="logo" />} */}

			{/* {!img && !imgLight && <LogoSvg />} */}
		</a>
	);
};

export default Logo;
