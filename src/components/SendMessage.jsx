import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import {auth, db} from "../firebase-config"

function SendMessage({scroll}) {
	const [input, setInput] = useState("");

   const sendMessage = async (e) => {
      e.preventDefault();
      if (input === '') {
         alert("Please enter a valid message")
         return
      }
      // each user-id to msg; if match right-side 
      const {uid, displayName} = auth.currentUser
      await addDoc(collection(db, "messages"), {
         text: input,
         name: displayName,
         uid,
         timestamp: serverTimestamp()
      })
      //clear msg input
      setInput('')
      scroll.current.scrollIntoView({behavior: 'smooth'})
   }

	return (
		<form className="msg-form" onSubmit={sendMessage}>
			<input
				className="msg-input"
				type="text"
				placeholder="Type here..."
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button className="send-btn" type="submit">
				Send
			</button>
		</form>
	);
}

export default SendMessage;
