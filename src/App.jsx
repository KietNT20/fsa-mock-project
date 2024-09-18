import { QueryClient } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
