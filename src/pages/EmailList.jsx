import React, { useMemo } from "react";
import styles from "./EmailList.module.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import RedoIcon from "@material-ui/icons/Redo";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
import SettingsIcon from "@material-ui/icons/Settings";
import InboxIcon from "@material-ui/icons/Inbox";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";
import Section from "../components/Section";
import EmailRow from "../components/EmailRow";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";

const EmailList = () => {
	const user = useSelector(selectUser);
	const { type } = useParams();

	const [mailsSnapshot, isLoading] = useCollection(
		db
			.collection("mails")
			.where(type === "inbox" ? "to" : "from", "==", user.email)
			.orderBy("timestamp", "desc")
	);

	const getPageTitle = useMemo(() => {
		if (!mailsSnapshot) return "Gmail";
		if (type === "inbox")
			return `Inbox (${mailsSnapshot.docs.length}) - ${user.email} - Gmail`;
		else return `Sent Mail - ${user.email} - Gmail`;
	}, [mailsSnapshot, type, user]);

	return (
		<>
			<Helmet>
				<title>{getPageTitle}</title>
			</Helmet>
			<div className={styles.emailList}>
				<div className={styles.emailList_settings}>
					<div className={styles.settings_left}>
						<Checkbox />
						<IconButton>
							<ArrowDropDown />
						</IconButton>
						<IconButton>
							<RedoIcon />
						</IconButton>
						<IconButton>
							<MoreVertIcon />
						</IconButton>
					</div>
					<div className={styles.settings_right}>
						<IconButton>
							<ChevronLeftIcon />
						</IconButton>
						<IconButton>
							<ChevronRightIcon />
						</IconButton>
						<IconButton>
							<KeyboardHideIcon />
						</IconButton>
						<IconButton>
							<SettingsIcon />
						</IconButton>
					</div>
				</div>
				<div className={styles.emailList_sections}>
					<Section
						Icon={InboxIcon}
						title="Primary"
						color="#d93025"
						selected={true}
					/>
					<Section Icon={PeopleIcon} title="Social" color="#1a73e8" />
					<Section
						Icon={LocalOfferIcon}
						title="Promotions"
						color="#188038"
					/>
				</div>
				<div className={styles.emailList_list}>
					{isLoading
						? [...Array(6)].map((_, ind) => (
								<EmailRow key={ind} isLoading={true} />
						  ))
						: mailsSnapshot?.docs?.map(mail => (
								<EmailRow
									key={mail.id}
									id={mail.id}
									title={mail.data().to}
									subject={mail.data().subject}
									description={mail.data().message}
									time={mail.data().timestamp?.toDate()}
									from={mail.data().from}
								/>
						  ))}
				</div>
			</div>
		</>
	);
};

export default EmailList;
