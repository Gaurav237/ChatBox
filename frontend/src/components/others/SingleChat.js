import React from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon, ChatIcon } from '@chakra-ui/icons';
import { getSender, getSenderObject } from '../../config/ChatMethods';
import ProfileModal from '../miscellaneous/ProfileModal'

const SingleChat = ({fetchAgain, setFetchAgain}) => {
  const { user, selectedChat, setSelectedChat } = ChatState(); 

  return (
    <>
    { selectedChat &&  
    <>

    <Box
     fontSize={{ base: "28px", md: "30px" }}
     pb={3} px={2}
     w="100%"
     fontFamily="Work sans"
     display="flex"
     justifyContent={{ base: "space-between" }}
     alignItems="center"
    >
      <IconButton
        display={'flex'}
        icon={<ArrowBackIcon />}
        onClick={() => setSelectedChat("")}
      />
      {/* for 1 on 1 chat  */}
      { !selectedChat.isGroupChat && 
        <>
        <Text> {getSender(user, selectedChat.users)} </Text>
        <ProfileModal user={getSenderObject(user, selectedChat.users)}/>
        </>
      }

      {/* for group chat  */}
      { selectedChat.isGroupChat &&
        <>
        {selectedChat.chatName.toUpperCase()}
        </>
      }
    </Box>
    </>
    }
    
    {/* if no chat is selected then show a message, to select a chat  */}
    { !selectedChat && 
        <Box display="flex" flexDirection='column' alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" p={4} fontFamily="Work sans">
            Click on a chat to start chatting <ChatIcon ml={3}/>
          </Text>
        </Box> 
    }
    </>
  )
}

export default SingleChat;