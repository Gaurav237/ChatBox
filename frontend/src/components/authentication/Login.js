import React, { useState } from 'react'
import { VStack, StackDivider, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }
    const submitHandler = () => {

    }


  return (
    <div>
        <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
        >
            <FormControl id='email' isRequired>
            <FormLabel>Email Id</FormLabel>
            <Input 
            placeholder='Enter here' 
            onChange={(e) => setEmail(e.target.value)}
            />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                    type= {showPassword ? 'text' : 'password'}
                    placeholder='Enter here'
                    onChange={(e) => setPassword(e.target.value)}
                    >
                    </Input>
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleTogglePassword}>
                        {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
            colorScheme='green'
            width='100%'
            style={{marginTop: 15}}
            onClick={submitHandler}
            >
                Sign In 
           </Button>

           <Button
           colorScheme='red'
           width='100%'
           onClick={() => {
            setEmail('guest@example.com')
            setPassword('12345')
           }}
           >
                Get Guest User Credentials
           </Button>
        </VStack>
    </div>
  )
}

export default Login