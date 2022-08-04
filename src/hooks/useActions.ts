import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreators from "@/store/actionCreators";

/** Креатор должен возвращать Async функцию */
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(ActionCreators, dispatch);
};
