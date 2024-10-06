import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
// import { Navigation, Pagination } from "swiper";

export interface GallerySliderTwoProps {
	galleryImgs: string[];
	uniqueClass: string;
	single?: boolean;
}

const GallerySliderTwo: FC<GallerySliderTwoProps> = ({
	galleryImgs,
	uniqueClass,
	single = false,
}) => {
	return (
		<div className="max-w-2xl mx-auto">
			{/* Navigation, Pagination */}
			<Swiper
				modules={[]}
				// navigation
				pagination={{ clickable: true }}
				loop={true}
				autoplay={true}
				className="my-8"
			>
				{galleryImgs.map((item, index) => (
					<SwiperSlide key={index}>
						<div className="w-full h-full flex justify-center items-center">
							<img
								src={item}
								alt={`Product Image ${index + 1}`}
								className="w-auto h-100%"
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default GallerySliderTwo;
