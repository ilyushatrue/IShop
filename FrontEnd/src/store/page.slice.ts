import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPageState {
	loading: boolean;
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
	loading: false,
	displayWidth: 1440,
	navbar: {
		height: 112,
	},
	tabs: [
		{ label: "Главная", href: "/", active: true },
		{
			label: "Одежда и обувь",
			href: "/category/clothes",
			active: false,
		},
		{
			label: "Электроника",
			href: "/category/electronics",
			active: false,
		},
		{
			label: "Дом и сад",
			href: "/category/yard",
			active: false,
		},
		{
			label: "Детские товары",
			href: "/category/child-care",
			active: false,
		},
	],
};

const pageSlice = createSlice({
	initialState: menuItems,
	name: "page",
	reducers: {
		setIsPageLoading(state, action: PayloadAction<boolean>) {
			state.loading = action.payload;
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

export const { setActiveTab, setIsPageLoading } = pageSlice.actions;
export default pageSlice.reducer;
