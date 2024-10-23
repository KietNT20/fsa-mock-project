// src/pages/DashboardPage.jsx

import { useSelector } from "react-redux";
import AdminDashboardPage from "./AdminDashboard/AdminDashboardPage";
import UserDashboardPage from "./UserDashboard/UserDashboardPage";

const DashboardPage = () => {
  const { userProfile } = useSelector((state) => state.userProfile);
  const userRole = userProfile?.role;
  return <>{userRole === 1 ? <AdminDashboardPage /> : <UserDashboardPage />}</>;
};

export default DashboardPage;
