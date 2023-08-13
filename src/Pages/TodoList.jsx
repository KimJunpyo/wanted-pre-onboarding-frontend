import axios from "axios";
import {useEffect, useState} from "react";

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [modifyTodo, setModifyTodo] = useState("");
  const [modifyTodoId, setModifyTodoId] = useState(null);

  const handleChangeData = (e, setState) => {
    setState(e.target.value);
  };

  const handleUpdateTodo = async (id, todo, isCompleted, type) => {
    let data = {};
    switch (type) {
      case "checkbox":
        data = {todo, isCompleted: !isCompleted};
        break;
      case "todo":
        data = {todo, isCompleted};
        break;
      default:
        alert("잘못된 수정 요청입니다.");
        break;
    }
    try {
      const response = await axios.put(
        `https://www.pre-onboarding-selection-task.shop/todos/${id}`,
        data,
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
      setTodoList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleModify = (todo, id) => {
    setModifyTodo(todo);
    setModifyTodoId(id);
  };

  const handleCancelModify = () => {
    setModifyTodoId(null);
  };

  useEffect(() => {
    getTodoData();
  }, []);

  return (
    <div>
      <input
        data-testid="new-todo-input"
        value={newTodo}
        onChange={(e) => handleChangeData(e, setNewTodo)}
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
                    handleUpdateTodo(
                      todo.id,
                      todo.todo,
                      todo.isCompleted,
                      "checkbox"
                    )
                  }
                />
                {modifyTodoId === todo.id ? (
                  <input
                    data-testid="modify-input"
                    value={modifyTodo}
                    onChange={(e) => handleChangeData(e, setModifyTodo)}
                  />
                ) : (
                  <span>{todo.todo}</span>
                )}
              </label>
              {modifyTodoId === todo.id ? (
                <>
                  <button
                    data-testid="submit-button"
                    onClick={() => {
                      handleCancelModify();
                      handleUpdateTodo(
                        todo.id,
                        modifyTodo,
                        todo.isCompleted,
                        "todo"
                      );
                    }}
                  >
                    제출
                  </button>
                  <button
                    data-testid="cancel-button"
                    onClick={handleCancelModify}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    data-testid="modify-button"
                    onClick={() => handleModify(todo.todo, todo.id)}
                  >
                    수정
                  </button>
                  <button data-testid="delete-button">삭제</button>
                </>
              )}
            </li>
          );
        })}
    </div>
  );
}

export default TodoList;
