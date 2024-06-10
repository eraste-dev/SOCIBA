import React from "react";
import { Link } from "react-router-dom";
// import logoImg from "images/logo.png";
// import logoLightImg from "images/logo-light.png";
import logoImg from "images/logo/logo-alt.png";
import logoImgTwo from "images/logo/logo-alt-2.png";
import LogoSvg from "./LogoSvg";
import NcImage from "components/NcImage/NcImage";

export interface LogoProps {}

const Logo: React.FC<LogoProps> = ({}) => {
	return (
		<Link to="" className="ttnc-logo inline-block text-primary-6000">
			<span className="flex items-center">
				<NcImage src={logoImgTwo} className="hidden md:block" style={{ height: 85, width: "auto" }} alt="logo" />
				<NcImage src={logoImg} className="block md:hidden" style={{ height: 55, width: "auto" }} alt="logo" />
			</span>

			{/* {imgLight && !img && <NcImage src={imgLight} alt="logo" />} */}

			{/* {!img && !imgLight && <LogoSvg />} */}
		</Link>
	);
};

export default Logo;
