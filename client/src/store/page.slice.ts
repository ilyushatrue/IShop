import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPageState {
	loading: boolean;
	shopping: boolean;
	displayWidth: number;
	navbar: {
		height: {
			xs: number;
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
		iconName: string;
	}[];
}
const menuItems: IPageState = {
	loading: false,
	shopping: true,
	displayWidth: 1440,
	navbar: {
		height: {
			xs: 60,
			sm: 120,
			md: 120,
			lg: 120,
			xl: 120,
		},
	},
	tabs: [
		{
			label: "Одежда и обувь",
			href: "/category/clothes",
			iconName: "checkroom",
			active: false,
		},
		{
			label: "Электроника",
			href: "/category/electronics",
			iconName: "devices",
			active: false,
		},
		{
			label: "Дом и сад",
			href: "/category/yard",
			iconName: "deck",
			active: false,
		},
		{
			label: "Детские товары",
			href: "/category/child-care",
			iconName: "child_care",
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
			const item = state.tabs
				.slice()
				.reverse()
				.find(
					(x) =>
						x.href === action?.payload?.substring(0, x.href.length)
				);
			state.tabs.map((x) => {
				x.active = false;
				return x;
			});
			if (item) item.active = true;
		},
		setShopping(state, action: PayloadAction<boolean>) {
			state.shopping = action.payload;
		},
	},
});

export const { setActiveTab, setIsPageLoading, setShopping } = pageSlice.actions;
export default pageSlice.reducer;
