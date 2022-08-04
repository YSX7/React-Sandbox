//import { fetchCustomers } from "@/asyncAction/customers";
import CounterRedux from "@/components/CounterRedux";
import MyButton from "@/components/UI/button/MyButton";
import {
  addCustomerAction,
  removeCustomerAction,
  sagaGetManyCustomerAction,
} from "@/store/reducers/customers/index";
import { RootReducer } from "@/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomerPayloadAction,
  CustomerState,
  ICustomer,
} from "@/store/reducers/customers/types";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { useActions } from "@/hooks/useActions";
import TodoList from "@/components/TodoList";
import { Heading } from "@chakra-ui/react";

type ReduxProps = {};

const Redux = (props: ReduxProps) => {
  const customers = useSelector(
    (state: RootReducer) => state.customer.customers
  );
  const { fetchCustomers } = useActions();

  const dispatch = useDispatch<
    CustomerPayloadAction &
      ThunkDispatch<CustomerState, unknown, Action<ICustomer>>
  >(); // <Dispatch<AnyAction>>
  //ThunkDispatch<CustomerState, unknown, Action<ICustomer>>

  const addCustomer = (name: string) => {
    const customer = { name, id: Date.now() };
    dispatch(addCustomerAction(customer));
  };

  const getCustomers = () => {
    fetchCustomers();
  };

  const sagaGetCustomers = () => {
    dispatch(sagaGetManyCustomerAction());
  };

  const removeCustomer = (customer: ICustomer) => {
    dispatch(removeCustomerAction(customer));
  };

  return (
    <div>
      <Heading>Redux Test Page</Heading>
      <div>
        <CounterRedux />
        <hr />
        <div>
          <MyButton
            onClick={() => {
              addCustomer(prompt() as string);
            }}
          >
            Добавить клиента
          </MyButton>
          <MyButton onClick={() => getCustomers()}>Получить клиентов</MyButton>
          <MyButton onClick={() => sagaGetCustomers()}>
            SAGA Получить клиентов
          </MyButton>
        </div>
        {customers.length > 0 ? (
          <div className="customers" style={{ textAlign: "center" }}>
            {customers.map((customer) => (
              <h3
                onClick={() => {
                  removeCustomer(customer);
                }}
                key={customer.id}
              >
                {customer.name}
              </h3>
            ))}
          </div>
        ) : (
          <h2 style={{ marginTop: "10px" }}>Клиентов нет 😭🚫💰</h2>
        )}
      </div>
      <hr />
      <TodoList />
    </div>
  );
};

export default Redux;
