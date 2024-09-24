import { PATH } from "@/constant/path";
import { loginUser } from "@/store/actions/authAction";
import { saveProfile } from "@/store/actions/profileAction";
import tokenMethod from "@/utils/token";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { mutate: doLoginUser, isPending: loginLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }) => {
      return dispatch(loginUser({ email, password }));
    },

    onSuccess: (response) => {
      response = { ...response, ...user };
      const decodedToken = jwtDecode(response?.access_token);
      dispatch(saveProfile(decodedToken));
      console.log("Login Success:", response);
      queryClient.setQueryData(["user"], response);
      tokenMethod.set(response);
      toast.dismiss();
      toast.success("Login successfully!!");
      navigate(PATH.HOME, { replace: true });
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Login Error:", err);
      toast.error("Login failed");
    },
  });

  return { doLoginUser, loginLoading };
};
