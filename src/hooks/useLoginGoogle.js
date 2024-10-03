import { API } from "@/api/apiUrl";
import { auth, provider } from "@/config/firebase";
import { PATH } from "@/constant/path";
import { saveProfile } from "@/store/actions/profileAction";
import axiosInstance from "@/utils/axiosInstance";
import tokenMethod from "@/utils/token";
import { useMutation } from "@tanstack/react-query";
// import tokenMethod from "@/utils/token";
import { signInWithPopup } from "firebase/auth";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const handleGoogleLogin = async () => {
  toast.dismiss();
  try {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    console.log("Google ID Token:", token);

    const data = await axiosInstance.post(API.LOGIN_GOOGLE, { token });
    console.log("Server Response:", data);

    if (data.access_token) {
      toast.success("Login successfully!!");
      tokenMethod.set({
        access_token: data?.access_token,
        refresh_token: data?.refresh_token,
      });
    } else {
      toast.error("Login failed");
    }
  } catch (error) {
    console.error("Error during Google login:", error);
    toast.error("Error during login. Check console for details.");
  }
};
export const useLoginGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: doLoginGoogle, isPending: loginGoogleLoading } = useMutation({
    mutationKey: ["loginGoogle"],
    mutationFn: handleGoogleLogin,

    onSuccess: () => {
      const decodedToken = jwtDecode(tokenMethod.get()?.access_token);
      dispatch(saveProfile(decodedToken));
      navigate(PATH.HOME, { replace: true });
    },
    onError: (err) => {
      console.error("Login Error:", err);
    },
  });

  return { doLoginGoogle, loginGoogleLoading };
};
