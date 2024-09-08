import { ProductRequest } from "app/axios/api.type";
import { ILocation } from "app/reducer/locations/locations";
import { IProduct } from "app/reducer/products/product";
import ErrorMessage from "components/Form/ErrorMessage";
import Input from "components/Form/Input/Input";
import Label from "components/Form/Label/Label";
import Select from "components/Form/Select/Select";
import React, { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaAdjust, FaBath, FaRecycle } from "react-icons/fa";
import {
	IProductType,
	PRODUCT_TYPE,
	TYPE_BIEN_EN_VENTE_KEY,
	TYPE_LOCATION_KEY,
	TYPE_RESERVATION_KEY,
} from "../Posts/DashboardSubmitPost";
import {
	AutoFixHigh,
	Fastfood,
	Kitchen,
	PhotoSizeSelectSmallTwoTone,
	PoolSharp,
	Security,
} from "@mui/icons-material";

export const securities: { value: string; label: string }[] = [
	{ value: "WITH_GUARD", label: "Avec vigile" },
	{ value: "WITHOUT_GUARD", label: "Sans vigile" },
];

export const purchase_powers: { value: string; label: string }[] = [
	{ value: "LESS_EXPENSIVE", label: "Moins cher" },
	{ value: "EQUAL_EXPENSIVE", label: "Acceptable" },
	{ value: "MORE_EXPENSIVE", label: "Elevée" },
];

export const accessibilities: { value: string; label: string }[] = [
	{ value: "NOT_FAR_FROM_THE_TAR", label: "Prêt du goudron" },
	{ value: "A_LITTLE_FAR_FROM_THE_TAR", label: "Eloigne du goudron" },
	{ value: "FAR_FROM_THE_TAR", label: "Très eloigné du goudron" },
];

export interface DetailBienTwoProps {
	register: UseFormRegister<ProductRequest>;
	setValue: any;
	getValues: any;
	product: IProduct | null | undefined;
	errorArray: any;
	typeDeBien: IProductType;
}

const DetailBienTwo: FC<DetailBienTwoProps> = ({
	setValue,
	getValues,
	register,
	product,
	errorArray,
	typeDeBien,
}) => {
	const iconSize = 38;

	console.log(product);
	

	const DetailTwoLocation = () => {
		return (
			<>
				{/* security */}
				{/* purchase_power */}
				{/* accessibility */}
				<div className="grid grid-cols-3 gap-6 mt-3">
					{/* SECURITY */}
					<div>
						<div className="block md:col-span-2 p-2">
							<div className="flex  " style={{ alignItems: "center" }}>
								<Security className="mr-2" />
								<Select
									onChange={(event) => {
										event.target.value &&
											setValue("security", event.target.value);
									}}
								>
									<option>Choix de la sécurité</option>
									{securities.map((security) => (
										<option
											value={security.value}
											selected={security.value === product?.security}
										>
											{security.label}
										</option>
									))}
								</Select>
							</div>
							<ErrorMessage
								errors={errorArray}
								error="location_description"
								customMessage="Veuillez saisir un quartier"
							/>
						</div>
					</div>

					{/* PURCHASE_POWER */}
					<div>
						<Label>Zone à pouvoir d'achat</Label>
						<div className="block md:col-span-2 p-2">
							<div className="flex" style={{ alignItems: "center" }}>
								<Security className="mr-2" />
								<Select
									onChange={(event) => {
										event.target.value &&
											setValue("purchase_power", event.target.value);
									}}
								>
									<option>Choix du pouvoir d'achat</option>
									{purchase_powers.map((i) => (
										<option value={i.value}>{i.label}</option>
									))}
								</Select>
							</div>
							<ErrorMessage
								errors={errorArray}
								error="purchase_power"
								customMessage="Veuillez saisir un quartier"
							/>
						</div>
					</div>

					{/* ACCESSIBILITY */}
					<div>
						<Label>Zone à pouvoir d'achat</Label>
						<div className="block md:col-span-2 p-2">
							<div className="flex" style={{ alignItems: "center" }}>
								<Security className="mr-2" />
								<Select
									onChange={(event) => {
										event.target.value &&
											setValue("accessibility", event.target.value);
									}}
								>
									<option>Choix du pouvoir d'achat</option>
									{accessibilities.map((i) => (
										<option value={i.value}>{i.label}</option>
									))}
								</Select>
							</div>
							<ErrorMessage
								errors={errorArray}
								error="accessibility"
								customMessage="Veuillez saisir un quartier"
							/>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<div className="mt-5">
			{/* <h3 className="text-xl font-bold mt-5">Detail du bien</h3> */}

			{typeDeBien === PRODUCT_TYPE[TYPE_LOCATION_KEY] && <DetailTwoLocation />}
		</div>
	);
};

export default DetailBienTwo;
