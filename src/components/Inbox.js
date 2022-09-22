import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"
import {collection, getDocs} from "firebase/firestore"
import { db } from "../firebase-config";
import "./index.css"
function Inbox ({currentUser}) {
    let navigate = useNavigate();

    const [data,setData] = useState([])
    const emailCollectionRef = collection(db,"emails")

    useEffect(() => {
        const getData = async () => {
            const info = await getDocs(emailCollectionRef);
            setData(info.docs.map((doc) => ({...doc.data(), id: doc.id })))
        };
        getData();
    }, []);

    
    const handleEmail =() => {
        navigate("/email", {state: {fname:"",femail:"", reply: false}})    
    }

    const handleReply = (name, email, mes, top) => {
        navigate("/email", {state: { fname: name, femail: email,reply: true, look:mes, topic: top}})
    }

    const displayMessage = (mes) => {
        navigate("/display", {state: { look: mes }})
    }

    return (
        <>
        <th scope="col"><button className = "--btn-primary --btn" onClick = {(e) => {handleEmail()}}>Compose Email</button></th>
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {data.map((info) => {
                if(info.toEmail === currentUser.email)
                    return (
                        <tr>
                        <td>{info.fromName}</td>
                        <td>{info.topic}</td>
                        <td>{info.datesent}</td>
                        <td><button onClick={(e) => {displayMessage(info.contents)}}>View Email</button></td>
                        <td><button onClick = {(e) => {handleReply(info.fromName, info.fromEmail, info.contents, info.topic)}}>Reply</button></td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </>
    )
}

export default Inbox