import styled from "styled-components";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill} from "react-icons/bs";
import Picker from "emoji-picker-react"
import { useRef, useState } from "react";
import {addMessage} from "../utils/APIRoutes"
import axios from "axios"

const ChatInput = ({selectedContact, currentUser}) => {
    const [showPicker, setShowPicker] = useState(false)
    const inputRef = useRef()
    const [msg, setMsg] = useState("")

    const handleMessage = async(e) => {
        e.preventDefault()
        if(inputRef.current.value.length > 0){
            // perform operation
            const data = await axios.post(addMessage, {
                from: currentUser._id,
                to: selectedContact._id,
                message: inputRef.current.value
            })
            
        }
        inputRef.current.value = ""      
    }

    const handleEmojiClick = (event) => {
        
        inputRef.current.value += event.emoji
        setShowPicker(false)
    }
    return ( <>
    <Container>
        <div className="emoji-box">
         <BsEmojiSmileFill size={30} color="white" onClick={()=> setShowPicker(prevState=> !prevState)}/>
         {showPicker && <Picker theme="dark" className="emoji-picker-react" onEmojiClick={handleEmojiClick}/>}
        </div>
        <div>
            <form onSubmit={handleMessage}>
                <div className="input-section">
                    <input  ref={inputRef} type="text" placeholder="Type message here..." defaultValue={msg}/>
                    <button type="submit"><IoMdSend/></button>
                </div>
            </form>
        </div>

    </Container>
    </> );
}
 
export default ChatInput;

const Container = styled.div`
display: flex;
gap: 1rem;
align-items: center;
justify-content: center;
padding: 5px 20px;
.input-section{
    display: flex;
    box-shadow: 0 5px 5px black;

}
.input-section input{
    width: 30rem;
    border-radius: 10px;
    height: 2.5rem;
    padding: 2px;
    font-size: 1.5rem;
}
.input-section button{
    width: 2rem;
    border-radius: 10px;
}
.emoji-box{
    height: 2rem;
    .emoji-picker-react{
        position: absolute;
        top: 320px;
    }
}
`