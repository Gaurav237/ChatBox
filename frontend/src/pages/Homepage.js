import React, { useEffect } from 'react';
import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import SignUp from '../components/authentication/SignUp';
import Login from '../components/authentication/Login';
import { useHistory } from 'react-router-dom';

const Homepage = () => {
  const history = useHistory();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // if userInfo is present then direct to ChatPage
    if(userInfo){
        history.push('/chat');
    }
  }, [history]);  // when history will change, this useEffect() will run again.

  return (
    <Container>
      <Box
      d='dlex'
      justifyContent='center'
      p='3'
      bg='white'
      m='40px 0 15px 0'
      borderRadius='10px'
      > 
        <Text
        textAlign={'center'}
        fontSize='4xl'
        fontFamily='Work sans'
        fontWeight='bold'
        >
          ChatBox
        </Text>
      </Box>
      <Box
      bg='white'
      w='100%'
      p='4'
      borderRadius='10px'
      >
        <Tabs isFitted variant='soft-rounded' colorScheme='green'>
          <TabList mb='1em'>
            <Tab>Sign-In</Tab>
            <Tab>Sign-Up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login /> 
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage;
