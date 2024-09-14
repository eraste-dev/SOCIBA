import { ProductRequest } from "app/axios/api.type";
import { IProduct } from "app/reducer/products/product";
import ErrorMessage from "components/Form/ErrorMessage";
import Input from "components/Form/Input/Input";
import Label from "components/Form/Label/Label";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaBath } from "react-icons/fa";
import {
	IProductType,
	PRODUCT_TYPE,
	TYPE_BIEN_EN_VENTE_KEY,
	TYPE_LOCATION_KEY,
	TYPE_RESERVATION_KEY,
} from "../../DashboardSubmitPost";
import {
	FoodBankOutlined,
	FoodBankTwoTone,
	InfoOutlined,
	KitchenSharp,
	LunchDining,
	PhotoSizeSelectSmallTwoTone,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { CategoryAction } from "app/reducer/products/propertiy-category";
import { ProductcategoryUUID } from "data/categories_uuid";

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
	const checkBoxStyle = { width: "10px", height: "10px" };
	const categories = useSelector(CategoryAction.data);

	const canShowACDCheckbox = (): boolean => {
		const type = getValues("type");
		const category_id = getValues("category_id");
		const categorySelected = categories?.find((category) => category.id === category_id);
		// const conditionType = type === TYPE_BIEN_EN_VENTE_KEY;

		console.log("check uuid cat", { categorySelected: categorySelected?.uuid, category_id });

		return [
			ProductcategoryUUID.BIEN_EN_VENTE.children.TERRAIN,
			ProductcategoryUUID.BIEN_EN_VENTE.children.AUTRES,
		].includes(categorySelected?.uuid ?? "");
	};

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
						<Tooltip title="Nombre de cuisine">
							<Label>Nombre de cuisine</Label>
						</Tooltip>
						<div className="block md:col-span-2 p-2">
							<div className="flex  " style={{ alignItems: "center" }}>
								{/* <Kitchen className="mr-2" /> */}
								<LunchDining className="mr-2" />
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
						<div className="flex justify-center align-middle">
							{/* <PoolSharp className="mr-2" /> */}
							<Input
								id="jacuzzi"
								type="checkbox"
								className="mx-2 text-base"
								style={checkBoxStyle}
								defaultChecked={product?.jacuzzi}
								{...register("jacuzzi")}
							/>
							<label htmlFor="jacuzzi">Jacuzzi</label>
						</div>
					</div>

					{/* BATH */}
					<div className="flex" style={{ alignItems: "center" }}>
						<div className="flex justify-center align-middle">
							{/* <PoolSharp className="mr-2" /> */}
							<Input
								id="bath"
								type="checkbox"
								className="mx-2"
								style={checkBoxStyle}
								defaultChecked={product?.bath}
								{...register("bath")}
								name="bath"
							/>
							<label htmlFor="bath">Baignoire</label>
						</div>
					</div>

					{/* WIFI */}
					<div className="flex" style={{ alignItems: "center" }}>
						<div className="flex justify-center align-middle">
							{/* <PoolSharp className="mr-2" /> */}
							<Input
								id="wifi"
								type="checkbox"
								className="mx-2"
								style={checkBoxStyle}
								defaultChecked={product?.WiFi}
								{...register("WiFi")}
							/>
							<label htmlFor="wifi">WIFI</label>
						</div>
					</div>

					{/* PICINE */}
					<div className="flex" style={{ alignItems: "center" }}>
						<div className="flex justify-center align-middle">
							{/* <PoolSharp className="mr-2" /> */}
							<Input
								id="pool"
								type="checkbox"
								className="mx-2"
								style={checkBoxStyle}
								{...register("pool")}
								defaultChecked={product?.pool}
							/>
							<label htmlFor="pool">Piscine</label>
						</div>
					</div>

					{/* CLIMATISATION */}
					<div className="flex" style={{ alignItems: "center" }}>
						<div className="flex justify-center align-middle">
							{/* <PoolSharp className="mr-2" /> */}
							<Input
								id="air_conditioning"
								type="checkbox"
								className="mx-2"
								style={checkBoxStyle}
								{...register("air_conditioning")}
								defaultChecked={product?.air_conditioning}
							/>
							<label htmlFor="air_conditioning">Climatisation</label>
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

					{/* ACD */}
					{canShowACDCheckbox() && (
						<div className="mt-5 flex items-center" style={{ alignItems: "center" }}>
							<div className="flex justify-center align-middle">
								<Input
									id="acd"
									type="checkbox"
									className="mx-2"
									style={checkBoxStyle}
									defaultChecked={product?.acd}
									{...register("acd")}
								/>
								<label htmlFor="acd">ACD</label>
							</div>
						</div>
					)}
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
