import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import user from "./user.slice";
import page from "./page.slice";

export const store = configureStore({
	reducer: {
		user,
		page
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
