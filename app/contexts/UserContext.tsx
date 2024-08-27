"use client"
import { createContext, useState, ReactNode, useMemo } from "react";

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

  console.log("UserProvider initialized with value:", value);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

