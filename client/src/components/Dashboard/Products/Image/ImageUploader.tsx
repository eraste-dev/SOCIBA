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
}
// textOne = "Ajoutez plusieurs photos pour augmenter vos chances d'être contacté",

const ImageUploader: React.FC<ImageUploaderProps> = ({
	initialImages,
	maxImages = 5,
	images,
	setImages,
	imageFiles,
	setImageFiles,
	textOne,
}) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

		const newImages = [...images, ...fileArray].slice(0, maxImages);

		setImageFiles([...imageFiles, ...Array.from(e.target.files)]);
		setImages(newImages);
	};

	const handleImageDelete = (index: number) => {
		const imageToDelete = images[index];
		URL.revokeObjectURL(imageToDelete); // Free memory
		const newImages = images.filter((_, i) => i !== index);
		setImages(newImages);
		setImageFiles(imageFiles.filter((_, i) => i !== index));
	};

	const handleImageClick = (image: string) => {
		setSelectedImage(image);
	};

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<label className="block text-sm font-medium text-gray-700">Images</label>

			<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
				<p className="text-xs text-gray-500">
					Ajoutez plusieurs vidéos pour augmenter vos chances d'être contacté
				</p>

				<div className="flex justify-end">
					{images.length < maxImages && (
						<div className="w-24 h-24 border-2 border-dashed border-primary-300 rounded flex items-center justify-center">
							<label className="flex flex-col items-center cursor-pointer justify-center text-center">
								<span className="text-primary-500 text-sm">Ajouter une photo</span>
								<input
									type="file"
									accept="image/*"
									multiple
									onChange={handleImageChange}
									className="hidden"
								/>
							</label>
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
								onClick={() => handleImageDelete(index)}
								className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
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
