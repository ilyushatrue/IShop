import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./types";
import { ILoginByEmailRequest } from "../api/contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "../api/contracts/authentication/login-by-phone-request.interface";
import { IRegisterRequest } from "../api/contracts/authentication/register-request.interface";
import apiAuth from "../api/auth.api";
import usersApi from "../api/users.api";

export const loginByPhoneAsync = createAsyncThunk(
	"/auth/login-by-phone",
	async (request: ILoginByPhoneRequest) =>
		await apiAuth.loginByPhoneAsync(request)
);
export const loginByEmailAsync = createAsyncThunk(
	"/auth/login-by-email",
	async (request: ILoginByEmailRequest) =>
		await apiAuth.loginByEmailAsync(request)
);

export const registerAsync = createAsyncThunk(
	"/auth/register",
	async (request: IRegisterRequest) => await apiAuth.registerAsync(request)
);

export const logoutAsync = createAsyncThunk(
	"/auth/logout",
	apiAuth.logoutAsync
);

export const getCurrentAsync = createAsyncThunk(
	"/users/current",
	usersApi.getCurrentAsync
);

const initialState: IUserState = {
	isAuthenticated: false,
	isLoading: false,
	user: null,
	error: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginByEmailAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginByEmailAsync.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(loginByEmailAsync.rejected, (state) => {
				state.error = "Ошибка";
			})
			.addCase(loginByPhoneAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginByPhoneAsync.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(loginByPhoneAsync.rejected, (state) => {
				state.error = "Ошибка";
			})
			.addCase(registerAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCurrentAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCurrentAsync.fulfilled, (state, action) => {
				console.log(action);
				state.isLoading = false;
				state.user = action.payload.ok
					? action.payload.body ?? null
					: null;
				state.isAuthenticated = !!action.payload.ok;
			})
			.addCase(getCurrentAsync.rejected, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
				state.error = "Owibka";
				console.error(action.error.message);
			})
			.addCase(logoutAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logoutAsync.fulfilled, () => initialState)
			.addCase(logoutAsync.rejected, (state, action) => {
				state.isLoading = false;
				console.error(action.error.message);
			});
	},
});

export default userSlice.reducer;
