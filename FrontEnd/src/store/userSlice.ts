import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./types";
import { RootState } from "./store";
import { ILoginByEmailRequest } from "../api/contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "../api/contracts/authentication/login-by-phone-request.interface";
import { IRegisterRequest } from "../api/contracts/authentication/register-request.interface";
import apiAuth from "../api/api.auth";
import apiUsers from "../api/api.user";

export const loginByPhone = createAsyncThunk(
	"auth/login-by-phone",
	async (request: ILoginByPhoneRequest) => await apiAuth.loginByPhoneAsync(request));
export const loginByEmail = createAsyncThunk(
	"auth/login-by-email",
	async (request: ILoginByEmailRequest) => await apiAuth.loginByEmailAsync(request));

export const register = createAsyncThunk(
	"auth/register",
	async (request: IRegisterRequest) => await apiAuth.registerAsync(request));

export const getCurrent = createAsyncThunk(
	"users/current",
	async () => await apiUsers.getCurrentAsync());

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
				state.isLoading = false;
				state.user = action.payload ?? null;
				state.isAuthenticated = true;
			})
			.addCase(loginByEmail.rejected, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
				console.error(action.error.message)
			})
			.addCase(loginByPhone.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginByPhone.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload ?? null;
				state.isAuthenticated = true;
			})
			.addCase(loginByPhone.rejected, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
				console.error(action.error.message)
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload ?? null;
				state.isAuthenticated = true;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
				console.error(action.error.message)
			})
			.addCase(getCurrent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCurrent.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload ?? null;
				state.isAuthenticated = true;
			})
			.addCase(getCurrent.rejected, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
				console.error(action.error.message)
			})
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
