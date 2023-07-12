import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/miscellaneous/MyChats";
import ChatWindow from "../components/miscellaneous/ChatWindow";

const Chatpage = () => {
  const { user } = ChatState();

    return (
        <div style={{width: '100%'}}>
          { user && <SideDrawer/> }
          <Box
            display='flex'
            justifyContent='space-between'
            w='100%'
            h='91.5vh'
            p='10px'
          >
            { user && <MyChats /> }
            { user && <ChatWindow /> }
          </Box>
        </div>
    )
}

export default Chatpage;
