import { ChangeEvent, useState } from "react";
import VideoModal from "./VideoModal";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { PropertyAction } from "app/reducer/products/product";
import { UploadVideoProductRequest } from "app/axios/api.type";
import { convertPayloadToFormData } from "containers/PageDashboard/Posts/posts.constantes";
import { uploadVideo } from "app/axios/actions/api.products.action";

interface VideoUploaderProps {
	videoDefault: string[];
	maxVideo: number;
	videos: string[];
	videoFiles: File[];
	setVideos: (videos: string[]) => void;
	setVideoFiles: (videos: File[]) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({
	videoDefault,
	maxVideo = 1,
	videos,
	videoFiles,
	setVideos,
	setVideoFiles,
}) => {
	const dispatch = useDispatch();
	const snackbar = useSnackbar();

	const queryParams = new URLSearchParams(location.search);
	const productId = queryParams.get("id");

	const loadingProduct = useSelector(PropertyAction.loading);

	const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
	const [progress, setProgress] = useState<number | null>(null);

	const uploadOnServer = async () => {
		let data: FormData = convertPayloadToFormData({ id: productId ? Number(productId) : undefined, videos: videos }, undefined, videoFiles);
		console.log("uploadOnServer", data, { id: productId ? Number(productId) : undefined, videos: videos }, videoFiles);

		// if (product && productId) {
		// 	formData.append("id", productId);
		// }
		dispatch(uploadVideo(data));
	}

	const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;


		if (!isFileSizeWithinLimit(e.target.files, 10)) {
			alert("La taille du fichier ne doit pas dépasser 10MB.");
			return;
		}

		const files = Array.from(e.target.files);
		const fileArray = files.map((file) => URL.createObjectURL(file));
		const newVideos = [...videos, ...fileArray].slice(0, maxVideo);

		// Simulate upload progress for each file
		files.forEach((file) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadstart = () => setProgress(0);
			reader.onprogress = (event) => {
				if (event.lengthComputable) {
					const percentLoaded = Math.round((event.loaded / event.total) * 100);
					setProgress(percentLoaded);
				}
			};
			reader.onloadend = () => setProgress(null);
		});

		setVideoFiles([...videoFiles, ...files]);
		setVideos(newVideos);

		// uploadOnServer();
	};

	const handleVideoDelete = (index: number) => {
		const videoToDelete = videos[index];
		URL.revokeObjectURL(videoToDelete); // Free memory
		const newVideos = videos.filter((_, i) => i !== index);
		setVideos(newVideos);
		setVideoFiles(videoFiles.filter((_, i) => i !== index));
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

			<div className="grid md:grid-cols-2 grid-cols-1 gap-4">
				<p className="text-xs text-gray-500">
					Ajoutez une vidéo pour augmenter vos chances d'être contacté (Max 10 Mo)
				</p>

				<div className="flex justify-end">
					{videos.length < maxVideo && (
						<div className="w-24 h-24 border-2 border-dashed border-primary-300 rounded flex items-center justify-center">
							<label className="flex flex-col items-center cursor-pointer justify-center text-center">
								<span className="text-primary-500 text-sm">Ajouter une vidéo</span>
								<input
									type="file"
									accept="video/*"
									multiple
									onChange={handleVideoChange}
									className="hidden"
								/>
							</label>
						</div>
					)}
				</div>
			</div>

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
							onClick={() => handleVideoDelete(index)}
							className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
						>
							X
						</button>
					</div>
				))}
			</div>

			{progress !== null && (
				<div className="mt-2 w-full bg-gray-200 rounded">
					<div
						className="bg-primary-500 text-xs font-medium text-white text-center p-0.5 leading-none rounded"
						style={{ width: `${progress}%` }}
					>
						{progress}%
					</div>
				</div>
			)}

			{selectedVideo && (
				<VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
			)}
		</div>
	);
};

export default VideoUploader;
