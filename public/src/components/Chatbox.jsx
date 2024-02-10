import styled from "styled-components";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";
import axios from "axios"
import {getMessages} from "../utils/APIRoutes"

const Chatbox = ({selectedContact, currentUser}) => {
    const [msgs, setMsgs] = useState([])
    useEffect(()=>{
        (async()=>{
        const {data} = await axios.post(getMessages,{
            from: currentUser._id,
            to: selectedContact._id
        } )

        setMsgs(data.projectedMessages)
        console.log(data)

    })()}, [selectedContact])
    return ( <>
        <Container>
            <div className="chat-header">
                
                    <div className="avatar-block">
                        <img src={`data:image/svg+xml;base64,${selectedContact.avatarImage}`} width={55} alt="user " />
                        
                    </div>
                    <div className="username"> {selectedContact.username}</div>
                
            </div>
            <div className="chat-window">
                {msgs.map(elem => {return <>
                <div className={`text-container-${elem.fromSelf ? 'sended': 'received'}`}>
                    <div className={`text-body`}>
                        <h2>{elem.message}</h2>
                        <h4>{elem.fromSelf}</h4>
                    </div>
                    
                </div>
                </>})}
            </div>
            <ChatInput selectedContact={selectedContact} currentUser={currentUser}/>
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
    width: 328px;
    background-color: azure;
    margin: 10px;
    border-radius: 30px;
    padding: 5px 19px;
    justify-content: center;
    align-items: center;
}


`