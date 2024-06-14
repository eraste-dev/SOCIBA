import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
// import { Spinner } from "react-bootstrap";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderAction } from "app/reducer/sliders/sliders";
import { fetchSliders } from "app/axios/actions/api.action";
import { useAppDispatch, useAppSelector } from "app/hooks";

export interface SectionHeroSliderProps {
	className?: string;
}

const SectionHeroSlider: FC<SectionHeroSliderProps> = ({ className = "" }) => {
	// const dispatch = useDispatch();
	const dispatch = useAppDispatch();
	const data = useAppSelector(sliderAction.data);
	const loading = useSelector(sliderAction.loading);
	const error = useSelector(sliderAction.error);
	const success = useSelector(sliderAction.success);

	useEffect(() => {
		if (!data && !loading) {
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

	return (
		<div className={`nc-SectionHero relative ${className}`} data-nc-id="SectionHero">
			{loading ? (
				<div className="text-center">
					{/* <Spinner animation="border" variant="primary" />  */}
					Loading...
				</div>
			) : (
				<Slider {...settings}>
					{data &&
						data.map((slide, index) => (
							<div key={index} style={{ height: "500px", background: "rgba(0, 0, 0, 0.5)" }}>
								<img className="w-full" src={slide.image} alt={slide.title} height={"100%"} width={"auto"} />
							</div>
						))}
				</Slider>
			)}
		</div>
	);
};

export default SectionHeroSlider;
