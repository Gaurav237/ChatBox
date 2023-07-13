import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { Box, Button, Stack, useToast, Text } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from '../others/ChatLoading';
import { getSender } from '../../config/ChatMethods';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const {user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async() => {
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.get('/api/chat', config);
      console.log(data);
      setChats(data);
    }catch(err) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="xl"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
      {
        chats ?
        (
          <Stack overflowY='scroll'>
            {chats.map((chat) => {
              return <Box 
                onClick={() => setSelectedChat(chat)}
                cursor='pointer'
                bg={selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
                color={selectedChat === chat ? "white" : "black"}
                px={3} py={2}
                borderRadius='lg'
                key={chat._id}
              >
                <Text>
                  {
                  chat.isGroupChat 
                  ? (chat.chatName) 
                  : getSender(loggedUser, chat.users) 
                  }
                </Text>
              </Box>
            })}
          </Stack>
        ) 
        : (
          <ChatLoading />
        )
        
      }
      </Box>
    </Box>
  )
}

export default MyChats;