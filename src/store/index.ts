import { applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { combineReducers, createStore } from "@reduxjs/toolkit";
import { cashReducer as cash } from "./reducers/cash";
import { customerReducer as customer } from "./reducers/customers";
import thunk from "redux-thunk";
import { CashState } from "@/store/reducers/cash/types";
import { CustomerState } from "@/store/reducers/customers/types";
import { todo } from "./reducers/todos";
import { ITodoState } from "@/store/reducers/todos/types";
import { authReducer } from "./reducers/auth";
import { AuthState } from "./reducers/auth/types";

export type RootReducer = {
  cash: CashState;
  customer: CustomerState;
  todo: ITodoState;
  authReducer: AuthState;
};

//const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers<RootReducer>({
  cash,
  customer,
  todo,
  authReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) //REDUX THUNK
  //applyMiddleware(sagaMiddleware) //REDUX SAGA
);

//sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
