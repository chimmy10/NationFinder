import { createSlice } from "@reduxjs/toolkit";
import data from "./data.json";

const initialState = {
	searchTerm: "",
	countries: data,
	regions: "Filter by Region",
	selected: null,
	isDarkMode: false, // Add a state for dark mode
};

const countrySlice = createSlice({
	name: "country",
	initialState,
	reducers: {
		search(state) {
			state.searchTerm = "";
		},
		setSearchTerm(state, action) {
			state.searchTerm =
				typeof action.payload === "string" ? action.payload : "";
		},
		setRegion(state, action) {
			state.regions = action.payload;
		},
		clickCountry(state, action) {
			state.selected = action.payload;
		},
		goBack(state) {
			state.selected = null;
		},
		toggleTheme(state) {
			state.isDarkMode = !state.isDarkMode; // Toggle the theme
		},
	},
});

export const {
	search,
	setSearchTerm,
	setRegion,
	clickCountry,
	goBack,
	toggleTheme,
} = countrySlice.actions;

export default countrySlice.reducer;
