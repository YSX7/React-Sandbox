import { CashReducerActions, CashState } from "@/store/reducers/cash/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { Reducer } from "redux";

const defaultState: CashState = {
  amount: 0,
};

export const cashReducer: Reducer<CashState, PayloadAction<number>> = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case CashReducerActions.INCREMENT:
      return { ...state, amount: state.amount + action.payload };
    case CashReducerActions.DECREMENT:
      return { ...state, amount: state.amount - action.payload };
    default:
      return state;
  }
};

export const incrementCashAction = (payload: number) => ({
  type: CashReducerActions.INCREMENT,
  payload,
});

export const asyncIncrementCashAction = (payload: number) => ({
  type: CashReducerActions.ASYNC_INCREMENT,
  payload,
});

export const decrementCashAction = (payload: number) => ({
  type: CashReducerActions.DECREMENT,
  payload,
});

export const asyncDecrementCashAction = (payload: number) => ({
  type: CashReducerActions.ASYNC_DECREMENT,
  payload,
});
