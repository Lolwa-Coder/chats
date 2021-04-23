

import styled from "styled-components";
import {Avatar, IconButton} from "@material-ui/core";
import {useRef, useState} from "react";
import {useRouter} from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth,db} from "../firebase";
import MoreVertIcon from "@material-ui/icons/More";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import {useCollection} from "react-firebase-hooks/firestore";
import  Messages  from "./Messages";
import firebase from "firebase";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import getRecipientEmail from "../utils/getRecipientEmail";
import Timeago from "timeago-react";
function ChatScreen({chat,messages}){
    console.log(messages);
    console.log(messagesSnapshot);
   const [user] = useAuthState(auth);
   const [input,setInput]= useState("");
   const router =useRouter();
   const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'));
   const [recipientSnapshot] = useCollection(db.collection('users').where('email','==',getRecipientEmail(chat.users,user)))
   const endOfMessageRef =useRef(null);
   const scrollToBottom=()=>{
       endOfMessageRef.current.scrollIntoView({
           behavior:"smooth",
           block:"start",
       });
   }
   const showMessages = ()=>{
   if(messagesSnapshot){
return messagesSnapshot.docs.map((message)=>(
    <Messages
       key={message?.id}
       user = {message?.data()?.user}
       message={{
           ...message?.data(),
           timestamp:message?.data()?.timestamp?.toDate().getTime(),
       }} />
));
    }
    else{
        return JSON.parse(messages).map(message=>(
            <Messages key={message?.id} user = {message?.user} message={message} />
        ))
    }
     
   };
   const sendMessage =(evs)=>{ 
       evs.preventDefault();
       db.collection('users').doc(user.uid).set({
           lastSeen:firebase.firestore.FieldValue.serverTimestamp()
       },{merge:true});
       db.collection('chats').doc(router.query.id).collection('messages').add({
           timestamp:firebase.firestore.FieldValue.serverTimestamp(),
           messages:input,
           user:user.email,
           photoURL: user.photoURL,
       });
       setInput("");
       scrollToBottom();
   }
   const recipient = recipientSnapshot?.docs?.[0]?.data();
   const recipientEmail = getRecipientEmail(chat.users,user);
    return (
        <Container>
            <Header>
                {recipient ?(
                <Avatar src={recipient?.photoURL} />
                ): <Avatar>{recipientEmail[0]}</Avatar>}
            
                <HeaderInformations >
                
                <h3>{recipientEmail}</h3>
                {recipientSnapshot? (
                    <p>Last Active:{''}
                    {recipient?.lastSeen?.toDate() ?(
                        <Timeago datetime ={recipient?.lastSeen?.toDate()} />

                    ):("unavaibale")}</p>
                ):(<p>loading..</p>)}
                
                </HeaderInformations>
                <HeaderIcons>

<IconButton>
    <AttachFileIcon />
    </IconButton>
    <IconButton>
<MoreVertIcon />
</IconButton>
                </HeaderIcons>
                
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef}/>
            </MessageContainer>
            <InputContainer>
            <InsertEmoticonIcon />
            <Input value={input} onChange= {(evs) => setInput(evs.target.value)} />
            <button hidden type ="submit" onClick={sendMessage}>Send Message</button>
            </InputContainer>
        </Container>
    )
}
export default ChatScreen;
const Container =styled.div`
`;
const Header =styled.div`
position:sticky;
background-color:white;
z-index:11;
top:0;
display:flex;
padding:11px;
align-items:center;
border-bottom:1px solid whitesmoke;
height:80px;
justify-content:space-between`;
const HeaderInformations = styled.div`
display:flex;
flex-direction:column;
align-items:center;
margin-left:15px;
flex:1;>h3{margin-bottom:3px}
>p{
    font-size:10px;
    color:grey;
}
`;
const EndOfMessage = styled.div`
margin-bottom:50px;
`;
const HeaderIcons = styled.div``;
const MessageContainer =styled.div`
padding:30px;
background-color:grey;
min-height:100vh;`;


const Input = styled.input`
flex:1;
align-items:center;
position:sticky;
bottom:0;
border:none;
outline-width:0px;
background-color:whitesmoke;
height:30px;
z-index : 11;`;



const InputContainer = styled.form`
display:flex;
align-items:center;
padding:10px;
position:sticky;
bottom:0px;
z-index:10;
background-color:white;
`;

