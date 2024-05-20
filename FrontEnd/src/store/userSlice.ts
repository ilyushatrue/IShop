import { createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./types";
import { userApi } from "../api/userApi";
import { RootState } from "./store";

const initialState: IUserState = {
	isAuthenticated: false,
	user: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: () => initialState,
		resetUser: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				userApi.endpoints.loginByEmail.matchFulfilled,
				(state, action) => {
					state.user = action.payload;
					state.isAuthenticated = true;
				}
			)
			.addMatcher(
				userApi.endpoints.loginByPhone.matchFulfilled,
				(state, action) => {
					state.user = action.payload;
					state.isAuthenticated = true;
				}
			)
			.addMatcher(
				userApi.endpoints.current.matchFulfilled,
				(state, action) => {
					state.isAuthenticated = true;
					state.user = action.payload;
				}
			)
			.addMatcher(
				userApi.endpoints.getUserById.matchFulfilled,
				(state, action) => {
					state.user = action.payload;
				}
			);
	},
});

export const { logout, resetUser } = userSlice.actions;

export default userSlice.reducer;

export function selectIsAuthenticated(state: RootState) {
	return state.user.isAuthenticated;
}

export function selectCurrent(state: RootState) {
	return state.user.user;
}

export function selectUser(state: RootState) {
	return state.user.user;
}