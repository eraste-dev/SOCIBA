import { FC, useEffect, useState } from 'react';
import Input from 'components/Form/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct, IPropertyFilter, PropertyAction } from 'app/reducer/products/product';
import { useHistory } from 'react-router-dom';
import { IGetSearchPropertiesParams, searchParamsFromRedux } from 'utils/query-builder.utils';
import { fetchAllProperties, searchProperties } from 'app/axios/actions/api.action';
import { LoadingSpinner } from 'components/UI/Loading/LoadingSpinner';
import { _f } from 'utils/money-format';
import { route } from 'routers/route';
import { useForm } from 'react-hook-form';
import AdvancedSearch from './AdvancedSearch';
import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CATEGORIES_SUB } from 'data/categories_sub';
import axios from "axios";
import { useAppDispatch } from "../../hooks";
import { getCities } from "../../data/cities";

interface City {
  id: number;
  name: string;
  slug: string;
  iso3: string;
  iso2: string;
  description: string;
  country: any;
  lat: string;
  long: string;
  thumbnail: string;
  updated_at: string;
}

export interface SearchHeaderProps {}

const SearchHeader: FC<SearchHeaderProps> = () => {
  const dispatch = useAppDispatch();
  const productSearched = useSelector(PropertyAction.data)?.search;
  const history = useHistory();

  const [useStateFilter, setUseStateFilter] = useState<IPropertyFilter>({});
  const [searchText, setSearchText] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastPage, setLastPage] = useState('');
  const { register, handleSubmit, watch, setValue, getValues, reset } = useForm<{
    searchText: string;
  }>();

  const search = (params: IGetSearchPropertiesParams) => {
    if (useStateFilter) {
      // const _params: IGetSearchPropertiesParams = searchParamsFromRedux(useStateFilter);
      const _params: IGetSearchPropertiesParams = { searchText };
      console.log(_params, 'searchParamsFromURL()');
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
    // search(params);
    setLastPage(history.location.pathname);
  };

  const onSubmit = () => {
    // Parsing intelligent avec priorité pour la recherche de résidences
    let typeBien = "";
    let commune = "";
    let quartier = "";
    let reste = searchText.toLowerCase(); // Convertir en minuscules pour la recherche insensible à la casse

    // 1. On cherche d'abord le type de bien (x)
    for (const bien of biensList) {
      const regex = new RegExp(`\\b${bien.toLowerCase()}\\b`, 'i');
      if (regex.test(reste)) {
        typeBien = bien;
        // On retire le type de bien de la recherche
        reste = reste.replace(new RegExp(`\\b${bien.toLowerCase()}\\b`, 'i'), '').trim();
        break;
      }
    }

    // 2. On cherche ensuite la commune (y)
    for (const c of communesList) {
      const regex = new RegExp(`\\b${c}\\b`, 'i');
      if (regex.test(reste)) {
        commune = c;
        // On retire la commune de la recherche
        reste = reste.replace(new RegExp(c, 'i'), '').trim();
        break;
      }
    }

    // 3. Le reste est considéré comme quartier (z)
    if (commune && reste.trim()) {
      quartier = reste.trim();
    }

    // Construit les params
    const params: IGetSearchPropertiesParams = {};
    if (typeBien) {
      params.category_slug = typeBien.toLowerCase();
      params.category_slug_selected = typeBien.toLowerCase();
    }
    if (commune) params.location = citiesById[commune];
    if (quartier) params.location_description = quartier;
    
    // Si on a trouvé un type de bien mais pas de commune,
    // on fait une recherche générale sur ce type de bien
    if (typeBien && !commune) {
      params.category_slug = typeBien.toLowerCase();
      params.category_slug_selected = typeBien.toLowerCase();
    }

    // Redirige et déclenche la recherche
    const urlParams = new URLSearchParams();
    if (params.category_slug) urlParams.append('category_slug', String(params.category_slug));
    if (params.category_slug_selected) urlParams.append('category_slug_selected', String(params.category_slug_selected));
    if (params.location) urlParams.append('location', String(params.location));
    if (params.location_description) urlParams.append('location_description', String(params.location_description));
    const url = route('annonces') + (urlParams.toString() ? '?' + urlParams.toString() : '');
    history.replace(url);
    setOpen(false);
    dispatch(fetchAllProperties(params));
    reset();
  };

  const handleClickItem = (item: IProduct) => {
    setSearchText('');
    setOpen(false);
    console.log({
      searchText,
      item,
    });
    const url = route('annonce') + '/' + item.category.slug + '?id=' + item.id;
    return history.push(url);
  };

  const toggleAdvancedSearch = () => {
    setShowAdvanced(!showAdvanced);
    setOpen(false); // Fermer les résultats de recherche simple
  };

  // useEffect(() => {
  // 	const _params: IGetSearchPropertiesParams = { searchText };
  // 	if(!_params || !_params.searchText) {
  // 		setSearchText("");
  // 		setOpen(false);
  // 	}
  // }, [lastPage, history.location.pathname]);

  const biensList = [
    "Résidence", "Hôtel", "Maison", "Magasin", "Bureau", "Espace", "Terrain", "Appartement", "Studio", "Villa", "Duplex", "Triplex"
  ];
  const [citiesData, setCitiesData] = useState<City[]>([]);
  const [citiesById, setCitiesById] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const staticCities = getCities();
    setCitiesData(staticCities);
    const staticMapping = staticCities.reduce((acc: { [key: string]: string }, city: any) => {
      acc[city.name.toLowerCase()] = city.id.toString();
      return acc;
    }, {});
    setCitiesById(staticMapping);
  }, []);

  const communesList = citiesData.map(city => city.name.toLowerCase());

  return (
    <>
      {/* Recherche simple */}
      {!showAdvanced && (
        <>
          {/* bg-[#d6cbca] */}
          <form className="relative w-full mt-3 dark:bg-neutral-900 sm:bg-white p-1" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="search"
              placeholder="Bien, Commune, Quartier"
              className="pr-10 w-full bg-transparent focus:bg-transparent border-gray-700 sm:border-gray-200 dark:border-gray-700"
              sizeClass="h-[42px] pl-4 py-3"
              {...(register('searchText'), { required: true })}
              onChange={(e) => {
                handleChange(e.target.value);
                // setOpen(true);
              }}
              onBlur={() => {
                // setSearchText("");
                open && setOpen(false);
              }}
            />
            <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-12 text-neutral-500 cursor-pointer">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 22L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Bouton recherche avancée supprimé ici */}
            <input type="submit" hidden value="" />
          </form>

          {/* searchText && searchText.length >= 2 */}
          {/* w-11/12 md:w-1/3 lg:w-1/3 */}
          {open && (
            <div
              className="relative bg-white dark:bg-neutral-400 shadow-sm w-11/12 md:w-1/3 lg:w-1/3 p-4 overflow-auto"
              style={{
                minHeight: '200px',
                maxHeight: '450px',
                position: 'absolute',
                zIndex: 9999,
              }}
            >
              {productSearched && productSearched.loading && (
                <div className="w-full flex justify-center">
                  <LoadingSpinner />{' '}
                </div>
              )}

              {searchText == '' && <div className="w-full flex justify-center text-sm text-neutral-200 dark:text-neutral-800"> Aucun résultat </div>}

              <ul className="w-full">
                {searchText != '' &&
                  productSearched &&
                  productSearched.get &&
                  productSearched.get?.length > 0 &&
                  productSearched.get?.map((item) => (
                    <li key={item.id} className="w-full items-center p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer" onClick={() => handleClickItem(item)}>
                      <span>
                        <span className="font-semibold">{item.category && item.category.name}</span> {item.home_type && item.home_type != item.category.name ? item.home_type : ''}{' '}
                      </span>
                      <br />
                      <span>
                        {`Commune : ${item.location.name}`} {' , '}
                        <span>{`quartier : ${item.location_description}`}</span>
                      </span>{' '}
                      <br />
                      <span> {_f(item.price)} </span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* Recherche avancée */}
      <Transition
        show={showAdvanced}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="mt-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
              Recherche avancée
            </h3>
            <button
              onClick={toggleAdvancedSearch}
              className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
              title="Retour à la recherche simple"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <AdvancedSearch onClose={() => setShowAdvanced(false)} />
        </div>
      </Transition>
    </>
  );
};

export default SearchHeader;
