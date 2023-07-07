import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chatpage = () => {
    // setChats is for setting chats value in State
    // chats is used for fetching chats data
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        // axios used for makin asynchronous http requests
        const {data} = await axios.get('/api/chat');
        setChats(data);
    }

    // used hook for calling fetchChats after 
    // this Chatpage component is rendered
    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>
          { chats.map((chat) => {
            return (
            <div key={chat._id}> { chat.chatName } </div>
          )})}
        </div>
    )
}

export default Chatpage;
