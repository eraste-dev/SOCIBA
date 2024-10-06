import { FC, useState } from "react";
import Input from "components/Form/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { IProduct, IPropertyFilter, PropertyAction } from "app/reducer/products/product";
import { useHistory } from "react-router-dom";
import { IGetSearchPropertiesParams, searchParamsFromRedux } from "utils/query-builder.utils";
import { fetchAllProperties, searchProperties } from "app/axios/actions/api.action";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";
import { _f } from "utils/money-format";
import { route } from "routers/route";
import { useForm } from "react-hook-form";

export interface SearchHeaderProps {}

const SearchHeader: FC<SearchHeaderProps> = () => {
	const dispatch = useDispatch();
	const productSearched = useSelector(PropertyAction.data)?.search;
	const history = useHistory();

	const [useStateFilter, setUseStateFilter] = useState<IPropertyFilter>({});
	const [searchText, setSearchText] = useState<string>("");
	const [open, setopen] = useState(false);
	const { register, handleSubmit, watch, setValue, getValues } = useForm<{
		searchText: string;
	}>();

	const search = (params: IGetSearchPropertiesParams) => {
		if (useStateFilter) {
			// const _params: IGetSearchPropertiesParams = searchParamsFromRedux(useStateFilter);
			const _params: IGetSearchPropertiesParams = { searchText };
			console.log(_params, "searchParamsFromURL()");
			return dispatch(searchProperties(_params));
		}
	};

	const fetchAll = () => {
		const _params: IGetSearchPropertiesParams = { searchText };
		return dispatch(fetchAllProperties(_params));
	};

	const handleChange = (value: string) => {
		const params: IGetSearchPropertiesParams = searchParamsFromRedux(useStateFilter);
		setUseStateFilter((prev) => ({ ...prev, textSearch: value }));
		setSearchText(value);
		search(params);
	};

	const onSubmit = () => {
		const url = route("annonces") + "/?searchText=" + searchText;
		console.log("onSubmit search", {
			searchText,
			url,
		});
		history.replace(url);
		setopen(false);
		// const params: IGetSearchPropertiesParams = { searchText };
		fetchAll();
	};

	const handleClickItem = (item: IProduct) => {
		setSearchText("");
		setopen(false);
		console.log({
			searchText,
			item,
		});
		const url = route("annonce") + "/" + item.category.slug + "?id=" + item.id;
		return history.push(url);
	};

	return (
		<>
			<form className="relative w-full mt-3" onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="search"
					placeholder="Chercher sur BAJORAH"
					className="pr-10 w-full"
					sizeClass="h-[42px] pl-4 py-3"
					{...(register("searchText"), { required: true })}
					onChange={(e) => {
						handleChange(e.target.value);
						// setopen(true);
					}}
					onBlur={() => {
						// setSearchText("");
						open && setopen(false);
					}}
				/>
				<span className="absolute top-1/2 -translate-y-1/2 right-3 text-neutral-500 cursor-pointer">
					<svg
						className="h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M22 22L20 20"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</span>
				<input type="submit" hidden value="" />
			</form>

			{/* searchText && searchText.length >= 2 */}
			{/* w-11/12 md:w-1/3 lg:w-1/3 */}
			{open && (
				<div
					className="relative bg-white dark:bg-neutral-400 shadow-sm w-11/12 md:w-1/3 lg:w-1/3 p-4 overflow-auto"
					style={{
						minHeight: "200px",
						maxHeight: "450px",
						position: "absolute",
						zIndex: 9999,
					}}
				>
					{productSearched && productSearched.loading && (
						<div className="w-full flex justify-center">
							<LoadingSpinner />{" "}
						</div>
					)}

					{searchText == "" && (
						<div className="w-full flex justify-center text-sm text-neutral-200 dark:text-neutral-800">
							{" "}
							Aucun résultat{" "}
						</div>
					)}

					<ul className="w-full">
						{searchText != "" &&
							productSearched &&
							productSearched.get &&
							productSearched.get?.length > 0 &&
							productSearched.get?.map((item) => (
								<li
									key={item.id}
									className="w-full items-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
									onClick={() => handleClickItem(item)}
								>
									<span>
										<span className="font-semibold">
											{item.category && item.category.name}
										</span>{" "}
										{item.home_type && item.home_type != item.category.name
											? item.home_type
											: ""}{" "}
									</span>
									<br />
									<span>
										{`Commune : ${item.location.name}`} {" , "}
										<span>{`quartier : ${item.location_description}`}</span>
									</span>{" "}
									<br />
									<span> {_f(item.price)} </span>
								</li>
							))}
					</ul>
				</div>
			)}
		</>
	);
};

export default SearchHeader;
