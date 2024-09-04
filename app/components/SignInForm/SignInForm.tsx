import { Box, Typography } from "@mui/material";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FormInput from "../FormInput/FormInput";
import CustomButton from "../CustomButton/CustomButton";
import {
  createUserDocumentFromAuth,
  signInWithEmailAndPasswordHandler,
  signInWithGooglePopup,
} from "@/app/utils/firebase/firebase.utils";
import { FirebaseError } from "firebase/app"; 
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../redux/userSlice";
import { useRouter } from "next/navigation";

const defaultFormState = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formState, setFormState] = useState(defaultFormState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { email, password } = formState;
  const dispatch = useDispatch(); // Redux dispatch
  const router = useRouter(); // Initialize the useRouter hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const SignInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      const { uid, email } = user;
      await createUserDocumentFromAuth(user);
      dispatch(signInSuccess({ uid, email })); // Only dispatch serializable values
      router.push("/"); // Redirect to homepage after successful sign-in
    } catch (error: any) {
      // Handle errors using a general approach
      const errorMessage =
        error instanceof FirebaseError
          ? "Google Sign-In failed. Try again."
          : "An unknown error occurred during Google Sign-In.";
      setErrorMessage(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const userCredential = await signInWithEmailAndPasswordHandler(
        email,
        password
      );
      if (userCredential) {
        const { uid, email } = userCredential.user;
        dispatch(signInSuccess({ uid, email })); // Only dispatch serializable values
        router.push("/"); // Redirect to homepage after successful sign-in
      }
    } catch (error: any) {
      const errorMessage =
        error instanceof FirebaseError
          ? "Invalid Credentials"
          : "An unknown error occurred during sign-in.";
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        mt: 4,
      }}
    >
      <Typography
        component={"h2"}
        sx={{ margin: "10px 0", fontSize: 18, fontWeight: "bold" }}
      >
        I already have an account
      </Typography>
      <Box component={"span"} sx={{ fontSize: 16 }}>
        Sign in with your email and password
      </Box>
      <form onSubmit={handleSubmit}>
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            gap: "16px",
          }}
        >
          <CustomButton type="submit" buttonType="default">
            Sign In
          </CustomButton>
          <CustomButton
            type="button"
            buttonType="google"
            onClick={SignInWithGoogle}
          >
            Sign In with Google
          </CustomButton>
        </Box>
      </form>
      {/* Display error messages */}
      <ErrorMessage message={errorMessage} />
    </Box>
  );
};

export default SignInForm;
