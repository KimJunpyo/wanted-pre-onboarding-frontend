import {useEffect, useState} from "react";
import {
  createTodo,
  deleteTodo,
  getTodoList,
  updateTodo,
} from "../Utils/TodoApis";
import Todo from "../Components/Todo";
import TodoButton from "../Components/TodoButton";
import Input from "../Components/Input";
import {styled} from "styled-components";

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleChangeData = (e, setState) => {
    setState(e.target.value);
  };

  const handleUpdateTodo = async (id, todo, isCompleted, type) => {
    try {
      const response = await updateTodo(id, todo, isCompleted, type);
      const updateTodoIdx = todoList.findIndex(
        (todo) => todo.id === response.data.id
      );
      setTodoList([
        ...todoList.slice(0, updateTodoIdx),
        response.data,
        ...todoList.slice(updateTodoIdx + 1),
      ]);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await createTodo(newTodo);
      setNewTodo("");
      setTodoList([...todoList, response.data]);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      const updateTodoIdx = todoList.findIndex((todo) => todo.id === id);

      setTodoList([
        ...todoList.slice(0, updateTodoIdx),
        ...todoList.slice(updateTodoIdx + 1),
      ]);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    const getTodoData = async () => {
      try {
        const response = await getTodoList();
        setTodoList(response.data);
      } catch (err) {
        alert(err.response.data.message);
      }
    };
    getTodoData();
  }, []);

  return (
    <div>
      <CreateTodoLabel>
        <Input
          testid="new-todo-input"
          value={newTodo}
          handleChangeFunc={(e) => handleChangeData(e, setNewTodo)}
        />
        <TodoButton
          type="primary"
          testid="new-todo-add-button"
          handleClickFunc={handleCreateTodo}
        >
          추가
        </TodoButton>
      </CreateTodoLabel>
      {todoList !== undefined &&
        todoList.length > 0 &&
        todoList.map((todo) => {
          return (
            <Todo
              key={todo.id}
              todoItem={todo}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          );
        })}
    </div>
  );
}

const CreateTodoLabel = styled.div`
  border-bottom: 1px solid Gray;
  padding: 5px 0;
`;

export default TodoList;
