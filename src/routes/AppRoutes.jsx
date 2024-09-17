import { PATH } from "@/constant/path";
import MainLayout from "@/layout/MainLayout";
import LoginPage from "@/pages/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={PATH.HOME} element={<MainLayout />}>
        {/* Add your routes here */}
        <Route path={PATH.LOGIN} element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
