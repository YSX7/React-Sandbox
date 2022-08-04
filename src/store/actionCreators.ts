import * as CustomerActionCreator from "@/asyncAction/customers";
import * as TodoActionCreator from "@/asyncAction/todo";
import { AuthActionCreators } from "./reducers/auth/action-creators";

const actionCreators = {
  ...CustomerActionCreator,
  ...TodoActionCreator,
  ...AuthActionCreators,
};

export default actionCreators;
