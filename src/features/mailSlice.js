import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isOpenComposeMessage: false,
	selectedMail: localStorage.getItem("selectedMail")
		? JSON.parse(localStorage.getItem("selectedMail"))
		: {},
};

export const mailSlice = createSlice({
	name: "mail",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		selectMail: (state, action) => {
			if (!action.payload) localStorage.removeItem("selectedMail");
			else
				localStorage.setItem(
					"selectedMail",
					JSON.stringify(action.payload)
				);
			state.selectedMail = action.payload ?? {};
		},
		openComposeMessage: state => {
			state.isOpenComposeMessage = true;
		},
		closeComposeMessage: state => {
			state.isOpenComposeMessage = false;
		},
	},
});

export const { openComposeMessage, closeComposeMessage, selectMail } =
	mailSlice.actions;

export const selectisOpenComposeMessage = state =>
	state.mail.isOpenComposeMessage;
export const selectMailToOpen = state => state.mail.selectedMail;

export default mailSlice.reducer;
