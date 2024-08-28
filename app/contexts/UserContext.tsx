"use client"
import { createContext, useState, ReactNode, useMemo } from "react";
import { signOutSuccess } from "../redux/userSlice";

interface UserContextType {
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const value = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

