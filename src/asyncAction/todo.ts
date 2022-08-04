import { TodosActions } from "@/store/reducers/todos";
import { IFetchedTodo, ITodo, ITodoAction } from "@/store/reducers/todos/types";

export const fetchTodos = (page = 1, limit = 10) => {
  return (dispatch: ITodoAction) => {
    dispatch(TodosActions.fetchTodos());
    fetch(
      "https://jsonplaceholder.typicode.com/todos?" +
        new URLSearchParams({
          _page: page.toString(),
          _limit: limit.toString(),
        })
    )
      .then((response) => {
        console.log(response);
        return response.json().then((json: ITodo[]) => ({
          headers: response.headers,
          json,
        }));
      })
      .then((response: IFetchedTodo) => {
        dispatch(TodosActions.fetchSuccess(response));
      })
      .catch((error) => {
        dispatch(TodosActions.fetchError(error));
      });
  };
};

export const setTodoPage = (page: number) => {
  return (dispatch: ITodoAction) => {
    dispatch(TodosActions.setPage(page));
  };
};
