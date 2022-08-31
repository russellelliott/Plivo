import emailjs from '@emailjs/browser';
import { db } from "../firebase-config";
import {collection, getDocs} from "firebase/firestore"
import React, { useState,useRef, useEffect } from 'react'
import "./index.css"
import { clear } from '@testing-library/user-event/dist/clear';
function Email({currentUser}) {
  const form = useRef();
  const [message,setMessage] = useState("")
  const [senderEmail, setSenderEmail] = useState("")
  const [adminName, setAdminName] = useState("")
  const [data, setData] = useState([])
  const [subject, setSubject] = useState("")
  const dataCollectionRef = collection(db, "users")
  
  useEffect(() => {
    const getData = async () => {
        const info = await getDocs(dataCollectionRef);
        setData(info.docs.map((doc) => ({...doc.data(), id: doc.id })))
    };
    getData();
}, []);

  const sendEmail = (e) => {
    e.preventDefault()
    emailjs.sendForm('service_yomj6eg', 'template_5uq5nbq', form.current, 'Dpc2QsYFcFIYaHgQg')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    e.target.reset()
    clearInputs()
  }

  const clearInputs = () => {
    setMessage("")
    setSenderEmail("")
    setAdminName("")
    setSubject("")
  }

  return (
    <>
      <h1 style={{textAlign:'center'}}>Select an admin</h1>
      <h4 style={{textAlign:'center'}}>Currently selected admin: {adminName}</h4>
      {data.filter((info) => {
        if(info.admin == true)
        {
          return info
        }
      }).map((info) => {
        return (
          <div style={{display:"flex", justifyContent:"center", margin:"10px"}}>
            <button onClick = {(e) => {setSenderEmail(info.email); setAdminName(info.name)}}>{info.name}</button>
          </div>
        )
      })}
      <div>
        <form className = "--form-control --card --flex-center --dir-column" ref = {form} onSubmit = {((sendEmail))}>
          <input type = "hidden" value = {currentUser.name} name = 'from_name'></input>
          <input type = "hidden" value = {currentUser.email} name = 'from_email'></input>
          <input type = "hidden" value = {senderEmail} name = 'to_email'></input>
          <input type = "text" placeholder='Subject...' name = "subject" value = {subject} onChange = {(e)=>{setSubject(e.target.value)}}></input>
          <textarea className='--text-sm' onChange={(e)=>{setMessage(e.target.value)}} cols="100" rows="15" name = "message" value = {message}></textarea>
          
          <button className='--btn --btn-primary' type = "submit">Send Message</button>
          <button className='--btn --btn-danger'>Clear Page</button>
          
        </form>
      </div>
    </>
  );
}

export default Email;
