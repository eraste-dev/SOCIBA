import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import Input from 'components/Form/Input/Input';
import Button from 'components/Button/Button';
import { route } from 'routers/route';
import { fetchAllProperties } from 'app/axios/actions/api.action';
import { IGetSearchPropertiesParams } from 'utils/query-builder.utils';
import { Fragment } from 'react';

export interface AdvancedSearchProps {
  className?: string;
}

interface SearchFormData {
  searchText: string;
  propertyType: string;
  city: string;
  district: string;
}

interface SelectOption {
  id: string;
  name: string;
}

const AdvancedSearch: FC<AdvancedSearchProps> = ({ className = "" }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<SelectOption>({ id: '', name: 'Tous les types de biens' });
  const [selectedCity, setSelectedCity] = useState<SelectOption>({ id: '', name: 'Toutes les villes' });
  
  const { register, handleSubmit, watch, setValue, reset } = useForm<SearchFormData>({
    defaultValues: {
      searchText: '',
      propertyType: '',
      city: '',
      district: ''
    }
  });

  // Charger les catégories et villes au montage du composant
  useEffect(() => {
    fetchCategories();
    fetchCities();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/v1/categories');
      const data = await response.json();
      if (data.success) {
        const categoryOptions = [
          { id: '', name: 'Tous les types de biens' },
          ...data.data.map((cat: any) => ({ id: cat.id.toString(), name: cat.name }))
        ];
        setCategories(categoryOptions);
        setSelectedCategory(categoryOptions[0]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
      const defaultCategories = [{ id: '', name: 'Tous les types de biens' }];
      setCategories(defaultCategories);
      setSelectedCategory(defaultCategories[0]);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch('/api/v1/cities');
      const data = await response.json();
      if (data.success) {
        const cityOptions = [
          { id: '', name: 'Toutes les villes' },
          ...data.data.map((city: any) => ({ id: city.id.toString(), name: city.name }))
        ];
        setCities(cityOptions);
        setSelectedCity(cityOptions[0]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des villes:', error);
      // Fallback avec les villes statiques
      const cityOptions = [
        { id: '', name: 'Toutes les villes' },
        { id: '1', name: 'Abidjan' },
        { id: '2', name: 'Yamoussoukro' },
        { id: '3', name: 'San-Pedro' }
      ];
      setCities(cityOptions);
      setSelectedCity(cityOptions[0]);
    }
  };

  const onSubmit = (data: SearchFormData) => {
    // Construire les paramètres de recherche
    const searchParams = new URLSearchParams();
    
    if (data.searchText.trim()) {
      searchParams.append('searchText', data.searchText.trim());
    }
    
    if (selectedCategory.id) {
      searchParams.append('category', selectedCategory.id);
    }
    
    if (selectedCity.id) {
      searchParams.append('city_id', selectedCity.id);
    }
    
    if (data.district.trim()) {
      searchParams.append('location_description', data.district.trim());
    }

    // Rediriger vers la page de résultats avec les paramètres
    const url = route('annonces') + (searchParams.toString() ? '?' + searchParams.toString() : '');
    console.log('Recherche avancée:', { data, url, selectedCategory, selectedCity });
    
    history.push(url);
    
    // Déclencher la recherche
    const params: IGetSearchPropertiesParams = {
      searchText: data.searchText.trim() || undefined,
      category: selectedCategory.id ? parseInt(selectedCategory.id) || "*" : undefined,
      city_id: selectedCity.id || undefined,
      location_description: data.district.trim() || undefined,
    };
    
    dispatch(fetchAllProperties(params));
  };

  const clearForm = () => {
    reset();
    setSelectedCategory({ id: '', name: 'Tous les types de biens' });
    setSelectedCity({ id: '', name: 'Toutes les villes' });
  };

  const CustomListBox: FC<{
    label: string;
    options: SelectOption[];
    selected: SelectOption;
    onSelect: (option: SelectOption) => void;
  }> = ({ label, options, selected, onSelect }) => (
    <div>
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
        {label}
      </label>
      <Listbox value={selected} onChange={onSelect}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-3 pl-4 pr-10 text-left bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 rounded-lg cursor-default focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
            <span className="block truncate text-neutral-900 dark:text-neutral-100">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-sm bg-white dark:bg-neutral-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `${
                      active ? 'text-white bg-primary-600' : 'text-neutral-900 dark:text-neutral-100'
                    } cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={option}
                >
                  {({ selected: isSelected }) => (
                    <>
                      <span className={`${isSelected ? 'font-medium' : 'font-normal'} block truncate`}>
                        {option.name}
                      </span>
                      {isSelected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );

  return (
    <div className={`bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 ${className}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          Recherche avancée
        </div>
        
        {/* Recherche générale */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Recherche générale
          </label>
          <Input
            type="text"
            placeholder="Mots-clés, prix, description..."
            className="w-full"
            {...register('searchText')}
          />
        </div>

        {/* Type de bien */}
        <CustomListBox
          label="Type de bien"
          options={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* Ville */}
        <CustomListBox
          label="Ville"
          options={cities}
          selected={selectedCity}
          onSelect={setSelectedCity}
        />

        {/* Commune/Quartier */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Commune/Quartier
          </label>
          <Input
            type="text"
            placeholder="Cocody, Plateau, Treichville..."
            className="w-full"
            {...register('district')}
          />
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1 bg-primary-6000 hover:bg-primary-700 text-white"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Rechercher
          </Button>
          
          <Button
            type="button"
            onClick={clearForm}
            className="px-6 border border-gray-300 text-neutral-700 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            Effacer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdvancedSearch; 