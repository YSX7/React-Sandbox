import { useActions } from "@/hooks/useActions";
import { RootReducer } from "@/store";
import { getPageCount } from "@/utils/pages";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Pagination from "./UI/pagination/Pagination";
import Spinner from "./UI/spinner/spinner";

type Props = {};

const TodoList: React.FC = (props: Props) => {
  const todoState = useSelector((state: RootReducer) => state.todo);
  const { fetchTodos, setTodoPage } = useActions();

  useEffect(() => {
    fetchTodos(todoState.page, todoState.limit);
  }, [todoState.page]);

  const changePage = (page: number) => {
    setTodoPage(page);
  };

  if (todoState.loading) return <Spinner />;
  else if (todoState.error)
    return (
      <React.Fragment>
        <h1>Ошибка!</h1>
        <h2>{todoState.error}</h2>
      </React.Fragment>
    );
  else {
    //console.log(...todoState.todos.headers);
    return (
      <React.Fragment>
        {todoState.todos.json.map((todo) => (
          <div key={todo.id}>
            {todo.id} {todo.title}
          </div>
        ))}
        <Pagination
          totalPages={getPageCount(
            parseInt(todoState.todos.headers.get("x-total-count")!),
            todoState.limit
          )}
          page={todoState.page}
          changePage={changePage}
        />
      </React.Fragment>
    );
  }
};

export default TodoList;
