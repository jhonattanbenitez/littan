import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChangeListener } from "@/app/utils/firebase/firebase.utils";
import { signInSuccess, signOutSuccess } from "../redux/userSlice";

export const useAuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(signInSuccess({ uid, email }));
      } else {
        dispatch(signOutSuccess());
      }
    });

    return () => unsubscribe; // Cleanup the listener on unmount
  }, [dispatch]);
};
