import { useState } from "react";
import styled from "styled-components"
import Logo from "../assets/logo.png"



const Contacts = ({contacts, currentUser, setSelectedContact}) => {
    const [selectedUserIndex, setSelectedUserIndex] = useState(undefined)
    

    const changeContact = (ind, contact) => {
        // change index
        setSelectedUserIndex(ind)
        // change contact
        setSelectedContact(contact)
    }

    return ( <>
    <Container>
        <div className="brand">
            <img src={Logo} alt="Brand Logo" />
            <h3>MERNchat</h3>
        </div>
        <div className="contact-list">
          
            {contacts.map((elem, ind)=> {
                return (
                <div className={`contact-card ${ind === selectedUserIndex && 'active-card'}`} onClick={()=> {changeContact(ind, elem)}} >
                    <img  src={`data:image/svg+xml;base64,${elem.avatarImage}`} alt="avatar" key={ind} width={50}/>
                    <h2>{elem.username}</h2>
                </div>
                )
            })}
            
        </div>
        <div className="current-user-placeholder">
            <img  src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar"  width={40}/>
            <h2>{currentUser.username}</h2>
            {/* <button> LogOut</button> */}
        </div>
    </Container>

    </> );
}
 
export default Contacts;

const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
overflow: hidden;
border-radius: 20px;

h1{
    color: white;
}
.brand{
    background-color: #d384ff;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    padding: 2px;
}
.brand img{
    margin: 10px;
    width: 20%;
}
.contact-list{
    background-color: 	#4a0072;
    display: flex;
    flex-direction: column;
    overflow: auto;
}
.contact-card{
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid black;
    flex-direction: row;
    gap: 1 rem;
    transition: 0.5ms ease-in-out;
}
.active-card{
    padding: 10px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid black;
    flex-direction: row;
    gap: 1 rem;
    background-color: #a400ff;
}
.contact-card h2{
    color: white;
    margin: 15px;
    margin-top: 25px;
    text-transform: capitalize;
}
.contact-card img{
    border-radius: 50%;
    box-shadow: 2px 2px 2px black;
    margin: 5px;
}

.current-user-placeholder{
    background-color: rgba(211,132,255, 0.5);
    display: grid;
    padding: 5px;
    text-transform: capitalize;
    grid-template-columns: 30% 40% 30%;
    align-items: center;
}
.current-user-placeholder img{
    border-radius: 50%;
    box-shadow: 2px 2px 2px black;
    margin: 5px;
}
.current-user-placeholder button{
    border-radius: 20%;
    box-shadow: 2px 2px 4px black;
    margin: 0;
    padding: 5px;
    border: 0;
    font-weight: bold;
    background-color: #f16e6e;
    
}
`
