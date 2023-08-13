import {Navigate, Outlet} from "react-router-dom";

function PrivateRouting({isAuth}) {
  const accessToken = localStorage.getItem("accessToken");
  if (isAuth) {
    return accessToken !== null ? <Outlet /> : <Navigate to="/signin" />;
  }
  return accessToken !== null ? <Navigate to="/todo" /> : <Outlet />;
}

export default PrivateRouting;
