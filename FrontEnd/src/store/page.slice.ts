import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IPageState {
	activeTab: string;
}
const initialState: IPageState = {
	activeTab: "/",
};
const pageSlice = createSlice({
	initialState: initialState,
	name: "page",
	reducers: {
		setActiveTab(state, action: PayloadAction<IPageState>) {
			state.activeTab = action.payload.activeTab;
		},
	},
});

export const { setActiveTab } = pageSlice.actions;
export default pageSlice.reducer;
