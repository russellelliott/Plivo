import React from "react";
import { auth } from "../firebase-config";

function Logout() {
	const signOut = () => {
		auth.signOut();
	};
	return (
		<div className="logout-btn" onClick={() => signOut()}>
			Logout
		</div>
	);
}

export default Logout;
