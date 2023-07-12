import React, { useState } from 'react';
import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, Avatar, MenuDivider } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user } = ChatState();
  const history = useHistory();

  console.log(user);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  return (
    // <div>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='white'
        w='100%'
        p='8px 10px 8px 10px'
        borderWidth='6px'
      >
      {/* Search SideBar */}
      <Tooltip 
        label='Search users to chat'
        hasArrow
      >
        <Button>
          <i className="fas fa-search" />
          <Text display={{base:'none', md:'flex'}} px={4}>
            Search User
          </Text>
        </Button>
      </Tooltip>

      <Text fontSize='3xl' fontFamily='Work sans'>
        ChatBox
      </Text>

      {/* notification menu  */}
      <div>
      <Menu>
        <MenuButton pr='8' >
          <BellIcon boxSize='7' />
        </MenuButton>
        <MenuList>
          <MenuItem>notification 1</MenuItem>
          <MenuItem>notification 2</MenuItem>
        </MenuList>
      </Menu>

      {/* profile menu  */}
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
          <Avatar 
            size='sm' 
            name= {user.name}
            src= {user.pic} 
          />
          <Text>
          </Text>
        </MenuButton>
        <MenuList>

          <ProfileModal user={user}>
            <MenuItem>My Profile</MenuItem>
          </ProfileModal>  
 
          <MenuDivider/>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </MenuList>
      </Menu>
      </div>
    </Box>
    // </div>
  )
}

export default SideDrawer;