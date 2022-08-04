import { PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "redux";

export interface IFetchedTodo {
  headers: Headers;
  json: ITodo[];
}

export interface ITodo {
  title: string;
  id: number;
}

export interface ITodoState {
  todos: IFetchedTodo;
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
}

export enum TodoActionTypes {
  FETCH = "FETCH_TODOS",
  FETCH_SUCCESS = "FETCH_TODOS_SUCCES",
  FETCH_ERROR = "FETCH_TODOS_ERROR",
  SET_PAGE = "SET_TODO_PAGE",
}

export interface ITodoActionPayload {
  type: TodoActionTypes;
  payload?: any[] | string | number | IFetchedTodo;
}

export type ITodoAction = Dispatch<
  PayloadAction<
    any[] | string | number | undefined | IFetchedTodo,
    TodoActionTypes
  >
>;

export interface IFetchTodoAction extends ITodoAction {
  type: TodoActionTypes.FETCH;
}

export interface IFetchTodoSuccessAction extends ITodoAction {
  type: TodoActionTypes.FETCH_SUCCESS;
  payload: IFetchedTodo;
}

export interface IFetchTodoErrorAction extends ITodoAction {
  type: TodoActionTypes.FETCH_ERROR;
  payload: string;
}

export interface ISetTodoPageAction extends ITodoAction {
  type: TodoActionTypes.SET_PAGE;
  payload: number;
}
