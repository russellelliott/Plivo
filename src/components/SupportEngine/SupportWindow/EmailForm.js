import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { styles } from "../styles";
import Avatar from "../Avatar";
import axios from "axios";

function EmailForm(props) {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const getOrCreateUser = (callback) => {
		axios
			.put(
				"https://api.chatengine.io/users/",
				{
					username: email,
					email: email,
					secret: email,
				},
				{ headers: { "Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY } }
			)
			.then((r) => callback(r.data))
			.catch((error) => console.log("Get or create user error", error));
	};

	const getOrCreateChat = (callback) => {
		axios
			.put(
				"https://api.chatengine.io/chats/",
				{
					usernames: ["Youkwhan", email],
					is_direct_chat: true,
				},
				{
					headers: {
						"Project-ID": process.env.REACT_APP_CE_PROJECT_ID,
						"User-Name": email,
						"User-Secret": email,
					},
				}
			)
			.then((r) => callback(r.data))
			.catch((error) => console.log("Get or create chat error", error));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		console.log("Sending email", email);

		// bundle api calls together and create the chat api
		getOrCreateUser((user) => {
			props.setUser(user);
			getOrCreateChat((chat) => {
				props.setChat(chat);
				console.log("success", chat);
			});
		});
	};

	return (
		<div
			// Show email form or not
			style={{
				...styles.emailFormWindow,
				...{
					height: props.visible ? "100%" : "0",
					opacity: props.visible ? "1" : "0",
				},
			}}
		>
			{/*diagonal line*/}
			<div style={{ height: "0px" }}>
				<div style={styles.stripe} />
			</div>

			{/* //loading page and loading icon */}
			<div
				className="transition-5"
				style={{
					...styles.loadingDiv,
					...{
						zIndex: loading ? "10" : "-1",
						opacity: loading ? "0.33" : "0",
					},
				}}
			>
				<LoadingOutlined
					className="transition-5"
					style={{
						...styles.loadingIcon,
						...{
							zIndex: loading ? "10" : "-1",
							opacity: loading ? "1" : "0",
							fontSize: "82px",
							top: "calc(50% - 41px)",
							left: "calc(50% - 41px)",
						},
					}}
				/>
			</div>

			{/* Web Form */}
			<div
				style={{
					position: "absolute",
					height: "100%",
					width: "100%",
					textAlign: "center",
				}}
			>
				{/* Our profile pic at top center */}
				<Avatar
					style={{
						position: "relative",
						left: "calc(50% - 44px)",
						top: "10%",
					}}
				/>

				<div style={styles.topText}>
					Welcome to the <br /> Support Chat
				</div>

				<form
					onSubmit={(e) => handleSubmit(e)}
					style={{ position: "relative", width: "100%", top: "19.75%" }}
				>
					<input
						style={styles.emailInput}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Your Email"
					/>
				</form>

				<div style={styles.bottomText}>
					Enter your email <br /> to get started
				</div>
			</div>
		</div>
	);
}

export default EmailForm;
