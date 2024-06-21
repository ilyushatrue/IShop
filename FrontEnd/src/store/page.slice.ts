import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPageState {
	isLoading: boolean;
	displayWidth: number;
	navbar: {
		height: number;
	};
	tabs: {
		label: string;
		href: string;
		active: boolean;
	}[];
}
const menuItems: IPageState = {
	isLoading: false,
	displayWidth: 1440,
	navbar: {
		height: 112,
	},
	tabs: [
		{ label: "Главная", href: "/", active: true },
		{
			label: "Пользователи",
			href: "/users",
			active: false,
		},
		{
			label: "Одежда и обувь",
			href: "/test",
			active: false,
		},
		{
			label: "Электроника",
			href: "/test",
			active: false,
		},
		{
			label: "Дом и сад",
			href: "/test",
			active: false,
		},
		{
			label: "Детские товары",
			href: "/test",
			active: false,
		},
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
