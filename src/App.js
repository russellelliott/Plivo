import React from "react";
import Navbar from "./components/Navbar";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";

function App() {
	const [user] = useAuthState(auth);
	console.log(user);
	return (
		<div className="container">
			<section className="section">
				{/* Navbar */}
				<Navbar />
			</section>
		</div>
	);
}

export default App;
