import { Popover, Transition } from "@headlessui/react";
import { AuthAction } from "app/reducer/auth/auth";
import { initializeUserProduct } from "app/axios/actions/api.products.action";
import { isAdmin, logout } from "app/axios/actions/api.action";
import Avatar from "components/Avatar/Avatar";
import { avatarImgs } from "contains/fakeData";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { route } from "routers/route";

export default function AvatarDropdown() {
	const dispatch = useDispatch();
	const user = useSelector(AuthAction.data)?.user;
	const token = useSelector(AuthAction.data)?.token;

	const handleLogout = () => {
		if (token) {
			dispatch(logout(token));
			dispatch(initializeUserProduct());
		}
	};

	if (!user) {
		return <></>;
	}

	return (
		<div className="AvatarDropdown">
			<Popover className="relative">
				{({ open }) => (
					<>
						<Popover.Button
							className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
						>
							<Avatar
								radius="rounded-full"
								imgUrl={user.avatar || avatarImgs[1]}
								sizeClass="w-8 h-8 sm:w-9 sm:h-9"
							/>
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
							<Popover.Panel className="absolute z-10 w-screen max-w-[260px] px-4 mt-3 -right-10 sm:right-0 sm:px-0">
								<div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">
										<div className="flex items-center space-x-3">
											<Avatar
												imgUrl={user.avatar || avatarImgs[1]}
												sizeClass="w-12 h-12"
												radius="rounded-full"
											/>

											<div className="flex-grow">
												<h4 className="font-semibold">
													{user.name} {user.last_name}
												</h4>
												{isAdmin(user) && (
													<p className="text-sm text-neutral-500 dark:text-neutral-400">
														{" "}
														{user && user.type}{" "}
													</p>
												)}
											</div>
										</div>

										<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

										{/* ------------------ 1 --------------------- */}
										<Link
											to={route("dashboard")}
											className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
										>
											<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium ">
													{"Mon Compte"}
												</p>
											</div>
										</Link>

										{/* ------------------ 2 --------------------- */}
										<Link
											to={route("posts")}
											className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
										>
											<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M19.2101 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.8201 15.13 19.2101 15.74Z"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeMiterlimit="10"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M18.7001 16.25C19.0001 17.33 19.84 18.17 20.92 18.47"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeMiterlimit="10"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M3.40991 22C3.40991 18.13 7.25994 15 11.9999 15C13.0399 15 14.0399 15.15 14.9699 15.43"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium ">
													{"Mes annonces"}
												</p>
											</div>
										</Link>

										{/* ------------------ 3 --------------------- */}
										{false && (
											<Link
												to={route("edit_profile")}
												className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
											>
												<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
													<svg
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M19.2101 15.74L15.67 19.2801C15.53 19.4201 15.4 19.68 15.37 19.87L15.18 21.22C15.11 21.71 15.45 22.05 15.94 21.98L17.29 21.79C17.48 21.76 17.75 21.63 17.88 21.49L21.42 17.95C22.03 17.34 22.32 16.63 21.42 15.73C20.53 14.84 19.8201 15.13 19.2101 15.74Z"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeMiterlimit="10"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M18.7001 16.25C19.0001 17.33 19.84 18.17 20.92 18.47"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeMiterlimit="10"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
														<path
															d="M3.40991 22C3.40991 18.13 7.25994 15 11.9999 15C13.0399 15 14.0399 15.15 14.9699 15.43"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
												</div>
												<div className="ml-4">
													<p className="text-sm font-medium ">
														{"Modifier mon profil"}
													</p>
												</div>
											</Link>
										)}

										<div className="w-full border-b border-neutral-200 dark:border-neutral-700" />

										{/* ------------------ 2 --------------------- */}
										<Link
											to={"/"}
											onClick={handleLogout}
											className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
										>
											<div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M15 12H3.62"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
													<path
														d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
														stroke="currentColor"
														strokeWidth="1.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</svg>
											</div>
											<div className="ml-4">
												<p className="text-sm font-medium ">
													{"Se déconnecter"}
												</p>
											</div>
										</Link>
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
