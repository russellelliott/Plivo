import React from "react";
import "./App.css";
import { auth } from "./firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./components/ChatRoom/SignIn";
import SignOut from "./components/ChatRoom/SignOut";
import ChatRoom from "./components/ChatRoom/ChatRoom";

function App() {
	const [user] = useAuthState(auth);
	return (
		<div className="App">
			<header>
				<h1>Global Chat</h1>
				{user ? <SignOut /> : <SignIn />}
			</header>

			<section>{user ? <ChatRoom /> : <SignIn />}</section>
		</div>
	);
}

export default App;
