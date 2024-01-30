import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import styled from "styled-components"

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert("form")
    } 

    const handleChange = (e) => {
        alert("change")
    }
    return ( <>
    
    <FormContainer>
        <form onSubmit={handleSubmit}>
            <div className="brand">
                <img src={Logo} alt="brand_image"  height={100}/>
                <h1>MERNchat Register Form</h1>
            </div>
            <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
            <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
            <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
            <input type="password" name="confPassword" placeholder="Confirm Password" onChange={handleChange}/>
            <button type="submit">Register</button>
            <p>If you already have an account, then click here to <b><Link to="/login">Login</Link></b> </p>
        </form>
    </FormContainer>
    </> );
}
 
export default Register;

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
gap: 1rem;
justify-content: center;
align-items: center;
background-color: #b2a9ec;
.brand{
    display: flex;
    align-items: center;
    justify-content: center
}
h1{
    color: white;

}
form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 2px solid black;
    border-radius: 10px;
    box-shadow: 5px 5px 10px black;
    padding: 10px;
    background-color: #ef9494;
}
input{
    border-radius: 5px;
    height: 2rem;
    padding: 5px;
    box-shadow: 2px 2px 5px #550457;
    transition: 0.5s ease-in-out;
}
input:hover{
    height: 3rem;
    box-shadow: 5px 5px 5px #550457;
}
button{
    background-color: #b2a9ec;
    border-radius: 5px;
    height: 2rem;
    padding: 5px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 2px 2px 5px #550457;
    animation-name: registerButtonAnimation;
    animation-duration: 4s;
    animation-iteration-count: infinite;
}
@keyframes registerButtonAnimation{
    0%   {height: 3rem; box-shadow: 8px 8px 8px #550457; font-size: 1.5rem}
    25%  {height: 2rem; box-shadow: 2px 2px 2px #550457; font-size: 1rem}
    50%  {height: 2rem; box-shadow: 2px 2px 2px #550457; font-size: 1rem}
    75%  {height: 3rem; box-shadow: 8px 8px 8px #550457; font-size: 1.5rem}
    100% {height: 3rem; box-shadow: 8px 8px 8px #550457; font-size: 1.5rem}
}
`;