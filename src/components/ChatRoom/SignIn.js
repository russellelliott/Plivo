import React from "react";
import GoogleButton from "react-google-button";
import { auth } from "../../firebase-config";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

function SignIn() {
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithRedirect(auth, provider);
	};

	return <GoogleButton onClick={signInWithGoogle} />;
}

export default SignIn;
