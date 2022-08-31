import logo from './logo.svg';
import './App.css';

//For the router/navbar stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login"; //login page
import VideoDashboard from "./components/VideoCall/VideoDashboard"; //video dashboard page
import Location from "./components/UserLocation/Location" //user location
import Photo from "./components/Photo" //take photo

import { useEffect, useState } from "react";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth,db } from "./firebase-config";
import Email from './components/Email';

// chat messaging
import Home from "./components/Home"
import ChatHome from './components/ChatRoom/ChatHome';
import SupportAdmin from './components/SupportEngine/SupportAdmin';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setUser] = useState(({email: "", name: "", isAdmin: false}))
  const userauth = getAuth()

  onAuthStateChanged(auth, (user)=>{
    if(user){
      setUser(({email: user.email, name: user.displayName}))
      setIsAuth(true)
    }
    else {
      setIsAuth(false);
    }
  })

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
      <Router>
        <nav>
            {!isAuth && isAuth == false ? (
              <Link to="/login"> Login </Link>
            ) : (
              <>
                  <Link to="/"> Home </Link>
                  <Link to="/profile"> Profile</Link>
                  <Link to="/videocall">Video Call</Link>
                  <Link to="/location">Location</Link>
                  <Link to="/photo">Photo</Link>
                  <Link to="/email">Email</Link>
                  <Link to="/global">GlobalChat</Link>
                  <button onClick={signUserOut}> Log Out</button>
              </>
            )}
      </nav>
        <Routes>
              <Route path='/' element={<Home />} />
              <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
              <Route path="/global" element={<ChatHome />} />
              <Route path="/videocall" element={<VideoDashboard />} />
              <Route path="/location" element={<Location />} />
              <Route path="/photo" element={<Photo />} />
              <Route path="/email" element={<Email currentUser = {currentUser}/>} />
              <Route path="/support" element={<SupportAdmin />} />
        </Routes>
      </Router>
  );
}

export default App;