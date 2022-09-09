import { NavItem } from "react-bootstrap";
import { useNavigate,useLocation } from "react-router-dom";
import "./index.css"
function Display() {
    const {state} = useLocation()
    var {message} = ""
    let navigate = useNavigate();
    if(state !== null) {
        message = state.look
    }
    
    return (
        <>
        <div className="--flex-center --dir-column">
            <textarea className='--text-sm --center-all' cols="100" rows="15" name = "message" value = {message}></textarea>
            <button className = "--btn --btn-primary" onClick = {(e) => navigate("/inbox")}>Back</button>
        </div>
        </>
    )

}

export default Display