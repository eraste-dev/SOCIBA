import { CheckCircleIcon } from "@heroicons/react/solid";
import React from "react";

export const iconSize = 10; // Assurez-vous de définir la taille de l'icône
export const iconSizeSingle = 18; // Assurez-vous de définir la taille de l'icône
export const iconColor = "#774444"; // Assurez-vous de définir la taille de l'icône

interface ItemCheckedProps {
	condition: boolean;
	name: string;
	icon?: JSX.Element;
	className?: string;
	isSingle?: boolean;
}

const ItemChecked: React.FC<ItemCheckedProps> = ({
	condition,
	name,
	icon,
	className,
	isSingle,
}) => {
	const Icon = icon || (
		<CheckCircleIcon
			className="mr-0 sm:mr-1"
			width={iconSize}
			height={iconSize}
			color={iconColor}
		/>
	);

	return (
		<div className={`flex overflow-hidden text-xs sm:text-sm  text-ellipsis ${className}`}>
			<div className="flex justify-center items-center">{condition && Icon}</div>
			<span>{name}</span>
		</div>
	);
};

export default ItemChecked;
