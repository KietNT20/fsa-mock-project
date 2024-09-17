import { QueryClient } from "@tanstack/react-query";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";

export const queryClient = new QueryClient();

function App() {
  return (
    <>
      <LoginPage />
    </>
  );
}

export default App;
