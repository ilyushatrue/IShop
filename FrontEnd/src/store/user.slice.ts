import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./types";

const initialState: IUserState = {
	isAuthenticated: false,
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
		},
		resetCurrentUserState: (state) => (state = initialState),
	},
});

export const { updateCurrentUserState, resetCurrentUserState } = userSlice.actions;
export default userSlice.reducer;
