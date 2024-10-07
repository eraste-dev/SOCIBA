import { FC } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
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
	const handleDragStart = (e: any) => e.preventDefault();

	return (
		<div className="max-w-2xl mx-auto">
			<AliceCarousel
				mouseTracking
				items={galleryImgs.map((image, index) => (
					<img
						key={index}
						src={image}
						alt={`Product Image ${index + 1}`}
						onDragStart={handleDragStart}
						className="w-full h-auto"
					/>
				))}
				responsive={{
					0: { items: 1 },
					1024: { items: 1 },
				}}
				controlsStrategy="alternate"
				autoPlay
				autoPlayInterval={3000}
				disableButtonsControls={false}
				disableDotsControls={false}
				infinite
			/>
		</div>
	);
};

export default GallerySliderTwo;
