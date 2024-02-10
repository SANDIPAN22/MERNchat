import styled from "styled-components"
import Contacts from "../components/Contacts";
import axios from "axios"
import { getAllFriends } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Loader from "../components/Loader"
import Welcome from "../components/Welcome";
import Chatbox from "../components/Chatbox";

const Chat = () => {
    const navigate = useNavigate()
    const [selectedContact, setSelectedContact] = useState(undefined)
    const [contacts, setContacts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState({})
    const toastOptions =  {
        position: "top-right",
        autoClose: 10000,
        pauseOnHover: true,
        draggable: true
      }
    useEffect(()=>{
        // check whether logged in or not
        if(!localStorage.getItem('chat-app-user')){
            navigate("/login")
        }
        
        // call all friends
        (async()=>{
            const user = await JSON.parse( localStorage.getItem('chat-app-user'))
            // check whether the user's avatar is set or not
            if(!user.isAvatarSet){
                navigate("/setAvatar")
            }
            console.log("Calling ====> ", `${getAllFriends}/${user._id}`)
            const {data} = await axios.get(`${getAllFriends}/${user._id}`)
            if (data.status !== true){
                toast.error("Unable to fetch the contacts list", toastOptions)
            }
            else{
                setContacts(data.friends)
                setLoading(false)
                setCurrentUser(user)
            }
        })()
    }, [])

    return ( <>
    <Container>
        <div className="container">
            {isLoading ? <Loader/> : <Contacts contacts={contacts} currentUser={currentUser} 
            setSelectedContact={setSelectedContact}></Contacts>}

            {selectedContact ? <Chatbox selectedContact={selectedContact} currentUser={currentUser}></Chatbox>
            : <Welcome currentUser={currentUser}></Welcome>}
            
        </div>
    </Container>
    
    </> );
}
 
export default Chat;

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
margin: 0;
justify-content: center;
align-items: center;
gap: 1rem;
background-color: #5c4599;
flex-direction: column;
.container{
    background-color: #20124d;
    height: 80vh;
    width: 80vw;
    display: grid;
    grid-template-columns: 20% 80%;
    border-radius: 20px;
    box-shadow: 10px 10px 10px #20124d;
}
`