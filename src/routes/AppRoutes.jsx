import PrivateRoute from "@/components/PrivateRoute";
import { PATH } from "@/constant/path";
import ResponsiveDrawer from "@/layout/MainLayout";
import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const LoadingScreen = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress size="3rem" />
  </div>
);

const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"));
const HomePage = lazy(() => import("@/pages/HomePage/HomePage"));
const DashboardPage = lazy(() => import("@/pages/Dashboard/DashboardPage"));
const UsersPage = lazy(() => import("@/pages/UsersPage/UsersPage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage/ProjectsPage"));
const TasksPage = lazy(() => import("@/pages/TasksPage/TasksPage"));
const Profile = lazy(() => import("@/pages/Profile/Profile"));
const ProjectDetail = lazy(
  () => import("@/pages/ProjectsPage/ProjectDetail/ProjectDetail"),
);
const PageNotFound = lazy(() => import("@/pages/PageNotFound/PageNotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<ResponsiveDrawer />}>
          <Route element={<PrivateRoute />}>
            <Route
              index
              path={PATH.HOME}
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path={PATH.DASHBOARD}
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <DashboardPage />
                </Suspense>
              }
            />
            <Route
              path={PATH.USERS}
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <UsersPage />
                </Suspense>
              }
            />
            <Route
              path={PATH.PROJECT}
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <ProjectsPage />
                </Suspense>
              }
            />
            <Route
              path={PATH.TASK}
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <TasksPage />
                </Suspense>
              }
            />
            <Route
              path={PATH.PROFILE}
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path={PATH.PROJECT_DETAIL}
              element={
                <Suspense fallback={<LoadingScreen />}>
                  <ProjectDetail />
                </Suspense>
              }
            />
          </Route>
        </Route>

        <Route
          path={PATH.LOGIN}
          element={
            <Suspense fallback={<LoadingScreen />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingScreen />}>
              <PageNotFound />
            </Suspense>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
