import React from 'react';
import { sender, recipient, client } from './twilio-variables';

export default function Text() {
    const [text, setText] = useState('');
    const [recipient, setRecipient] = useState('');
    const sendText = () => {
    //   fetch(`http://127.0.0.1:4000/send-text?recipient=${recipient}&textmessage=${text}`)
    //   .catch(err => console.error(err));
      client.messages.create({
        body: text,
        to: recipient,            // Text this number
        from: sender            // From a valid Twilio number
      }).then((message) => console.log(message.body));
    }
    
    return (
      <div className="SMS">
        <input type="text" placeholder='recipient number' onChange={(e) => setRecipient(e.value.target)} />
        <input type="text" placeholder='text' onChange={(e) => setText(e.value.target)} />
        <button onClick={sendText}>Send Text</button>
      </div>
    );
}
