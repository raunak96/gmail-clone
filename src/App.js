import React, { useEffect } from "react";
import styles from "./App.module.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EmailList from "./pages/EmailList";
import Mail from "./pages/Mail";
import ComposeMail from "./components/ComposeMail";
import { useDispatch, useSelector } from "react-redux";
import { selectisOpenComposeMessage } from "./features/mailSlice";
import { login, selectUser } from "./features/userSlice";
import Login from "./components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Loader from "./components/Loader";

function App() {
	const isOpenComposeMessage = useSelector(selectisOpenComposeMessage);
	const currentUser = useSelector(selectUser);
	const dispatch = useDispatch();
	const [user, isLoading] = useAuthState(auth);

	useEffect(() => {
		if (user) {
			dispatch(
				login({
					name: user.displayName,
					email: user.email,
					photoUrl: user.photoURL,
				})
			);
		}
	}, [user, dispatch]);

	return (
		<Router>
			{currentUser ? (
				<div className={styles.app}>
					<Header />
					<div className={styles.app_body}>
						<Sidebar />
						<Switch>
							<Route exact path="/">
								<Redirect to="/inbox" />
							</Route>
							<Route exact path="/:type">
								<EmailList />
							</Route>
							<Route path="/:type/mail/:id">
								<Mail />
							</Route>
						</Switch>
					</div>
					{isOpenComposeMessage && <ComposeMail />}
				</div>
			) : isLoading ? (
				<Loader />
			) : (
				<Login />
			)}
		</Router>
	);
}

export default App;
