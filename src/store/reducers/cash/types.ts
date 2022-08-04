export enum CashReducerActions {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  ASYNC_INCREMENT = "ASYNC_INCREMENT",
  ASYNC_DECREMENT = "ASYNC_DECREMENT",
}

export type CashState = {
  amount: number;
};
