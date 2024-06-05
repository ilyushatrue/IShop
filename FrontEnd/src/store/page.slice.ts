import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPageState {
	isLoading: boolean;
	tabs: {
		label: string;
		href: string;
		active: boolean;
	}[];
}
const menuItems: IPageState = {
	isLoading: false,
	tabs: [
		{ label: "Главная", href: "/", active: true },
		{ label: "Дополнительная", href: "/page2", active: false },
		{ label: "Пользователи", href: "/users", active: false },
		{ label: "Тест", href: "/test", active: false },
	],
};

const pageSlice = createSlice({
	initialState: menuItems,
	name: "page",
	reducers: {
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		setActiveTab(state, action: PayloadAction<string | undefined>) {
			const item = state.tabs.find((x) => x.href === action?.payload);
			state.tabs.map((x) => {
				x.active = false;
				return x;
			});
			if (item) item.active = true;
		},
	},
});

export const { setActiveTab } = pageSlice.actions;
export default pageSlice.reducer;
