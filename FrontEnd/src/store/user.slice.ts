import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./types";
import { IProduct } from "../api/interfaces/product/product.interface";

const initialState: IUserState = {
	isAuthenticated: false,
	favoriteProducts: [],
	avatarId: null,
	email: null,
	firstName: null,
	lastName: null,
	phone: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateCurrentUserState: (state, action: PayloadAction<IUserState>) => {
			state.isAuthenticated = action.payload.isAuthenticated;
			state.avatarId = action.payload.avatarId;
			state.email = action.payload.email;
			state.firstName = action.payload.firstName;
			state.lastName = action.payload.lastName;
			state.phone = action.payload.phone;
			state.favoriteProducts = action.payload.favoriteProducts
		},
		resetCurrentUserState: (state) => (state = initialState),
		setFavoriteProduct: (state, action: PayloadAction<{ product: IProduct, value: boolean }>) => {
			const { product, value } = action.payload;
			if (value) {
				state.favoriteProducts.push(product)
			} else {
				state.favoriteProducts = state.favoriteProducts.filter(fp => fp.id !== product.id)
			}
		}
	},
});

export const { updateCurrentUserState, resetCurrentUserState, setFavoriteProduct } = userSlice.actions;
export default userSlice.reducer;
