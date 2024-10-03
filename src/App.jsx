import { QueryClient } from "@tanstack/react-query";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { firebaseConfig } from "./config/firebase";
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

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
              backgroundColor: "#A1D6B2",
            },
          },
          error: {
            style: {
              padding: "25px",
              color: "#fff",
              fontSize: "1.4rem",
              backgroundColor: "#D37676",
            },
          },
        }}
      />
    </>
  );
}

export default App;
