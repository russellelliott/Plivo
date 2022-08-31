import React from "react";
import { ChatEngine } from "react-chat-engine";

function SupportAdmin() {
	return (
		<ChatEngine
			projectID={process.env.REACT_APP_CE_PROJECT_ID}
			userName="Youkwhan"
			userSecret="password"
			height="calc(100vh- 20px)"
		/>
	);
}

export default SupportAdmin;