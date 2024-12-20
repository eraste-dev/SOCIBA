import { LANG_FR } from "./fr";

export interface ISupportedLanguage {
	code: string;
	name: string;
	countryCode: string;
	selected: boolean;
	flag: string;
}

export const languagesSupported: ISupportedLanguage[] = [
	{ code: "fr", name: "Français", countryCode: "FR", selected: true, flag: "" },
	{ code: "en", name: "English", countryCode: "EN", selected: false, flag: "" },
];

export const LANG: "en" | "fr" = "fr";

/**
 * Retrieves the translation for a given key.
 *
 * @param {string} key - The key to be translated.
 * @return {string} The translation for the given key, or an empty string if no translation is found.
 */

export const __ = (key: string): string => {
	const translation = findTranslationKey(key, LANG_FR);

	if (translation !== undefined) {
		console.log(`Traduction de ${key} : ${translation}`);
	} else {
		console.error(`Clé de traduction ${key} non trouvée`);
	}

	return translation || "";
};

/**
 * Returns the language data based on the provided language code.
 *
 * @param {string} lang - The language code to determine the language data.
 * @return {Itranslation} The language data corresponding to the provided language code.
 */
const getLanguageData = (lang: string): Itranslation => {
	return lang === "en" ? LANG_FR : LANG_FR;
};

export function findTranslationKey<T extends object>(key: string, translationObject: T): string | undefined {
	// Séparez la clé en parties basées sur la notation pointée
	const keys = key.split(".");

	// Recherchez la traduction en naviguant à travers l'objet de traduction
	let translation: any = translationObject;
	for (const k of keys) {
		if (translation[k] === undefined) {
			return undefined; // La clé de traduction n'existe pas
		}
		translation = translation[k];
	}

	// Retournez la traduction trouvée
	return translation;
}

export interface Itranslation {
	auth: {
		login: string;
	};
	real_estate: {
		publish: string;
	};
}
