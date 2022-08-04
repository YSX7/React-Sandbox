import { all } from "redux-saga/effects";
import { countWatcher } from "./countSaga";
import { customerWatcher } from "./customerSaga";

export function* rootWatcher() {
  yield all([countWatcher(), customerWatcher()]);
}
