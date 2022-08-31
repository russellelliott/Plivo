import React from "react";
import Login from "../Login";
import ChatRoom from "./ChatRoom";
import { auth } from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Chat.css"

function ChatHome() {
   // I HAVE A DIFFERENT CHAT APP FOR HOMEPAGE but some errors i need to fix for that... SO in the mean time this one uses firestore and in different page bcz might delete :)
	const [user] = useAuthState(auth);
	return (
		<div className="ChatHome">
			<section>
            <h1>Global Chat</h1>{user ? <ChatRoom /> : <Login />}</section>
		</div>
	);
}

export default ChatHome;
