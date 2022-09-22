import React, { useState, useEffect } from "react";
import { ChatEngineWrapper, Socket, ChatFeed } from "react-chat-engine";
import { styles } from "../styles";

function ChatEngine2(){
	return(
		<div>I dunno what's wrong here</div>
	);
}
function ChatEngine(props) {
	const [showChat, setShowChat] = useState(false);

	useEffect(() => {
		if (props.visible) {
			setTimeout(() => {
				setShowChat(true);
			}, 500);
		}
	});

	return (
		<div
			className="transition-5"
			style={{
				...styles.chatEngineWindow,
				...{
					// If visiable make the height cover the screen and on the top layer
					height: props.visible ? "100%" : "0%",
					zIndex: props.visible ? "100" : "0",
				},
			}}
		>
			{showChat && (
				<ChatEngineWrapper>
					<Socket
						projectID={process.env.REACT_APP_CE_PROJECT_ID}
						userName={props.user.email}
						userSecret={props.user.email}
					/>
					<ChatFeed activeChat={props.chat.id} />
				</ChatEngineWrapper>
			)}
		</div>
	);
}

export default ChatEngine;