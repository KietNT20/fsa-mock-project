import PrivateRoute from "@/components/PrivateRoute";
import { PATH } from "@/constant/path";
import MainLayout from "@/layout/MainLayout";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Add your routes here */}
        <Route element={<PrivateRoute />}>
          <Route index path={PATH.HOME} element={<HomePage />} />
        </Route>
        <Route path={PATH.LOGIN} element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
