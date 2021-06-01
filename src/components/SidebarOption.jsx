import clsx from "clsx";
import React from "react";
import styles from "./SidebarOption.module.css";

const SidebarOption = ({ Icon, title, count, selected = false, onClick }) => {
	return (
		<div
			onClick={onClick}
			className={clsx(
				styles.sidebarOption,
				selected && styles.sidebarOption_active
			)}>
			<Icon className={styles.icon} />
			<h3>{title}</h3>
			<p>{count}</p>
		</div>
	);
};

export default SidebarOption;
