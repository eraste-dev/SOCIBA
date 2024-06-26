import React, { FC, ReactNode, useEffect, useState } from "react";
import { PostDataType, TaxonomyType } from "data/types";
import NcImage from "components/NcImage/NcImage";
import { SINGLE_GALLERY } from "data/single";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { changeCurrentPage } from "app/reducer/pages/pages";
import SingleContent from "containers/PageSingle/SingleContent";
import SingleRelatedPosts from "containers/PageSingle/SingleRelatedPosts";
import SingleHeader from "containers/PageSingle/SingleHeader";
import ModalPhotos from "./ModalPhotos";
import { PropertyAction } from "app/reducer/products/product";
import { fetchSimilars, fetchSingleProperties } from "app/axios/actions/api.action";
import { useLocation, useParams } from "react-router-dom";
import SingleBreadcrumb from "containers/PageSingle/SingleBreadcrumb";
import SingleNotFound from "./SingleNotFound";
import SingleImage from "containers/PageSingle/SingleImage";
import { _f, _suffix } from "utils/money-format";
import Loading from "components/UI/Loading";
import ContactSeller from "containers/PageSingle/sellerData";
import { IGetSearchPropertiesParams } from "utils/query-builder.utils";

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
	const related = useAppSelector(PropertyAction.data)?.similars;
	const [fetchRelated, setFetchRelated] = useState(false);
	const loading = useAppSelector(PropertyAction.loading);
	const [isOpen, setIsOpen] = useState(false);
	const [openFocusIndex, setOpenFocusIndex] = useState(0);

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const idParam = searchParams.get("id");

	// UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
	// useEffect(() => {
	// 	dispatch(changeCurrentPage({ type: "/single/:slug", data: SINGLE_GALLERY }));
	// 	return () => {
	// 		dispatch(changeCurrentPage({ type: "/", data: {} }));
	// 	};
	// }, []);

	useEffect(() => {
		if (!loading && !single && slug) {
			if (idParam) {
				dispatch(fetchSingleProperties({ id: idParam }));
			} else {
				dispatch(fetchSingleProperties({ slug: slug }));
			}
		}
	}, [single, slug, dispatch, fetchSingleProperties, loading]);

	useEffect(() => {
		const condition1 = single && (single.category.id || single?.location.id);
		const condition2 = !related && !loading;
		if (condition1 && condition2) {
			const payload: IGetSearchPropertiesParams = {};
			if (single?.category.id) {
				payload.category = single?.category.id;
			}

			if (single?.location.id) {
				payload.location = single?.location.id;
			}
			dispatch(fetchSimilars({ ...payload, limit: 6 }));
		}
	}, [related, single, dispatch, fetchSimilars, loading]);

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

	if (loading) {
		return <Loading />;
	}

	if (!loading && !single) {
		<SingleNotFound />;
	}

	return (
		<>
			<div className="bg-gray-100 dark:bg-neutral-800">{single && <SingleBreadcrumb meta={single} />}</div>

			<div className={`nc-Single pt-8 lg:pt-16 ${className}`} data-nc-id="Single">
				{/* SINGLE HEADER */}
				<div className="container">
					<header className="rounded-xl">{single && <SingleHeader metaActionStyle="style2" hiddenDesc pageData={single} />}</header>

					<ContactSeller productLink={single?.href} />

					{single && <SingleImage meta={single} handleOpenModal={handleOpenModal} />}

					{/* MODAL PHOTOS */}
					{single && (
						<ModalPhotos
							imgs={single.images.map((item) => item.image) || []}
							isOpen={isOpen}
							onClose={handleCloseModal}
							initFocus={openFocusIndex}
						/>
					)}

					{/* SINGLE MAIN CONTENT */}

					{single && (
						<div className="container">
							<SingleContent data={single} />
						</div>
					)}

					{/* RELATED POSTS */}
				</div>
				{related && <SingleRelatedPosts related={related} />}
			</div>
		</>
	);
};

export default Single;
