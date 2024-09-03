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
import { IProductType } from "../DashboardSubmitPost";

export interface DetailBienProps {
	register: UseFormRegister<ProductRequest>;
	setValue: any;
	product: IProduct | undefined;
	errorArray: any;
	typeDeBien: IProductType;
}

const DetailBien: FC<DetailBienProps> = ({
	setValue,
	register,
	product,
	errorArray,
	typeDeBien,
}) => {
	const iconSize = 38;
	const Detaillocation = () => {
		return (
			<>
				<div className="grid grid-cols-4 gap-6">
					{/* SUPERFICIE */}
					<div>
						<Label>Superficie</Label>

						<div className="block md:col-span-2 p-2">
							<div className="flex  " style={{ alignItems: "center" }}>
								<FaAdjust size={iconSize} className="mr-2" />
								<Input
									type="number"
									className="mt-1"
									defaultValue={(product && product.area && product.area) ?? 0}
									{...register("area")}
								/>
							</div>
							<ErrorMessage
								errors={errorArray}
								error="location_description"
								customMessage="Veuillez saisir un quartier"
							/>
						</div>
					</div>

					{/* SALE DE BAIN */}
					<div>
						<Label>Salle(s) de bain</Label>
						<div className="block md:col-span-2 p-2">
							<div className="flex  " style={{ alignItems: "center" }}>
								<FaBath size={iconSize} className="mr-2" />
								<Input
									type="number"
									className="mt-1"
									defaultValue={(product && product.bathrooms) ?? 0}
									{...register("bathrooms")}
								/>
							</div>
							<ErrorMessage
								errors={errorArray}
								error="location_description"
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
			<h3 className="text-xl font-bold mt-5">Detail du bien</h3>

			{typeDeBien === "LOCATION" && <Detaillocation />}
		</div>
	);
};

export default DetailBien;
