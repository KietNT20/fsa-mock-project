import { API } from "@/api/apiUrl";
import { PATH } from "@/constant/path";
import { saveProfile } from "@/store/actions/profileAction";
import axiosInstance from "@/utils/axiosInstance";
import tokenMethod from "@/utils/token";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: doLoginUser, isPending: loginLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }) => {
      return axiosInstance.post(API.LOGIN, { email, password });
    },

    onSuccess: (response) => {
      toast.dismiss();
      const decodedToken = jwtDecode(response?.access_token);
      dispatch(saveProfile(decodedToken));
      // console.log("Login Success:", response);
      queryClient.setQueryData(["user"], response);
      tokenMethod.set({
        access_token: response?.access_token,
        refresh_token: response?.refresh_token,
      });
      toast.success("Login successfully!!");
      navigate(PATH.HOME, { replace: true });
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Login Error:", err);
      toast.error("Login failed, Check your email or password!!");
    },
  });

  return { doLoginUser, loginLoading };
};
