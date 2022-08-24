import React from "react";
import SignIn from "./SignIn";
import Logout from "./Logout";
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
	const [user] = useAuthState(auth);
	console.log(user);
	return (
		<div className="navbar">
			<h1 className="heading">Chat App</h1>
			{user ? <Logout /> : <SignIn />}
		</div>
	);
}

export default Navbar;
