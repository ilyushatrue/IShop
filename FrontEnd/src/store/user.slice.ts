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
		updateCurrentUserState: (state, action: PayloadAction<IUserState>) => {
			state.isAuthenticated = action.payload.isAuthenticated;
			state.user = action.payload.user;
		},
		resetCurrentUserState: (state) => (state = initialState),
	},
});

export const { updateCurrentUserState, resetCurrentUserState } = userSlice.actions;
export default userSlice.reducer;
