import emailjs from '@emailjs/browser';
import { auth, db} from "../firebase-config";
import React, { useRef } from 'react'
import { Button, Modal } from 'react-bootstrap'
function Email({currentUser}) {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault()
    emailjs.sendForm('service_yomj6eg', 'template_5uq5nbq', form.current, 'Dpc2QsYFcFIYaHgQg')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    e.target.reset()
  }

  function EmailModal(props) {
    return (
      <Modal>

      </Modal>
    )
  }

  
  return (
    <>
      <div>
        <form className = "form" ref = {form} onSubmit = {sendEmail}>
          <input type = "hidden" value = {currentUser.name} name = 'from_name'></input>
          <input type = "hidden" value = {currentUser.email} name = 'from_email'></input>
          <input type = "email" placeholder='To Email' name = 'to_email'></input>
          <input type = "text" placeholder='Subject...' name = "subject"></input>
          <textarea name = "message"></textarea>
          <button type = "submit">Send Message</button>
        </form>
      </div>
      <button onClick={(e) => {console.log(currentUser)}}>Test</button>
    </>
  );
}

export default Email;
