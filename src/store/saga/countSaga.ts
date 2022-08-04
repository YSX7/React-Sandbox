import {
  decrementCashAction,
  incrementCashAction,
} from "@/store/reducers/cash";
import { CashReducerActions } from "@/store/reducers/cash/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function* incrementWorker(action: PayloadAction<number>) {
  yield delay(1000);
  yield put(incrementCashAction(action.payload));
}

function* decrementWorker(action: PayloadAction<number>) {
  yield delay(1000);
  yield put(decrementCashAction(action.payload));
}

export function* countWatcher() {
  yield takeEvery(CashReducerActions.ASYNC_INCREMENT, incrementWorker);
  yield takeEvery(CashReducerActions.ASYNC_DECREMENT, decrementWorker);
}
