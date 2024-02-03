import {  useNavigate } from "react-router-dom"
import Logo from "../assets/logo.png"
import styled from "styled-components"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { setAvatarRoute } from "../utils/APIRoutes";
import { useEffect, useState } from "react";
import {Buffer} from "buffer"
import Loader from "../components/Loader"

const SetAvatar = () => {

    const avatarApi = "https://api.multiavatar.com"
    const [av, setAv] = useState(0)
    const [avatar, setAvatar] = useState("")
    const [loaderState, setLoaderState] = useState(true) 
    const navigate = useNavigate()
    const toastOptions =  {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true
      }
    const handleSetAvatar = async() => {
        const user =await JSON.parse( localStorage.getItem('chat-app-user'))
        const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
            avatar
        })
        if (data.status){
            user.isAvatarSet = true
            user.avatarImage = avatar
            localStorage.setItem('chat-app-user', JSON.stringify(user))
            toast.success("Successfully changed the avatar. Redirecting you to the chat platform.", toastOptions)
            setTimeout(()=>{
                navigate("/chat")
            }, 5000)
        }
    }
    const changeAvatar = () => {
        setLoaderState(true)
        setAv(prev => prev+1)
    }
    useEffect(()=> {
        if(!localStorage.getItem('chat-app-user')){
            navigate("/login")
        }
        async function fetchData() {
            try{
                    const image = await axios.get(`${avatarApi}/${Math.round(Math.random() * 1000)}`, {headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
                    const buffer = new Buffer(image.data)
                    setAvatar(buffer.toString("base64"))
                    setLoaderState(false)
            }
            catch(err){
                console.error("Get avatr from 3rd party:: ", err)
                toast.error("Unable to fetch avatars...", toastOptions);
            }
        }
        fetchData()
            
    }, [av])
    return ( <> 
     <AvatarContainer>
        <div className="selector-card">
            <h1>Select your avatar</h1>
            <hr />
            <div className="avatars-card">
                
                {loaderState ?
                <Loader/>
                   :
                    <img  src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" width={250}/>
                }
                
            </div>
            <div className="buttons-container">
            <button onClick={changeAvatar}>Change Avatar</button>
            <button onClick={handleSetAvatar}>Set Avatar</button>
            </div>
            
        </div>
     </AvatarContainer>
    <ToastContainer></ToastContainer>
    </> );
}

 
export default SetAvatar;

const AvatarContainer = styled.div`
display: flex;
margin: 0;
height: 100vh;
align-items: center;
justify-content: center;
flex-direction: column;
background-color:  #8f5b9a;
h1{
    color: white;
}
.selector-card{
    background-color: rgba(0,0,0,0.5);
    border-radius: 2px 30px 2px 30px;
    border: 2px solid da67ad;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 20px 10px 30px #da67ad;
hr{
    min-width: 10rem;
    margin: 10px;
}
.avatars-card img{
    margin: 25px;
    box-shadow: 15px 15px 25px black;
    border-radius: 50%;
}
.avatars-card img:hover{
    margin: 25px;
    box-shadow: 2px 1px 0px black;
    border-radius: 50%;
}
button{
    padding: 8px 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px black;
    background-color: #debebe;
    font-weight: 500px;
    font-size: 1rem;
    font-weight: bold;
    min-width: 10rem;
    margin: 5px;
    transition:  0.5s ease-in-out;
}
button:hover{
    min-width: 12rem;
    box-shadow: 5px 8px 15px black;
}


}
`