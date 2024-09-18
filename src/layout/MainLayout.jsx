import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="main">
      <Outlet />
    </main>
  );
};

export default MainLayout;
