import HeadBackgroundCommon from "components/HeadBackgroundCommon/HeadBackgroundCommon";
import { FC } from "react";
import SideBarDashbord from "./SideBar.layout";

export interface AdminLayoutProps {
	className?: string;
}

export const layoutSetting = {
	sideBarWidth: "200",
};

const AdminLayout: FC<AdminLayoutProps> = ({ className = "", children }) => {
	return (
		<div className={`nc-AdminLayout relative ${className}`} data-nc-id="AdminLayout">
			<div className="relative">
				{/* grid grid-cols-5 gap-2 */}
				{/*  col-span-4 */}
				<div className="flex w-full" style={{ height: "100vh" }}>
					{/* SIDEBAR */}
					<div
						className="p-5 bg-white"
						style={{
							width: `${layoutSetting.sideBarWidth}px`,
							minWidth: `${layoutSetting.sideBarWidth}px`,
							height: "100vh",
						}}
					>
						<SideBarDashbord />
					</div>

					<div
						className="p-5"
						style={{ width: `calc(100% - ${layoutSetting.sideBarWidth}px)` }}
					>
						{/* CONTENT */}
						<div className="flex justify-center w-full  ">
							<div className="w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40 ">
								<div className="lg:xxx-container sm:px-5 ">{children}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
