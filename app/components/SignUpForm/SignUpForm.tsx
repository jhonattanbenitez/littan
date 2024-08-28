import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "@/app/utils/firebase/firebase.utils";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { FirebaseError } from "firebase/app";
import FormInput from "../FormInput/FormInput"; 
import CustomButton from "../CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { signInSuccess } from "@/app/redux/userSlice";

const defaultFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formState, setFormState] = useState(defaultFormState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { name, email, password, confirmPassword } = formState;
  const dispatch = useDispatch(); // Redux dispatch

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    // Password length validation
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      // Pass name as displayName
      const userCredential = await createAuthUserWithEmailAndPassword(
        email,
        password,
        name
      );

      if (userCredential) {
        console.log("User created successfully:", userCredential);
        // Reset form state only after a successful sign-up
        const { uid, email } = userCredential.user;
        dispatch(signInSuccess({ uid, email })); // Only dispatch serializable
        setFormState(defaultFormState);
      }
    } catch (error: FirebaseError | Error | unknown) {
        // Ensure the error is a FirebaseError
        if (error instanceof FirebaseError) {
            if (error.code === "auth/email-already-in-use") {
                setErrorMessage("Email already in use");
            } else {
                setErrorMessage(error.message);
            }
        } else if (error instanceof Error) {
            setErrorMessage(error.message);
        } else {
            setErrorMessage("An unknown error occurred");
        }
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      mt: 4
    }}>
      <Typography component={'h2'} sx={{margin: '10px 0', fontSize: 18, fontWeight: 'bold' }}>Don&apos;t have an account?</Typography>
      <Box component={'span'} sx={{fontSize: 16}}>Sign up with your email and password</Box>
      <form onSubmit={handleSubmit}>
        <FormInput
          id="name"
          label="Display name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <FormInput
          id="email"
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        />
  
        <CustomButton type="submit" buttonType="default" sx={{ mt: 2 }}>Sign Up</CustomButton>
      </form>
      {/* Display error messages */}
      <ErrorMessage message={errorMessage} />
    </Box>
  );
};

export default SignUpForm;
