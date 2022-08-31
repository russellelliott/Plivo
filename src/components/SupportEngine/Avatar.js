import React, { useState } from "react";
import { styles } from "./styles";

function Avatar(props) {
	const [hovered, setHovered] = useState(false);
	return (
		<div style={props.style}>
			<div
				className="transition-3"
				style={{ ...styles.avatarHello, ...{ opacity: hovered ? "1" : "0" } }}
			>
				Hey it's mE
			</div>
			<div
				className="transition-3"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				style={{
					...styles.chatWithMeButton,
					...{ border: hovered ? "1px solid #f9f0ff" : "4px solid #7a39e0" },
				}}
				// if props.onClick is true/triggered then call the onClick function to setVisable to true
				onClick={() => props.onClick && props.onClick()}
			></div>
		</div>
	);
}

export default Avatar;