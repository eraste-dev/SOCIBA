import React from "react";
import ButtonClose from "components/ButtonClose/ButtonClose";
import Logo from "components/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { NavLink, useHistory } from "react-router-dom";
import { NavItemType } from "./NavigationItem";
import DarkModeContainer from "containers/DarkModeContainer/DarkModeContainer";
import { NAVIGATION_DEMO, NAVIGATION_SHORT_DEMO } from "data/navigation";
import ButtonPrimary from "components/Button/ButtonPrimary";
import SocialsList from "components/SocialsList/SocialsList";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "app/hooks";
import { initUserRequest } from "app/axios/actions/api.users.action";
import { inittPropertyList } from "app/axios/actions/api.action";

export interface NavMobileProps {
	data?: NavItemType[];
	onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({ data = NAVIGATION_SHORT_DEMO, onClickClose }) => {
	const dispatch = useAppDispatch();
	const history = useHistory();
	const goTo = (href: string) => {
		dispatch(initUserRequest());
		dispatch(inittPropertyList());
		history.push(href);
	};

	const _renderMenuChild = (item: NavItemType) => {
		return (
			<ul className="nav-mobile-sub-menu pl-6 pb-1 text-base list-none">
				{item.children?.map((i, index) => (
					<Disclosure key={i.href + index} as="li">
						{i.targetBlank ? (
							<a
								// href={i.href}
								onClick={() => {
									goTo(i.href);
									onClickClose && onClickClose();
								}}
								target="_blank"
								rel="noreferrer"
								className="flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]"
							>
								<span
									className={!i.children ? "block w-full" : ""}
									onClick={onClickClose}
								>
									{i.name}
									{i.isNew && (
										<span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 leading-none rounded-md ml-2">
											New!
										</span>
									)}
								</span>

								{i.children && (
									<span
										className="block flex-grow"
										onClick={(e) => e.preventDefault()}
									>
										<Disclosure.Button
											as="span"
											className="flex justify-end flex-grow"
										>
											<ChevronDownIcon
												className="ml-2 h-4 w-4 text-neutral-500"
												aria-hidden="true"
											/>
										</Disclosure.Button>
									</span>
								)}
							</a>
						) : (
							<a
								// exact
								// strict
								// to={{
								// 	pathname: i.href || undefined,
								// }}
								// activeClassName="text-secondary"
								onClick={() => goTo(i.href)}
								className="flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]"
							>
								<span
									className={!i.children ? "block w-full" : ""}
									onClick={onClickClose}
								>
									{i.name}
								</span>
								{i.children && (
									<span
										className="block flex-grow"
										onClick={(e) => e.preventDefault()}
									>
										<Disclosure.Button
											as="span"
											className="flex justify-end flex-grow"
										>
											<ChevronDownIcon
												className="ml-2 h-4 w-4 text-neutral-500"
												aria-hidden="true"
											/>
										</Disclosure.Button>
									</span>
								)}
							</a>
						)}
						{i.children && <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>}
					</Disclosure>
				))}
			</ul>
		);
	};

	const _renderItem = (item: NavItemType, index: number) => {
		return (
			<Disclosure key={item.id} as="li" className="text-neutral-900 dark:text-white">
				<a
					// exact
					// strict
					// to={{
					// 	pathname: item.href || undefined,
					// }}
					// activeClassName="text-secondary"
					onClick={() => goTo(item.href)}
					className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
				>
					<span className={!item.children ? "block w-full" : ""} onClick={onClickClose}>
						{item.name}
					</span>

					{item.children && (
						<span className={"block flex-grow"} onClick={(e) => e.preventDefault()}>
							<Disclosure.Button as="span" className="flex justify-end flex-grow">
								<ChevronDownIcon
									className="ml-2 h-4 w-4 text-neutral-500"
									aria-hidden="true"
								/>
							</Disclosure.Button>
						</span>
					)}
				</a>
				{item.children && <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>}
			</Disclosure>
		);
	};

	return (
		<div className="overflow-y-auto w-full max-w-sm h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
			<div className="py-6 px-5">
				<Logo />
				<div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
					{/* <span>Discover the most outstanding articles on all topics of life. Write your stories and share them</span> */}

					<div className="flex justify-between items-center mt-4">
						<SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
						<span className="block">
							<DarkModeContainer className="bg-neutral-100 dark:bg-neutral-800" />
						</span>
					</div>
				</div>
				<span className="absolute right-2 top-2 p-1">
					<ButtonClose onClick={onClickClose} />
				</span>
			</div>
			<ul className="flex flex-col py-6 px-2 space-y-1">{data.map(_renderItem)}</ul>
		</div>
	);
};

export default NavMobile;
