import React, { FC, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Visibility as VisibilityIcon, Delete as DeleteIcon } from "@mui/icons-material";

export interface ProductPreviewImageItemProps {
	index: number;
	url: string;
	handleOpen: () => void;
	handleDelete: () => void;
}

const ProductPreviewImageItem: FC<ProductPreviewImageItemProps> = ({ index, url, handleOpen, handleDelete }) => {
	const [showConfirm, setShowConfirm] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteClick = () => {
		setShowConfirm(true);
	};

	const handleDeleteConfirm = async () => {
		setIsDeleting(true);
		try {
			await handleDelete();
		} catch (error) {
			console.error("Erreur lors de la suppression:", error);
		} finally {
			setIsDeleting(false);
			setShowConfirm(false);
		}
	};

	const handleDeleteCancel = () => {
		setShowConfirm(false);
	};

	return (
		<>
			<div
				className="relative flex w-48 h-48 mr-2 overflow-hidden items-center hover:bg-gray-100 "
				onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
				onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
			>
				<img src={url} alt={`Preview ${index}`} className="object-cover w-full h-auto m-2" />
				<Box className="actions-lightbox absolute inset-0 flex items-center opacity-0 justify-center bg-opacity-50 hover:flex hover:opacity-100 hover:bg-opacity-100">
					<IconButton onClick={handleOpen} className="text-blue-500">
						<VisibilityIcon color="primary" />
					</IconButton>
					<IconButton onClick={handleDeleteClick} className="text-white" disabled={isDeleting}>
						<DeleteIcon color="error" />
					</IconButton>
				</Box>
			</div>

			{/* Modal de confirmation */}
			{showConfirm && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Confirmer la suppression
						</h3>
						<p className="text-gray-600 mb-6">
							Êtes-vous sûr de vouloir supprimer cette image ? Cette action ne peut pas être annulée.
						</p>
						<div className="flex justify-end space-x-3">
							<button
								onClick={handleDeleteCancel}
								className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
								disabled={isDeleting}
							>
								Annuler
							</button>
							<button
								onClick={handleDeleteConfirm}
								className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors flex items-center"
								disabled={isDeleting}
							>
								{isDeleting ? (
									<>
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
										Suppression...
									</>
								) : (
									"Supprimer"
								)}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductPreviewImageItem;
