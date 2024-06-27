import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "./types";
import usersApi from "../api/users.api";
import { IUser } from "../api/interfaces/user/user.interface";

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
		resetState: (state) => (state = initialState),
	},
	extraReducers: (builder) => {
		builder
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
	},
});

export const { updateData } = userSlice.actions;
export default userSlice.reducer;
