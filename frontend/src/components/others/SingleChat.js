import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon, ChatIcon } from '@chakra-ui/icons';
import { getSender, getSenderObject } from '../../config/ChatMethods';
import ProfileModal from '../miscellaneous/ProfileModal'
import UpdateGroupChatModal from '../miscellaneous/UpdateGroupChatModal';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import '../style.css';

const SingleChat = ({fetchAgain, setFetchAgain}) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();

  const fetchMessages = async() => {
    if(!selectedChat) return;

    try{
      setLoading(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.get(
        `/api/messages/${selectedChat._id}`,
        config
      );

      setMessages(data);
    }catch(err) {
      console.log(err);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (event) => {

    if(event.key === 'Enter' && newMessage){
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`
          }
        };

        const { data } = await axios.post(
          `/api/messages`, 
          {
            content: newMessage,
            chatId: selectedChat._id
          }, 
          config
        );
        
        setMessages([...messages, data]);
      }catch(err) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
      setNewMessage("");
    }
  }

  const typingHandler = (event) => {
    setNewMessage(event.target.value);
    // Typing Indicator Logic
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
        <UpdateGroupChatModal fetchMessages={fetchMessages} fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
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
          <div className='messages'>
            <ScrollableChat messages={messages}/>
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