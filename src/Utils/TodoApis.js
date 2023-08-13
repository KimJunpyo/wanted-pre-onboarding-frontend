import axiosInstance from "./axiosInstance";

export const getTodoList = () => {
  return axiosInstance.get(
    "todos"
  );
}

export const createTodo = (todo) => {
  const data = {todo}
  return axiosInstance.post(
    "todos",
    data
  );
}

export const updateTodo = (id, todo, isCompleted, type) => { 
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
  
  return axiosInstance.put(
    `todos/${id}`,
    data
  );
}

export const deleteTodo = (id) => {
  return axiosInstance.delete(
    `todos/${id}`,
    {
      data: {},
    }
  );
}