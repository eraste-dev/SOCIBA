import { CheckCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { iconColor } from "./ItemCheck";

interface ItemCheckTwoProps {
	condition: boolean;
	name: string;
	icon?: JSX.Element;
	className?: string;
	isSingle?: boolean;
}

const ItemCheckTwo: React.FC<ItemCheckTwoProps> = ({
	condition,
	name,
	icon,
	className,
	isSingle,
}) => {
	const iconSize = 18; // Assurez-vous de définir la taille de l'icône

	const Icon = icon || (
		<CheckCircleIcon
			className="mr-0 sm:mr-1"
			width={iconSize}
			height={iconSize}
			color={iconColor}
		/>
	);

	return (
		<div className={`flex overflow-hidden text-sm sm:text-base text-ellipsis ${className}`}>
			<div className="flex justify-center items-center mr-2">{condition && Icon}</div>
			<span>{name}</span>
		</div>
	);
};

export default ItemCheckTwo;
