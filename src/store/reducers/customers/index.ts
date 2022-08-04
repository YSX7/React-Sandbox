import {
  CustomerReducerActions,
  CustomerState,
  ICustomer,
} from "@/store/reducers/customers/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "redux";

const defaultState: CustomerState = {
  customers: [],
};

export const customerReducer: Reducer<
  CustomerState,
  PayloadAction<ICustomer | ICustomer[], CustomerReducerActions>
> = (state = defaultState, action) => {
  switch (action.type) {
    case CustomerReducerActions.ADD:
      return { ...state, customers: [...state.customers, ...state.customers] };
    case CustomerReducerActions.GET_MANY:
      console.log(action.payload);
      return {
        ...state,
        customers: [...state.customers, ...(action.payload as ICustomer[])],
      };
    case CustomerReducerActions.REMOVE:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const addCustomerAction = (payload: ICustomer) => ({
  type: CustomerReducerActions.ADD,
  payload,
});

export const getManyCustomerAction = (payload: ICustomer[]) => ({
  type: CustomerReducerActions.GET_MANY,
  payload,
});

export const sagaGetManyCustomerAction = () => ({
  type: CustomerReducerActions.ASYNC_GET_MANY,
  payload: [],
});

export const removeCustomerAction = (payload: ICustomer) => ({
  type: CustomerReducerActions.REMOVE,
  payload,
});
