import PrivateRoute from "@/components/PrivateRoute";
import { PATH } from "@/constant/path";
import MainLayout from "@/layout/MainLayout";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import Profile from "@/pages/Profile/Profile";
import ProjectDetail from "@/pages/ProjectsPage/ProjectDetail/ProjectDetail";
import ProjectsPage from "@/pages/ProjectsPage/ProjectsPage";
import TasksPage from "@/pages/TasksPage/TasksPage";
import UsersPage from "@/pages/UsersPage/UsersPage";
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
          <Route index path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.PROJECT_DETAIL} element={<ProjectDetail />} />
        </Route>
      </Route>
      <Route path={PATH.LOGIN} element={<LoginPage />} />
    </Routes>
  );
};
export default AppRoutes;
