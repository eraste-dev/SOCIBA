import React, { ChangeEvent, useState } from "react";
import VideoModal from "./VideoModal";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { PropertyAction } from "app/reducer/products/product";
import { UploadVideoProductRequest } from "app/axios/api.type";
import { convertPayloadToFormData } from "containers/PageDashboard/Posts/posts.constantes";
import { uploadVideoWithProgress } from "app/axios/actions/api.products.action";

interface VideoUploaderProps {
	videoDefault: string[];
	maxVideo: number;
	videos: string[];
	videoFiles: File[];
	setVideos: (videos: string[]) => void;
	setVideoFiles: (videos: File[]) => void;
	onVideoDelete?: (index: number, videoUrl: string) => Promise<boolean>;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
	videoDefault,
	maxVideo = 1,
	videos,
	videoFiles,
	setVideos,
	setVideoFiles,
	onVideoDelete,
}) => {
	const dispatch = useDispatch();
	const snackbar = useSnackbar();

	const queryParams = new URLSearchParams(location.search);
	const productId = queryParams.get("id");

	const loadingProduct = useSelector(PropertyAction.loading);

	const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
	const [uploadProgress, setUploadProgress] = useState<number | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [currentUploadingFile, setCurrentUploadingFile] = useState<string | null>(null);
	const [deleteConfirm, setDeleteConfirm] = useState<{show: boolean, index: number, videoUrl: string} | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const uploadOnServer = async (files: File[]) => {
		if (files.length === 0) return;

		setIsUploading(true);
		setCurrentUploadingFile(files[0].name);
		setUploadProgress(0);

		let data: FormData = convertPayloadToFormData({ id: productId ? Number(productId) : undefined, videos: videos }, undefined, files);
		console.log("uploadOnServer", data, { id: productId ? Number(productId) : undefined, videos: videos }, files);

		const onUploadProgress = (progressEvent: any) => {
			const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			console.log("Upload progress:", percentCompleted);
			setUploadProgress(percentCompleted);
		};

		try {
			await dispatch(uploadVideoWithProgress(data, onUploadProgress));
			snackbar.enqueueSnackbar("Vidéo uploadée avec succès!", { variant: "success" });
		} catch (error) {
			console.error("Upload error:", error);
			snackbar.enqueueSnackbar("Erreur lors de l'upload de la vidéo", { variant: "error" });
		} finally {
			setIsUploading(false);
			setUploadProgress(null);
			setCurrentUploadingFile(null);
		}
	}

	const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		if (!isFileSizeWithinLimit(e.target.files, 300)) {
			alert("La taille du fichier ne doit pas dépasser 300MB.");
			return;
		}

		const files = Array.from(e.target.files);
		const fileArray = files.map((file) => URL.createObjectURL(file));
		const newVideos = [...videos, ...fileArray].slice(0, maxVideo);

		setVideoFiles([...videoFiles, ...files]);
		setVideos(newVideos);

		// Démarrer l'upload immédiatement
		uploadOnServer(files);
	};

	const handleVideoDeleteClick = (index: number) => {
		const videoUrl = videos[index];
		setDeleteConfirm({
			show: true,
			index,
			videoUrl
		});
	};

	const handleVideoDeleteConfirm = async () => {
		if (!deleteConfirm) return;

		const { index, videoUrl } = deleteConfirm;
		setIsDeleting(true);

		try {
			// Si une fonction de suppression personnalisée est fournie, l'utiliser
			if (onVideoDelete) {
				const success = await onVideoDelete(index, videoUrl);
				if (!success) {
					alert("Erreur lors de la suppression de la vidéo.");
					return;
				}
			}

			// Suppression locale
			URL.revokeObjectURL(videoUrl); // Free memory
			const newVideos = videos.filter((_, i) => i !== index);
			setVideos(newVideos);
			setVideoFiles(videoFiles.filter((_, i) => i !== index));

		} catch (error) {
			console.error("Erreur lors de la suppression:", error);
			alert("Erreur lors de la suppression de la vidéo.");
		} finally {
			setIsDeleting(false);
			setDeleteConfirm(null);
		}
	};

	const handleVideoDeleteCancel = () => {
		setDeleteConfirm(null);
	};

	const handleVideoClick = (video: string) => {
		setSelectedVideo(video);
	};

	/**
	 * Returns true if all files in the given FileList are within the given size limit (in MB).
	 * @param {FileList} files
	 * @param {number} maxSizeMB
	 * @return {boolean}
	 */
	const isFileSizeWithinLimit = (files: FileList, maxSizeMB: number): boolean => {
		const maxSizeBytes = maxSizeMB * 1024 * 1024;
		for (let i = 0; i < files.length; i++) {
			if (files[i].size > maxSizeBytes) {
				return false;
			}
		}
		return true;
	};

	return (
		<div className="p-4 bg-white rounded-lg shadow-md">
			<label className="block text-sm font-medium text-gray-700">Vidéos</label>

			{/* Modal de confirmation de suppression */}
			{deleteConfirm?.show && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Confirmer la suppression
						</h3>
						<p className="text-gray-600 mb-6">
							Êtes-vous sûr de vouloir supprimer cette vidéo définitivement ? Cette action ne peut pas être annulée.
						</p>
						<div className="flex justify-end space-x-3">
							<button
								onClick={handleVideoDeleteCancel}
								className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
								disabled={isDeleting}
							>
								Annuler
							</button>
							<button
								onClick={handleVideoDeleteConfirm}
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
					Ajoutez une vidéo pour augmenter vos chances d'être contacté (Max 300 Mo)
				</p>

				<div className="flex justify-end">
					{videos.length < maxVideo && !isUploading && (
						<div className="w-24 h-24 border-2 border-dashed border-primary-300 rounded flex items-center justify-center">
							<label className="flex flex-col items-center cursor-pointer justify-center text-center">
								<span className="text-primary-500 text-sm">Ajouter une vidéo</span>
								<input
									type="file"
									accept="video/*"
									multiple
									onChange={handleVideoChange}
									className="hidden"
									disabled={isUploading}
								/>
							</label>
						</div>
					)}
					
					{isUploading && (
						<div className="w-24 h-24 border-2 border-dashed border-blue-300 rounded flex items-center justify-center bg-blue-50">
							<div className="flex flex-col items-center justify-center text-center">
								<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mb-1"></div>
								<span className="text-blue-500 text-xs">Upload...</span>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Barre de progression d'upload */}
			{isUploading && uploadProgress !== null && (
				<div className="mt-4 w-full bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
					<div className="flex justify-between items-center text-sm text-gray-700 mb-2">
						<div className="flex items-center space-x-2">
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
							<span className="font-medium">Upload en cours: {currentUploadingFile}</span>
						</div>
						<span className="font-bold text-blue-600">{uploadProgress}%</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
						<div
							className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 h-3 rounded-full transition-all duration-500 ease-out relative"
							style={{ width: `${uploadProgress}%` }}
						>
							<div className="absolute inset-0 bg-white opacity-30 animate-pulse rounded-full"></div>
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse rounded-full"></div>
						</div>
					</div>
					<div className="flex justify-between text-xs text-gray-500 mt-2">
						<span>
							{uploadProgress < 100 ? "Téléchargement vers le serveur..." : "Finalisation de l'upload..."}
						</span>
						<span>
							{uploadProgress === 100 ? "✅ Terminé" : `${100 - uploadProgress}% restant`}
						</span>
					</div>
				</div>
			)}

			<div className="mt-4 flex flex-wrap gap-4">
				{videos.map((video, index) => (
					<div key={index} className="relative w-64 h-64 border rounded overflow-hidden">
						<video
							src={video}
							controls
							className="object-cover w-full h-full cursor-pointer"
							onClick={() => handleVideoClick(video)}
						/>
						<button
							type="button"
							onClick={() => handleVideoDeleteClick(index)}
							className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
							disabled={isUploading || isDeleting}
							title="Supprimer définitivement cette vidéo"
						>
							X
						</button>
					</div>
				))}
			</div>

			{selectedVideo && (
				<VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
			)}
		</div>
	);
};

export default VideoUploader;
