import React from 'react'
import { auth } from '../../firebase-config';

function ChatMessage(props) {
  const {text, uid, photoURL} = props.message;
  // Is the text something currentUser sent or recieved?
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="Profile" />
      <p>{text}</p>
    </div>
  )
}

export default ChatMessage