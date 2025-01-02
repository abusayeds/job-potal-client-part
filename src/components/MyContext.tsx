"use client"

import { getDecodedToken } from "@/utils/decodeToken";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

export const Context = createContext<any | null>(null);
const ContextProviders = ({ children }: { children: ReactNode }) => {
  const [reportModelIsOpen, setReportModelIsOpen] = useState(false);
  const [trianerInfo, setTrainerInfo] = useState()
  const [studioInfo, setSetStudioInfo] = useState()
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null)
  const getUser = () => {
    const user = getDecodedToken()
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  }
  const [authTitleData, setAuthTitleData] = useState<{
    title: string;
    forword: string;
    des: string;
    redirect?: string;
    back?: boolean;
  } | null>(null);
  return (
    <Context.Provider
      value={{
        isAuthOpen,
        setIsAuthOpen,
        authTitleData,
        setAuthTitleData,
        setReportModelIsOpen,
        reportModelIsOpen,
        studioInfo,
        trianerInfo,
        setSetStudioInfo,
        setTrainerInfo,
        user,
        getUser

      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMyContext = (): any => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default ContextProviders;
