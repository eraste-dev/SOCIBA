import { FC, useState } from "react";
import Input from "components/Form/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { IPropertyFilter, PropertyAction } from "app/reducer/products/product";
import { useHistory } from "react-router-dom";
import { IGetSearchPropertiesParams, searchParamsFromRedux } from "utils/query-builder.utils";
import { fetchAllProperties, searchProperties } from "app/axios/actions/api.action";
import { LoadingSpinner } from "components/UI/Loading/LoadingSpinner";
import { _f } from "utils/money-format";

export interface SearchHeaderProps {}

const SearchHeader: FC<SearchHeaderProps> = () => {
	const dispatch = useDispatch();
	const productSearched = useSelector(PropertyAction.data)?.search;
	const history = useHistory();

	const [useStateFilter, setUseStateFilter] = useState<IPropertyFilter>({});
	const [searchText, setSearchText] = useState<string>("");

	const fetchAll = (params: IGetSearchPropertiesParams) => {
		if (useStateFilter) {
			// const _params: IGetSearchPropertiesParams = searchParamsFromRedux(useStateFilter);
			const _params: IGetSearchPropertiesParams = { searchText };
			console.log(_params, "searchParamsFromURL()");
			return dispatch(searchProperties(_params));
		}
	};

	return (
		<>
			<form action="" method="POST" className="relative">
				<Input
					type="search"
					placeholder="Chercher sur SOCIBA"
					className="pr-10 w-full"
					sizeClass="h-[42px] pl-4 py-3"
					onChange={(e) => {
						const params: IGetSearchPropertiesParams =
							searchParamsFromRedux(useStateFilter);
						setUseStateFilter((prev) => ({ ...prev, textSearch: e.target.value }));
						setSearchText(e.target.value);
						fetchAll(params);
					}}
					onBlur={() => {
						const params: IGetSearchPropertiesParams =
							searchParamsFromRedux(useStateFilter);
						fetchAll(params);
					}}
				/>
				<span className="absolute top-1/2 -translate-y-1/2 right-3 text-neutral-500">
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

			{searchText && searchText.length >= 2 && (
				<div
					className="relative bg-white dark:bg-neutral-400 shadow-md w-11/12 md:w-1/3 lg:w-1/3 p-4 overflow-auto"
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

					<ul className="w-full">
						{productSearched &&
							productSearched.get &&
							productSearched.get?.length > 0 &&
							productSearched.get?.map((item) => (
								<li
									key={item.id}
									className="w-full items-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
									onClick={() => {
										history.push(`${item.href}&?id=${item.id}`);
										setSearchText("");
									}}
								>
									<span>{item.title}</span> <br />
									<span> {_f(item.price)} FCFA </span>
								</li>
							))}
					</ul>
				</div>
			)}
		</>
	);
};

export default SearchHeader;