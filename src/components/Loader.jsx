import React from "react";

const Loader = () => {
	return (
		<div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
			<img src={`${process.env.PUBLIC_URL}/loading.gif`} alt="Loading" />
		</div>
	);
};

export default Loader;
