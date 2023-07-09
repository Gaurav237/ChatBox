import React, { useState } from 'react'
import { VStack, StackDivider, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'

const SignUp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [profilePic, setProfilePic] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }   
    const postDetails = (pics) => {

    }
    const submitHandler = () => {

    }

  return (
    <div>
    <VStack
    divider={<StackDivider borderColor='gray.200' />}
    spacing={5}
    align='stretch'
    >
        <FormControl id='name' isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input 
            placeholder='Enter here'
            onChange={(e) => setName(e.target.value)} 
            />
        </FormControl>
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
        <FormControl id='password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input
                type= {showPassword ? 'text' : 'password'}
                placeholder='Enter here'
                onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Input>
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleTogglePassword}>
                    {showPassword ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='profile-pic'>
            <FormLabel>Upload your Picture</FormLabel>
            <Input
            type='file'
            p={1.5}
            accept='image/*'  /* accepts only image files */
            onChange={(e) => postDetails(e.target.files[0])} /* if user uploads multiple images, then just select 1st image */
            />
        </FormControl>

        <Button
        colorScheme='green'
        width='100%'
        style={{marginTop: 15}}
        onClick={submitHandler}
        >
            Sign Up
        </Button>
    </VStack>
    </div>
  )
}

export default SignUp
