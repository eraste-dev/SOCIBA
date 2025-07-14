import { ChangeEvent, useState } from "react";
import ImageModal from "./ImageModal";

interface ImageUploaderProps {
	initialImages: string[];
	maxImages?: number;
	images: string[];
	setImages: (images: string[]) => void;
	imageFiles: File[];
	setImageFiles: (imageFiles: File[]) => void;
	textOne: string | null;
	isUploading?: boolean;
	uploadProgress?: number;
	onImageUpload?: (files: File[], onProgress: (progress: number) => void) => Promise<void>;
	onImageDelete?: (index: number, imageUrl: string) => Promise<boolean>;
}
// textOne = "Ajoutez plusieurs photos pour augmenter vos chances d'être contacté",

const ImageUploader: React.FC<ImageUploaderProps> = ({
	initialImages,
	maxImages = 15,
	images,
	setImages,
	imageFiles,
	setImageFiles,
	textOne,
	isUploading = false,
	uploadProgress = 0,
	onImageUpload,
	onImageDelete,
}) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [localUploading, setLocalUploading] = useState(false);
	const [localProgress, setLocalProgress] = useState(0);
	const [deleteConfirm, setDeleteConfirm] = useState<{show: boolean, index: number, imageUrl: string} | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		const newFiles = Array.from(e.target.files);
		
		// Vérifier la limite d'images
		if (images.length + newFiles.length > maxImages) {
			alert(`Vous ne pouvez ajouter que ${maxImages - images.length} image(s) supplémentaire(s).`);
			return;
		}

		setLocalUploading(true);
		setLocalProgress(0);

		try {
			// Si une fonction d'upload personnalisée est fournie, l'utiliser
			if (onImageUpload) {
				await onImageUpload(newFiles, (progress) => {
					setLocalProgress(progress);
				});
			} else {
				// Sinon, comportement par défaut : créer des URLs locales
				const fileArray = newFiles.map((file) => URL.createObjectURL(file));
				const newImages = [...images, ...fileArray].slice(0, maxImages);
				setImageFiles([...imageFiles, ...newFiles]);
				setImages(newImages);
				
				// Simuler une progression pour le feedback visuel
				for (let i = 0; i <= 100; i += 10) {
					setLocalProgress(i);
					await new Promise(resolve => setTimeout(resolve, 50));
				}
			}
		} catch (error) {
			console.error("Erreur lors de l'upload des images:", error);
			alert("Erreur lors de l'upload des images. Veuillez réessayer.");
		} finally {
			setLocalUploading(false);
			setLocalProgress(0);
		}

		// Réinitialiser l'input
		e.target.value = '';
	};

	const handleImageDeleteClick = (index: number) => {
		const imageUrl = images[index];
		setDeleteConfirm({
			show: true,
			index,
			imageUrl
		});
	};

	const handleImageDeleteConfirm = async () => {
		if (!deleteConfirm) return;

		const { index, imageUrl } = deleteConfirm;
		setIsDeleting(true);

		try {
			// Si une fonction de suppression personnalisée est fournie, l'utiliser
			if (onImageDelete) {
				const success = await onImageDelete(index, imageUrl);
				if (!success) {
					alert("Erreur lors de la suppression de l'image.");
					return;
				}
			}

			// Suppression locale
			URL.revokeObjectURL(imageUrl); // Free memory
			const newImages = images.filter((_, i) => i !== index);
			setImages(newImages);
			setImageFiles(imageFiles.filter((_, i) => i !== index));

		} catch (error) {
			console.error("Erreur lors de la suppression:", error);
			alert("Erreur lors de la suppression de l'image.");
		} finally {
			setIsDeleting(false);
			setDeleteConfirm(null);
		}
	};

	const handleImageDeleteCancel = () => {
		setDeleteConfirm(null);
	};

	const handleImageClick = (image: string) => {
		setSelectedImage(image);
	};

	const currentUploading = isUploading || localUploading;
	const currentProgress = isUploading ? uploadProgress : localProgress;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<label className="block text-sm font-medium text-gray-700">Images</label>

			{/* Barre de progression */}
			{currentUploading && (
				<div className="mt-2 mb-4">
					<div className="flex justify-between items-center mb-1">
						<span className="text-sm font-medium text-blue-700">
							{localUploading ? "Ajout d'images en cours..." : "Upload en cours..."}
						</span>
						<span className="text-sm font-medium text-blue-700">{Math.round(currentProgress)}%</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2.5">
						<div 
							className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
							style={{ width: `${currentProgress}%` }}
						></div>
					</div>
				</div>
			)}

			{/* Modal de confirmation de suppression */}
			{deleteConfirm?.show && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Confirmer la suppression
						</h3>
						<p className="text-gray-600 mb-6">
							Êtes-vous sûr de vouloir supprimer cette image définitivement ? Cette action ne peut pas être annulée.
						</p>
						<div className="flex justify-end space-x-3">
							<button
								onClick={handleImageDeleteCancel}
								className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
								disabled={isDeleting}
							>
								Annuler
							</button>
							<button
								onClick={handleImageDeleteConfirm}
								className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors flex items-center"
								disabled={isDeleting}
							>
								{isDeleting ? (
									<>
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
										Suppression...
									</>
								) : (
									"Supprimer définitivement"
								)}
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
				<p className="text-xs text-gray-500">
					{textOne || "Ajoutez plusieurs photos pour augmenter vos chances d'être contacté"}
				</p>

				<div className="flex justify-end">
					{images.length < maxImages && !currentUploading && (
						<div className="w-24 h-24 border-2 border-dashed border-primary-300 rounded flex items-center justify-center">
							<label className="flex flex-col items-center cursor-pointer justify-center text-center">
								<span className="text-primary-500 text-sm">Ajouter une photo</span>
								<input
									type="file"
									accept="image/*"
									multiple
									onChange={handleImageChange}
									className="hidden"
									disabled={currentUploading}
								/>
							</label>
						</div>
					)}
					{currentUploading && (
						<div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
							<div className="flex flex-col items-center justify-center text-center">
								<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
								<span className="text-gray-500 text-xs mt-1">
									{localUploading ? "Ajout..." : "Upload..."}
								</span>
							</div>
						</div>
					)}
				</div>
			</div>

			<div className="mt-4 grid md:grid-cols-2 grid-cols-1 gap-4">
				{images.map((image, index) => (
					<div key={index} className="col-span-1">
						<div className="relative w-auto h-auto border rounded hover:p-2 overflow-hidden">
							<img
								src={image}
								alt={`upload-${index}`}
								className="object-cover w-full h-full cursor-pointer"
								onClick={() => handleImageClick(image)}
							/>
							<button
								type="button"
								onClick={() => handleImageDeleteClick(index)}
								className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
								disabled={currentUploading || isDeleting}
								title="Supprimer définitivement cette image"
							>
								X
							</button>
						</div>
					</div>
				))}
			</div>
			{selectedImage && (
				<ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
			)}
		</div>
	);
};

export default ImageUploader;
