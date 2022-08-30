import logo from './logo.svg';
import './App.css';

//For the router/navbar stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login"; //login page
import VideoDashboard from "./components/VideoCall/VideoDashboard"; //video dashboard page
import Location from "./components/UserLocation/Location" //user location
import Photo from "./components/Photo" //take photo

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import Email from './components/Email';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [currentUser, setUser] = useState(({email: "", name: "", isAdmin: false}))
  
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
            {!isAuth ? (
              <Link to="/login"> Login </Link>
            ) : (
              <>
                  <Link to="/"> Home </Link>
                  <Link to="/profile"> Profile</Link>
                  <Link to="/videocall">Video Call</Link>
                  <Link to="/location">Location</Link>
                  <Link to="/photo">Photo</Link>
                  <Link to="/email">Email</Link>
                  <button onClick={signUserOut}> Log Out</button>
              </>
            )}
      </nav>
        <Routes>
              
              <Route path="/login" element={<Login setIsAuth={setIsAuth} setUser = {setUser} currentUser = {currentUser}/>}/>
              <Route path="/videocall" element={<VideoDashboard />} />
              <Route path="/location" element={<Location />} />
              <Route path="/photo" element={<Photo />} />
              <Route path="/email" element={<Email currentUser = {currentUser} />} />
        </Routes>
      </Router>
  );
}

export default App;