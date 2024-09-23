import { PATH } from "@/constant/path";
import { loginUser } from "@/store/actions/authAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux"; // Import useDispatch từ redux
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: doLoginUser, isPending: loginLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn:  ({ email, password }) => {
      console.log("ahahhaha",dispatch(loginUser(email, password)));
      
      return dispatch(loginUser(email, password));
    },

    onSuccess: (userData) => {
      console.log("Login Success:", userData);
      queryClient.setQueryData(["user"], userData);
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
