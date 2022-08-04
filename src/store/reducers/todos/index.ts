import {
  IFetchedTodo,
  ITodoActionPayload,
  ITodoState,
  TodoActionTypes,
} from "@/store/reducers/todos/types";

const initialState: ITodoState = {
  todos: { headers: new Headers(), json: [] },
  loading: false,
  page: 1,
  error: null,
  limit: 10,
};

export const todo = (
  state = initialState,
  action: ITodoActionPayload
): ITodoState => {
  switch (action.type) {
    case TodoActionTypes.FETCH:
      return { ...state, loading: true };
    case TodoActionTypes.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload as string };
    case TodoActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload as IFetchedTodo,
      };
    case TodoActionTypes.SET_PAGE:
      return { ...state, loading: true, page: action.payload as number };
    default:
      return state;
  }
};

export const TodosActions = {
  fetchTodos: () => ({
    type: TodoActionTypes.FETCH,
    payload: undefined,
  }),

  fetchError: (payload: string) => ({
    type: TodoActionTypes.FETCH_ERROR,
    payload,
  }),

  fetchSuccess: (payload: IFetchedTodo) => ({
    type: TodoActionTypes.FETCH_SUCCESS,
    payload,
  }),

  setPage: (payload: number) => ({
    type: TodoActionTypes.SET_PAGE,
    payload,
  }),
};
