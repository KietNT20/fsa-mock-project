import { QueryClient } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage/LoginPage";
import AppRoutes from "./routes/AppRoutes";

export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AppRoutes />
      <LoginPage />
    </>
  );
}

export default App;
