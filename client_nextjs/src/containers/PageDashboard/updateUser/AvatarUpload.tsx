import Avatar from "components/Avatar/Avatar";
import React, { FC, useState } from "react";

export interface AvatarUploadProps {
	defaultUrl?: string;
	avatar?: string;
	setAvatar?: (avatar: string | null) => void;
	setAvatarFile?: (avatar: File | null) => void;
}

const AvatarUpload: FC<AvatarUploadProps> = ({ defaultUrl, avatar, setAvatar, setAvatarFile }) => {
	const [error, setError] = useState("");

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			if (!file.type.startsWith("image/")) {
				if (setAvatar) setAvatar(null);
				setError("File is not an image");
				return;
			}

			if (file.size > 2 * 1024 * 1024) {
				// 2MB
				if (setAvatar) setAvatar(null);
				setError("File size exceeds 2MB");
				return;
			}

			if (setAvatar) setAvatar("");
			setError("");
			const reader = new FileReader();
			reader.onload = () => {
				if (typeof reader.result === "string") {
					if (setAvatar) setAvatar(reader.result);
				} else {
					if (setAvatar) setAvatar(null);
					setError("Failed to read file");
				}
			};
			reader.onerror = () => {
				if (setAvatar) setAvatar(null);
				setError("Error reading file");
			};
			reader.readAsDataURL(file);
			if (setAvatarFile) setAvatarFile(file);
		}
	};

	return (
		<div className="block md:col-span-2">
			<div className="flex justify-center">
				<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-full w-1/3">
					<div className="space-y-1 text-center">
						{avatar || defaultUrl ? (
							<Avatar radius="rounded-full" imgUrl={avatar || defaultUrl} sizeClass="w-32 h-32 sm:w-32 sm:h-32" />
						) : (
							<svg className="mx-auto h-12 w-12 text-neutral-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
								<path
									d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						)}
						<div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
							<label
								htmlFor="avatar"
								className="relative text-center cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
							>
								<span>Changer de photo</span>
								<input id="avatar" type="file" className="sr-only" name="avatar" onChange={handleFileChange} />
							</label>
						</div>
						<p className="text-xs text-neutral-500">PNG, JPG, GIF, taille max. 2MB</p>
						{error && <p className="text-xs text-red-500">{error}</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AvatarUpload;
