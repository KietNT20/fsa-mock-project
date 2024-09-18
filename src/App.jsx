import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

export const queryClient = new QueryClient();

function App() {
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
