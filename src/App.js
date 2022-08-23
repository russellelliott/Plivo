import logo from './logo.svg';
import './App.css';

//For the router/navbar stuff
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login"; //login page

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  
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
                  <button onClick={signUserOut}> Log Out</button>
              </>
            )}
      </nav>
        <Routes>
              
              <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
              
        </Routes>
      </Router>
  );
}

export default App;