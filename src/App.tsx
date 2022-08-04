import "@/styles/app.css";
import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/router/AppRouter";
import Navbar from "./components/UI/navbar/Navbar";
import { AuthContext } from "./context";
import { useActions } from "./hooks/useActions";
import theme from "./theme";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setIsAuth, setUser } = useActions();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      //setIsAuth(true);
      const username = localStorage.getItem("username")!;
      setUser({ login: username, password: "" });
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ /* isAuth, setIsAuth, */ isLoading }}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <AppRouter />
        </BrowserRouter>
      </ChakraProvider>
    </AuthContext.Provider>
  );
}

export default App;
