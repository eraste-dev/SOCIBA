import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/reducer/store";

interface DarkModeState {
	isDarkMode: boolean;
	isSidebarOpen: boolean;
}

const initialState: DarkModeState = {
	isDarkMode: false,
	isSidebarOpen: false, // Initialize sidebar state
};

export const darkmodeSlice = createSlice({
	name: "darkmode",
	initialState,
	reducers: {
		toogleDarkMode: (state) => ({ ...state, isDarkMode: !state.isDarkMode }),
		enableDarkMode: (state) => ({ ...state, isDarkMode: true }),
		disableDarkMode: (state) => ({ ...state, isDarkMode: false }),

		// Sidebar actions
		toggleSidebar: (state) => ({ ...state, isSidebarOpen: !state.isSidebarOpen }),
		openSidebar: (state) => ({ ...state, isSidebarOpen: true }),
		closeSidebar: (state) => ({ ...state, isSidebarOpen: false }),
	},
});

export const {
	toogleDarkMode,
	enableDarkMode,
	disableDarkMode,
	toggleSidebar,
	openSidebar,
	closeSidebar,
} = darkmodeSlice.actions;

export const selectDarkmodeState = (state: RootState) => state.darkmode.isDarkMode;
export const selectSidebarState = (state: RootState) => state.darkmode.isSidebarOpen;

export default darkmodeSlice.reducer;
