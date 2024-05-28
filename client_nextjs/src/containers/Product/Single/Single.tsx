import React, { FC, ReactNode, useEffect, useState } from "react";
import { PostDataType, TaxonomyType } from "data/types";
import NcImage from "components/NcImage/NcImage";
import { SINGLE_GALLERY } from "data/single";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { changeCurrentPage } from "app/pages/pages";
import SingleContent from "containers/PageSingle/SingleContent";
import SingleRelatedPosts from "containers/PageSingle/SingleRelatedPosts";
import SingleHeader from "containers/PageSingle/SingleHeader";
import ModalPhotos from "./ModalPhotos";
import { PropertyAction } from "app/reducer/products/propertiy";
import { fetchSingleProperties } from "app/axios/api.action";
import { useParams } from "react-router-dom";
import SingleBreadcrumb from "containers/PageSingle/SingleBreadcrumb";
import SingleNotFound from "./SingleNotFound";
import SingleImage from "containers/PageSingle/SingleImage";

export interface SingleProps {
	className?: string;
}

export interface SinglePageType extends PostDataType {
	tags: TaxonomyType[];
	content: string | ReactNode;
	comments: CommentType[];
}

const Single: FC<SingleProps> = ({ className = "" }) => {
	const dispatch = useAppDispatch();
	const { slug } = useParams<{ slug: string }>();

	const single = useAppSelector(PropertyAction.data)?.single;
	const [isOpen, setIsOpen] = useState(false);
	const [openFocusIndex, setOpenFocusIndex] = useState(0);
	const [requestAttempted, setRequestAttempted] = useState(false);

	// UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
	useEffect(() => {
		dispatch(changeCurrentPage({ type: "/single/:slug", data: SINGLE_GALLERY }));
		return () => {
			dispatch(changeCurrentPage({ type: "/", data: {} }));
		};
	}, []);

	useEffect(() => {
		if (!requestAttempted && !single && slug) {
			dispatch(fetchSingleProperties({ slug: slug }));
			setRequestAttempted(true);
		}
	}, [single, slug, dispatch, fetchSingleProperties, requestAttempted]);

	const handleOpenModal = (index: number) => {
		setIsOpen(true);
		setOpenFocusIndex(index);
	};
	const handleCloseModal = () => setIsOpen(false);

	const PHOTOS = SINGLE_GALLERY.galleryImgs || [];

	const gridTest = () => {
		return (
			<div className="container">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-4">
					<div className="col-span-8 bg-gray-200 p-4">
						<h2 className="text-lg font-bold mb-2">Colonne 1</h2>
						<p>Contenu de la colonne 1</p>
					</div>
					<div className="col-span-4 bg-gray-200 p-4 order-first md:order-last">
						<h2 className="text-lg font-bold mb-2">Colonne 2</h2>
						<p>Contenu de la colonne 2</p>
					</div>
				</div>
			</div>
		);
	};

	if (!single) {
		<SingleNotFound />;
	}

	return (
		<>
			<div className="bg-gray-100 dark:bg-neutral-800">{single && <SingleBreadcrumb meta={single} />}</div>

			<div className={`nc-Single pt-8 lg:pt-16 ${className}`} data-nc-id="Single">
				{/* SINGLE HEADER */}
				<header className="container rounded-xl">
					{/* <SingleHeader metaActionStyle="style2" hiddenDesc pageData={post?.single} /> */}

					{single && <SingleImage meta={single} handleOpenModal={handleOpenModal} />}
				</header>

				{/* MODAL PHOTOS */}
				{single && (
					<ModalPhotos imgs={single.images.map((item) => item.image) || []} isOpen={isOpen} onClose={handleCloseModal} initFocus={openFocusIndex} />
				)}

				{/* FEATURED IMAGE */}
				<div className=""></div>
				{/* SINGLE MAIN CONTENT */}

				{single && (
					<div className="container">
						<SingleContent data={single} />
					</div>
				)}

				{/* RELATED POSTS */}
				<SingleRelatedPosts />
			</div>
		</>
	);
};

export default Single;
