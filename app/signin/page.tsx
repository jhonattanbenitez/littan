"use client"
import { Box, Button } from '@mui/material'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
import React from 'react'
import SignUpForm from '../components/SignUpForm/SignUpForm';

const SignIn = () => {
  const logGoogleUser = async () => { 
    const {user} = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user);
  }
  return (
    <Box sx={{mt: 10}}>      
        <Button onClick={logGoogleUser}>Sign In With Google</Button>
        <SignUpForm />
    </Box>
  )
}

export default SignIn
