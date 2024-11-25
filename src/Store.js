import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./Slice";

export const store = configureStore({
	reducer: {
		country: countryReducer,
	},
});
