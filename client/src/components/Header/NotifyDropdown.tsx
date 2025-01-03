import { Popover, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import { logout } from "app/axios/actions/api.action";
import { initializeUserProduct } from "app/axios/actions/api.products.action";
import { fetchNotification, markNotificationAsRead } from "app/axios/actions/api.users.action";
import { AuthAction } from "app/reducer/auth/auth";
import {
	initFetchNotificationStart,
	NotificationAction,
} from "app/reducer/notifications/notifications";
import Avatar from "components/Avatar/Avatar";
import ButtonThird from "components/Button/ButtonThird";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const solutions = [
	{
		name: "Eden Tuan",
		description: "Mentioned you in a comment",
		time: "3 minutes ago",
		href: "##",
	},
	{
		name: "Leo Messi",
		description: "Create your own targeted content",
		time: "1 minute ago",
		href: "##",
	},
	{
		name: "Leo Kante",
		description: "Keep track of your growth",
		time: "3 minutes ago",
		href: "##",
	},
];

export default function NotifyDropdown() {
	const dispatch = useDispatch();
	const notifications = useSelector(NotificationAction.data);
	const loading = useSelector(NotificationAction.loading);
	const error = useSelector(NotificationAction.error);
	const token = useSelector(AuthAction.data)?.token;
	const expire = useSelector(AuthAction.data)?.expire;

	const interval = setInterval(() => {
		console.log("list of notifications has been fetched", loading);
		if (!loading) {
			dispatch(initFetchNotificationStart());
		}
	}, 10000);

	useEffect(() => {
		return () => {
			clearInterval(interval);
		};
	}, [interval]);

	// fetchNotification
	useEffect(() => {
		if (!notifications && !loading && !error) {
			dispatch(fetchNotification());
		}
	}, [dispatch, notifications, loading, interval, error]);

	useEffect(() => {
		const checkExpireDate = () => {
			if (token && expire) {
				return new Date(expire*1000) > new Date();
			}
			return false;
		};

		if(token && !checkExpireDate() && !loading && error === "INVALID_TOKEN") {
			console.log("token expired, logout ...", token);
			dispatch(logout(token));
			// dispatch(initializeUserProduct());
		}
		
	}, [dispatch, notifications, loading, interval, error, token]);

	return (
		<div className="">
			<Popover className="relative">
				{({ open }) => (
					<>
						<Popover.Button
							className={`
                ${open ? "" : "text-opacity-90"}
                 group  p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center text-base font-medium hover:text-opacity-100
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
						>
							{notifications && notifications.length > 0 && (
								<span className="w-2 h-2 bg-blue-500 absolute top-2 right-2 rounded-full"></span>
							)}
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path
									d="M12 6.43994V9.76994"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
								/>
								<path
									d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
								/>
								<path
									d="M15.33 18.8201C15.33 20.6501 13.83 22.1501 12 22.1501C11.09 22.1501 10.25 21.7701 9.65004 21.1701C9.05004 20.5701 8.67004 19.7301 8.67004 18.8201"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeMiterlimit="10"
								/>
							</svg>
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel className="absolute z-10 w-screen max-w-xs sm:max-w-sm px-4 mt-3 -right-28 sm:right-0 sm:px-0">
								<div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div
										className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7"
										style={{ height: "280px", overflow: "auto" }}
									>
										<h3 className="text-xl font-semibold">
											Notifications
											{notifications && notifications.length > 0 && (
												<span>
													({notifications && notifications.length})
												</span>
											)}
										</h3>
										{notifications && notifications.length === 0 && (
											<p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
												Aucune nouvelle notifications
											</p>
										)}

										{notifications &&
											notifications.map((item, index) => (
												<a
													key={index}
													// href={item.href}
													className="flex p-2 pr-8 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 relative"
												>
													{/* <Avatar
														sizeClass="w-8 h-8 sm:w-12 sm:h-12"
														radius="rounded-full"
													/> */}
													<div>
														<BellIcon width={20} height={20} />
													</div>
													<div className="ml-1 sm:ml-1 space-y-1">
														<p
															className="text-sm font-medium text-gray-900 dark:text-gray-200"
															dangerouslySetInnerHTML={{
																__html: item.data.title,
															}}
														/>
														<p
															className="text-xs sm:text-sm text-gray-500 dark:text-gray-400"
															dangerouslySetInnerHTML={{
																__html: item.data.message,
															}}
														/>

														<p className="text-xs text-gray-400 dark:text-gray-400">
															{item.created_at
																.slice(0, 10)
																.replace(/-/g, "/") +
																" à " +
																item.created_at.slice(11, 19)}
														</p>
													</div>
													<span className="absolute right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></span>
												</a>
											))}
									</div>

									<div>
										{notifications && notifications.length > 0 && (
											<a
												className="block w-full p-3 text-center text-sm font-medium text-blue-600 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white cursor-pointer"
												onClick={() => dispatch(markNotificationAsRead())}
											>
												Marquer comme lues
											</a>
										)}
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	);
}
