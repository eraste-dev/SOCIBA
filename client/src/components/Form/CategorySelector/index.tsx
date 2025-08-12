import { FC, Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

export interface CategoryOption {
  id: string;
  name: string;
  slug?: string;
}

interface CategorySelectorProps {
  onCategoryChange: (category: CategoryOption) => void;
  selectedCategoryId?: string;
  className?: string;
}

const CategorySelector: FC<CategorySelectorProps> = ({
  onCategoryChange,
  selectedCategoryId,
  className = ''
}) => {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryOption | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // URL de base de l'API
  const API_BASE_URL = 'https://api.bajorah.com';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/categories`);
        const data = await response.json();
        
        if (data.success) {
          // Filtrage des catégories
          const filteredCategories = data.data
            .filter((cat: any) => 
              cat.name !== "Appartement" && 
              cat.name !== "Autre bien immobilier" && 
              cat.name !== "Salle d'évenement"
            );
          
          // Ordre souhaité des catégories
          const categoryOrder = ["Maison", "Terrain", "Résidence", "Hôtel", "Magasin", "Bureau", "Espace"];
          
          // Tri des catégories selon l'ordre défini
          const categoryOptions = filteredCategories
            .sort((a: any, b: any) => {
              const indexA = categoryOrder.indexOf(a.name);
              const indexB = categoryOrder.indexOf(b.name);
              return indexA - indexB;
            })
            .map((cat: any) => ({
              id: cat.id.toString(),
              name: cat.name,
              slug: cat.slug
            }));
          
          setCategories(categoryOptions);
          
          // Sélectionner la catégorie par défaut ou celle fournie en props
          const defaultCategory = selectedCategoryId 
            ? categoryOptions.find((cat: CategoryOption) => cat.id === selectedCategoryId) || categoryOptions[0]
            : categoryOptions[0];
            
          setSelectedCategory(defaultCategory);
          onCategoryChange(defaultCategory);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [selectedCategoryId]);

  const handleCategoryChange = (category: CategoryOption) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  if (isLoading) {
    return (
      <div className={`animate-pulse bg-gray-200 rounded-md h-10 ${className}`} />
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <Listbox value={selectedCategory} onChange={handleCategoryChange}>
        <div className="relative">
          <Listbox.Button 
            className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300 sm:text-sm"
          >
            <span className="block truncate">
              {selectedCategory?.name || 'Sélectionnez une catégorie'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
              {categories.map((category) => (
                <Listbox.Option
                  key={category.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-primary-100 text-primary-900' : 'text-gray-900'
                    }`
                  }
                  value={category}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
};

export default CategorySelector;
