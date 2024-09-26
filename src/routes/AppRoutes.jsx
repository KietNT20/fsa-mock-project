import PrivateRoute from "@/components/PrivateRoute";
import { PATH } from "@/constant/path";
import MainLayout from "@/layout/MainLayout";
import DashboardPage from "@/pages/HomePage/Contents/DashboardPage";
import ProjectsPage from "@/pages/HomePage/Contents/project/ProjectsPage";
import TasksPage from "@/pages/HomePage/Contents/TasksPage";
import UsersPage from "@/pages/HomePage/Contents/UsersPage";
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
          <Route index path={PATH.DASHBOARD} element={<DashboardPage />} />
          <Route index path={PATH.USERS} element={<UsersPage />} />
          <Route index path={PATH.PROJECT} element={<ProjectsPage />} />
          <Route index path={PATH.TASK} element={<TasksPage />} />
        </Route>
      </Route>
      <Route path={PATH.LOGIN} element={<LoginPage />} />
    </Routes>
  );
};
export default AppRoutes;
