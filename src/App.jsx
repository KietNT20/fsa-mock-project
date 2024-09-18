import { QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "./constant/path";
import AppRoutes from "./routes/AppRoutes";
import tokenMethod from "./utils/token";

export const queryClient = new QueryClient();

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (tokenMethod.get()?.access_token) {
      navigate(PATH.HOME, { replace: true });
    }
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
