import React from "react";
import styles from "./Mail.module.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import PrintIcon from "@material-ui/icons/Print";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import ReplyIcon from "@material-ui/icons/Reply";
import ForwardIcon from "@material-ui/icons/Forward";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import { useHistory, useParams } from "react-router";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectMail, selectMailToOpen } from "../features/mailSlice";
import { Helmet } from "react-helmet-async";
import { selectUser } from "../features/userSlice";
// import { useDocument } from "react-firebase-hooks/firestore";
// import { db } from "../firebase";
// import moment from "moment";

const Mail = () => {
	const history = useHistory();
	const { subject, title, time, description } = useSelector(selectMailToOpen);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const { type } = useParams();

	// Logic to get individual mail from firestore
	// const { id } = useParams();
	// const [mailSnapshot] = useDocument(db.doc(`mails/${id}`));

	// const { subject, title, time, description } = useMemo(
	// 	() =>
	// 		mailSnapshot
	// 			? {
	// 					subject: mailSnapshot.data()?.subject,
	// 					title: mailSnapshot.data()?.to,
	// 					description: mailSnapshot.data()?.message,
	// 					time: moment(
	// 						mailSnapshot.data()?.timestamp?.toDate()
	// 					).format("Do, DD MMM, HH:mm"),
	// 			  }
	// 			: localMail,
	// 	[localMail, mailSnapshot]
	// );
	return (
		<>
			<Helmet>
				<title>{`${subject} - ${user.email} - Gmail`}</title>
			</Helmet>
			<div className={styles.mail}>
				<div className={styles.mail_tools}>
					<div className={styles.mail_toolsLeft}>
						<IconButton
							onClick={() => {
								dispatch(selectMail());
								history.push(`/${type}`);
							}}>
							<ArrowBackIcon />
						</IconButton>
						<IconButton>
							<MoveToInboxIcon />
						</IconButton>
						<IconButton>
							<ErrorIcon />
						</IconButton>
						<IconButton>
							<DeleteIcon />
						</IconButton>
						<div className={styles.vertLine}></div>
						<IconButton>
							<EmailIcon />
						</IconButton>
						<IconButton>
							<WatchLaterIcon />
						</IconButton>
						<IconButton>
							<CheckCircleIcon />
						</IconButton>
						<span className={styles.vertLine}></span>
						<IconButton>
							<LabelImportantIcon />
						</IconButton>
						<IconButton>
							<MoreVertIcon />
						</IconButton>
					</div>
					<span className={styles.mail_toolsRight}>
						<IconButton>
							<UnfoldMoreIcon />
						</IconButton>
						<IconButton>
							<PrintIcon />
						</IconButton>
						<IconButton>
							<ExitToAppIcon />
						</IconButton>
					</span>
				</div>
				<div className={styles.mail_body}>
					<div className={styles.mail_bodyHeader}>
						<div className={styles.mail_bodyHeaderUpper}>
							<h2>{subject}</h2>
							<LabelImportantIcon
								className={styles.mailImportant}
							/>
						</div>
						<div className={styles.mail_bodyHeaderLower}>
							<p>{title}</p>
							<div className={styles.bodyHeaderLower_right}>
								<p className={styles.mail_time}>{time}</p>
								<IconButton>
									<ReplyIcon />
								</IconButton>
								<IconButton>
									<StarOutlineIcon />
								</IconButton>
								<IconButton>
									<MoreVertIcon />
								</IconButton>
							</div>
						</div>
					</div>
					<div className={styles.mail_message}>
						<p>{description}</p>
					</div>
					<div className={styles.mail_bodyFooter}>
						<Button startIcon={<ReplyIcon />}>Reply</Button>
						<Button startIcon={<ForwardIcon />}>Forward</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Mail;
