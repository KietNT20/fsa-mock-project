import { QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PATH } from "./constant/path";
import AppRoutes from "./routes/AppRoutes";
import tokenMethod from "./utils/token";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!tokenMethod.get()) {
      navigate(PATH.LOGIN, { replace: true });
    }
  }, []);

  return (
    <>
      <AppRoutes />
      <Toaster
        position="top-right"
        duration={3000}
        containerStyle={{
          marginRight: "100px",
          marginTop: "20px",
          transform: "translateX(-20px)",
        }}
        toastOptions={{
          success: {
            style: {
              padding: "25px",
              color: "#fff",
              fontSize: "1.4rem",
              backgroundColor: "#37DD9E",
            },
          },
          error: {
            style: {
              padding: "25px",
              color: "#fff",
              fontSize: "1.4rem",
              backgroundColor: "#e25454",
            },
          },
        }}
      />
    </>
  );
}

export default App;
