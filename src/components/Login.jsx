import Button from "@material-ui/core/Button";
import React from "react";
import styles from "./Login.module.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth, authProvider } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

const Login = () => {
	const dispatch = useDispatch();
	const signIn = async () => {
		try {
			const { user } = await auth.signInWithPopup(authProvider);
			dispatch(
				login({
					name: user.displayName,
					email: user.email,
					photoUrl: user.photoURL,
				})
			);
		} catch (error) {
			alert();
		}
	};
	return (
		<div className={styles.login}>
			<img
				src={`${process.env.PUBLIC_URL}/login.png`}
				alt="Login_Photo"
			/>
			<Button
				onClick={signIn}
				variant="contained"
				color="primary"
				size="large"
				startIcon={<ExitToAppIcon />}>
				Login
			</Button>
		</div>
	);
};

export default Login;
