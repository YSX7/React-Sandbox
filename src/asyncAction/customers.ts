import { getManyCustomerAction } from "@/store/reducers/customers/index";
import { CustomerPayloadAction } from "@/store/reducers/customers/types";

export const fetchCustomers = () => {
  return (dispatch: CustomerPayloadAction) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => dispatch(getManyCustomerAction(json)));
  };
};
