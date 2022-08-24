import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";

function Chat() {
	const scroll = useRef();
	return (
		<>
			<main className="chat-main">
				{/*Chat Message*/}
				<Message />
			</main>
			{/* Send Message */}
			<span ref={scroll}></span>
		</>
	);
}

export default Chat;
