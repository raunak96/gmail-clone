import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyB-YyB7dyQVaN5Mxh34ME-x2JS4mluMPFg",
	authDomain: "clone-87d54.firebaseapp.com",
	projectId: "clone-87d54",
	storageBucket: "clone-87d54.appspot.com",
	messagingSenderId: "919073634868",
	appId: "1:919073634868:web:3c04484a9f148a5558e861",
};

const app = !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app();

export const db = app.firestore();
export const auth = app.auth();
export const authProvider = new firebase.auth.GoogleAuthProvider();
