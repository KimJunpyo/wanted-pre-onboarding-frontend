import axios from "axios";
import {useEffect, useState} from "react";

function TodoList() {
  const [todoList, setTodoList] = useState([]);

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
      <input data-testid="new-todo-input" />
      <button data-testid="new-todo-add-button">추가</button>
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 1</span>
        </label>
      </li>
    </div>
  );
}

export default TodoList;
