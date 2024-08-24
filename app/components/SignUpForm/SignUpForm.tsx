import { Box, Button } from "@mui/material";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "@/app/utils/firebase/firebase.utils";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { FirebaseError } from "firebase/app";

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
        setFormState(defaultFormState);
      }
    } catch (error) {
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
    <Box>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Display name</label>
        <input
          id="name"
          type="text"
          required
          onChange={handleChange}
          name="name"
          value={name}
        />
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          required
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>

      {/* Display error messages */}
      <ErrorMessage message={errorMessage} />
    </Box>
  );
};

export default SignUpForm;
