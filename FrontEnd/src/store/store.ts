import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import user from "./userSlice";
import { api } from "../api/api";

export const store = configureStore({
	reducer: {
		user,
		[api.reducerPath]: api.reducer,
	},
	middleware: (buildGetDefaultMiddleware) =>
		buildGetDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
