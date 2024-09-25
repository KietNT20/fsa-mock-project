import { registerUser } from "@/store/actions/authAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const { mutate: doRegisterUser, isPending: registerLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: async ({ name, email, password }) => {
      // Dispatch action registerUser và nhận dữ liệu trực tiếp
      console.log("Registering with: ", { name, email, password });
      const response = await dispatch(registerUser({ name, email, password }));
      console.log("Register Response: ", response);

      return response; // Trả về dữ liệu từ action
    },
    onSuccess: (response) => {
      toast.dismiss();
      console.log("Register Success:", response); // In ra dữ liệu phản hồi

      // Nếu phản hồi có dữ liệu hợp lệ
      if (response) {
        queryClient.setQueryData(["user"], response);
        toast.success("Register successfully!!");
        setModalOpen(true); // Mở modal khi đăng ký thành công
      } else {
        console.error("No response data from register API");
        toast.error("Register failed, no response from server.");
      }
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Full Error Object:", err); // Thêm log đầy đủ lỗi
      const errorMessage = err.response?.data?.message || "Register failed";
      console.error("Register Error:", err);
      toast.error(errorMessage);
    },
  });

  return {
    doRegisterUser,
    registerLoading,
    isModalOpen,
    handleCloseModal: () => setModalOpen(false),
    handleConfirmNavigate: () => {
      const signInButton = document.querySelector("#sign-in-btn");
      if (signInButton) signInButton.click();
      else console.error("Sign-in button not found.");
      setModalOpen(false);
    },
  };
};
