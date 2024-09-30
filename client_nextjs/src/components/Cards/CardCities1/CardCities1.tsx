import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { TaxonomyType, TwMainColor } from "data/types";
import { Link, useHistory } from "react-router-dom";
import Badge from "components/Badge/Badge";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import { ILocation } from "app/reducer/locations/locations";
import { useDispatch } from "react-redux";
import { fetchAllProperties, initProductState } from "app/axios/actions/api.action";
import { getParams } from "containers/PageHome/ListProducts";
import { updateParamsUrl } from "utils/utils";
import { IGetSearchPropertiesParams } from "utils/query-builder.utils";

export interface CardCities1Props {
	className?: string;
	taxonomy?: TaxonomyType;
	city: ILocation;
	index?: string;
}

const CardCities1: FC<CardCities1Props> = ({ className = "", taxonomy, city, index }) => {
	const { id, name, href = "/", description, thumbnail } = city;
	const defaultSrc =
		"https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
	// const defaultSrc = "./src/images/icons/real-estate.png";

	const history = useHistory();
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(initProductState());

		const params: IGetSearchPropertiesParams = {};
		if (id !== 0) {
			params.location = id;
			updateParamsUrl("location", id.toString());
		} else {
			params.unlisted_location = true;
			updateParamsUrl("unlisted_location", "true");
		}

		dispatch(fetchAllProperties(params));
		return history.push(href);
	};

	return (
		<div className="px-2" >
			<button
				onClick={handleClick}
				className={`nc-CardCities1 w-full relative flex flex-col items-center justify-center text-center px-2 py-1 sm:p-1  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`}
				data-nc-id="CardCities1"
			>
				{index && false && (
					<Badge color={"blue"} name={""} className="absolute -top-2 sm:top-3 left-3" />
				)}
				<NcImage
					containerClassName={`flex-shrink-0 w-auto h-16 rounded-full overflow-hidden`}
					src={thumbnail ?? defaultSrc}
				/>
				<div className="mt-2">
					<span className={`text-xs sm:text-sm`}>
						<span className="line-clamp-1">{name}</span>
					</span>
					{/* <span className={`block mt-[2px] text-sm text-neutral-500 dark:text-neutral-400`}>{count} Articles</span> */}
				</div>
			</button>
		</div>
	);
};

export default CardCities1;
