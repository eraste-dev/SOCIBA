import { IProduct, IProductImage } from "app/reducer/products/product";
import NcImage from "components/NcImage/NcImage";
import SingleNotFound from "containers/Product/Single/SingleNotFound";
import React, { FC } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { route } from "routers/route";

interface SingleImageProps {
	meta: IProduct;
	handleOpenModal: (index: number) => void;
}

const SingleImage: FC<SingleImageProps> = ({ meta, handleOpenModal }) => {
	const imgs = meta.images || [];

	if (imgs.length === 0) {
		return <></>;
	}

	const getImgs = (imgs: IProductImage[]): string[] => {
		if (imgs.length >= 4) {
			return imgs && imgs.slice(0, 4).map((img) => img.image);
		}

		return imgs.map((img) => img.image);
	};

	return (
		<div className="relative grid grid-cols-3 sm:grid-cols-4 gap-2 my-10">
			{getImgs(imgs).map((item, index) => (
				<div key={index} className={`relative rounded-xl overflow-hidden ${index >= 2 ? "hidden sm:block" : ""}`}>
					<NcImage containerClassName="aspect-w-6 aspect-h-5" className="object-cover w-full h-full rounded-xl " src={item} />

					{/* OVERLAY */}
					<div
						className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
						onClick={() => handleOpenModal(index + 1)}
					/>
				</div>
			))}

			<div
				className="absolute hidden md:flex md:items-center md:justify-center right-3 bottom-3 px-4 py-2 rounded-full bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
				onClick={() => handleOpenModal(0)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
					/>
				</svg>
				<span className="ml-2 text-neutral-800 text-sm font-medium">Voir plus</span>
			</div>
		</div>
	);
};

export default SingleImage;
