import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";
import SupportWindow from "./SupportWindow";

function SupportEngine() {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		// check ref and see if the event click is outside the reference => set SupportWindow visable to false
		const handleClickOutside = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setVisible(false);
			}
		};

		// whenever the mouse clicks down call function
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// unmount component whenever we leave the SupportWindow so we dont keep lisitening and result in a memory leak
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	return (
		//ref reference variable for the entire component
		<div ref={ref}>
			<Avatar
				style={{ position: "fixed", bottom: "24px", right: "24px" }}
				onClick={() => setVisible(true)}
			/>

			<SupportWindow visible={visible} />
		</div>
	);
}

export default SupportEngine;
