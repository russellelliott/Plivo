import React, { useRef, useState } from "react";
import { db, auth } from "../../firebase-config";
import {
	collection,
	query,
	limit,
	orderBy,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";

function ChatRoom() {
	const scroll = useRef();
	// Reference firestore collection
	const messagesRef = collection(db, "messages");
	// query first 25 documents in a collection by timestamp
	const q = query(messagesRef, orderBy("timestamp"), limit(25));
	// listen for any updates to the data in real time with a hook.
	const [messages] = useCollectionData(q, { idField: "id" });
	// currentUser input
	const [formValue, setFormValue] = useState("");

	const sendMessage = async (e) => {
		e.preventDefault();
		// prevent empty submit to fb
		if (formValue === "") {
			alert("Please enter a valid message");
			return;
		}

		// add to fb document
		const { uid, photoURL, displayName } = auth.currentUser;
		await addDoc(messagesRef, {
			text: formValue,
			timestamp: serverTimestamp(),
			uid,
			photoURL,
			name: displayName,
		});
		setFormValue("");

		scroll.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<>
			{/* Chat Message from db */}
			<main>
				{messages &&
					messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
				<div ref={scroll}></div>
			</main>
			{/* Send Message */}
			<form onSubmit={sendMessage}>
				<input
					type="text"
					placeholder="Type a message..."
					value={formValue}
					onChange={(e) => setFormValue(e.target.value)}
				/>
				<button className="send-btn" type="submit">
					(👍 ͡👁️ ͜ʖ ͡👁️)👍
				</button>
			</form>
		</>
	);
}

export default ChatRoom;
