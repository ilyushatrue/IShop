import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGlobalState } from "./types";

const initialState: IGlobalState = {
	productCategories: [],
	menuItems: [],
	searchValue: "",
};

const globalSlice = createSlice({
	initialState: initialState,
	name: "global",
	reducers: {
		setInitialAppState: (state, action: PayloadAction<IGlobalState>) => {
			const { menuItems, productCategories } = action.payload;
			state.productCategories = productCategories;
			state.menuItems = menuItems;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
	},
});

export const { setInitialAppState, setSearchValue } = globalSlice.actions;
export default globalSlice.reducer;
