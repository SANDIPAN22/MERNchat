import styled from "styled-components";
const Welcome = ({currentUser}) => {
    return ( <>
    <Container>
        <div className="header">
            Hello {currentUser.username}, welcome to the MERNchat...
        </div>
        <div className="sub-header">
            Please select a contact to chat with that person.
        </div>
    </Container>
    </> );
}
 
export default Welcome;

const Container = styled.div`
display: flex;
margin: 0;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 1rem;
color: #f5f5f5a1;
.header{
    font-weight: bolder;
    font-size: 3rem;
    text-shadow: 2px 2px 4px #f8f6f6d2;
    animation-name: floatingWelcome;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}
@keyframes floatingWelcome{
    0%   {transform: translate(0px,0px);}
    25%  {transform: translate(0px,-5px); text-shadow: 2px 5px 10px #f8f6f6d2;}
    50%  {transform: translate(0px,-15px);}

}
`