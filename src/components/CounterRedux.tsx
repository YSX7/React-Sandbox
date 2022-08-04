import { RootReducer } from "@/store";
import {
  asyncDecrementCashAction,
  asyncIncrementCashAction,
  decrementCashAction,
  incrementCashAction,
} from "@/store/reducers/cash";
import { CashReducerActions } from "@/store/reducers/cash/types";
import {
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "./UI/button/MyButton";

const CounterRedux = () => {
  const [cashIncrement, setCashIncrement] = useState<number>(15);
  const dispatch = useDispatch();
  const cashCount = useSelector((state: RootReducer) => state.cash.amount);

  function increment(cash: number) {
    dispatch({ type: CashReducerActions.INCREMENT, payload: cash });
  }

  function decrement(cash: number) {
    dispatch({ type: CashReducerActions.DECREMENT, payload: cash });
  }

  return (
    <div style={{ display: "flex", marginTop: "10px", gap: "5px" }}>
      <h2>{cashCount}</h2>
      <NumberInput
        defaultValue={15}
        step={15}
        value={cashIncrement}
        onChange={(_, number) => setCashIncrement(number)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <MyButton
        onClick={() => {
          increment(cashIncrement);
        }}
      >
        +
      </MyButton>
      <MyButton
        onClick={() => {
          decrement(cashIncrement);
        }}
      >
        -
      </MyButton>
      <MyButton
        onClick={() => {
          dispatch(asyncIncrementCashAction(cashIncrement));
        }}
      >
        SAGA +
      </MyButton>
      <MyButton
        onClick={() => {
          dispatch(asyncDecrementCashAction(cashIncrement));
        }}
      >
        SAGA -
      </MyButton>
    </div>
  );
};

export default CounterRedux;
