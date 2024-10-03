import { PATH } from "@/constant/path";
import tokenMethod from "@/utils/token";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ redirectPath = PATH.LOGIN }) => {
  if (!tokenMethod.get()?.access_token) {
    return <Navigate replace to={redirectPath} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
