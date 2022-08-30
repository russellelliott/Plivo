import React, {useEffect, useState} from 'react';
import { auth, provider,db} from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {addDoc, collection, getDocs} from "firebase/firestore"

function Login({ setIsAuth, setUser, currentUser }) {
  
    const [isAdmin, setIsAdmin] = useState(false)
    const [data, setData] = useState([])
    const dataCollectionRef = collection(db,"users")
    let navigate = useNavigate();

    useEffect(() => {
      const getData = async () => {
          const info = await getDocs(dataCollectionRef);
          setData(info.docs.map((doc) => ({...doc.data(), id: doc.id })))
      };
      getData();
  }, []);

    const handleChange = event => {
      if(event.target.checked) {
        setIsAdmin(true)
      }
      else {
        setIsAdmin(false)
      }
    }
  
    const signInWithGoogle = () => {
      signInWithPopup(auth, provider).then((result) => {
        setUser({email: result.user.email, name: result.user.displayName, admin: isAdmin})
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        var check = false
        if(isAdmin === true) {
          data.map((data) => {
            if(data.email === result.user.email)
            {
              check = true
            }
          })
          if(check === false) {
             addDoc(dataCollectionRef, { email: result.user.email, name: result.user.displayName, admin: isAdmin})
          }
          else
          {
            console.log("User already registered")
          }
        }
        navigate("/");
      });
    };
  
    return (
      <div className="loginPage">
        <p>Sign In With Google to Continue</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        <label>Check box if admin
            <input type = "checkbox" value = {isAdmin} onChange = {handleChange}/>
        </label>
      </div>
    );
  }

  
  export default Login;