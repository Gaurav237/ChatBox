import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
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
    <div>
      My Chats
    </div>
  )
}

export default MyChats;