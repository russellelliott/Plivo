import { useState } from "react";
//import Button from "@mui/material/Button"
//import VideoCall from "./VideoCall";
import VideoCallDisplay from "./VideoCallDisplay" //video call display component
function App() {

  const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    //toggle shown state
    setIsShown(current => !current);

    //or simply set it to true
    //setIsShown(true);
  };

  //const [inCall, setInCall] = useState(false);

  return (
    /*<div className="App" style={{ height: "100%" }}>
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setInCall(true)}
        >
          Join Call
        </Button>
      )}
    </div>*/
    //At first, video div is not displayed.

    <div className="App">
      {/*Button only shows up if it hasn't been clicked yet.*/}
      {!isShown && <button onClick={handleClick}>Click</button>}
      {/*show component on click*/}
      {isShown && <VideoCallDisplay />}
    </div>
  );
}

export default App;