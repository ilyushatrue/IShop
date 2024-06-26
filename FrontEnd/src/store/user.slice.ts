import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./types";
import { ILoginByEmailRequest } from "../api/contracts/authentication/login-by-email-request.interface";
import { ILoginByPhoneRequest } from "../api/contracts/authentication/login-by-phone-request.interface";
import { IRegisterRequest } from "../api/contracts/authentication/register-request.interface";
import apiAuth from "../api/auth.api";
import usersApi from "../api/users.api";
import { IUser } from "../api/interfaces/user/user.interface";

// export const loginByPhoneAsync = createAsyncThunk(
// 	"/auth/login-by-phone",
// 	async (request: ILoginByPhoneRequest) =>
// 		await apiAuth.loginByPhoneAsync(request)
// );
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
	reducers: {
		updateData: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginByEmailAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginByEmailAsync.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(registerAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerAsync.rejected, (state) => {
				state.isLoading = false;
			})
			.addCase(getCurrentAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCurrentAsync.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.ok) {
					state.user = action.payload.body ?? null;
					state.isAuthenticated = true;
				}
			})
			.addCase(logoutAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logoutAsync.fulfilled, () => initialState)
			.addCase(logoutAsync.rejected, (state) => {
				state.isLoading = true;
			});
	},
});

export const { updateData } = userSlice.actions;
export default userSlice.reducer;
