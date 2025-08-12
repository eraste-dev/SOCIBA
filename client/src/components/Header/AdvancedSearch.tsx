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
import { CATEGORIES_SUB } from 'data/categories_sub';
import { getCities } from 'data/cities';
const RESIDENCE_KEY = "Résidence";

export interface AdvancedSearchProps {
  className?: string;
  onClose?: () => void;
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
  slug?: string;
}

const AdvancedSearch: FC<AdvancedSearchProps> = ({ className = "", onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<SelectOption>({ id: '', name: 'Tous les types de biens' });
  
  // Ajout du state pour le type de résidence sélectionné
  const [selectedResidenceType, setSelectedResidenceType] = useState<string>("");

  // Liste des types de résidence
  const residenceTypes = [
    "Studio",
    "Chambre",
    "Chambre salon",
    "Appartement",
    "Duplex",
    "Villa"
  ];

  // Ajout du state pour les propriétés enfants et la sélection
  const [childProperties, setChildProperties] = useState<any[]>([]);
  const [selectedChildProperty, setSelectedChildProperty] = useState<number | null>(null);

  // Ajout du state pour le nombre de pièces si Villa sélectionné
  const [villaRooms, setVillaRooms] = useState("");

  // Ajout du state pour la commune sélectionnée (ID)
  const [selectedCommuneId, setSelectedCommuneId] = useState("");
  const [selectedCommuneName, setSelectedCommuneName] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  
  // Ajout des états pour gérer l'option "Autre" pour les communes
  const [showCustomCommune, setShowCustomCommune] = useState(false);
  const [customCommune, setCustomCommune] = useState("");
  
  // Ajout des états pour gérer l'option "Autre" pour la ville Terrain
  const [showCustomVilleTerrain, setShowCustomVilleTerrain] = useState(false);
  const [customVilleTerrain, setCustomVilleTerrain] = useState("");

  // Ajout du state pour le type d'annonce
  const [typeAnnonce, setTypeAnnonce] = useState<string>("");

  // Ajout du state pour la superficie
  const [superficie, setSuperficie] = useState("");

  // Ajout du state pour le nombre d'étage (Immeuble)
  const [nombreEtage, setNombreEtage] = useState("");

  // Effet pour charger les propriétés enfants quand la catégorie change
  useEffect(() => {
    if (selectedCategory && selectedCategory.id) {
      fetch(`https://api.bajorah.com/api/v1/properties?category_id=${selectedCategory.id}`)
        .then(res => res.json())
        .then(res => {
          if (res && res.data && Array.isArray(res.data)) {
            setChildProperties(res.data);
          } else {
            setChildProperties([]);
          }
          setSelectedChildProperty(null); // Réinitialise la sélection à chaque changement de catégorie
        })
        .catch(() => {
          setChildProperties([]);
          setSelectedChildProperty(null);
        });
    } else {
      setChildProperties([]);
      setSelectedChildProperty(null);
    }
  }, [selectedCategory]);

  const { register, handleSubmit, watch, setValue, reset } = useForm<SearchFormData>({
    defaultValues: {
      searchText: '',
      propertyType: '',
      city: '',
      district: ''
    }
  });

  // Charger les catégories au montage du composant
  useEffect(() => {
    fetchCategories();
  }, []);

  // URL de base de l'API
  const API_BASE_URL = 'https://api.bajorah.com';

                  const fetchCategories = async () => {
                  try {
                    const response = await fetch(`${API_BASE_URL}/api/v1/categories`);
                    const data = await response.json();
                    if (data.success) {
                      // Filtrer les catégories pour exclure "Appartement", "Autre bien immobilier" et "Salle d'évènement"
                      const filteredCategories = data.data
                        .filter((cat: any) => cat.name !== "Appartement" && cat.name !== "Autre bien immobilier" && cat.name !== "Salle d'évenement");
                      
                      // Définir l'ordre souhaité des catégories
                      const categoryOrder = ["Maison", "Terrain", "Résidence", "Hôtel", "Magasin", "Bureau", "Espace"];
                      
                      // Trier les catégories selon l'ordre défini
                      const categoryOptions = filteredCategories
                        .sort((a: any, b: any) => {
                          const indexA = categoryOrder.indexOf(a.name);
                          const indexB = categoryOrder.indexOf(b.name);
                          return indexA - indexB;
                        })
                        .map((cat: any) => ({ id: cat.id.toString(), name: cat.name, slug: cat.slug }));
                      
                      setCategories(categoryOptions);
                      setSelectedCategory(categoryOptions[0] || { id: '', name: '' });
                    }
                  } catch (error) {
                    console.error('Erreur lors du chargement des catégories:', error);
                    setCategories([]);
                    setSelectedCategory({ id: '', name: '' });
                  }
                };

  const onSubmit = (data: SearchFormData) => {
    console.log('>>> onSubmit AdvancedSearch appelé', data);
    // Construire les paramètres de recherche
    const searchParams = new URLSearchParams();
    
    let subCategoryName = '';
    if (selectedCategory.name === RESIDENCE_KEY && selectedChildProperty) {
      const selectedChild = CATEGORIES_SUB.find(child => child.id === selectedChildProperty);
      if (selectedChild && selectedChild.name) {
        subCategoryName = selectedChild.name;
      }
      // Si Villa, ajouter le nombre de pièces si renseigné
      if (selectedChild && selectedChild.name.toLowerCase().includes('villa') && villaRooms) {
        searchParams.append('rooms', villaRooms);
      }
    }
    
    // Gérer le cas Immeuble pour Maison
    if (selectedCategory.name === "Maison" && selectedChildProperty === 9999) {
      subCategoryName = "Immeuble";
      // Ajouter le nombre d'étage si renseigné
      if (nombreEtage) {
        searchParams.append('nombre_etage', nombreEtage);
      }
    }

    // Gérer les valeurs de commune (normale ou personnalisée)
    let communeValue = selectedCommuneName;
    let communeId = selectedCommuneId;
    if (selectedCommuneName === "Autre" && customCommune.trim()) {
      communeValue = customCommune.trim();
      communeId = ""; // Pas d'ID pour une commune personnalisée
    }

    // Gérer les valeurs de ville Terrain (normale ou personnalisée)
    let villeTerrainValue = villeTerrain;
    if (villeTerrain === "Autre ville" && customVilleTerrain.trim()) {
      villeTerrainValue = customVilleTerrain.trim();
    }

    // Ajout des slugs et type dans l'URL
    if (selectedCategory.slug) {
      searchParams.append('category_slug', selectedCategory.slug.toLowerCase());
      searchParams.append('category_slug_selected', selectedCategory.slug.toLowerCase());
    }
    if (selectedCategory.name === RESIDENCE_KEY) {
      searchParams.append('type', 'RESERVATION');
    }
    if (subCategoryName) {
      searchParams.append('home_type', subCategoryName);
    }
    if (data.searchText.trim()) {
      searchParams.append('searchText', data.searchText.trim());
    }
    if (communeId && communeId !== "" && communeValue !== "Autre") {
      searchParams.append('location', communeId);
      
      // Si un quartier est saisi, l'ajouter pour la recherche partielle
      const districtValue = selectedDistrict.trim();
      if (districtValue) {
        searchParams.append('location_description', districtValue);
        console.log(`🔍 Recherche: Commune ID "${communeId}" (${communeValue}) + Quartier "${districtValue}" (recherche partielle)`);
      }
    } else if (selectedDistrict.trim()) {
      // Si seulement le quartier est saisi (sans commune)
      searchParams.append('location_description', selectedDistrict.trim());
      console.log(`🔍 Recherche: Quartier uniquement "${selectedDistrict.trim()}" (recherche partielle)`);
    }
    if (villeTerrainValue && villeTerrainValue !== "Autre ville") {
      searchParams.append('location', villeTerrainValue);
    }
    // Rediriger vers la page de résultats avec les paramètres
    const url = route('annonces') + (searchParams.toString() ? '?' + searchParams.toString() : '');
    console.log('>>> url', url);
    history.push(url);
    // Déclencher la recherche
    const params: IGetSearchPropertiesParams = {
      searchText: data.searchText.trim() || undefined,
      category_slug: selectedCategory.slug ? selectedCategory.slug.toLowerCase() : undefined,
      category_slug_selected: selectedCategory.slug ? selectedCategory.slug.toLowerCase() : undefined,
      home_type: subCategoryName || undefined,
      type: selectedCategory.name === RESIDENCE_KEY ? 'RESERVATION' : undefined,
      location: communeId && communeId !== "" && communeValue !== "Autre" ? communeId : (villeTerrainValue && villeTerrainValue !== "Autre ville" ? villeTerrainValue : undefined),
      location_description: (() => {
        const districtValue = selectedDistrict.trim();
        if (districtValue) {
          return districtValue; // Recherche partielle insensible à la casse
        }
        return undefined;
      })(),
    };
    console.log('Params envoyés à l’API:', params);
    dispatch(fetchAllProperties(params));
    if (onClose) onClose();
  };

  const clearForm = () => {
    reset();
    setSelectedCategory({ id: '', name: 'Tous les types de biens' });
    setSelectedCommuneId("");
    setSelectedCommuneName("");
    setSelectedDistrict("");
    setShowCustomCommune(false);
    setCustomCommune("");
    setShowCustomVilleTerrain(false);
    setCustomVilleTerrain("");
    setVilleTerrain("");
    setNombreEtage("");
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
                      active ? 'text-neutral-900 bg-primary-100' : 'text-neutral-900 dark:text-neutral-100'
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

  // Trouver l'objet enfant sélectionné
  const selectedChild = childProperties.find(child => child.id === selectedChildProperty);
// Trouver l'id de l'enfant 'Villa' dans la liste
const villaChild = childProperties.find(child => child.title && child.title.trim().toLowerCase() === "villa");

  const [communes, setCommunes] = useState<{id: number, name: string}[]>([]);
  const [villeTerrain, setVilleTerrain] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/v1/locations`)
      .then(res => res.json())
      .then(res => {
        if (res && res.success && Array.isArray(res.data)) {
          setCommunes(res.data.map((c: any) => ({ id: c.id, name: c.name })));
        }
      });
  }, []);

  const [selectedMagasinSubCategory, setSelectedMagasinSubCategory] = useState("");
  const MAGASIN_SUBCATEGORIES = [
    "Magasin standard",
    "Grand magasin espacé",
    "Magasin en mezzanie",
    "Entrepôt"
  ];

  const [selectedBureauSubCategory, setSelectedBureauSubCategory] = useState("");
  const [bureauRadio, setBureauRadio] = useState<{[key: string]: string}>({});
  const handleSelectBureauRadio = (subValue: string, item: string) => {
    setBureauRadio(prev => ({ ...prev, [subValue]: item }));
  };
  const BUREAU_SUBCATEGORIES = [
    { label: "Bureau privé", value: "Bureau privé", description: "Intimité, Personnalisation, Confidentialité" },
    { label: "Open-space", value: "Open-space", description: "Collaboration, Flexibilité, Economie" },
    { label: "Espace co-working", value: "Espace co-working", description: "Flexibilité, Réseaux, Coût partagé" },
    { label: "Bureau mixte", value: "Bureau mixte", description: "Equilibre, Adaptabilité, Bien-être" },
  ];
  const ESPACE_SUBCATEGORIES = [
    { label: "Salle de réunion", value: "Salle de réunion", description: "Espace dédiés aux réunions, Formation, travail" },
    { label: "Espaces évenementiels", value: "Espaces évenementiels", description: "Salles ou lieux adaptés pour l'organisation de conférence, Séminaire, Mariage, Baptême, Anniversaire" },
  ];
  const [selectedEspaceSubCategory, setSelectedEspaceSubCategory] = useState("");
  const [espaceRadio, setEspaceRadio] = useState<{[key: string]: string}>({});
  const handleSelectEspaceRadio = (subValue: string, item: string) => {
    setEspaceRadio(prev => ({ ...prev, [subValue]: item }));
  };

  return (
    <div className={`w-full max-w-xs mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-4 sm:p-6 ${className}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
          Recherche avancée
        </div>
        
        {/* Type de bien */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Vous recherchez !
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full border transition-colors
                  ${selectedCategory.id === cat.id
                    ? 'bg-primary-100 text-neutral-900 border-primary-400'
                    : 'bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-gray-300 dark:border-gray-600 hover:bg-primary-100 hover:border-primary-400'}
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>
        


          {/* Affichage temporaire du titre de l'enfant sélectionné pour debug */}
          {selectedChild && (
            <div className="mt-2 text-xs text-gray-500">Titre sélectionné : "{selectedChild.title}"</div>
          )}

          {/* Section enfants dynamiques (propriétés) pour Maison */}
          {selectedCategory && selectedCategory.name === "Maison" && (
            <>
              <div className="mt-4">
                <label className="mt-4 text-primary-700 font-semibold text-base mb-2">
                  Type d'annonce
                </label>
                <div className="flex gap-6 mt-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="typeAnnonce"
                      value="louer"
                      checked={typeAnnonce === "louer"}
                      onChange={() => {
                        setTypeAnnonce("louer");
                        setSelectedChildProperty(null); // Réinitialiser la sélection des sous-catégories
                      }}
                      className="form-radio h-4 w-4 text-primary-600"
                    />
                    <span className="ml-2">A louer</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="typeAnnonce"
                      value="vendre"
                      checked={typeAnnonce === "vendre"}
                      onChange={() => {
                        setTypeAnnonce("vendre");
                        setSelectedChildProperty(null); // Réinitialiser la sélection des sous-catégories
                      }}
                      className="form-radio h-4 w-4 text-primary-600"
                    />
                    <span className="ml-2">A vendre</span>
                  </label>
                </div>
              </div>
                              {(typeAnnonce === "vendre" || typeAnnonce === "louer") && (
          <>
            <div className="mt-4 text-primary-700 font-semibold text-base">
              Quel type de {selectedCategory.name}&nbsp;?
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {typeAnnonce === "vendre" && CATEGORIES_SUB.filter(child =>
                child.allow &&
                child.allow.includes("Maison") &&
                ["Appartement", "Villa", "Duplex", "Triplex"].includes(child.name)
              ).map((child) => (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => setSelectedChildProperty(child.id)}
                  className={`px-4 py-2 rounded-full border transition-colors
                    ${selectedChildProperty === child.id
                      ? 'bg-primary-100 text-neutral-900 border-primary-400'
                      : 'bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-gray-300 dark:border-gray-600 hover:bg-primary-100 hover:border-primary-400'}`}
                  style={selectedChildProperty === child.id ? { backgroundColor: '#FFE5D0', color: '#1A202C', borderColor: '#FDBA74' } : {}}
                >
                  {child.name}
                </button>
              ))}
              {typeAnnonce === "vendre" && (
                <button
                  key="immeuble"
                  type="button"
                  onClick={() => setSelectedChildProperty(9999)} // ID spécial pour Immeuble
                  className={`px-4 py-2 rounded-full border transition-colors
                    ${selectedChildProperty === 9999
                      ? 'bg-primary-100 text-neutral-900 border-primary-400'
                      : 'bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-gray-300 dark:border-gray-600 hover:bg-primary-100 hover:border-primary-400'}`}
                  style={selectedChildProperty === 9999 ? { backgroundColor: '#FFE5D0', color: '#1A202C', borderColor: '#FDBA74' } : {}}
                >
                  Immeuble
                </button>
              )}
              {typeAnnonce === "louer" && CATEGORIES_SUB.filter(child =>
                child.allow &&
                child.allow.includes("Maison") &&
                child.name !== "Immeuble" // Exclure l'Immeuble pour la location
              ).map((child) => (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => setSelectedChildProperty(child.id)}
                  className={`px-4 py-2 rounded-full border transition-colors
                    ${selectedChildProperty === child.id
                      ? 'bg-primary-100 text-neutral-900 border-primary-400'
                      : 'bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-gray-300 dark:border-gray-600 hover:bg-primary-100 hover:border-primary-400'}`}
                  style={selectedChildProperty === child.id ? { backgroundColor: '#FFE5D0', color: '#1A202C', borderColor: '#FDBA74' } : {}}
                >
                  {child.name}
                </button>
              ))}
            </div>
          </>
        )}
            </>
          )}

          {/* Section enfants dynamiques (propriétés) pour Résidence */}
          {selectedCategory && selectedCategory.name === RESIDENCE_KEY && (
            <>
              <div className="mt-4 text-primary-700 font-semibold text-base">
                Quel type de {selectedCategory.name}&nbsp;?
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {CATEGORIES_SUB.filter(child => child.allow && child.allow.includes(RESIDENCE_KEY)).map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => setSelectedChildProperty(child.id)}
                    className={`px-4 py-2 rounded-full border transition-colors
                      ${selectedChildProperty === child.id
                        ? 'bg-primary-100 text-neutral-900 border-primary-400'
                        : 'bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-gray-300 dark:border-gray-600 hover:bg-primary-100 hover:border-primary-400'}
                    `}
                    style={selectedChildProperty === child.id ? { backgroundColor: '#FFE5D0', color: '#1A202C', borderColor: '#FDBA74' } : {}}
                  >
                    {child.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Section enfants dynamiques (propriétés) pour Hôtel */}
          {selectedCategory && selectedCategory.name === "Hôtel" && (
            <>
              <div className="mt-4 text-primary-700 font-semibold text-base">
                Quel type de {selectedCategory.name}&nbsp;?
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {CATEGORIES_SUB.filter(child => child.allow && child.allow.includes("Hôtel")).map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => setSelectedChildProperty(child.id)}
                    className={`px-4 py-2 rounded-full border transition-colors
                      ${selectedChildProperty === child.id
                        ? 'bg-primary-100 text-neutral-900 border-primary-400'
                        : 'bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-gray-300 dark:border-gray-600 hover:bg-primary-100 hover:border-primary-400'}
                    `}
                    style={selectedChildProperty === child.id ? { backgroundColor: '#FFE5D0', color: '#1A202C', borderColor: '#FDBA74' } : {}}
                  >
                    {child.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Section enfants dynamiques (propriétés) pour Bureau (statique, select + description) */}
          {selectedCategory && selectedCategory.name === "Bureau" && (
            <>
              <div className="mt-4 text-primary-700 font-semibold text-base text-center">
                {selectedBureauSubCategory || "Quel type de Bureau ?"}
              </div>
              <div className="mt-2">
                <select
                  className="w-full h-8 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-primary-400"
                  value={selectedBureauSubCategory}
                  onChange={e => setSelectedBureauSubCategory(e.target.value)}
                >
                  <option value="">Sélectionner un type</option>
                  {BUREAU_SUBCATEGORIES.map((sub) => (
                    <option key={sub.value} value={sub.value}>{sub.label}</option>
                  ))}
                </select>
                {selectedBureauSubCategory && (
                   <div className="flex flex-wrap gap-3 justify-center mt-4">
                     {BUREAU_SUBCATEGORIES.find(sub => sub.value === selectedBureauSubCategory)?.description
                       .split(',')
                       .map((item, idx) => {
                         const trimmed = item.trim();
                         return (
                           <label key={idx} className={`inline-flex items-center gap-2 px-3 py-2 border rounded cursor-pointer transition-colors bg-gray-50 dark:bg-neutral-800 hover:bg-primary-100 ${bureauRadio[selectedBureauSubCategory] === trimmed ? 'border-primary-400 bg-primary-50' : ''}`}>
                             <input
                               type="radio"
                               name={`bureau-radio-${selectedBureauSubCategory}`}
                               checked={bureauRadio[selectedBureauSubCategory] === trimmed}
                               onChange={() => handleSelectBureauRadio(selectedBureauSubCategory, trimmed)}
                               className="form-radio text-primary-600"
                             />
                             <span className="text-sm">{trimmed}</span>
                           </label>
                         );
                       })}
                   </div>
                  )}
              </div>
            </>
          )}

          {/* Section enfants dynamiques (propriétés) pour Magasin (statique, select) */}
          {selectedCategory && selectedCategory.name === "Magasin" && (
            <>
              <div className="mt-4 text-primary-700 font-semibold text-base">
                Quel type de {selectedCategory.name}&nbsp;?
              </div>
              <div className="mt-2">
                <select
                  className="w-full h-8 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-primary-400"
                  value={selectedMagasinSubCategory}
                  onChange={e => setSelectedMagasinSubCategory(e.target.value)}
                >
                  <option value="">Sélectionner un type</option>
                  {MAGASIN_SUBCATEGORIES.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Section enfants dynamiques (propriétés) pour Espace (statique, select + radio) */}
         {selectedCategory && selectedCategory.name === "Espace" && (
           <>
             <div className="mt-4 text-primary-700 font-semibold text-base text-center">
               {selectedEspaceSubCategory || "Quel type d'Espace ?"}
             </div>
             <div className="mt-2">
               <select
                 className="w-full h-8 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-primary-400"
                 value={selectedEspaceSubCategory}
                 onChange={e => setSelectedEspaceSubCategory(e.target.value)}
               >
                 <option value="">Sélectionner un type</option>
                 {ESPACE_SUBCATEGORIES.map((sub) => (
                   <option key={sub.value} value={sub.value}>{sub.label}</option>
                 ))}
               </select>
               {selectedEspaceSubCategory && (
                 <div className="flex flex-wrap gap-3 justify-center mt-4">
                   {ESPACE_SUBCATEGORIES.find(sub => sub.value === selectedEspaceSubCategory)?.description
                     .split(',')
                     .map((item, idx) => {
                       const trimmed = item.trim();
                       return (
                         <label key={idx} className={`inline-flex items-center gap-2 px-3 py-2 border rounded cursor-pointer transition-colors bg-gray-50 dark:bg-neutral-800 hover:bg-primary-100 ${espaceRadio[selectedEspaceSubCategory] === trimmed ? 'border-primary-400 bg-primary-50' : ''}`}>
                           <input
                             type="radio"
                             name={`espace-radio-${selectedEspaceSubCategory}`}
                             checked={espaceRadio[selectedEspaceSubCategory] === trimmed}
                             onChange={() => handleSelectEspaceRadio(selectedEspaceSubCategory, trimmed)}
                             className="form-radio text-primary-600"
                           />
                           <span className="text-sm">{trimmed}</span>
                         </label>
                       );
                     })}
                 </div>
               )}
             </div>
           </>
         )}

          {/* Section nombre de pièces si Villa sélectionné (par nom) OU sous-catégories Maison spécifiques */}
          {selectedCategory && selectedChildProperty && (() => {
            const selectedChild = CATEGORIES_SUB.find(child => child.id === selectedChildProperty);
            if (!selectedChild || !selectedChild.name) return false;
            
            const childName = selectedChild.name.toLowerCase();
            
            // Villa sous Résidence
            if (selectedCategory.name === RESIDENCE_KEY && childName.includes("villa")) {
              return true;
            }
            
            // Sous-catégories Maison spécifiques
            if (selectedCategory.name === "Maison" && ["appartement", "villa", "duplex", "triplex"].includes(childName)) {
              return true;
            }
            
            return false;
          })() && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Nombre de pièces
              </label>
              <div className="flex flex-wrap justify-center gap-2 max-w-[240px] mx-auto">
                {["2", "3", "4", "5", "6", "7", "8+"].map((nb) => (
                  <button
                    key={nb}
                    type="button"
                    onClick={() => setVillaRooms(nb)}
                    className={`px-3 py-1 rounded-full border transition-colors text-base flex-1 min-w-[60px] max-w-[70px] ${villaRooms === nb ? 'bg-primary-100 text-neutral-900 border-primary-400' : 'bg-gray-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-gray-300 dark:border-gray-600 hover:bg-primary-100 hover:border-primary-400'}`}
                  >
                    {nb}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section nombre d'étage si Immeuble sélectionné */}
          {selectedCategory && selectedCategory.name === "Maison" && selectedChildProperty === 9999 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Nombre d'étage
              </label>
              <input
                type="number"
                min="1"
                className="w-full h-8 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-primary-400"
                placeholder="Entrez le nombre d'étage"
                value={nombreEtage}
                onChange={e => setNombreEtage(e.target.value)}
              />
            </div>
          )}

                          {/* Section communes et quartier pour Maison, Hôtel, Magasin, Bureau, Résidence, Espace */}
                {(
                  (selectedCategory && selectedCategory.name === "Maison") ||
                  (selectedCategory && selectedCategory.name === "Hôtel") ||
                  (selectedCategory && selectedCategory.name === "Magasin") ||
                  (selectedCategory && selectedCategory.name === "Bureau") ||
                  (selectedCategory && selectedCategory.name === "Espace") ||
                  // Pour tous les items de Résidence
                  (selectedCategory && selectedCategory.name === RESIDENCE_KEY)
                ) && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Dans quelle commune ?
              </label>
              <select
                className="w-full h-8 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-primary-400"
                value={selectedCommuneName}
                onChange={e => {
                  setSelectedCommuneName(e.target.value);
                  if (e.target.value === "Autre") {
                    setSelectedCommuneId("");
                    setShowCustomCommune(true);
                    setCustomCommune("");
                  } else {
                    // Trouver l'ID de la commune sélectionnée
                    const selectedCommune = communes.find(city => city.name === e.target.value);
                    setSelectedCommuneId(selectedCommune ? selectedCommune.id.toString() : "");
                    setShowCustomCommune(false);
                    setCustomCommune("");
                  }
                }}
              >
                <option value="">Sélectionner une commune</option>
                {communes.map(city => (
                  <option key={city.id} value={city.name}>{city.name}</option>
                ))}
                <option value="Autre">Autre</option>
              </select>
              
              {/* Champ de saisie pour commune personnalisée */}
              {showCustomCommune && (
                <div className="mt-2">
                  <input
                    type="text"
                    className="w-full h-8 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-primary-400"
                    placeholder="Entrez le nom de la commune"
                    value={customCommune}
                    onChange={e => setCustomCommune(e.target.value)}
                  />
                </div>
              )}
              
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-4 mb-2">
                Quartier
              </label>
              <input
                type="text"
                className="w-full h-8 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-primary-400"
                placeholder="Entrez le nom du quartier"
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
              />
            </div>
          )}

          {/* Section superficie pour Terrain */}
          {selectedCategory && selectedCategory.name === "Terrain" && (
            <>
              <div className="mt-4">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Superficie (m²)
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full h-8 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-primary-400"
                  placeholder="Entrez la superficie"
                  value={superficie}
                  onChange={e => setSuperficie(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Ville
                </label>
                <select
                  className="w-full h-8 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-primary-400"
                  value={villeTerrain}
                  onChange={e => {
                    setVilleTerrain(e.target.value);
                    if (e.target.value === "Autre ville") {
                      setShowCustomVilleTerrain(true);
                      setCustomVilleTerrain("");
                    } else {
                      setShowCustomVilleTerrain(false);
                      setCustomVilleTerrain("");
                    }
                  }}
                >
                  <option value="">Sélectionner une ville</option>
                  <option value="Abidjan">Abidjan</option>
                  <option value="Aux alentours d'abidjan">Aux alentours d'abidjan</option>
                  <option value="Yamoussoukro">Yamoussoukro</option>
                  <option value="Autre ville">Autre ville</option>
                </select>
                
                {/* Champ de saisie pour ville personnalisée */}
                {showCustomVilleTerrain && (
                  <div className="mt-2">
                    <input
                      type="text"
                      className="w-full h-8 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-primary-400"
                      placeholder="Entrez le nom de la ville"
                      value={customVilleTerrain}
                      onChange={e => setCustomVilleTerrain(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </>
          )}

        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col gap-2 pt-4 w-full">
          <Button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Rechercher
          </Button>
          <Button
            type="button"
            onClick={clearForm}
            className="w-full border border-gray-300 text-neutral-700 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            Effacer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdvancedSearch; 