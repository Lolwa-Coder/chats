import Head from "next/head";
import styled from "styled-components";
import {Button} from "@material-ui/core";
import {provider,auth} from "../firebase";
function Login(){
    const signIn =()=>{
        auth.signInWithPopup(provider).catch(alert);
    }
    return (
        <Container><Head><title>Login</title></Head>
         <Img src ="https://raw.githubusercontent.com/Lolwa-Coder/Images/main/Untitled-2.png"></Img>
        <LoginContainer>
           
            <Logo src="https://raw.githubusercontent.com/Lolwa-Coder/Images/main/6479755_preview.png">

            </Logo>
            <Button variant="outlined" onClick={signIn}>Sign in with google</Button>
        </LoginContainer>
        
        </Container>
    )
}
export default Login;
const Container = styled.div`

display:grid;
place-items:center;
height:100vh;`;

const LoginContainer= styled.div`

padding:100px;
align-items:center;
background-color:#FDF4DC;
display:flex;
flex-direction:column;`;

const Logo = styled.img`
height:200px;
width:260px;
margin-bottom:50px`
;
const Img = styled.img`
position:absolute;
height:100vh;
width:100vw;
z-index:-1;
`;