import styled from "styled-components";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";
import moment from "moment";
function Message({user,message}){
    const [userLoggedIn] = useAuthState(auth);
    const TypeOfMessage = user === userLoggedIn.email ? Sender: Receiver;
    return (
<Container>
<TypeOfMessage>{message.messages} <Timestamp>{message.timestamp ? moment(message.timestamp).format('LT'):'...'}</Timestamp></TypeOfMessage>
</Container>
    )
}
export default Message;
const Container =styled.div``;
const MessageElement = styled.p`
width:fit-content;
padding:15px;border-radius:8px;
margin:10px;padding-bottom:26px;
position:relative;
text-align:right;
`;

const Sender =styled(MessageElement)`
margin-left:auto;background-color:azure;

`;
const Receiver =styled(MessageElement)`
background:whitesmoke;
text-align:left;
`;
const Timestamp =styled.span`
color:gray;
padding:10px;font-size:9px;
position:absolute;
bottom:0px;
text-align:right;
right:0;
`;