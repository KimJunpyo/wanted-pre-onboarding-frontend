import axios from "axios";
import {useEffect, useState} from "react";

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleChangeData = (e) => {
    setNewTodo(e.target.value);
  };

  const handleClickCheck = async (id, todo, isCompleted) => {
    try {
      const response = await axios.put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        {todo, isCompleted: !isCompleted},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const updateTodoIdx = todoList.findIndex(
        (todo) => todo.id === response.data.id
      );
      setTodoList([
        ...todoList.slice(0, updateTodoIdx),
        response.data,
        ...todoList.slice(updateTodoIdx + 1),
      ]);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {todo: newTodo},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setTodoList([...todoList, response.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const getTodoData = async () => {
    try {
      const response = await axios.get(
        "https://www.pre-onboarding-selection-task.shop/todos",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response);
      setTodoList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

  return (
    <div>
      <input
        data-testid="new-todo-input"
        value={newTodo}
        onChange={handleChangeData}
      />
      <button data-testid="new-todo-add-button" onClick={handleCreateTodo}>
        추가
      </button>
      {todoList !== undefined &&
        todoList.length > 0 &&
        todoList.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onClick={() =>
                    handleClickCheck(todo.id, todo.todo, todo.isCompleted)
                  }
                />
                <span>{todo.todo}</span>
              </label>
            </li>
          );
        })}
    </div>
  );
}

export default TodoList;
