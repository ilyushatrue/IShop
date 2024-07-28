import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGlobalState } from "./types";

const initialState: IGlobalState = {
	productCategories: [],
	menuItems: []
}

const globalSlice = createSlice({
	initialState: initialState, name: "global", reducers: {
		setInitialAppState: (state, action: PayloadAction<IGlobalState>) => {
			const { menuItems, productCategories } = action.payload;
			state.productCategories = productCategories
			state.menuItems = menuItems
		}
	}
})

export const { setInitialAppState } = globalSlice.actions;
export default globalSlice.reducer;