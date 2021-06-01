import React from "react";
import styles from "./Header.module.css";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import { useHistory } from "react-router";

const Header = () => {
	const user = useSelector(selectUser);
	const history = useHistory();
	const dispatch = useDispatch();
	const signOut = async () => {
		await auth.signOut();
		dispatch(logout());
	};
	return (
		<div className={styles.header}>
			<div className={styles.header_left}>
				<IconButton>
					<MenuIcon />
				</IconButton>
				<div
					className={styles.homeLogo}
					onClick={() => history.push("/")}>
					<img
						src={`${process.env.PUBLIC_URL}/gmail.png`}
						alt="Home"
					/>
				</div>
			</div>
			<div className={styles.header_middle}>
				<SearchIcon className={styles.icons} />
				<input placeholder="Search mail" type="text" />
				<ArrowDropDownIcon
					className={clsx(styles.header_inputCaret, styles.icons)}
				/>
			</div>
			<div className={styles.header_right}>
				<IconButton>
					<AppsIcon />
				</IconButton>
				<IconButton>
					<NotificationsIcon />
				</IconButton>

				<Avatar
					src={user?.photoUrl}
					onClick={signOut}
					style={{ cursor: "pointer" }}
				/>
			</div>
		</div>
	);
};

export default Header;
