import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
	name: "todos",
	initialState: [],
	reducers: {
		save: (state, action) => {
			state.push(...action.payload);
		},
		clear: (state) => {
			state = [];
		},
	},
});

export const { save, clear } = todoSlice.actions;
export default todoSlice.reducer;
