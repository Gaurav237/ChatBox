
// show the chat name as user which is not logged in for 1-on-1 chat
export const getSender = (loggedUser, users) => {
    return (users[0]._id === loggedUser._id) ? users[1].name : users[0].name;
} 

// returns the user object as user which is not logged in for 1-on-1 chat
export const getSenderObject = (loggedUser, users) => {
    return (users[0]._id === loggedUser._id) ? users[1] : users[0];
} 