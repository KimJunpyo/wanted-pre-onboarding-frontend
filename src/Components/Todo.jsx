import {useState} from "react";
import TodoButton from "./TodoButton";
import Input from "./Input";
import {styled} from "styled-components";

function Todo({todoItem, handleUpdateTodo, handleDeleteTodo}) {
  const {id, isCompleted, todo} = todoItem;
  const [modifyTodo, setModifyTodo] = useState("");
  const [modifyTodoId, setModifyTodoId] = useState(null);

  const handleChangeData = (e, setState) => {
    setState(e.target.value);
  };

  const handleModify = (todo, id) => {
    setModifyTodo(todo);
    setModifyTodoId(id);
  };

  const handleCancelModify = () => {
    setModifyTodoId(null);
  };

  return (
    <TodoList>
      <TodoLabel>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => handleUpdateTodo(id, todo, isCompleted, "checkbox")}
        />
        {modifyTodoId === id ? (
          <Input
            testid="modify-input"
            value={modifyTodo}
            handleChangeFunc={(e) => handleChangeData(e, setModifyTodo)}
          />
        ) : (
          <TodoStyle>{todo}</TodoStyle>
        )}
      </TodoLabel>
      {modifyTodoId === id ? (
        <>
          <TodoButton
            type="primary"
            testid="submit-button"
            handleClickFunc={() => {
              handleCancelModify();
              handleUpdateTodo(id, modifyTodo, isCompleted, "todo");
            }}
          >
            제출
          </TodoButton>
          <TodoButton
            type="secondary"
            testid="cancel-button"
            handleClickFunc={handleCancelModify}
          >
            취소
          </TodoButton>
        </>
      ) : (
        <>
          <TodoButton
            type="primary"
            testid="modify-button"
            handleClickFunc={() => handleModify(todo, id)}
          >
            수정
          </TodoButton>
          <TodoButton
            type="secondary"
            testid="delete-button"
            handleClickFunc={() => handleDeleteTodo(id)}
          >
            삭제
          </TodoButton>
        </>
      )}
    </TodoList>
  );
}

const TodoStyle = styled.span`
  padding: 0 20px;
  font-size: 14px;
  color: #363636;
  border: 2px solid transparent;
`;

const TodoList = styled.li`
  border-bottom: 1px solid lightGray;
  padding: 5px 0;
  list-style: none;
  display: flex;
  align-items: center;
  height: 2rem;
`;

const TodoLabel = styled.label`
  display: flex;
  align-items: center;
`;

export default Todo;
