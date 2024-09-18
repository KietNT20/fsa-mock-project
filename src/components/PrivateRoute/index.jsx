import { PATH } from "@/constant/path";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ redirectPath = PATH.LOGIN }) => {
  const isAuthenticated = false;
  if (!isAuthenticated) {
    return <Navigate replace to={redirectPath} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
