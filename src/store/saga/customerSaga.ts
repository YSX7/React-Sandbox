import {
  CustomerReducerActions,
  getManyCustomerAction,
} from "@/store/customerReducer";
import { put, takeEvery, call } from "redux-saga/effects";

const fetchCustomers = () =>
  fetch("https://jsonplaceholder.typicode.com/users");

function* fetchCustomerWorker() {
  const data: Response = yield call(fetchCustomers);
  const json: [] = yield call(() => new Promise((res) => res(data.json())));
  yield put(getManyCustomerAction(json));
}

export function* customerWatcher() {
  yield takeEvery(CustomerReducerActions.ASYNC_GET_MANY, fetchCustomerWorker);
}
