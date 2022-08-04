import MyButton from "@/components/UI/button/MyButton";
import MyInput from "@/components/UI/Input/MyInput";
import MyInputPassword from "@/components/UI/inputPassword/MyInputPassword";
import { useActions } from "@/hooks/useActions";
import useTypedSelector from "@/hooks/useTypedSelector";
import { Container, FormControl, FormErrorMessage } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";

//Страница логина
function Login() {
  //const { isAuth, setIsAuth } = useContext(AuthContext);
  const { isLoading, error } = useTypedSelector((state) => state.authReducer);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const { login } = useActions();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    //setIsAuth(true);
    login(username, password);
  };

  return (
    <Container>
      <h1>Введите логин и пароль</h1>

      <form onSubmit={submit}>
        <FormControl
          isInvalid={!isValidUsername || !isValidPassword || error !== ""}
          isRequired
        >
          {!isValidUsername && (
            <FormErrorMessage>Введите логин</FormErrorMessage>
          )}
          <MyInput
            onBlur={(e: ChangeEvent<HTMLInputElement>) => {
              setIsValidUsername(e.target!.value !== "");
            }}
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            type="text"
            isRequired
            isInvalid={!isValidUsername}
            placeholder="Логин"
            id="login"
          />
          {!isValidPassword && (
            <FormErrorMessage>Введите пароль, позязя</FormErrorMessage>
          )}
          <MyInputPassword
            onBlur={(e: ChangeEvent<HTMLInputElement>) => {
              setIsValidPassword(e.target!.value !== "");
            }}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            isRequired
            isInvalid={!isValidPassword}
            placeholder="Пароль"
            id="password"
          />
          {error !== "" && <FormErrorMessage>{error}</FormErrorMessage>}
          <MyButton isLoading={isLoading} type="submit">
            Войти
          </MyButton>
        </FormControl>
      </form>
    </Container>
  );
}

export default Login;
