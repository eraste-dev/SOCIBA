import { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { IProduct } from "app/reducer/products/product";

export interface MediaTerrainProps {
	post: IProduct;
}

const MediaTerrain: FC<MediaTerrainProps> = ({ post }) => {
	return (
		<>
			<NcImage
				className="absolute bg-opacity-30 flex items-center justify-center inset-0 bg-primary-900"
				NoPlaceIcon={true}
			/>
			<div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-center">
				<p className=" text-white text-base font-bold text-center"> Terrain en vente</p>
				<p className="absolute text-white text-base font-bold text-center">
					{post.location.name}, {post.location_description}
				</p>
			</div>
		</>
	);
};

export default MediaTerrain;
