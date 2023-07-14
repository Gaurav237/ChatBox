import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon, ChatIcon } from '@chakra-ui/icons';
import { getSender, getSenderObject } from '../../config/ChatMethods';
import ProfileModal from '../miscellaneous/ProfileModal'
import UpdateGroupChatModal from '../miscellaneous/UpdateGroupChatModal';

const SingleChat = ({fetchAgain, setFetchAgain}) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  const sendMessage = () => {
    
  }

  const typingHandler = () => {

  }

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
        <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        </>
      }
    </Box>

    <Box
      display="flex"
      flexDir="column"
      justifyContent="flex-end"
      p={3}
      bg="#E8E8E8"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden"
    >
      {loading ? (
        <Spinner size={'xl'} w={20} h={20} margin={'auto'} color={'teal'} thickness='6px' />
      ): (
        <>
          <div>
            {/* Messages */}
          </div>
        </>
      )}

      <FormControl onKeyDown={sendMessage} mt={3} isRequired>
        <Input
          variant="filled"
          bg="white"
          placeholder="Enter a message.."
          value={newMessage}
          onChange={typingHandler}
        />
      </FormControl>
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