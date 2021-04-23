import {Avatar} from "@material-ui/core";
import styled from "styled-components";
import getRecipientEmail from "../utils/getRecipientEmail";
import {auth,db } from "../firebase";
import {useCollection} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import {useRouter} from "next/router";
function Chat({id,users}){
    const router =useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email','==',getRecipientEmail(users,user)));
    const recipientEmail = getRecipientEmail(users,user);
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const enterChat =()=>{router.push(`/chat/`+ id)}
return(
    <Container onClick={enterChat}>
        {recipient ? (
            <UserAvatar src ={recipient?.photoURL} />
        ):(
            <UserAvatar>{recipientEmail[0]}</UserAvatar>
        )}
        
         
        
        <p>{recipientEmail}</p>
    </Container>
)
}
export default Chat;
const Container =styled.div`
display:flex;
align-items:center;
cursor: pointer;
padding:10px;word-break:break-word;
:hover{
    background-color:grey;
}
`;

const UserAvatar = styled(Avatar)`
margin-right:10px`;