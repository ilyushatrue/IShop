import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./types";
import { RootState } from "./store";
import { ILoginByEmailRequest } from "../api/contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "../api/contracts/authentication/login-by-phone-request.interface";
import { userApi } from "../api/userApi";
import apiUser from "../api/api.user";
import api from "../api/apiAccessor";

export const loginByPhone = createAsyncThunk(
	"user/login-by-phone",
	async (request: ILoginByPhoneRequest) => {
		return await apiUser.loginByPhoneAsync(request);
	}
);
export const loginByEmail = createAsyncThunk(
	"user/login-by-email",
	async (request: ILoginByEmailRequest) => {
		return await apiUser.loginByEmailAsync(request);
	}
);

const initialState: IUserState = {
	isAuthenticated: false,
	isLoading: false,
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
			.addCase(loginByEmail.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginByEmail.fulfilled, (state, action) => {
				state.isLoading = false,
					state.user = action.payload,
					state.isAuthenticated = !!action.payload;
			});
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
