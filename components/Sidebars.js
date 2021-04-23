import styled from "styled-components";
import {Avatar, IconButton, Button} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import {auth, db} from "../firebase";
import MoreVertIcon from "@material-ui/icons/More";
import SearchIcon from "@material-ui/icons/Search";
import {useAuthState} from "react-firebase-hooks/auth";
import * as EmailValidator from "email-validator";
import Chat from "../components/Chat";
import {useCollection} from "react-firebase-hooks/firestore";
function Sidebar(){
    const [user]= useAuthState(auth);
    const userChatRef=db.collection('chats').where('users','array-contains',user.email);
    const [chatSnapshot] = useCollection(userChatRef);
    
    const createChat=()=>{
        
        const input=prompt('plz enter email of user');
        if(!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExists(input)&&input!==user.email){
            db.collection('chats').add({
                users:[user.email,input],
            });
        }
;
    }
    const chatAlreadyExists=(recipientEmail)=>{
       !!chatSnapshot?.docs.find((chat)=>chat.data().users.find((user)=>user===recipientEmail)?.length>0);
    }
    return(
        <div>
            <Container>
                <Header>
                <IconButton>
                <UserAvater src = {user.photoURL} onClick={()=> auth.signOut()} />
                     </IconButton>
                
                 <IconContainer>
                     <IconButton>
                     <ChatIcon />
                     </IconButton>
                     
                     <IconButton>
                     <MoreVertIcon />
                     </IconButton>
                     
                 </IconContainer>

                </Header>
                <Search>
                    <SearchIcon />
                    <SearchInput placeholder="you dont have enough Friends" />
                </Search>
                <SidebarButton onClick={createChat}>
                    send message
                    </SidebarButton>
                    
                    {/*chats */}
                    
                    {chatSnapshot?.docs.map((chat) => (
                        <Chat key={chat.id} id ={chat.id} users={chat.data().users} />
                    ))}
            </Container>

        </div>
    )
}
export default Sidebar;
const Container=styled.div`
flex:0.45;
border-right:1px solid whitesmoke;
height:100vh;
min-width:300px;
max-width:350px;
overflow-y:scroll;
::-webkit-scrollbar{
    display:none;
    scrollbar-width:0px;
}
`;
const Header = styled.div`
display:flex;
position:sticky;

top:0;
justify-content:space-between;
align-items:center;
padding:10px;
height:80px;
border-bottom: 1px solid whitesmoke;`;
const UserAvater = styled(Avatar)`
cursor: pointer;
:hover{
opacity: 0.8;
}
`;
const IconContainer = styled.div``;
const Search = styled.div`
display:flex;
border-radius:2px;
align-items:center;
padding:20px;
`;

const SearchInput=styled.input`
outline-width:0px;

border:none;
flex:1;

`;
const SidebarButton= styled(Button)`
width:100%;
&&&{
border-top:1px solid black;
border-right:3px solid white;
border-left:3px solid white;
border-bottom:3px solid black}`;
