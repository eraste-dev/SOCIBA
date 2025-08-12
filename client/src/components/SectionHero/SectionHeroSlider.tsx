import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
// import { Spinner } from "react-bootstrap";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderAction } from "app/reducer/sliders/sliders";
import { fetchSliders } from "app/axios/actions/api.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import NcImage from "components/NcImage/NcImage";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";

export interface SectionHeroSliderProps {
	className?: string;
	target?: "HOME" | "PRODUCT" | "MOVING",
	defaultImage?: string
}

const SectionHeroSlider: FC<SectionHeroSliderProps> = ({ className = "", target = "HOME", defaultImage }) => {
	// const dispatch = useDispatch();
	const dispatch = useAppDispatch();
	const data = useAppSelector(sliderAction.data);
	const loading = useSelector(sliderAction.loading);
	const error = useSelector(sliderAction.error);

	const handleDragStart = (e: any) => e.preventDefault();

	useEffect(() => {
		if (!data && !loading && !error) {
			dispatch(fetchSliders());
		}
	}, [dispatch, fetchSliders, data, loading]);

	// Filtrer les sliders par place et qui ont une image
	const filteredSliders = data
		? data
			.filter((s) => s.place === target && s.image) // Filtre par place ET par image non-null
		: [];

	// Si aucune image, ne rien afficher
	if (filteredSliders.length === 0) {
		return null;
	}

	return (
		<div className={`nc-SectionHero relative ${className}`} data-nc-id="SectionHero">
			{loading ? (
				<div className="text-center">
					<LoadingSpinner />
				</div>
			) : (
				<>
					{/* Utiliser la même structure de conteneur que les autres composants */}
					<div className="container relative">
						<AliceCarousel
							mouseTracking
							items={
								filteredSliders.map((item, index) => (
									<div key={index} className="flex justify-center">
										<img
											src={item.image}
											alt={item.title || `Slider ${index + 1}`}
											className="w-full h-[128px] md:h-[200px] object-cover object-center md:object-contain bg-white rounded-lg shadow-lg"
											onDragStart={handleDragStart}
										/>
									</div>
								))
							}
							responsive={{
								0: { items: 1 },
								1024: { items: 1 },
							}}
							controlsStrategy="alternate"
							autoPlay
							autoPlayInterval={5000}
							animationDuration={800}
							disableButtonsControls={true}
							disableDotsControls={true}
							infinite
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default SectionHeroSlider;
