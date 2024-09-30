import { FC, useRef } from "react";
import NcImage from "components/NcImage/NcImage";
import GallerySlider from "./GallerySlider";
import MediaVideo from "./MediaVideo";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import { IProduct } from "app/reducer/products/product";
import MediaVideoTwo from "./MediaVideoTwo";

export interface PostFeaturedMediaProps {
	className?: string;
	post?: IProduct;
	isHover?: boolean;
	single?: boolean;
}

// CHECK FOR VIDEO CARD ON VIEW
let PREV_RATIO = 0.0;

const PostFeaturedMedia: FC<PostFeaturedMediaProps> = ({
	className = " w-full h-full ",
	post,
	isHover = false,
	single = false,
}) => {
	const { featured_image, video_link, images, id } = post || {};

	const videoRef = useRef(null);

	let IS_MOBILE = false;
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	) {
		IS_MOBILE = true;
	}
	const cardIntersectionObserver = useIntersectionObserver(videoRef, {
		freezeOnceVisible: false,
		threshold: 0.999,
		rootMargin: "20px",
	});
	const IN_VIEW = (cardIntersectionObserver?.intersectionRatio || -1) > PREV_RATIO;
	PREV_RATIO = cardIntersectionObserver?.intersectionRatio || 0;

	const renderGallerySlider = () => {
		if (!images || images.length === 0) return null;
		// if (images && images.length === 1) {
		// 	return (
		// 		<NcImage
		// 			src={images[0].image}
		// 			className="absolute inset-0 w-full h-full object-cover"
		// 		/>
		// 	);
		// }

		const arrayImgs: string[] = images.map((item) => item.image);
		return (
			<GallerySlider
				single={single}
				galleryImgs={arrayImgs}
				uniqueClass={`PostFeaturedGallery_${id}`}
			/>
		);
	};

	const renderContent = () => {
		// GALLERY
		if (images && images.length > 4) {
			return renderGallerySlider();
		}

		// VIDEO
		if (video_link && (!IS_MOBILE ? isHover : !!IN_VIEW)) {
			return <MediaVideo isHover videoUrl={video_link} />;
		}

		// AUDIO
		// if (postType === "audio" && !!audioUrl) {
		// 	return <MediaAudio post={post} />;
		// }

		// ICON
		return renderGallerySlider();
		// <div className="absolute inset-0">
		// 	{isPostMedia() && (
		// 		<span className="absolute inset-0 flex items-center justify-center ">
		// 			<PostTypeFeaturedIcon className="hover:scale-105 transform cursor-pointer transition-transform nc-will-change-transform" postType={"standard"} />
		// 		</span>
		// 	)}
		// </div>
	};

	return (
		<div
			className={`nc-PostFeaturedMedia relative ${className}`}
			data-nc-id="PostFeaturedMedia"
			ref={videoRef}
		>
			<NcImage containerClassName="absolute inset-0" src={featured_image} />
			{/* {post?.type === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] ? (
				<MediaTerrain post={post} />
			) : (
				renderContent()
			)} */}

			{renderContent()}
		</div>
	);
};

export default PostFeaturedMedia;
