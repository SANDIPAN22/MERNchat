import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/logo.png"
import styled from "styled-components"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { loginRoute } from "../utils/APIRoutes";
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate()
    const toastOptions =  {
        position: "top-right",
        autoClose: 10000,
        pauseOnHover: true,
        draggable: true
      }
    const validateForm = (data) => {
  
        if (data.get("username").length === 0){
            // show Error 
            toast.error("Username is needed!", toastOptions);
            return false
        }
        else if (data.get("password").length === 0){
            // show Error 
            toast.error("Password is needed!", toastOptions);
            return false
        }
        
        return true
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        
        if (validateForm(formData)){
            // post data to the backend
            const reqBody = Object.fromEntries(formData)
            const {data} = await axios.post(loginRoute, reqBody)

            if (data.status === false){
                toast.error(data.msg, toastOptions)
            }
            if (data.status === true){
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                toast.success("Logging you In...", toastOptions)
                setTimeout(()=>{
                    navigate("/chat")
                }, 5000)
            }
        }
        
    } 

    // auth check: if userdata is present then no need to render this page, Open Chat page directly
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
            navigate("/chat")
        }
    }, [])

    return ( <>
    
    <FormContainer>
        <form onSubmit={handleSubmit}>
            <div className="brand">
                <img src={Logo} alt="brand_image"  height={100}/>
                <h1>MERNchat Login Form</h1>
            </div>
            <input type="text" name="username" placeholder="Username"/>
            
            <input type="password" name="password" placeholder="Password" />
            
            <button type="submit">Login</button>
            <p>If you don't have an account, then click here to <b><Link to="/register">Register</Link></b> </p>
        </form>
    </FormContainer>
    <ToastContainer/>
    </> );
}
 
export default Login;

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