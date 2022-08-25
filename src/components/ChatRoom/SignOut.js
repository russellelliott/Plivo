import React from "react";
import { auth } from "../../firebase-config";

function SignOut() {
	return (
		auth.currentUser && <button className="logout-btn" onClick={() => auth.signOut()}>Sign Out</button>
	);
}

export default SignOut;
