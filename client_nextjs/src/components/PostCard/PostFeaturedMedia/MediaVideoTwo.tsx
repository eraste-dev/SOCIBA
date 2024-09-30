import LoadingVideo from "components/LoadingVideo/LoadingVideo";
import React, { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";

export interface MediaVideoTwoProps {
	videoUrl: string;
	isHover: boolean;
}

const MediaVideoTwo: FC<MediaVideoTwoProps> = ({ videoUrl, isHover }) => {
	let _timeOut: NodeJS.Timeout | null = null;
	const [isMuted, setIsMuted] = useState(true);
	const [showDescUnmuted, setShowDescUnmuted] = useState(true);

	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (_timeOut) clearTimeout(_timeOut);
		_timeOut = setTimeout(() => {
			setShowDescUnmuted(false);
		}, 2000);
		return () => {
			_timeOut && clearTimeout(_timeOut);
		};
	}, []);

	return (
		<div className="nc-MediaVideo">
			<div className="w-full flex justify-center items-center">
				<ReactPlayer
					url={videoUrl}
					controls={true}
					muted={isMuted}
					playing={isHover}
					style={{
						opacity: isPlaying ? 1 : 0,
					}}
					className={` relative bg-neutral-900 inset-0`}
					width="100%"
					height="100%"
					onStart={() => setIsPlaying(true)}
				/>
			</div>
			<div
				className={`${
					isPlaying ? "opacity-0" : "opacity-100"
				} relative bg-neutral-900 bg-opacity-30 flex items-center justify-center inset-0`}
			>
				<LoadingVideo />
			</div>
			<div
				className={`relative z-20 bottom-2 left-2 h-6 rounded-full bg-black bg-opacity-70 text-white flex items-center justify-center text-sm transform transition-transform nc-will-change-transform ${
					showDescUnmuted ? "pl-[6px] pr-2" : "w-6 hover:scale-125"
				}`}
				onClick={() => setIsMuted(!isMuted)}
			>
				{isMuted ? (
					<>
						<i className="las la-volume-off"></i>
						{showDescUnmuted && (
							<span className="ml-1 inline-block text-[9px]">
								Click here to unmute
							</span>
						)}
					</>
				) : (
					<i className="las la-volume-up"></i>
				)}
			</div>
		</div>
	);
};

export default MediaVideoTwo;
