import React from "react";
import styles from "./ComposeMail.module.css";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeComposeMessage } from "../features/mailSlice";
import { db } from "../firebase";
import firebase from "firebase";
import { selectUser } from "../features/userSlice";

const useStyles = makeStyles({
	root: {
		"&:nth-child(3)": {
			flex: 1,
			"& .MuiInputBase-root::before": {
				border: "none",
			},
			"&:hover .MuiInput-root::before": {
				border: "none",
			},
			"& .MuiInput-root.Mui-focused::before": {
				border: "none",
			},
			"& .MuiInput-root::after ": {
				border: "none",
			},
			"&:hover .MuiInput-root::after": {
				border: "none",
			},
			"& .MuiInput-root.Mui-focused::after": {
				border: "none",
			},
		},
		"& .MuiInput-root::before ": {
			borderColor: "whitesmoke",
		},
		"&:hover .MuiInput-root::before": {
			borderColor: "whitesmoke",
		},
		"& .MuiInput-root.Mui-focused::before": {
			borderColor: "whitesmoke",
		},
		"& .MuiInput-root::after ": {
			borderColor: "whitesmoke",
		},
		"&:hover .MuiInput-root::after": {
			borderColor: "whitesmoke",
		},
		"& .MuiInput-root.Mui-focused::after": {
			borderColor: "whitesmoke",
		},
		"& .MuiInputBase-root": {
			marginLeft: "10px",
			marginRight: "10px",
		},
		"& .MuiInputBase-input::placeholder": {
			color: "black",
		},
		"& .Mui-error": {
			marginRight: "0.7rem",
			textAlign: "right",
		},
	},
});
const ComposeMail = () => {
	const classes = useStyles();
	const user = useSelector(selectUser);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();

	const onSubmit = formData => {
		console.log(formData);
		db.collection("mails").add({
			...formData,
			from: user?.email,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		dispatch(closeComposeMessage());
	};
	return (
		<div className={styles.composeMail}>
			<div className={styles.composeMail_header}>
				<h3>New Message</h3>
				<CloseIcon
					className={styles.composeMail_close}
					onClick={() => dispatch(closeComposeMessage())}
				/>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					placeholder="To"
					className={classes.root}
					type="email"
					{...register("to", {
						required: true,
					})}
					error={!!errors.to}
					helperText={!!errors.to && "To is required."}
				/>
				<TextField
					placeholder="Subject"
					className={classes.root}
					type="text"
					{...register("subject", {
						required: true,
					})}
					error={!!errors.subject}
					helperText={!!errors.subject && "Subject is required."}
				/>
				<TextField
					multiline
					rows={12}
					rowsMax={12}
					className={classes.root}
					type="text"
					{...register("message", {
						required: true,
					})}
					error={!!errors.message}
					helperText={!!errors.message && "Body is required."}
				/>
				<div className={styles.sendMail}>
					<ButtonGroup
						variant="contained"
						size="large"
						color="primary"
						className={styles.sendMail_button}>
						<Button
							style={{
								backgroundColor: "#1a73e8",
								textTransform:
									"capitalize className={styles.input}",
							}}
							type="submit">
							Send
						</Button>
						<Button
							size="small"
							style={{ backgroundColor: "#1a73e8" }}>
							<ArrowDropDownIcon />
						</Button>
					</ButtonGroup>
				</div>
			</form>
		</div>
	);
};

export default ComposeMail;
