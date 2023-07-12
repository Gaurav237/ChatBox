import { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Create a new context for the chat feature
const ChatContext = createContext();

// Define the ChatProvider component   
export const ChatProvider = ({children}) => {
    // State variable to store user information
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        // Retrieve user information from localStorage
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        // Update the user state with the retrieved information
        setUser(userInfo);

    // If user info is not available, redirect to the homepage
        if(!userInfo){
            history.push('/');
        }
    }, [history]);  // when history will change, this useEffect() will run again.

    return (
        <ChatContext.Provider value={{user, setUser}}>
            {children}
        </ChatContext.Provider>
    )
}

// Define the ChatState hook to access the chat state
export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;