import { Dispatch, PayloadAction } from "@reduxjs/toolkit";

export enum CustomerReducerActions {
  ADD = "ADD",
  REMOVE = "REMOVE",
  GET_MANY = "GET_MANY",
  ASYNC_GET_MANY = "ASYNC_GET_MANY",
}

export interface ICustomer {
  id: number;
  name: string;
}

export type CustomerState = {
  customers: Array<ICustomer>;
};

export type CustomerPayloadAction = Dispatch<
  PayloadAction<ICustomer[] | ICustomer, CustomerReducerActions>
>;
