import { PATH } from "@/constant/path";
import { loginUser } from "@/services/authService";
import tokenMethod from "@/utils/token";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: doLoginUser, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (response) => {
      // Assuming the response contains user data
      const userData = response;
      console.log("Login Success:", userData);
      queryClient.setQueryData(["user"], userData);
      tokenMethod.set(userData);
      navigate(PATH.HOME, { replace: true });
    },
    onError: (err) => {
      console.error("Login Error:", err);
      // alert("Login failed");
    },
  });

  return { doLoginUser, isPending };
};
