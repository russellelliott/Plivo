import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase-config";
import Message from "./Message";

function Chat() {
	const scroll = useRef();
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const q = query(collection(db, "messages"), orderBy("timestamp"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			let messages = [];
			querySnapshot.forEach((doc) => {
				messages.push({ ...doc.data(), id: doc.id });
			});
			setMessages(messages);
		});
		return () => unsubscribe();
	}, []);

	return (
		<>
			<main className="chat-main">
				{/*Chat Message*/}
				{messages &&
					messages.map((message) => (
						<Message key={message.id} message={message} />
					))}
			</main>

			{/* Send Message */}
			<span ref={scroll}></span>
		</>
	);
}

export default Chat;
