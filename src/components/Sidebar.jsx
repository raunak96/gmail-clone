import React from "react";
import styles from "./Sidebar.module.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import InboxIcon from "@material-ui/icons/Inbox";
import StarIcon from "@material-ui/icons/Star";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import NearMeIcon from "@material-ui/icons/NearMe";
import NoteIcon from "@material-ui/icons/Note";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import DuoIcon from "@material-ui/icons/Duo";
import PhoneIcon from "@material-ui/icons/Phone";
import SidebarOption from "./SidebarOption";
import { useDispatch, useSelector } from "react-redux";
import { openComposeMessage } from "../features/mailSlice";
import { useHistory, useLocation } from "react-router";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { selectUser } from "../features/userSlice";

const Sidebar = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const history = useHistory();
	const { pathname } = useLocation();
	const [inboxMailsSnapshot] = useCollection(
		db.collection("mails").where("to", "==", user.email)
	);
	const [sentMailsSnapshot] = useCollection(
		db.collection("mails").where("from", "==", user.email)
	);
	return (
		<div className={styles.sidebar}>
			<Button
				startIcon={<AddIcon />}
				size="large"
				className={styles.compose}
				onClick={() => dispatch(openComposeMessage())}>
				Compose
			</Button>

			<SidebarOption
				Icon={InboxIcon}
				title="Inbox"
				count={inboxMailsSnapshot?.docs?.length ?? ""}
				selected={pathname.includes("inbox")}
				onClick={() => history.push("/inbox")}
			/>
			<SidebarOption Icon={StarIcon} title="Starred" count={11} />
			<SidebarOption Icon={AccessTimeIcon} title="Snoozed" count={11} />
			<SidebarOption
				Icon={LabelImportantIcon}
				title="Important"
				count={11}
			/>
			<SidebarOption
				Icon={NearMeIcon}
				title="Sent"
				count={sentMailsSnapshot?.docs?.length ?? ""}
				selected={pathname.includes("sent")}
				onClick={() => history.push("/sent")}
			/>
			<SidebarOption Icon={NoteIcon} title="Drafts" count={11} />
			<SidebarOption Icon={ExpandMoreIcon} title="More" count={11} />

			<div className={styles.sidebar_footer}>
				<div className={styles.sidebar_footerIcons}>
					<IconButton>
						<PersonIcon />
					</IconButton>
					<IconButton>
						<DuoIcon />
					</IconButton>
					<IconButton>
						<PhoneIcon />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
