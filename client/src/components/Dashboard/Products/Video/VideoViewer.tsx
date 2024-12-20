import { ZoomInIcon, ZoomOutIcon } from "@heroicons/react/solid";
import { Fullscreen } from "@mui/icons-material";
import { useState } from "react";

interface VideoViewerProps {
	videoUrl: string;
}

const VideoViewer: React.FC<VideoViewerProps> = ({ videoUrl }) => {
	const [zoomLevel, setZoomLevel] = useState(1);
	const [fullscreen, setFullscreen] = useState(false);

	const handleZoomIn = () => {
		setZoomLevel(zoomLevel + 0.1);
	};

	const handleZoomOut = () => {
		setZoomLevel(zoomLevel - 0.1);
	};

	const toggleFullscreen = () => {
		setFullscreen(!fullscreen);
	};

	return (
		<>
			<div className="flex justify-center align-middle w-3/4">
				<div className={`relative w-4/5 h-4/5 border-2 ${fullscreen ? "bg-black" : ""}`}>
					<video
						src={videoUrl}
						controls
						className={`m-auto max-w-full max-h-full ${
							fullscreen ? "object-contain" : ""
						}`}
						style={{ transform: `scale(${zoomLevel})` }}
					/>
				</div>
			</div>

			<div className="absolute top-0 right-0 m-4 flex flex-col space-y-2">
				<button onClick={handleZoomIn} className="bg-blue-500 text-white px-4 py-2 rounded">
					<ZoomInIcon className="h-8 w-8" />
				</button>
				<button
					onClick={handleZoomOut}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					<ZoomOutIcon className="h-8 w-8" />
				</button>
				{false && (
					<button
						onClick={toggleFullscreen}
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						<Fullscreen className="h-8 w-8" />
					</button>
				)}
			</div>
		</>
	);
};

export default VideoViewer;
