import React, { useMemo } from "react";
import styles from "./EmailRow.module.css";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import LabelImportantOutlinedIcon from "@material-ui/icons/LabelImportantOutlined";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import { useHistory, useParams } from "react-router";
import moment from "moment";
import Skeleton from "@material-ui/lab/Skeleton";
import { useDispatch } from "react-redux";
import { selectMail } from "../features/mailSlice";

const EmailRow = ({
	id,
	title,
	subject,
	description,
	time,
	from,
	isLoading = false,
}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { type } = useParams();
	const getTime = useMemo(() => {
		if (!time) return "";
		const dateNow = new Date();
		const isTodaysDate =
			time.getFullYear() === dateNow.getFullYear() &&
			time.getMonth() === dateNow.getMonth() &&
			time.getDate() === dateNow.getDate();
		return isTodaysDate
			? moment(time).format("HH:mm")
			: moment(time).format("DD MMM");
	}, [time]);
	const openMail = () => {
		dispatch(
			selectMail({ id, title, subject, description, time: getTime, from })
		);
		history.push(`/${type}/mail/${id}`);
	};
	return isLoading ? (
		<Skeleton className={styles.emailRow} />
	) : (
		<div onClick={openMail} className={styles.emailRow}>
			<div className={styles.emailRow_options}>
				<Checkbox onClick={e => e.stopPropagation()} />
				<IconButton>
					<StarBorderOutlinedIcon />
				</IconButton>
				<IconButton>
					<LabelImportantOutlinedIcon />
				</IconButton>
			</div>
			<h3 className={styles.emailRow_title}>
				{type === "sent" ? `To: ${title}` : from}
			</h3>
			<div className={styles.emailRow_message}>
				<h4>
					{subject}
					<span className={styles.emailRow_description}>
						&nbsp;-&nbsp;{description}
					</span>
				</h4>
			</div>
			<p className={styles.emailRow_time}>{getTime}</p>
		</div>
	);
};

export default EmailRow;
