import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { TaxonomyType, TwMainColor } from "data/types";
import { Link, useHistory } from "react-router-dom";
import Badge from "components/Badge/Badge";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import { ILocation } from "app/reducer/locations/locations";
import { useDispatch } from "react-redux";
import { fetchAllProperties, initProductState } from "app/axios/api.action";

export interface CardCities1Props {
	className?: string;
	taxonomy?: TaxonomyType;
	city: ILocation;
	index?: string;
}

const CardCities1: FC<CardCities1Props> = ({ className = "", taxonomy, city, index }) => {
	const { id, name, href = "/", description, thumbnail } = city;
	const defaultSrc = "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
	// const defaultSrc = "./src/images/icons/real-estate.png";

	const history = useHistory();
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(initProductState());
		dispatch(fetchAllProperties({ location: id }));
		history.push(href);
	};

	return (
		<button
			onClick={handleClick}
			className={`nc-CardCities1 relative flex flex-col items-center justify-center text-center px-3 py-3 sm:p-4  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]  ${className}`}
			data-nc-id="CardCities1"
		>
			{index && <Badge color={"blue"} name={""} className="absolute -top-2 sm:top-3 left-3" />}
			<NcImage containerClassName={`flex-shrink-0 w-20 h-20 rounded-full overflow-hidden`} src={thumbnail ?? defaultSrc} />
			<div className="mt-2">
				<h2 className={`text-base sm:text-lg font-semibold `}>
					<span className="line-clamp-1">{name}</span>
				</h2>
				{/* <span className={`block mt-[2px] text-sm text-neutral-500 dark:text-neutral-400`}>{count} Articles</span> */}
			</div>
		</button>
	);
};

export default CardCities1;
