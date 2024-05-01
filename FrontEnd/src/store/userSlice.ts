import { createSlice } from '@reduxjs/toolkit'
import { IUserState } from './types';

const initialState: IUserState = {
	isAuthenticated: false,
	user: null
}


const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			state = { ...action.payload };
		}
	}
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;