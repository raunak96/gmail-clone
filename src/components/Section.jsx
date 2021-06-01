import clsx from "clsx";
import React from "react";
import styles from "./Section.module.css";

const Section = ({ Icon, title, color, selected = false }) => {
	return (
		<div
			className={clsx(styles.section, selected && styles.section_active)}
			style={{
				borderBottom: selected && `3px solid ${color}`,
				color: selected ? color : "gray",
				borderTopLeftRadius: "3px",
				borderTopRightRadius: "3px",
			}}>
			<Icon />
			<h4>{title}</h4>
		</div>
	);
};

export default Section;
