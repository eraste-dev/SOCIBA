import Heading2 from "components/Heading/Heading2";
import { FC } from "react";

export interface UserLayoutProps {
	className?: string;
	heading: string;
	headingEmoji?: string;
	subHeading?: string;
	children?: React.ReactNode;
}

const UserLayout: FC<UserLayoutProps> = ({
	className = "",
	heading,
	subHeading,
	headingEmoji,
	children,
}) => {
	return (
		<div className={`nc-UserLayout relative ${className}`} data-nc-id="UserLayout">
			{/* <HeadBackgroundCommon /> */}
			<div className="relative ">
				{/* HEADER */}
				{false && (
					<header className="text-center max-w-2xl mx-auto">
						<Heading2 emoji={headingEmoji}>{heading}</Heading2>
						{subHeading && (
							<span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
								{subHeading}
							</span>
						)}
					</header>
				)}

				{/* CONTENT */}
				<div className="p-5 md:px-5 mx-auto bg-white shadow-lg sm:p-10 lg:p-16 dark:bg-neutral-900">
					{children}
				</div>
			</div>
		</div>
	);
};

export default UserLayout;
