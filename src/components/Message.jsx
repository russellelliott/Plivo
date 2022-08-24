import React from "react";
import { auth } from "../firebase-config";

function Message({ message }) {
	const messageClass =
		message.uid === auth.currentUser.uid
			? "msg-sent"
			: "msg-recieve"

	return (
		<div>
			<div  className={`${"msg"} ${messageClass}`}>
				<p className="msg-name">{message.name}</p>
				<p>{message.text}</p>
			</div>
		</div>
	);
}

export default Message;
