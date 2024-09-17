import { CheckCircleIcon } from "@heroicons/react/solid";
import React from "react";

interface ItemCheckedProps {
	condition: boolean;
	name: string;
	icon?: JSX.Element;
	className?: string;
}

const ItemChecked: React.FC<ItemCheckedProps> = ({ condition, name, icon, className }) => {
	const iconSize = 24; // Assurez-vous de définir la taille de l'icône

	const Icon = icon || <CheckCircleIcon className="mr-0 sm:mr-1" width={iconSize} height={iconSize}  color="green" />;

	return (
		<div className={`flex ${className}`} style={{ alignItems: "center", fontSize: ".60rem" }}>
			<div className="flex justify-center">{condition && Icon}</div>
			<span>{name}</span>
		</div>
	);
};

export default ItemChecked;
