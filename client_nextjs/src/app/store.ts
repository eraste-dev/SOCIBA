import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import rootReducers from "./rootReducers";

const isDev = process.env.NODE_ENV === "development";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["darkmode", "auth"], // Liste des reducers à persister
};

const rootReducer = combineReducers(rootReducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Ajouter le middleware de logger si en mode développement
const middlewareLogger = isDev ? [logger] : [];

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false, // Désactiver la vérification de la sérialisation
		}).concat(middlewareLogger),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
