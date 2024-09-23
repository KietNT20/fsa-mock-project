import { registerUser } from "@/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);

  const { mutate: doRegisterUser, isPending: registerLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: ({ email, name, password }) =>
      registerUser({ email, name, password }),
    onSuccess: (response) => {
      toast.dismiss();
      const userData = response;
      queryClient.setQueryData(["user"], userData);
      toast.success("Register successfully!!");

      // Mở modal khi đăng ký thành công
      setModalOpen(true);
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Register Error:", err);
      toast.error("Register failed");
    },
  });

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmNavigate = () => {
    // Tìm nút có id "sign-in-btn" và class "btn transparent"
    const signInButton = document.querySelector("#sign-in-btn");
    
    if (signInButton) {
      signInButton.click(); // Kích hoạt sự kiện click vào nút sign-in
    } else {
      console.error("Sign-in button not found.");
    }

    setModalOpen(false);
  };

  return {
    doRegisterUser,
    registerLoading,
    isModalOpen,
    handleCloseModal,
    handleConfirmNavigate,
  };
};
