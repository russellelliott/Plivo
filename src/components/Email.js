import emailjs from '@emailjs/browser';
import { db } from "../firebase-config";
import {collection, getDocs, addDoc} from "firebase/firestore"
import React, { useState,useRef, useEffect } from 'react'
import { useNavigate,useLocation } from "react-router-dom";
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
  const emailCollectionRef = collection(db,"emails")

  const {state} = useLocation()
  var {topic} = ""
  var {fname} = ""
  var {femail} = ""
  var {contents} = ""
  var {reply} = false
  
  if(state !== null) {
    fname = state.fname
    femail = state.femail
    contents = state.look
    reply = state.reply
    topic = state.topic
  }

   
 
  let navigate = useNavigate();
  
  useEffect(() => {
    const getData = async () => {
        const info = await getDocs(dataCollectionRef);
        setData(info.docs.map((doc) => ({...doc.data(), id: doc.id })))
    };
    clearInputs()
    getData();
}, []);

  const sendEmail = (e) => {
    if(adminName !== "")
    {
      var date = new Date()
      var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
      e.preventDefault()
      emailjs.sendForm('service_yomj6eg', 'template_5uq5nbq', form.current, 'Dpc2QsYFcFIYaHgQg')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      
      addDoc(emailCollectionRef, {toName: adminName, fromName: currentUser.name, contents: message, fromEmail: currentUser.email, datesent:current_date, topic: subject, toEmail: senderEmail})
      e.target.reset()
      navigate("/inbox")
    }
    else
    {
      console.log("EMPTY")
    }
  }

  const sendReply = (e) => {
      var date = new Date()
      var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
      e.preventDefault()
      emailjs.sendForm('service_yomj6eg', 'template_tp2b07c', form.current, 'Dpc2QsYFcFIYaHgQg')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      
      addDoc(emailCollectionRef, {toName: fname, fromName: currentUser.name, contents: message, fromEmail: currentUser.email, datesent:current_date, topic: ("RE: " + topic), toEmail: femail})
      e.target.reset()
      navigate("/inbox")
  }

  const clearInputs = () => {
    setMessage("")
    setSenderEmail("")
    setAdminName("")
    setSubject("")
  }

  const handleInbox = () => {
    setMessage("")
    setSenderEmail("")
    setAdminName("")
    setSubject("")
    navigate("/inbox")
  }

  return (
    <>
      {reply === false ? (
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
          <div className='--flex-center --dir-column '>
            <form className = "--form-control --card --flex-center --dir-column" ref = {form} onSubmit = {((sendEmail))}>
              <input type = "hidden" value = {currentUser.name} name = 'from_name'></input>
              <input type = "hidden" value = {currentUser.email} name = 'from_email'></input>
              <input type = "hidden" value = {senderEmail} name = 'to_email'></input>
              <input type = "text" placeholder='Subject...' name = "subject" value = {subject} onChange = {(e)=>{setSubject(e.target.value)}}></input>
              <textarea className='--text-sm' onChange={(e)=>{setMessage(e.target.value)}} cols="100" rows="15" name = "message" value = {message}></textarea>
              <button className='--btn --btn-success' type = "submit">Send Email</button>
            </form>
            <button className='--btn --btn-danger' onClick = {(e) => {clearInputs()}}>Clear Page</button>
            <button className = "--btn --btn-primary" onClick = {(e)=>{handleInbox()}}>Back</button>
          </div>
        </>
      ) : (
        <>
        <h4 style={{textAlign:'center'}}>Replying To: {fname}</h4>
        <div className='--flex-center --dir-column '>
        <h5>Message from {fname}:</h5>
        <textarea className='--text-sm' cols="50" rows="1" name = "message" value = {contents}></textarea>
          <form className = "--form-control --card --flex-center --dir-column" ref = {form} onSubmit = {((sendReply))}>
            <input type = "hidden" value = {currentUser.name} name = 'from_name'></input>
            <input type = "hidden" value = {currentUser.email} name = 'from_email'></input>
            <input type = "hidden" value = {femail} name = 'to_email'></input>
            <input type = "hidden" placeholder='Subject...' name = "subject" value = {"RE: " + topic}></input>
            <textarea className='--text-sm' onChange={(e)=>{setMessage(e.target.value)}} cols="100" rows="15" name = "message" value = {message}></textarea>
            <button className='--btn --btn-success' type = "submit">Send Email</button>
          </form>
          <button className='--btn --btn-danger' onClick = {(e) => {clearInputs()}}>Clear Page</button>
          <button className = "--btn --btn-primary" onClick = {(e)=>{handleInbox()}}>Back</button>
        </div>
        </>
      )}
      
    </>
  );
}

export default Email;