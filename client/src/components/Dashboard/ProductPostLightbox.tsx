import React, { useState } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { Close as CloseIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface ProductPostLightboxProps {
	previewUrls: string[];
	onDelete: (index: number) => void;
}

const ProductPostLightbox: React.FC<ProductPostLightboxProps> = ({ previewUrls, onDelete }) => {
	const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
	const [deleteConfirm, setDeleteConfirm] = useState<{show: boolean, index: number} | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleOpen = (url: string) => {
		setSelectedUrl(url);
	};

	const handleClose = () => {
		setSelectedUrl(null);
	};

	const handleDeleteClick = (index: number) => {
		setDeleteConfirm({
			show: true,
			index
		});
	};

	const handleDeleteConfirm = async () => {
		if (!deleteConfirm) return;

		setIsDeleting(true);
		try {
			await onDelete(deleteConfirm.index);
		} catch (error) {
			console.error("Erreur lors de la suppression:", error);
		} finally {
			setIsDeleting(false);
			setDeleteConfirm(null);
		}
	};

	const handleDeleteCancel = () => {
		setDeleteConfirm(null);
	};

	return (
		<>
			<div className="flex gap-4 flex-wrap">
				{previewUrls.map((url, index) => (
				<div
						className="relative w-48 h-48 overflow-hidden rounded-lg border hover:shadow-lg transition-shadow cursor-pointer group"
					key={index}
				>
						<img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
						<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
						<IconButton onClick={() => handleOpen(url)} sx={{ color: "white" }}>
							<VisibilityIcon />
						</IconButton>
							<IconButton 
								onClick={() => handleDeleteClick(index)} 
								sx={{ color: "white" }}
								disabled={isDeleting}
							>
							<DeleteIcon />
						</IconButton>
						</div>
					</div>
				))}
			</div>

			{/* Modal de confirmation de suppression */}
			{deleteConfirm?.show && (
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

			{/* Dialog pour afficher l'image en grand */}
			<Dialog open={!!selectedUrl} onClose={handleClose} maxWidth="lg" fullWidth>
				<DialogContent sx={{ position: "relative", padding: 0 }}>
					{selectedUrl && (
						<>
							<img
								src={selectedUrl}
								alt="Preview"
								style={{ width: "100%", height: "auto", display: "block" }}
							/>
						<IconButton onClick={handleClose} sx={{ position: "absolute", top: 0, right: 0, color: "white" }}>
							<CloseIcon />
						</IconButton>
						</>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ProductPostLightbox;
