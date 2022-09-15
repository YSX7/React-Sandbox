import * as CustomerActionCreator from "@/asyncAction/customers";
import * as TodoActionCreator from "@/asyncAction/todo";
import { AuthActionCreators } from "./reducers/auth/action-creators";
import { EventActionCreators } from "./reducers/event/action-creators";

const actionCreators = {
  ...CustomerActionCreator,
  ...TodoActionCreator,
  ...AuthActionCreators,
  ...EventActionCreators,
};

export default actionCreators;
