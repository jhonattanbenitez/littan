"use client"
import { Box, Button } from '@mui/material'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
import React from 'react'

const SignIn = () => {
  const logGoogleUser = async () => { 
    const {user} = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user);
  }
  return (
    <Box sx={{mt: 10}}>      
        <Button onClick={logGoogleUser}>Sign In With Google</Button>
    </Box>
  )
}

export default SignIn
