import {
  AuthActionsEnum,
  SetErrorAction,
  SetIsAuthAction,
  SetIsLoadingAction,
  SetUserAction,
} from "./types";
import { IUser } from "@/models/IUser";
import { AppDispatch } from "@/store";
import axios from "axios";
import UserService from "@/API/UserService";

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({
    type: AuthActionsEnum.SET_USER,
    payload: user,
  }),
  setIsAuth: (isAuth: boolean): SetIsAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload: isAuth,
  }),
  setError: (error: string): SetErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload: error,
  }),
  setIsLoading: (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionsEnum.SET_IS_LOADING,
    payload: isLoading,
  }),
  login: (login: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setError(""));
      dispatch(AuthActionCreators.setIsLoading(true));
      setTimeout(async () => {
        const response = await UserService.getUsers();
        const mockUser = response.data.find(
          (elem) => elem.login === login && elem.password === password
        );
        if (mockUser) {
          localStorage.setItem("auth", "true");
          localStorage.setItem("username", login);
          dispatch(AuthActionCreators.setIsAuth(true));
          dispatch(AuthActionCreators.setUser(mockUser));
        } else {
          dispatch(
            AuthActionCreators.setError("Неккоректный логин или пароль")
          );
        }
        dispatch(AuthActionCreators.setIsLoading(false));
      }, 1000);
    } catch (e) {
      dispatch(AuthActionCreators.setError(`Ошибка при логине: ${e}`));
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    try {
      localStorage.removeItem("auth");
      localStorage.removeItem("username");
      dispatch(AuthActionCreators.setIsAuth(false));
      dispatch(AuthActionCreators.setUser({} as IUser));
    } catch (e) {
      dispatch(AuthActionCreators.setError(`Ошибка при логауте: ${e}`));
    }
  },
};
