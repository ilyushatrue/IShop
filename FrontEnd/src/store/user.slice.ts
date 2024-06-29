import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./types";

const initialState: IUserState = {
	isAuthenticated: false,
	user: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUserData: (state, action: PayloadAction<IUserState>) => {
			state.isAuthenticated = action.payload.isAuthenticated;
			state.user = action.payload.user;
		},
		resetState: (state) => (state = initialState),
	},
});

export const { updateUserData } = userSlice.actions;
export default userSlice.reducer;
