import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./types";
import { ILoginByEmailRequest } from "../api/contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "../api/contracts/authentication/login-by-phone-request.interface";
import { IRegisterRequest } from "../api/contracts/authentication/register-request.interface";
import apiAuth from "../api/auth.api";
import usersApi from "../api/users.api";
import api from "../api/api";
import { IErrorOr } from "../api/interfaces/api/error-or.interface";

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
	"users/current", async()=>{
		const response = await usersApi.getCurrentAsync();
		const result = (await response.json()) as IErrorOr<undefined>;
		console.log(result)
		return result;

	});

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
			.addCase(loginByPhone.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCurrent.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCurrent.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.value ?? null;
				state.isAuthenticated = !!action.payload;
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
