import { QueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "./constant/path";
import { Toaster } from "react-hot-toast";
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
      <Toaster
        position= "top-right"
        duration=  {3000}
        containerStyle={{margin: "30px"}} 
        toastOptions={{
          success: {
            style: {
              padding: '16px',
              color: '#fff',
              backgroundColor: '#A1D6B2',
            } 
          },
          error: {style: {
            padding: '16px',
            color: '#fff',
            backgroundColor: '#D37676',
          }
        }}}
      />
    </>
  );
}

export default App;
