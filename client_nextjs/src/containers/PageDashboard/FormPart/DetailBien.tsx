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
} from "../DashboardSubmitPost";
import { Fastfood, Kitchen, PhotoSizeSelectSmallTwoTone, PoolSharp } from "@mui/icons-material";

export interface DetailBienProps {
	register: UseFormRegister<ProductRequest>;
	setValue: any;
	getValues: any;
	product: IProduct | undefined;
	errorArray: any;
	typeDeBien: IProductType;
}

const DetailBien: FC<DetailBienProps> = ({
	setValue,
	getValues,
	register,
	product,
	errorArray,
	typeDeBien,
}) => {
	const iconSize = 38;
	const Detaillocation = () => {
		return (
			<>
				<div className="grid grid-cols-3 gap-6">
					{/* SUPERFICIE */}
					<div>
						<Label>Superficie</Label>
						<div className="block md:col-span-2 p-2">
							<div className="flex  " style={{ alignItems: "center" }}>
								<PhotoSizeSelectSmallTwoTone className="mr-2" />
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
						<Label>Nombre de salle(s) de bain</Label>
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

					{/* CUISINE */}
					<div>
						<Label>Nombre de cuisine</Label>
						<div className="block md:col-span-2 p-2">
							<div className="flex  " style={{ alignItems: "center" }}>
								<Kitchen className="mr-2" />
								<Input
									type="number"
									className="mt-1"
									defaultValue={(product && product.kitchens) ?? 0}
									{...register("kitchens")}
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

	const DetailReservation = () => {
		return (
			<>
				<div className="grid grid-cols-4 gap-6 mt-3">
					{/* JACUZZI */}
					<div className="flex" style={{ alignItems: "center" }}>
						<div>
							{/* <PoolSharp className="mr-2" /> */}
							<input
								type="checkbox"
								className="mx-2"
								// checked={(product && product.jacuzzi && product.jacuzzi) ?? false}
								{...register("jacuzzi")}
							/>
							<Label>Jacuzzi</Label>
						</div>
					</div>

					{/* BATH */}
					<div className="flex  " style={{ alignItems: "center" }}>
						<div>
							{/* <PoolSharp className="mr-2" /> */}
							<input
								type="checkbox"
								className="mx-2"
								{...register("bath")}
								name="bath"
								// checked={(product && product.bath && product.bath) ?? false}
							/>
							<Label>Baignoire</Label>
						</div>
					</div>

					{/* WIFI */}
					<div className="flex" style={{ alignItems: "center" }}>
						<div>
							{/* <PoolSharp className="mr-2" /> */}
							<input
								type="checkbox"
								className="mx-2"
								{...register("WiFi")}
								// checked={(product && product.bath && product.bath) ?? false}
							/>
							<Label>WIFI</Label>
						</div>
					</div>

					{/* PICINE */}
					<div className="flex" style={{ alignItems: "center" }}>
						<div>
							{/* <PoolSharp className="mr-2" /> */}
							<input
								type="checkbox"
								className="mx-2"
								{...register("pool")}
								// checked={(product && product.bath && product.bath) ?? false}
							/>
							<Label>Piscine</Label>
						</div>
					</div>

					{/* CLIMATISATION */}
					<div className="flex" style={{ alignItems: "center" }}>
						<div>
							{/* <PoolSharp className="mr-2" /> */}
							<input
								type="checkbox"
								className="mx-2"
								{...register("air_conditioning")}
								// checked={(product && product.bath && product.bath) ?? false}
							/>
							<Label>Climatisation</Label>
						</div>
					</div>
				</div>
			</>
		);
	};

	const DetailVente = () => {
		return (
			<>
				<div className="grid grid-cols-3 gap-6">
					{/* SUPERFICIE */}
					<div>
						<Label>Superficie</Label>
						<div className="block md:col-span-2 p-2">
							<div className="flex  " style={{ alignItems: "center" }}>
								<PhotoSizeSelectSmallTwoTone className="mr-2" />
								<Input
									type="number"
									className="mt-1"
									defaultValue={(product && product.area && product.area) ?? 0}
									{...register("area_unit")}
								/>
							</div>
							<ErrorMessage
								errors={errorArray}
								error="location_description"
								customMessage="Veuillez saisir un quartier"
							/>
						</div>
					</div>

					{/* ACD */}
					<div className="flex items-center" style={{ alignItems: "center" }}>
						<div className="mt-3">
							{/* <PoolSharp className="mr-2" /> */}
							<input
								type="checkbox"
								className="mx-2"
								// checked={(product && product.jacuzzi && product.jacuzzi) ?? false}
								{...register("acd")}
							/>
							<Label>ACD</Label>
						</div>
					</div>
				</div>
			</>
		);
	};

	return (
		<div className="mt-5">
			<h3 className="text-xl font-bold mt-5">Detail du bien</h3>

			{typeDeBien === PRODUCT_TYPE[TYPE_LOCATION_KEY] && <Detaillocation />}

			{typeDeBien === PRODUCT_TYPE[TYPE_RESERVATION_KEY] && <DetailReservation />}

			{typeDeBien === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] && <DetailVente />}
		</div>
	);
};

export default DetailBien;
