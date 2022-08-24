import React from "react";

function Message({message}) {
	return (
		<div>
			<div className="message">
				<p className="message-name">Name</p>
				<p>{message.text}</p>
			</div>
		</div>
	);
}

export default Message;
