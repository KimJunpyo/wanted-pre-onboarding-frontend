import { Route, Routes } from "react-router-dom"
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn"
import TodoList from "./Pages/TodoList";
import PrivateRouting from "./PrivateRouting";

function App () {
  return (
    <Routes>
      <Route element={<PrivateRouting isAuth={true} />}>
        <Route path="/todo" element={<TodoList />} />
      </Route>
      <Route element={<PrivateRouting isAuth={false} />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
