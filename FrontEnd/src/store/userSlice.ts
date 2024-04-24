import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../api/interfaces/user/IUser';

const initialState: { user: IUser | null, isAuthenticated: boolean } = {
	isAuthenticated: false,
	user: null
}


const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		set(state, action) {
			state = { ...action.payload };
		}
	}
});

export const { set } = userSlice.actions;

export default userSlice.reducer;