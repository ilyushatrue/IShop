import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPageState {
	loading: boolean;
	displayWidth: number;
	navbar: {
		height: {
			xs: number
			sm: number;
			md: number;
			lg: number;
			xl: number;
		};
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
		height: {
			xs: 60,
			sm: 112,
			md: 112,
			lg: 112,
			xl: 112,
		},
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
			const item = state.tabs.slice().reverse().find((x) => x.href === action?.payload?.substring(0, x.href.length));
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
