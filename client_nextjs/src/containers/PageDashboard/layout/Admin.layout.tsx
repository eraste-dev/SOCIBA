import HeadBackgroundCommon from "components/HeadBackgroundCommon/HeadBackgroundCommon";
import { FC, useState } from "react";
import SideBarDashbord from "./SideBar.layout";
import { IoMenuOutline, IoCloseOutline } from "react-icons/io5"; // Icon for the menu
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectSidebarState, toggleSidebar } from "app/reducer/darkmode/darkmode";

export interface AdminLayoutProps {
	className?: string;
}

export const layoutSetting = {
	sideBarWidth: "200",
};

const AdminLayout: FC<AdminLayoutProps> = ({ className = "", children }) => {
	const isSidebarOpen = useAppSelector(selectSidebarState);
	const dispatch = useAppDispatch();

	return (
		<div className={`nc-AdminLayout relative ${className}`} data-nc-id="AdminLayout">
			<div className="relative">
				<div className="flex w-full" style={{ height: "100vh" }}>
					{/* SIDEBAR */}
					<div
						className={`p-2 fixed bg-white dark:bg-neutral-800 md:block ${
							isSidebarOpen ? "block" : "hidden"
						} fixed md:relative z-50 md:z-auto top-0`}
						style={{
							width: `${layoutSetting.sideBarWidth}px`,
							minWidth: `${layoutSetting.sideBarWidth}px`,
							height: "100vh",
						}}
					>
						<SideBarDashbord />
					</div>

					{/* Overlay for mobile when sidebar is open */}
					{isSidebarOpen && (
						<div
							className="fixed inset-0 bg-black opacity-50 md:hidden"
							onClick={() => dispatch(toggleSidebar())}
						></div>
					)}

					{/* CONTENT */}
					<div
						className="p-2 sm:p-5 flex-1 bg-gray-50 dark:bg-neutral-900 dark:text-neutral-100"
						style={{
							width: isSidebarOpen
								? `100%`
								: `calc(100% - ${layoutSetting.sideBarWidth}px)`,
							left: isSidebarOpen ? `0` : `${layoutSetting.sideBarWidth}px`,
							height: "100vh",
							overflow: "auto",
						}}
					>
						<div className="flex justify-center w-full">
							<div className="w-full bg-neutral-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40">
								<div className="md:xxx-container sm:px-5">{children}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminLayout;
