import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGlobalState } from "./types";

const initialState: IGlobalState = {
	productCategories: [],
}

const globalSlice = createSlice({
	initialState: initialState, name: "global", reducers: {
		setInitialAppState: (state, action: PayloadAction<IGlobalState>) => {
			state.productCategories = action.payload.productCategories
		}
	}
})

export const { setInitialAppState } = globalSlice.actions;
export default globalSlice.reducer;