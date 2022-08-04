import { createContext } from "react";

export type AuthContextType = {
  /* isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>; */
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
