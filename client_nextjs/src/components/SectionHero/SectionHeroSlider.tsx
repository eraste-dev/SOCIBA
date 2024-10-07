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
}

const SectionHeroSlider: FC<SectionHeroSliderProps> = ({ className = "" }) => {
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

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		rtl: true,
	};

	if (data && data.length === 1) {
		return (
			<div className="w-full h-full bg-black/50 mb-3">
				<NcImage src={data[0].image} />
			</div>
		);
	}

	return (
		<div className={`nc-SectionHero relative ${className}`} data-nc-id="SectionHero">
			{loading ? (
				<div className="text-center">
					<LoadingSpinner />
				</div>
			) : (
				<>
					<AliceCarousel
						mouseTracking
						items={
							data
								? data
										.filter((s) => s.place === "HOME")
										.map((item, index) => (
											<img
												key={index}
												src={item.image}
												alt={item.title}
												className="w-auto sm:w-full h-28 sm:h-auto " // Ajustement de la hauteur
												onDragStart={handleDragStart}
											/>
										))
								: []
						}
						responsive={{
							0: { items: 1 },
							1024: { items: 1 },
						}}
						controlsStrategy="alternate"
						autoPlay
						autoPlayInterval={3000}
						disableButtonsControls={true}
						disableDotsControls={true}
						infinite
					/>
				</>
			)}
		</div>
	);
};

export default SectionHeroSlider;
