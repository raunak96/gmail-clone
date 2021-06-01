import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		login: (state, action) => {
			state.currentUser = action.payload;
		},
		logout: state => {
			state.currentUser = null;
		},
	},
});

export const { login, logout } = userSlice.actions;

export const selectUser = state => state.user.currentUser;

export default userSlice.reducer;
