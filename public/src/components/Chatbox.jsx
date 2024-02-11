import styled from "styled-components";
import ChatInput from "./ChatInput";
import { useEffect, useState ,useRef} from "react";
import axios from "axios"
import {getMessages} from "../utils/APIRoutes"
import { ImSwitch } from "react-icons/im";

const Chatbox = ({selectedContact, currentUser, socket}) => {
    const scrollRef = useRef()
    const [msgs, setMsgs] = useState([])
    const [latestMsg, setLatestMsg] = useState({})
    const [arrivalMessage, setArrivalMessage] = useState({})
    // fresh pull all msgs for the first time when new contacts chat window is opened
    useEffect(()=>{
        (async()=>{
        const {data} = await axios.post(getMessages,{
            from: currentUser._id,
            to: selectedContact._id
        } )

        setMsgs(data.projectedMessages)
        console.log(data)

    })()}, [selectedContact])

    // when a new chat is delivered: set it to the display and emit event
    useEffect(()=>{
        setMsgs(m => [...m, latestMsg])
        socket.current.emit("send-msg", {
            from: currentUser._id,
            to: selectedContact._id,
            message: latestMsg.message
        })
    }, [latestMsg])

    // Register event listener for msg-receive for the first time
    useEffect(()=>{
        if (socket.current){
            socket.current.on("msg-receive", (msg)=>{
                setArrivalMessage({fromSelf: false, message: msg})
            })
        }
    }, [])

    // now whenever ArrivalMessage changes
    useEffect(()=> {
        arrivalMessage && setMsgs(m => [...m, arrivalMessage])
        
    }, [arrivalMessage])

    // scroll setter
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    }, [msgs])

    return ( <>
        <Container>
            <div className="chat-header">
                
                    <div className="avatar-block">
                        <img src={`data:image/svg+xml;base64,${selectedContact.avatarImage}`} width={55} alt="user " />
                        
                    </div>
                    <div className="username"> {selectedContact.username}</div>
                    <div className="logout-button"> <ImSwitch /> </div>
                
            </div>
            <div className="chat-window">
                {msgs.map((elem, ind) => {return <>
                <div className={`text-container-${elem.fromSelf ? 'sended': 'received'}`} key={ind} ref={scrollRef}>
                    <div className={`text-body`}>
                        <h2>{elem.message}</h2>
                        <h4>{elem.fromSelf}</h4>
                    </div>
                    
                </div>
                </>})}
            </div>
            <ChatInput selectedContact={selectedContact} currentUser={currentUser} setLatestMsg={setLatestMsg}/>
        </Container>
    </> );
}
 
export default Chatbox;

const Container = styled.div`
display: grid;
margin: 0;


grid-template-rows: 10% 80% 10%;
.chat-header{
    border-bottom: 1px solid grey;
}
.chat-window{
    overflow: auto;
    max-height: 60vh;
    padding: 5px;
}
.chat-input{
    
}
.chat-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;

}
.avatar-block{
    margin-left: 15px;
}

.avatar-block img{
    margin-bottom: 5px;
    margin-top: 8px;
    margin-left: 10px;
    margin-right: 10px;
}

.username{
    color: white;
    font-weight: bolder ;
    font-size: 25px;
    text-transform: capitalize;
}

.text-container-sended{
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    
}
.text-container-received{
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    
}
.text-body{
    display: flex;
    gap: 1rem;
    overflow-wrap: anywhere;
    max-width: 328px;
    background-color: #e2b8f5;
    margin: 10px;
    border-radius: 30px;
    padding: 5px 19px;
    justify-content: center;
    align-items: center;
}

.logout-button{
    margin-left: 1.5rem;
    font-size: xx-large;
    color: #ff00009c;
}
`